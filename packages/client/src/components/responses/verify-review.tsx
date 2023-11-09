import React, { useState, useEffect, useRef, useContext, Fragment } from 'react';
import * as monaco from "monaco-editor";
import { AuthContext, SocketContext } from '../../context';
import { initLanguageClient, retryOpeningLanguageClient, stopLanguageClient } from '../../api/intellisense';

interface VerifyProps {
    code: string;
    issueCode: string;
    questions: QuestionInterface[];
}

interface QuestionInterface {
    type: string;
    line: number;
    content: string;
}

export const VerifyReview: React.FC<VerifyProps> = ({ code, issueCode, questions }) => {

    const { context } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [runId, setRunId] = useState(0);

    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [correctEditor, setCorrectEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);
    const monacoCorrectEl = useRef(null);
    const [output, setOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [running, setRunning] = useState(false);
    const [canReset, setCanReset] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ lineNumber: 0, column: 0 });
    const [currentCode, setCurrentCode] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<number>(0);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [currentIssues, setCurrentIssues] = useState<QuestionInterface[]>([]);
    const [decorations, setDecorations] = useState<string[]>([]);
    const [hints, setHints] = useState<string[]>([]);


    useEffect(() => {
        if(currentIssues.length > 0){

        }
    }, [currentIssues]);

    useEffect(() => {
        setCurrentIssues(questions);
    }, []);

    useEffect(() => {
        // Assuming "editor" is a reference to the Monaco editor instance
        if (editor && currentIssues && status > 1) {  
          // Remove existing decorations
          editor.deltaDecorations(decorations, []);
          
          // Map over the issues to create new decorations
          const newDecorations = currentIssues.map((issue) => ({
            range: new monaco.Range(issue.line, 1, issue.line, 1),
            options: { 
              isWholeLine: true,
              className: 'myLineHighlight'
            }
          }));
      
          // Add new decorations and save them in the state
          const ids = editor.deltaDecorations([], newDecorations);
          setDecorations(ids);
        }
      
      
      }, [currentIssues, status, verifying]);

    useEffect(() => {
            
        if (status === 4){
            const correctEditor = monaco.editor.create(
                monacoCorrectEl.current!,
                {
                    value: code || '',
                    language: "python",
                    automaticLayout: true,
                    fontSize: 15,
                    lineHeight: 25,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    wrappingIndent: "indent",
                    lineNumbers: 'on',
                    readOnly: true,
                }
            );

            setCorrectEditor(correctEditor);

            // Remove existing decorations
            correctEditor.deltaDecorations(decorations, []);
            
            // Map over the issues to create new decorations
            const newDecorations = currentIssues.map((issue) => ({
              range: new monaco.Range(issue.line, 1, issue.line, 1),
              options: { 
                isWholeLine: true,
                className: 'myLineHighlight'
              }
            }));
        
            // Add new decorations and save them in the state
            const ids = correctEditor.deltaDecorations([], newDecorations);
            setDecorations(ids);

            return () => correctEditor?.dispose();
        }
    }, [status]);


    useEffect(() => {
            
        initLanguageClient();

        const editor = monaco.editor.create(
            monacoEl.current!,
            {
                value: issueCode || '',
                language: "python",
                automaticLayout: true,
                fontSize: 15,
                lineHeight: 25,
                minimap: { enabled: false },
                wordWrap: "on",
                wrappingIndent: "indent",
                lineNumbers: 'on',
            }
        );


        editor.onDidChangeCursorPosition((e) => {
            setCursorPosition(e.position);
        });
        

        editor.addAction({
            id: 'show-ai-assistance',
            label: 'AI Assistance',
            contextMenuGroupId: 'navigation',
            contextMenuOrder: 1,
            run: function (editor) {
                const currentPosition = editor.getPosition();
                const model = editor.getModel();
            
                if (currentPosition && model) {
                    const codeAboveCursor = model.getValueInRange({
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: currentPosition.lineNumber - 1,
                    endColumn: model.getLineMaxColumn(currentPosition.lineNumber - 1),
                    });
            
                    // console.log('Code above cursor:', codeAboveCursor);
                }
            },
            });


        editor.onDidChangeModelContent((e) => {

            retryOpeningLanguageClient();


            if (editor.getValue() !== issueCode) {
                setCanReset(true);
            } else {
                setCanReset(false);
            }

            if (currentCode) {
                setCurrentCode(editor.getValue());
            }
        });

        editor.onDidPaste((e) => {
            console.log(e);
        });

        setEditor(editor);

        if (currentCode) {
            setCurrentCode(editor.getValue());
        }

        return () => editor?.dispose();
    }, [issueCode]);

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
                } else {
                    setOutput([
                        ...output,
                        {
                            type: "output",
                            line: data.out,
                        },
                    ]);
                }
            }
            if (data.type === "stderr") {
                setOutput([
                    ...output,
                    {
                        type: "error",
                        line: data.err,
                    },
                ]);
            }
            if (data.type === "close") {
                setRunning(false);
                setRunId(runId + 1);
            }
        });
    }, [output, runId]);


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

        } else {
            socket?.emit("python", {
                type: "stop",
                from: socket.id,
                userId: context?.user?.id,
            });

            setRunning(false);
            editor?.focus();
        }
    };

    const handleClickReset = () => {
        editor?.setValue(issueCode);
    };


    const handleVerifyCode = () => {
        
        setVerifying(true);
        if (status === 0) {
            setHints([]);
            // pass to the LLM, ask a question to hint the student where to check for the issue
            setStatus(1);
            setHints(["Have you considered the data type expected by the `range` function in your for loop? What type of value does `input()` return and how should you correctly convert it for use with `range`?", "What are the first two numbers in the Fibonacci sequence, and how should they be initialized in your program?"]);
            setVerifying(false);
            editor?.setValue(issueCode);
        } else if (status === 1) {
            setHints([]);
            //  highlighting the line(s) of code that need to be fixed
            // pass to the LLM, ask a question to hint the student where to check for the issue
            setStatus(2);
            setHints(["Have you considered the data type expected by the `range` function in your for loop? What type of value does `input()` return and how should you correctly convert it for use with `range`?", "What are the first two numbers in the Fibonacci sequence, and how should they be initialized in your program?"]);
            setVerifying(false);
            editor?.setValue(issueCode);
        } else if (status === 2) {
            setHints([]);
            //  highlighting the line(s) of code that need to be fixed
            // pass to the LLM, short explaination on what wrong with each line
            setStatus(3);
            setHints(["The input for the length of the Fibonacci sequence is being stored as a string rather than an integer. The `range` function requires an integer as an argument, not a string.", "The initial values of `a` and `b` are in the incorrect order if you want to start the sequence with 0."]);
            setVerifying(false);
            editor?.setValue(issueCode);
        } else if (status === 3) {
            setHints([]);
            //  highlighting the line(s) of code that need to be fixed
            // show correct version
            setStatus(4);
            setVerifying(false);
            editor?.setValue(issueCode);
        }
    };

    return (
        <Fragment>
            {status >= 4 && <span id="game-over" style={{opacity:0}}>Game Over</span>}
            <div className="verify-review-container">
                <div className = "verify-code-editor-container">
                    <div className="monaco-editor-container" ref={monacoEl}></div>
                    {status === 4 && <div className="monaco-editor-container" ref={monacoCorrectEl}></div>}
                    {status != 4 && 
                        <div className="status-container">
                            <p className="status-header">Attempt Status:</p>
                            <p>You have attempted <b>{status}</b> times</p>
                            <p className="status-header">Current Status:</p>
                            <div className="issues-info current-issues">
                                <p>You have {currentIssues.length} logical issues in your current code</p>
                            </div>
                            <div className="issues-info fixed-issues">
                                <p>You have fixed {questions.length - currentIssues.length} issues</p>
                            </div>
                            <p className="status-header">Hint:</p>
                            <div className='verify-answer-container'>
                            { currentIssues.map((issue, index) => (
                                <div key={index} className="issue-container">
                                    {status >= 2 && <pre className="issue-content">{issue.content}</pre>}
                                    <div className="hint">{hints[index]}</div>
                                </div>
                            ))}

                            </div>
                        </div>
                        
                    }

                </div>
                <div className="editor-buttons-container">
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

                    <button
                        className={`editor-button editing-btn`}
                        disabled={verifying || status === 4}
                        onClick={handleVerifyCode}
                    >
                        Verify
                    </button>

                    <div className="quick-editing-buttons-container">
                        <button
                            className={`editor-button ${
                                canReset
                                    ? "editing-btn"
                                    : "editing-btn-disabled"
                            }`}
                            disabled={!canReset}
                            onClick={handleClickReset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="console-input-container">
                    <div className="print-output">
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
                                        setTerminalInput("");
                                    }
                                }}
                                onChange={(event) => {
                                    setTerminalInput(event.target.value);
                                }}
                            />
                        )}
                    </div>
                </div>
                

            </div>
        </Fragment>
    );
};



