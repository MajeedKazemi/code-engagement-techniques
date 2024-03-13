import * as monaco from "monaco-editor";
import {
    forwardRef,
    Fragment,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import {
    apiGetSavedUserCode,
    apiLogEvents,
    apiSaveUserCode,
    apiUserNextTask,
    logError,
} from "../api/api";
import {
    initLanguageClient,
    retryOpeningLanguageClient,
    stopLanguageClient,
} from "../api/intellisense";
import { Baseline } from "./response-generater";
import { AuthContext, SocketContext } from "../context";
import { log, LogType, RunEventType } from "../utils/logger";
import { connectSocket } from "../api/python-shell";

interface EditorProps {
    taskId: string;
    starterCode: string;
    showCodex: boolean;
    updateCode?: (code: string) => void;
    onCompletion: () => void;
    description: string;
}

export const Editor = forwardRef((props: EditorProps, ref) => {
    const { context } = useContext(AuthContext);
    const { socket, setSocket } = useContext(SocketContext);

    const [runId, setRunId] = useState(0);

    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);
    const [output, setOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [running, setRunning] = useState(false);
    const [excution, setExcution] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [lastEditedAt, setLastEditedAt] = useState<Date | null>(null);
    const [saved, setSaved] = useState(true);
    const [canReset, setCanReset] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({
        lineNumber: 0,
        column: 0,
    });

    const [runCodeLog, setRunCodeLog] = useState<any>([]);
    const [keyStrokes, setKeyStrokes] = useState<number>(0);
    const [loggedIO, setLoggedIO] = useState<any>([]);

    useImperativeHandle(ref, () => ({
        setCode(code: string) {
            if (editor) {
                editor.setValue(code);
            }
        },
    }));

    const setNextTask = () => {
        setKeyStrokes(0);
        setEditor(null);
        props.onCompletion();
    };

    useEffect(() => {
        if (monacoEl && !editor) {
            apiGetSavedUserCode(context?.token, props.taskId)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            const savedCode = data.savedCode
                                ? data.savedCode
                                : "";

                            initLanguageClient();
                            // stopLanguageClient(); // could be used to call .connect() for each coding task

                            if (props.starterCode.length > 0) {
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.InitialCode,
                                    props.starterCode
                                );
                            }

                            const editor = monaco.editor.create(
                                monacoEl.current!,
                                {
                                    value: savedCode
                                        ? savedCode
                                        : props.starterCode,
                                    language: "python",
                                    automaticLayout: true,
                                    fontSize: 15,
                                    lineHeight: 25,
                                    minimap: { enabled: false },
                                    wordWrap: "on",
                                    wrappingIndent: "indent",
                                    lineNumbers: "on",
                                }
                            );

                            editor.onDidChangeCursorPosition((e) => {
                                setCursorPosition(e.position);
                            });

                            editor.addAction({
                                id: "show-ai-assistance",
                                label: "AI Assistance",
                                contextMenuGroupId: "navigation",
                                contextMenuOrder: 1,
                                run: function (editor) {
                                    const currentPosition =
                                        editor.getPosition();
                                    const model = editor.getModel();

                                    if (currentPosition && model) {
                                        const codeAboveCursor =
                                            model.getValueInRange({
                                                startLineNumber: 1,
                                                startColumn: 1,
                                                endLineNumber:
                                                    currentPosition.lineNumber -
                                                    1,
                                                endColumn:
                                                    model.getLineMaxColumn(
                                                        currentPosition.lineNumber -
                                                            1
                                                    ),
                                            });

                                        console.log(
                                            "Code above cursor:",
                                            codeAboveCursor
                                        );
                                    }
                                },
                            });

                            editor.onDidChangeModelContent((e) => {
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.ReplayEvent,
                                    e
                                );

                                setKeyStrokes(
                                    (prevKeyStrokes) => prevKeyStrokes + 1
                                );

                                retryOpeningLanguageClient();

                                setLastEditedAt(new Date());
                                setSaved(false);

                                if (editor.getValue() !== props.starterCode) {
                                    setCanReset(true);
                                } else {
                                    setCanReset(false);
                                }

                                if (props.updateCode) {
                                    props.updateCode(editor.getValue());
                                }
                            });

                            editor.onDidPaste((e) => {
                                console.log(e);
                            });

                            setEditor(editor);

                            if (props.updateCode) {
                                props.updateCode(editor.getValue());
                            }
                        });
                    }
                })
                .catch((error) => {
                    logError(error.toString());
                });
        }

        return () => editor?.dispose();
    }, [monacoEl.current]);

    useEffect(() => {
        socket?.on("python", (data: any) => {
            if (data.type === "stdout") {
                if (data.out.split("\n").length > 0) {
                    setOutput([
                        ...output,
                        ...data.out.split("\n").map((i: string) => {
                            return {
                                type: "output",
                                line: i,
                            };
                        }),
                    ]);
                    setLoggedIO([
                        ...loggedIO,
                        ...data.out.split("\n").map((i: string) => {
                            return {
                                type: "output",
                                line: i,
                            };
                        }),
                    ]);
                } else {
                    setOutput([
                        ...output,
                        {
                            type: "output",
                            line: data.out,
                        },
                    ]);
                    setLoggedIO([
                        ...loggedIO,
                        {
                            type: "output",
                            line: data.out,
                        },
                    ]);
                }
                log(props.taskId, context?.user?.id, LogType.RunEvent, {
                    type: RunEventType.Output,
                    output: data.out,
                    runId: runId,
                });
            }
            if (data.type === "stderr") {
                setOutput([
                    ...output,
                    {
                        type: "error",
                        line: data.err,
                    },
                ]);
                setLoggedIO([
                    ...loggedIO,
                    {
                        type: "error",
                        line: data.err,
                    },
                ]);
                log(props.taskId, context?.user?.id, LogType.RunEvent, {
                    type: RunEventType.Error,
                    error: data.err,
                    runId: runId,
                });
            }
            if (data.type === "close") {
                setRunning(false);
                setRunId(runId + 1);
                log(props.taskId, context?.user?.id, LogType.RunEvent, {
                    type: RunEventType.Stop,
                    runId: runId,
                });
            }
        });
    }, [output, runId]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (document.getElementById("game-over")) {
                setOutput([]);
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            stopLanguageClient();
            clearInterval(interval);
        };
    }, []);

    const handleClickRun = () => {
        if (!running) {
            socket?.emit("python", {
                type: "run",
                code: editor?.getValue(),
                from: socket.id,
                userId: context?.user?.id,
            });

            setOutput([]);
            setRunning(true);

            log(props.taskId, context?.user?.id, LogType.RunEvent, {
                type: RunEventType.Start,
                code: editor?.getValue(),
                runId: runId,
            });
        } else {
            socket?.emit("python", {
                type: "stop",
                from: socket.id,
                userId: context?.user?.id,
            });

            setRunning(false);
            editor?.focus();
        }

        setRunCodeLog([
            ...runCodeLog,
            {
                type: "run code from baseline",
                "code-that-was-executed": editor?.getValue(),
                "test-inputs-outputs": loggedIO,
                strockes_counter: keyStrokes,
            },
        ]);

        apiLogEvents(
            context?.token,
            props.taskId,
            "run code from baseline",
            runCodeLog
        )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
            });
    };

    const handleSocketReconnect = () => {
        if (context?.token) {
            setSocket(null);

            setSocket(connectSocket(context?.token));
        }
    };

    const handleClickReset = () => {
        editor?.setValue(props.starterCode);
    };

    const handleClickUndo = () => {
        editor?.trigger("myapp", "undo", {});
    };

    const handleClickSave = () => {
        const code = editor?.getValue();

        if (code) {
            apiSaveUserCode(context?.token, props.taskId, code);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            if (lastEditedAt && lastEditedAt.getTime() + 5000 < Date.now()) {
                handleClickSave();
                setSaved(true);
            }
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [lastEditedAt]);

    return (
        <Fragment>
            <section className="task-workspace">
                <div className="overlay"></div>
                <div className="editor" ref={monacoEl}></div>
                <div className="editor-buttons-container">
                    <div className="quick-editing-buttons-container">
                        <Fragment>
                            {" "}
                            <div className="code-container-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                            </div>
                        </Fragment>
                        Console Input and Output
                        <button
                            className={`editor-button ${
                                saved ? "editing-btn-disabled" : "editing-btn"
                            }`}
                            disabled={saved}
                            onClick={handleClickSave}
                        >
                            {saved ? "Code Saved" : "Save Code"}
                        </button>
                        {/* <button
                            className={`editor-button ${
                                !completed ? "editing-btn-disabled" : "editing-btn"
                            }`}
                            onClick={setNextTask}
                            disabled={!completed}
                        >
                            Next Task
                        </button> */}
                    </div>
                    <button
                        // className={`editor-button-purple`}
                        onClick={handleSocketReconnect}
                    >
                        ReConnect
                    </button>
                    <button
                        className={`editor-button ${
                            running ? "stop-button" : "run-button"
                        }`}
                        onClick={handleClickRun}
                    >
                        {" "}
                        {!running ? (
                            <Fragment>
                                {" "}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    color="currentColor"
                                    stroke="none"
                                    strokeWidth="0"
                                    fill="currentColor"
                                    className="play-icon"
                                >
                                    <path d="M20.2253 11.5642C20.5651 11.7554 20.5651 12.2446 20.2253 12.4358L5.74513 20.5809C5.41183 20.7683 5 20.5275 5 20.1451L5 3.85492C5 3.47251 5.41183 3.23165 5.74513 3.41914L20.2253 11.5642Z"></path>
                                </svg>
                                Run
                            </Fragment>
                        ) : (
                            <Fragment>Stop</Fragment>
                        )}
                    </button>
                </div>
                <div className="output">
                    {output.map((i, index) => (
                        <p
                            className={
                                i.type === "error" ? `console-output-error` : ""
                            }
                            key={"line-" + index}
                        >
                            {i.line}
                        </p>
                    ))}
                    {running && (
                        <input
                            autoFocus
                            key={"input-" + output.length.toString()}
                            className="terminal-input"
                            ref={inputRef}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    socket?.emit("python", {
                                        type: "stdin",
                                        value: terminalInput,
                                        from: socket.id,
                                        userId: context?.user?.id,
                                    });

                                    setOutput([
                                        ...output,
                                        {
                                            type: "input",
                                            line: terminalInput,
                                        },
                                    ]);
                                    setLoggedIO([
                                        ...loggedIO,
                                        {
                                            type: "input",
                                            line: terminalInput,
                                        },
                                    ]);
                                    setTerminalInput("");
                                    log(
                                        props.taskId,
                                        context?.user?.id,
                                        LogType.RunEvent,
                                        {
                                            type: RunEventType.Input,
                                            runId: runId,
                                            input: terminalInput,
                                        }
                                    );
                                }
                            }}
                            onChange={(event) => {
                                setTerminalInput(event.target.value);
                            }}
                        />
                    )}
                </div>
            </section>
            {!excution && (
                <Baseline
                    editor={editor}
                    taskID={props.taskId}
                    task={props.description}
                    moveOn={setNextTask}
                />
            )}
        </Fragment>
    );
});
