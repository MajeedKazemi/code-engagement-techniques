import React, { useState, useEffect, useRef, useContext, Fragment } from 'react';
import * as monaco from "monaco-editor";
import { AuthContext, SocketContext } from '../../context';
import { initLanguageClient, retryOpeningLanguageClient, stopLanguageClient } from '../../api/intellisense';
import IconsDoc from '../docs/icons-doc';
import { HighlightedPart } from '../docs/highlight-code';
import { apiGetIssueCodes, apiGetIssueHintLevel1, apiGetIssueHintLevel2, apiGetIssueHintLevel3, apiLogEvents, logError } from '../../api/api';

interface VerifyProps {
    code: string;
    issueCode: string;
    questions: any[];
    taskID: string;
}

export const VerifyReview: React.FC<VerifyProps> = ({ code, issueCode, questions, taskID }) => {

    const { context } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [runId, setRunId] = useState(0);

    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);
    const [output, setOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [running, setRunning] = useState(false);
    const [canReset, setCanReset] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ lineNumber: 0, column: 0 });
    const [currentCode, setCurrentCode] = useState<string>(issueCode);
    const inputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState<number>(0);
    const [revealStatus, setRevealStatus] = useState<number>(0);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [currentIssues, setCurrentIssues] = useState<any[][]>(new Array(5).fill([]));
    const [decorations, setDecorations] = useState<string[]>([]);
    const [generatingHint, setGeneratingHint] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [submitCurrentIssues, setSubmitCurrentIssues] = useState<any[]>([]);

    const [runCodeLog, setRunCodeLog] = useState<any>([]);
    const [loggedIO, setLoggedIO] = useState<any>([]);

    useEffect(() => {
        if(currentIssues[status].length > 0){
            console.log(currentIssues[status]);
            // currentIssues.forEach((issue) => {
            //     console.log(issue.line);
            // });
            if (editor && currentIssues && status >= 1) {  
                // Remove existing decorations
                editor.deltaDecorations(decorations, []);
                
                // Map over the issues to create new decorations
                const newDecorations = currentIssues[status].map((issue) => ({
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
        } 
    }, [currentIssues]);

    useEffect(() => {
        if(currentIssues[status].length > 0){
            // currentIssues.forEach((issue) => {
            //     console.log(issue.line);
            // });
            if (editor && currentIssues) {  
                // Remove existing decorations
                editor.deltaDecorations(decorations, []);
                
                // Map over the issues to create new decorations
                const newDecorations = currentIssues[status].map((issue) => ({
                  range: new monaco.Range(issue.line, 1, issue.line, 1),
                  options: { 
                    isWholeLine: true,
                    className: 'myLineHighlightReset'
                  }
                }));
            
                // Add new decorations and save them in the state
                const ids = editor.deltaDecorations([], newDecorations);
                setDecorations(ids);
            }
        } 
        if(submitCurrentIssues.length > 0){
            console.log(submitCurrentIssues);
            // currentIssues.forEach((issue) => {
            //     console.log(issue.line);
            // });
            if (editor && submitCurrentIssues) {  
                // Remove existing decorations
                editor.deltaDecorations(decorations, []);
                
                // Map over the issues to create new decorations
                const newDecorations = submitCurrentIssues.map((issue) => ({
                  range: new monaco.Range(issue.line, 1, issue.line, 1),
                  options: { 
                    isWholeLine: true,
                    className: 'myLineHighlightReset'
                  }
                }));
            
                // Add new decorations and save them in the state
                const ids = editor.deltaDecorations([], newDecorations);
                setDecorations(ids);
            }
        } 
    }, [currentCode]);

    useEffect(() => {
        if(submitCurrentIssues.length > 0){
            console.log(submitCurrentIssues);
            // currentIssues.forEach((issue) => {
            //     console.log(issue.line);
            // });
            if (editor && submitCurrentIssues) {  
                // Remove existing decorations
                editor.deltaDecorations(decorations, []);
                
                // Map over the issues to create new decorations
                const newDecorations = submitCurrentIssues.map((issue) => ({
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
        } 
    }, [submitCurrentIssues]);

    useEffect(() => {
        const currIssues = [...currentIssues];
        currIssues[0] = questions;
        setCurrentIssues(currIssues);
        console.log(questions);
    }, []);


    useEffect(() => {
        initLanguageClient();
        if(issueCode.length > 0 && monacoEl.current){
            // console.log(issueCode);

            const editor = monaco.editor.create(
                monacoEl.current,
                {
                    value: issueCode,
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
        }
        
    }, []);

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
                    setLoggedIO([... loggedIO, {
                        type: "output",
                        ...data.out.split("\n").map((i: string) => {
                            return {
                                type: "output",
                                line: i,
                            };
                        }),
                    }])
                } else {
                    setOutput([
                        ...output,
                        {
                            type: "output",
                            line: data.out,
                        },
                    ]);
                    setLoggedIO([... loggedIO, {
                        type: "output",
                        line: data.out,
                    }])
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
                setLoggedIO([... loggedIO, {
                    type: "error",
                    line: data.err,
                }])
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
        setRunCodeLog([...runCodeLog, 
            {
                type: "run code from verifyReview",
                "code-that-was-executed": editor?.getValue(),
                "used-test-cases": "", 
                "test-inputs-outputs": loggedIO,
            }
        ]);

        apiLogEvents(
            context?.token,
            taskID,
            "run code from verifyReview",
            runCodeLog,
        )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
        });
    };

    const handleClickReset = () => {
        editor?.setValue(issueCode);
    };

    const handleVerifyCode = () => {

        setGeneratingHint(true);
            try {
                apiGetIssueHintLevel1(
                    context?.token,
                    code,
                    currentCode,
                ).then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        if (data.hint1.length === 0) {
                            setIsCorrect(true);
                            setCurrentIssues(Array(5).fill([]));
                            setGeneratingHint(false);
                        } else {
                            // const currIssues = [...currentIssues];
                            // currIssues[1] = data.hint1;
                            // setCurrentIssues(currIssues);
                            // setRevealStatus(1);
                            // setStatus(1);
                            // const currIssues = [...currentIssues];
                            // currIssues[0] = questions;
                            // currIssues[1] = data.hint1;
                            // currIssues[2] = [];
                            // currIssues[3] = [];
                            // currIssues[4] = [];
                            // setCurrentIssues(currIssues);
                            setSubmitCurrentIssues(data.hint1);

                            // - submit and check event
                            // - current state of code in editor {string}
                            // - lines that are incorrect: {array of strings/objects}
                            apiLogEvents(
                                context?.token,
                                taskID,
                                "submit and check event",
                                {
                                  type: "submit code from baseline",
                                  "current-state-of-code-in-editor": currentCode,
                                  "lines-that-are-incorrect": currentIssues,
                                },
                              )
                                .then(() => {})
                                .catch((error) => {
                                    logError("sendLog: " + error.toString());
                            });
                            setGeneratingHint(false);
                        }
                    }
                }
                ).catch((err: any) => {
                    console.log(err);
                    setGeneratingHint(false);
                });
            } catch (err) {
                console.log(err);
                setGeneratingHint(false);
            }
    };

    const handleGetHint = () => {
        
        console.log(currentCode);
        // - get hint event
		// - current state of code in editor {string}
		// - displayed hints {array of strings/objects}
        apiLogEvents(
            context?.token,
            taskID,
            "get hint event",
            {
              type: "get hint event",
              "current-state-of-code-in-editor": currentCode,
              "current-hints": currentIssues,
            },
          )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
        });
        if (currentCode.length <= 0) return;
        if (status === 0) {
            // pass to the LLM, ask a question to hint the student where to check for the issue
            setGeneratingHint(true);
            try {
                apiGetIssueHintLevel1(
                    context?.token,
                    code,
                    currentCode,
                ).then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        const currIssues = [...currentIssues];
                        currIssues[1] = data.hint1;
                        setCurrentIssues(currIssues);
                        setGeneratingHint(false);
                    }
                }
                ).catch((err: any) => {
                    console.log(err);
                    setGeneratingHint(false);
                });
            } catch (err) {
                console.log(err);
                setGeneratingHint(false);
            }
            setStatus(1);
            setRevealStatus(1);


            // editor?.setValue(issueCode);
        } else if (status === 1) {
            //  highlighting the line(s) of code that need to be fixed
            // pass to the LLM, ask a question to hint the student where to check for the issue
            setGeneratingHint(true);
            try {
                apiGetIssueHintLevel2(
                    context?.token,
                    code,
                    currentCode,
                ).then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        const currIssues = [...currentIssues];
                        currIssues[2] = data.hint2;
                        setCurrentIssues(currIssues);
                        setGeneratingHint(false);
                    }
                }
                ).catch((err: any) => {
                    console.log(err);
                    setGeneratingHint(false);
                });
            } catch (err) {
                console.log(err);
                setGeneratingHint(false);
            }
            setStatus(2);
            setRevealStatus(2);
            
            // editor?.setValue(issueCode);
        } else if (status === 2) {
            //  highlighting the line(s) of code that need to be fixed
            // pass to the LLM, short explaination on what wrong with each line
            setGeneratingHint(true);
            try {
                apiGetIssueHintLevel3(
                    context?.token,
                    code,
                    currentCode,
                ).then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        const currIssues = [...currentIssues];
                        currIssues[3] = data.hint3;
                        setCurrentIssues(currIssues);
                        setGeneratingHint(false);
                    }
                }
                ).catch((err: any) => {
                    console.log(err);
                    setGeneratingHint(false);
                });
            } catch (err) {
                console.log(err);
                setGeneratingHint(false);
            }
            setStatus(3);
            setRevealStatus(3);
            
            // editor?.setValue(issueCode);
        } else if (status === 3) {
            //  highlighting the line(s) of code that need to be fixed
            // show correct version
            setGeneratingHint(true);
            try {
                apiGetIssueHintLevel1(
                    context?.token,
                    code,
                    currentCode,
                ).then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        const currIssues = [...currentIssues];
                        currIssues[4] = data.hint1;
                        setCurrentIssues(currIssues);
                        console.log(currIssues);
                        setGeneratingHint(false);
                    }
                }
                ).catch((err: any) => {
                    console.log(err);
                    setGeneratingHint(false);
                });
            } catch (err) {
                console.log(err);
                setGeneratingHint(false);
            }
            setStatus(4);
            setRevealStatus(4);
        }
    };

    // - high priority:
    // 	- get hint event
    //     - current state of code in editor {string}
    //     - displayed hints {array of strings/objects}
    // - submit and check event
    //     - current state of code in editor {string}
    //     - lines that are incorrect: {array of strings/objects}
    // - submit code event (finish code)
    //     - code that was submitted {string}

    // - mid priority:
    // - run code:
    //     - code that was executed {string}
    //     - used test-case: {string}
    //     - test input/output: {array of string}

    return (
        <Fragment>
            {isCorrect && <span id="game-over" style={{opacity:0}}>Game Over</span>}
            <div className="verify-review-container">
                <div className = "verify-code-editor-container">
                    <div className="monaco-editor-container" ref={monacoEl}></div>
                    <div className="editor-buttons-container">
                        <div className="quick-editing-buttons-container">
                            <Fragment>
                                {" "}
                                <div className="code-container-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>

                                </div>
                            </Fragment>
                            Console Input and Output
                        </div>
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
                                            setLoggedIO([... loggedIO, {
                                                type: "input",
                                                line: terminalInput,
                                            }])
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
                <div className="status-container">
                    <div className='hint-button-container'>
                        <button className={`hint-button ${(generatingHint || revealStatus == 4) ? 'disabled' : ''}`} onClick={handleGetHint}>Get Hint</button>
                        {/* <div>You have attempted <strong>{status}</strong> times</div> */}
                        <button className={`hint-button verify-button ${generatingHint ? 'disabled' : ''}`} onClick={handleVerifyCode}>Check Code</button>
                    </div>
                    {/* {status === 4 && <div className="monaco-editor-container" ref={monacoCorrectEl}></div>} */}
                    {!isCorrect && status >0 && !generatingHint && 
                        <div className='status-sub-container'>
                            {/* <p className="status-header">Current Status:</p> */}
                            {/* <div className="issues-info current-issues">
                                <p>You still have {currentIssues[status].length} logical issues in your current code</p>
                            </div> */}
                            {/* <div className="hint-button-container">
                                <button className={`reveal-level-button ${revealStatus < 1 ? 'disabled' : ''}`}  onClick={() => setStatus(1)}>Hint Level 1</button>
                                <button className={`reveal-level-button ${revealStatus < 2 ? 'disabled' : ''}`}  onClick={() => setStatus(2)}>Hint Level 2</button>
                                <button className={`reveal-level-button ${revealStatus < 3 ? 'disabled' : ''}`}  onClick={() => setStatus(3)}>Hint Level 3</button>
                                <button className={`reveal-level-button ${revealStatus < 4 ? 'disabled' : ''}`}  onClick={() => setStatus(4)}>Hint Level 4</button>
                            </div> */}
                            {status >= 4 &&
                            <div className="hints-container">
                                <div className='hints-header'>
                                    <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                                    Hint
                                </div>

                                <div className='verify-answer-container'>
                                {currentIssues.map((currIssue, issueIndex) => (
                                    <>{issueIndex == 4 && currIssue.map((issue, index) => (
                                        // status = 1: highlight the line(s) of code that need to be fixed
                                        // status = 2: pass to the LLM, ask a question to hint the student where to check for the issue for the line
                                        // status = 3: pass to the LLM, direct Hint
                                        // status = 4: show correct version
                                        <div key={index} className="issue-container">
                                            {status >= 4 && !generatingHint &&
                                            <>
                                                <div className="issue-content">
                                                    Line <strong>{issue.line}</strong>: {issue.issues}
                                                </div>
                                                <div className="issue-content code-content">
                                                    <strong>Fixes</strong>: <HighlightedPart part={code.split("\n")[issue.line-1]}/>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    ))}
                                    </>
                                ))}
                                </div>
                            </div>
                            }
                            {status >= 3 &&
                            <div className="hints-container">
                                <div className='hints-header'>
                                    <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                                    Hint
                                </div>

                                <div className='verify-answer-container'>
                                {currentIssues.map((currIssue, issueIndex) => (
                                    <>{issueIndex == 3 && currIssue.map((issue, index) => (
                                        // status = 1: highlight the line(s) of code that need to be fixed
                                        // status = 2: pass to the LLM, ask a question to hint the student where to check for the issue for the line
                                        // status = 3: pass to the LLM, direct Hint
                                        // status = 4: show correct version
                                        <div key={index} className="issue-container">
                                            {status >= 3 && !generatingHint &&
                                            <>
                                                <div className="issue-content">
                                                    Line <strong>{issue.line}</strong>: {issue.issues}
                                                </div>
                                                <div className="issue-content">
                                                    <strong>Hint</strong>: {issue.hint}
                                                </div>
                                            </>
                                            }
                                        </div>
                                    ))}
                                    </>
                                ))}
                                </div>
                            </div>
                            }
                            {status >= 2 &&
                            <div className="hints-container">
                                <div className='hints-header'>
                                    <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                                    Hint
                                </div>

                                <div className='verify-answer-container'>
                                {currentIssues.map((currIssue, issueIndex) => (
                                    <>{issueIndex == 2 && currIssue.map((issue, index) => (
                                        // status = 1: highlight the line(s) of code that need to be fixed
                                        // status = 2: pass to the LLM, ask a question to hint the student where to check for the issue for the line
                                        // status = 3: pass to the LLM, direct Hint
                                        // status = 4: show correct version
                                        <div key={index} className="issue-container">
                                            {status >= 2 && !generatingHint &&
                                            <>
                                                <div className="issue-content">
                                                    Line <strong>{issue.line}</strong>: {issue.issues}
                                                </div>
                                                <div className="issue-content">
                                                <strong>Question</strong>: {issue.question}
                                                </div>
                                            </>
                                            }
                                        </div>
                                    ))}
                                    </>
                                ))}
                                </div>
                            </div>
                            }
                            {status >= 1 &&
                            <div className="hints-container">
                                <div className='hints-header'>
                                    <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                                    Hint
                                </div>

                                <div className='verify-answer-container'>
                                {currentIssues.map((currIssue, issueIndex) => (
                                    <>{issueIndex == 1 && currIssue.map((issue, index) => (
                                        // status = 1: highlight the line(s) of code that need to be fixed
                                        // status = 2: pass to the LLM, ask a question to hint the student where to check for the issue for the line
                                        // status = 3: pass to the LLM, direct Hint
                                        // status = 4: show correct version
                                        <div key={index} className="issue-container">
                                            {status >= 1 && !generatingHint &&
                                                <div className="issue-content">
                                                    Line <strong>{issue.line}</strong>: {issue.issues}
                                                </div>
                                            }
                                        </div>
                                    ))}
                                    </>
                                ))}
                                </div>
                            </div>
                            }
                        </div>
                        
                    }

                </div>
            </div>
        </Fragment>
    );
};



