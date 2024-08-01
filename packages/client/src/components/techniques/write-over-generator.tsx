import React, { useContext, useEffect, useRef, useState } from "react";
import {
    apiGetBaselineCodexSimulation,
    apiGetBaselineExplainationCodexSimulation,
    apiGetWriteOverCodexSimulation,
    logError,
} from "../../api/api";
import * as monaco from "monaco-editor";
import { AuthContext } from "../../context";
import { WriteOver } from "../responses/write-over";
import BaselineGenerateCode from "../responses/baseline-chat";
import { GPTLoader } from "../loader";
import IconsDoc from "../docs/icons-doc";

export let writeOverCancelClicked = false;

interface WriteOverGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    code: string | null;
    taskID: string;
    moveOn: () => void;
}

const WriteOverGenerateCode: React.FC<WriteOverGenerateCodeProps> = ({
    prompt,
    editor,
    code,
    taskID,
    moveOn,
}) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [userInputCode, setUserInputCode] = useState("");
    const [checked, setChecked] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [generatedExplanation, setGeneratedExplanation] = useState("");
    const [isOver, setIsOver] = useState(false);
    const [passed, setPassed] = useState(false);
    const [generatedExplanationPerLine, setGeneratedExplanationPerLine] =
        useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        let intervalId: number | null = null;

        if (isTimerStarted) {
            // Setup a timer that increments the counter every second
            intervalId = window.setInterval(() => {
                setCounter((prevCounter) => {
                    if (prevCounter === 4) {
                        // Check if the counter is about to become 5
                        console.log("Timer has reached 5 seconds.");

                        // Implement any additional logic here
                        if (intervalId !== null) {
                            window.clearInterval(intervalId); // Clears the interval
                        }
                        setIsTimerStarted(false); // Optionally stops the timer

                        return 5; // Update the state to reflect it reached 5
                    }
                    return prevCounter + 1; // Increment the counter
                });
            }, 1000); // Run this every 1000 milliseconds (1 second)
        }

        // Cleanup function
        return () => {
            if (intervalId !== null) {
                window.clearInterval(intervalId);
            }
        };
    }, [isTimerStarted]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (document.getElementById("game-over")) {
                // setIsOver(true);
                setPassed(true);
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const closePopup = async () => {
        setIsModalOpen(true);
    };

    const handleModalClick = (confirmed: boolean) => {
        setIsModalOpen(false);

        if (confirmed) {
            setIsOpen(false);
            const overlayElement = document.querySelector(
                ".overlay"
            ) as HTMLElement;
            const editorElement = document.querySelector(
                ".editor"
            ) as HTMLElement;
            overlayElement!.style.display = "none";
            editorElement.style.zIndex = "1";
            setGeneratedCode("");
            setGeneratedExplanation("");
            moveOn();
            writeOverCancelClicked = !writeOverCancelClicked;
        }
    };

    useEffect(() => {
        if (isOver) {
            setIsOpen(false);
            const overlayElement = document.querySelector(
                ".overlay"
            ) as HTMLElement;
            const editorElement = document.querySelector(
                ".editor"
            ) as HTMLElement;
            overlayElement!.style.display = "none";
            editorElement.style.zIndex = "1";
            var outputDiv = document.querySelector(".output");
            outputDiv!.innerHTML = "";
        }
    }, [isOver]);

    const props = {
        taskId: "",
        editor: editor,
    };

    // const generateCode = () => {
    //     if (prompt.length === 0) {
    //         setFeedback(
    //             "You should write an instruction of the code that you want to be generated."
    //         );
    //     } else {
    //         setWaiting(true);

    //         const focusedPosition = props.editor?.getPosition();
    //         const userCode = props.editor?.getValue();
    //         let codeContext = "";

    //         if (focusedPosition && userCode && checked) {
    //             codeContext = userCode
    //                 .split("\n")
    //                 .slice(0, focusedPosition.lineNumber + 1)
    //                 .join("\n");
    //         }

    //         try {
    //             apiGetBaselineCodex(
    //                 context?.token,
    //                 prompt,
    //                 userCode ? userCode : ""
    //             )
    //                 .then(async (response) => {

    //                     if (response.ok && props.editor) {
    //                         const data = await response.json();

    //                         let text = data.bundle.code;

    //                         if (text.length > 0) {
    //                             setFeedback("");
    //                             log(
    //                                 props.taskId,
    //                                 context?.user?.id,
    //                                 LogType.PromptEvent,
    //                                 {
    //                                     code: text,
    //                                     userInput: prompt,
    //                                 }
    //                             );

    //                             let insertLine = 0;
    //                             let insertColumn = 1;

    //                             let curLineNumber = 0;
    //                             let curColumn = 0;

    //                             let highlightStartLine = 0;
    //                             let highlightStartColumn = 0;
    //                             let highlightEndLine = 0;
    //                             let highlightEndColumn = 0;

    //                             const curPos = props.editor.getPosition();
    //                             const curCodeLines = props.editor
    //                                 .getValue()
    //                                 .split("\n");

    //                             if (curPos) {
    //                                 curLineNumber = curPos.lineNumber;
    //                                 curColumn = curPos.column;
    //                             }

    //                             let curLineText =
    //                                 curCodeLines[curLineNumber - 1];
    //                             let nextLineText =
    //                                 curLineNumber < curCodeLines.length
    //                                     ? curCodeLines[curLineNumber]
    //                                     : null;

    //                             if (curColumn === 1) {
    //                                 // at the beginning of a line
    //                                 if (curLineText !== "") {
    //                                     text += "\n";
    //                                     insertLine = curLineNumber;
    //                                     insertColumn = 1;

    //                                     highlightStartLine = curLineNumber;
    //                                     highlightStartColumn = curColumn;

    //                                     const textLines = text.split("\n");

    //                                     highlightEndLine =
    //                                         curLineNumber +
    //                                         textLines.length -
    //                                         1;
    //                                     highlightEndColumn = 1;
    //                                 } else {
    //                                     insertLine = curLineNumber;
    //                                     insertColumn = 1;

    //                                     highlightStartLine = curLineNumber;
    //                                     highlightStartColumn = curColumn;

    //                                     highlightEndLine =
    //                                         curLineNumber +
    //                                         text.split("\n").length;
    //                                     highlightEndColumn = 1;
    //                                 }
    //                             } else if (curColumn !== 1) {
    //                                 // in the middle of a line
    //                                 if (nextLineText !== "") {
    //                                     text = "\n" + text;
    //                                     insertLine = curLineNumber;
    //                                     insertColumn = curLineText.length + 1;

    //                                     const textLines = text.split("\n");

    //                                     highlightStartLine = curLineNumber + 1;
    //                                     highlightStartColumn = 1;

    //                                     highlightEndLine =
    //                                         curLineNumber +
    //                                         text.split("\n").length -
    //                                         1;
    //                                     highlightEndColumn =
    //                                         textLines[textLines.length - 1]
    //                                             .length + 1;
    //                                 } else {
    //                                     insertLine = curLineNumber + 1;
    //                                     insertColumn = 1;

    //                                     highlightStartLine = curLineNumber;
    //                                     highlightStartColumn = curColumn;

    //                                     highlightEndLine =
    //                                         curLineNumber +
    //                                         text.split("\n").length;
    //                                     highlightEndColumn = 1;
    //                                 }
    //                             }
    //                             setGeneratedCode(text);
    //                             setGeneratedExplanation(data.bundle.explain);
    //                             if (text.length >= 0){
    //                                 try {
    //                                     apiGetExplanationPerLineCodex(
    //                                       context?.token,
    //                                       text,
    //                                   )
    //                                       .then(async (response) => {

    //                                           if (response.ok) {
    //                                             const data = await response.json();
    //                                             console.log(data.lines);
    //                                             setGeneratedExplanationPerLine(data.lines);
    //                                             setWaiting(false);
    //                                         }
    //                                       })
    //                                       .catch((error) => {
    //                                           setWaiting(false);
    //                                           logError(error.toString());
    //                                       });
    //                                   } catch (error: any) {
    //                                       setWaiting(false);
    //                                       logError(error.toString());
    //                                   }
    //                               }
    //                         }
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     props.editor?.updateOptions({ readOnly: false });
    //                     setWaiting(false);
    //                     logError(error.toString());
    //                 });
    //         } catch (error: any) {
    //             props.editor?.updateOptions({ readOnly: false });
    //             setWaiting(false);
    //             logError(error.toString());
    //         }
    //     }
    // };

    const generateCode = () => {
        if (prompt.length === 0) {
            setFeedback(
                "You should write an instruction of the code that you want to be generated."
            );
        } else {
            setWaiting(true);
            setIsTimerStarted(true);

            const focusedPosition = editor?.getPosition();
            const userCode = editor?.getValue();
            let codeContext = "";

            if (focusedPosition && userCode && checked) {
                codeContext = userCode
                    .split("\n")
                    .slice(0, focusedPosition.lineNumber + 1)
                    .join("\n");
            }
            try {
                apiGetBaselineCodexSimulation(context?.token, taskID)
                    .then(async (response) => {
                        if (response.ok && editor) {
                            const data = await response.json();
                            let taskId = data.taskId;
                            let text = data.code;
                            setGeneratedCode(text);
                            console.log(taskId);
                            apiGetBaselineExplainationCodexSimulation(
                                context?.token,
                                taskId
                            )
                                .then(async (response) => {
                                    if (response.ok && editor) {
                                        const data = await response.json();

                                        setGeneratedExplanation(
                                            data.explanation
                                        );
                                        // setWaiting(false);
                                    }
                                })
                                .catch((error) => {
                                    editor?.updateOptions({ readOnly: false });
                                    // setWaiting(false);
                                    logError(error.toString());
                                });

                            apiGetWriteOverCodexSimulation(
                                context?.token,
                                taskId
                            )
                                .then(async (response) => {
                                    if (response.ok && editor) {
                                        const data = await response.json();
                                        // console.log(data.verifyReview);
                                        setGeneratedExplanationPerLine(
                                            data.writeOverTokens.lines
                                        );
                                        setWaiting(false);
                                    }
                                })
                                .catch((error) => {
                                    editor?.updateOptions({ readOnly: false });
                                    setWaiting(false);
                                    logError(error.toString());
                                });
                        }
                    })
                    .catch((error) => {
                        editor?.updateOptions({ readOnly: false });
                        setWaiting(false);
                        logError(error.toString());
                    });
            } catch (error: any) {
                editor?.updateOptions({ readOnly: false });
                setWaiting(false);
                logError(error.toString());
            }
        }
    };

    const writeRef = React.useRef<HTMLDivElement>();
    useEffect(() => {
        if (writeRef.current) {
            writeRef.current.focus();
        }
    }, []);

    useEffect(() => {
        generateCode();
        const editorContainer = editorRef.current;
        const windowHeight = window.innerHeight;
        const editorHeight = Math.floor(windowHeight * 0.35);

        if (editorContainer) {
            const editor = monaco.editor.create(editorContainer, {
                value: "",
                language: "python",
                automaticLayout: true,
                fontSize: 12,
                lineHeight: 25,
                minimap: { enabled: false },
                wordWrap: "on",
                wrappingIndent: "indent",
                lineNumbers: "on",
            });

            editorContainer.style.height = `${editorHeight}px`;

            editor.onDidChangeModelContent(() => {
                const updatedCode = editor.getValue();
                setUserInputCode(updatedCode);
            });

            editor.layout();
            editor.focus();

            return () => {
                editor.dispose();
            };
        }
    }, []);

    return (
        <div>
            {isOver && (
                <BaselineGenerateCode
                    prompt={prompt}
                    editor={editor}
                    code={generatedCode}
                    exp={generatedExplanation}
                    taskID={taskID}
                    moveOn={moveOn}
                />
            )}
            {isOpen && !isOver && (
                <div className="modal show" style={{ display: "block" }}>
                    <div className="modal-header">
                        <div className="spark-icon">
                            <IconsDoc iconName="spark" />
                        </div>
                        AI Assistance:
                    </div>
                    <div className="modal-body">
                        <div className="prompt-text">
                            <span className="button-span">Prompt:</span>{" "}
                            {prompt}
                        </div>
                        {/* <p>
                  <b>Prompts: </b> {prompt}
                </p> */}

                        {(waiting || counter < 5) && (
                            <div className="gptLoader">
                                <GPTLoader />
                            </div>
                        )}
                        {!waiting && counter >= 5 && (
                            <div
                                className="writeover-code-reader"
                                tabIndex={-1}
                                onKeyDown={(e) =>
                                    e.key === "Tab" && e.preventDefault()
                                }
                            >
                                {generatedCode && !waiting && (
                                    <WriteOver
                                        text={generatedCode}
                                        tokens={generatedExplanationPerLine}
                                        taskID={taskID}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        {passed && (
                            <>
                                <div className="continue-next-task-message">
                                    Great job! Press{" "}
                                    <span className="button-span">
                                        {" "}
                                        Return to Editor{" "}
                                    </span>{" "}
                                    to go back and test the AI-generated code!
                                </div>
                                <button
                                    disabled={!passed}
                                    type="button"
                                    className={`btn btn-secondary ${
                                        !passed ? "disabled" : ""
                                    }`}
                                    onClick={() => setIsOver(true)}
                                >
                                    Return to Editor
                                </button>
                            </>
                        )}
                        {/* <button disabled={!passed} type="button" className={`btn btn-secondary ${!passed ? 'disabled' : ''}`} onClick={() => setIsOver(true)}>
                  Done
                  </button>
                <button disabled={waiting} type="button" className="btn btn-secondary" onClick={closePopup}>
                  Next
                </button>
                {isModalOpen && (
                      <div className="modal-next-confirm">
                        <div className="modal-next-confirm-content">
                        <h3>Are you sure you want to go to the next task?</h3>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <button type="button" onClick={() => handleModalClick(true)}>Yes</button>
                          <button type="button" onClick={() => handleModalClick(false)}>No</button>
                        </div>
                        </div>
                      </div>
                  )} */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WriteOverGenerateCode;
