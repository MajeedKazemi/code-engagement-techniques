import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { apiGetBaselineCodex, apiGetPseudoCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { AuthContext, SocketContext } from '../../context';
import { LogType, log } from '../../utils/logger';
import { PseudoCodeHoverable } from '../responses/hoverable-pseudo';
import BaselineGenerateCode from '../responses/baseline-chat';
import IconsDoc from '../docs/icons-doc';

export let pseudoCancelClicked = false;

interface PseudoGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    code: string | null;
}

interface PseudoCodeSubgoals {
    title: string;
    code: PesudoInterface[];
}

interface PesudoInterface {
    indent: number;
    code: string;
    pseudo: string;
    explanation: string;
}

function responseToPseudo(response: any): PseudoCodeSubgoals[] {
    return response.subgoals.map((item: any) => {
        return {
            title: item.title,
            code: item.code.map((codeItem: any) => {
                return {
                    indent: Number(codeItem.indent),
                    code: codeItem.line,
                    pseudo: codeItem["pseudo-code"],
                    explanation: codeItem.explanation
                };
            })
        };
    });
}

// [
//     {
//         "title": "Define Function and Sort Intervals",
//         "code": [
//             {
//                 "line": "def merge_intervals(intervals):",
//                 "pseudo-code": "Define a function named 'merge_intervals' that takes a list 'intervals' as input.",
//                 "explanation": "This line defines the function that will be used to merge the intervals."
//             },
//             {
//                 "line": "sorted_intervals = sorted(intervals, key=lambda x: x[0])",
//                 "pseudo-code": "Sort the 'intervals' list based on the first element of each tuple.",
//                 "explanation": "Sorting the intervals ensures that overlapping intervals are adjacent to each other in the list."
//             }
//         ]
//     },
//     {
//         "title": "Initialize Merged List",
//         "code": [
//             {
//                 "line": "merged = [sorted_intervals[0]]",
//                 "pseudo-code": "Initialize a list 'merged' with the first element of 'sorted_intervals'.",
//                 "explanation": "This sets up the 'merged' list for the upcoming loop that will merge the intervals."
//             }
//         ]
//     },
//     {
//         "title": "Merge Overlapping Intervals",
//         "code": [
//             {
//                 "line": "for current in sorted_intervals:",
//                 "pseudo-code": "Start a loop over each interval 'current' in 'sorted_intervals'.",
//                 "explanation": "This loop will iterate through each interval in the sorted list to merge overlapping intervals."
//             },
//             {
//                 "line": "previous = merged[-1]",
//                 "pseudo-code": "Assign the last element of 'merged' to a variable 'previous'.",
//                 "explanation": "This line retrieves the last merged interval to compare with the current interval."
//             },
//             {
//                 "line": "if current[0] <= previous[1]:",
//                 "pseudo-code": "Check if the start of 'current' is less than or equal to the end of 'previous'.",
//                 "explanation": "This condition checks if the current interval overlaps with the previous merged interval."
//             },
//             {
//                 "line": "previous = (previous[0], max(previous[1], current[1]))",
//                 "pseudo-code": "If overlapping, merge 'previous' and 'current' by taking the start of 'previous' and the maximum end between 'previous' and 'current'.",
//                 "explanation": "This line merges the overlapping intervals into a single interval."
//             },
//             {
//                 "line": "merged[-1] = previous",
//                 "pseudo-code": "Replace the last element of 'merged' with the new merged interval 'previous'.",
//                 "explanation": "This line updates the last merged interval with the newly merged interval."
//             },
//             {
//                 "line": "else:",
//                 "pseudo-code": "If 'current' does not overlap with 'previous',",
//                 "explanation": "This else statement handles the case where the current interval does not overlap with the previous merged interval."
//             },
//             {
//                 "line": "merged.append(current)",
//                 "pseudo-code": "Append 'current' to the 'merged' list.",
//                 "explanation": "This line adds the non-overlapping interval to the list of merged intervals."
//             }
//         ]
//     },
//     {
//         "title": "Return Merged Intervals",
//         "code": [
//             {
//                 "line": "return merged",
//                 "pseudo-code": "Return the 'merged' list.",
//                 "explanation": "This line returns the final list of merged intervals."
//             }
//         ]
//     },
//     {
//         "title": "Test Function",
//         "code": [
//             {
//                 "line": "print(merge_intervals([(1, 3), (2, 6), (8, 10), (15, 18)]))",
//                 "pseudo-code": "Call 'merge_intervals' function with a list of intervals and print the result.",
//                 "explanation": "This line tests the function with a given list of intervals and prints the merged intervals."
//             },
//             {
//                 "line": "print(merge_intervals([(1, 4), (4, 5)]))",
//                 "pseudo-code": "Call 'merge_intervals' function with another list of intervals and print the result.",
//                 "explanation": "This line tests the function with another list of intervals and prints the merged intervals."
//             },
//             {
//                 "line": "print(merge_intervals([(0, 1), (3, 5), (4, 8), (10, 12), (9, 10)]))",
//                 "pseudo-code": "Call 'merge_intervals' function with a third list of intervals and print the result.",
//                 "explanation": "This line tests the function with a third list of intervals and prints the merged intervals."
//             }
//         ]
//     }
// ]

const PseudoGenerateCode: React.FC<PseudoGenerateCodeProps> = ({ prompt, editor, code })  => {
    const pseudoRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [userInputCode, setUserInputCode] = useState('');
    const [checked, setChecked] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [isOver, setIsOver] = useState(false);
    const [buttonClickOver, setButtonClickOver] = useState(false);
    const [pseudooutput, setPseudoOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [running, setRunning] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { socket } = useContext(SocketContext);
    const [runId, setRunId] = useState(0);
    const [generatedCode, setGeneratedCode] = useState('');
    const [generatedExplanation, setGeneratedExplanation] = useState('');
    const [generatedPseudo, setGeneratedPseudo] = useState<PseudoCodeSubgoals[]>([]);

    // function responseToPseudo(response: any, code:string): PseudoCodeSubgoals[] {
    // }

    const props = {
        taskId: "",
        editor: editor
    };

    const generatePseudoCode = () => {
        if (prompt.length === 0) {
            setFeedback(
                "You should write an instruction of the code that you want to be generated."
            );
        } else {
            setWaiting(true);
  
            const focusedPosition = props.editor?.getPosition();
            const userCode = props.editor?.getValue();
            let codeContext = "";
  
            if (focusedPosition && userCode && checked) {
                codeContext = userCode
                    .split("\n")
                    .slice(0, focusedPosition.lineNumber + 1)
                    .join("\n");
            }
  
            try {
                apiGetBaselineCodex(
                    context?.token,
                    prompt,
                    userCode ? userCode : ""
                )
                    .then(async (response) => {
  
                        if (response.ok && props.editor) {
                            const data = await response.json();
  
                            let text = data.bundle.code;
  
                            if (text.length > 0) {
                                setFeedback("");
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.PromptEvent,
                                    {
                                        code: text,
                                        userInput: prompt,
                                    }
                                );
  
                                let insertLine = 0;
                                let insertColumn = 1;
  
                                let curLineNumber = 0;
                                let curColumn = 0;
  
                                let highlightStartLine = 0;
                                let highlightStartColumn = 0;
                                let highlightEndLine = 0;
                                let highlightEndColumn = 0;
  
                                const curPos = props.editor.getPosition();
                                const curCodeLines = props.editor
                                    .getValue()
                                    .split("\n");
  
                                if (curPos) {
                                    curLineNumber = curPos.lineNumber;
                                    curColumn = curPos.column;
                                }
  
                                let curLineText =
                                    curCodeLines[curLineNumber - 1];
                                let nextLineText =
                                    curLineNumber < curCodeLines.length
                                        ? curCodeLines[curLineNumber]
                                        : null;
  
                                if (curColumn === 1) {
                                    // at the beginning of a line
                                    if (curLineText !== "") {
                                        text += "\n";
                                        insertLine = curLineNumber;
                                        insertColumn = 1;
  
                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;
  
                                        const textLines = text.split("\n");
  
                                        highlightEndLine =
                                            curLineNumber +
                                            textLines.length -
                                            1;
                                        highlightEndColumn = 1;
                                    } else {
                                        insertLine = curLineNumber;
                                        insertColumn = 1;
  
                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;
  
                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length;
                                        highlightEndColumn = 1;
                                    }
                                } else if (curColumn !== 1) {
                                    // in the middle of a line
                                    if (nextLineText !== "") {
                                        text = "\n" + text;
                                        insertLine = curLineNumber;
                                        insertColumn = curLineText.length + 1;
  
                                        const textLines = text.split("\n");
  
                                        highlightStartLine = curLineNumber + 1;
                                        highlightStartColumn = 1;
  
                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length -
                                            1;
                                        highlightEndColumn =
                                            textLines[textLines.length - 1]
                                                .length + 1;
                                    } else {
                                        insertLine = curLineNumber + 1;
                                        insertColumn = 1;
  
                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;
  
                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length;
                                        highlightEndColumn = 1;
                                    }
                                }
                                setGeneratedCode(text);
                                setGeneratedExplanation(data.bundle.explain);
                                if (text.length >= 0){
                                  try {
                                    apiGetPseudoCodex(
                                        context?.token,
                                        prompt,
                                        text,
                                    )
                                        .then(async (response) => {
                        
                                            if (response.ok) {
                                                const data = await response.json();
                                                setGeneratedPseudo(responseToPseudo(data.steps));
                        
                                                setWaiting(false);
                                            } 
                                        })
                                        .catch((error) => {
                                            setWaiting(false);
                                            console.log(error);
                                        });
                                    } catch (error: any) {
                                        setWaiting(false);
                                        console.log(error);
                                    }
                                }
                                
                            } 
                        }
                    })
                    .catch((error) => {
                        props.editor?.updateOptions({ readOnly: false });
                        setWaiting(false);
                        logError(error.toString());
                    });
            } catch (error: any) {
                props.editor?.updateOptions({ readOnly: false });
                setWaiting(false);
                logError(error.toString());
            }
        }
    };

    useEffect(() => {
        socket?.on("python", (data: any) => {
            if (data.type === "stdout") {
                if (data.out.split("\n").length > 0) {
                    setPseudoOutput([
                        ...pseudooutput,
                        ...data.out.split("\n").map((i: string) => {
                            return {
                                type: "output",
                                line: i,
                            };
                        }),
                    ]);
                } else {
                    setPseudoOutput([
                        ...pseudooutput,
                        {
                            type: "output",
                            line: data.out,
                        },
                    ]);
                }
            }
            if (data.type === "stderr") {
                setPseudoOutput([
                    ...pseudooutput,
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
    }, [pseudooutput, runId]);

    useEffect(() => {
        if (generatedPseudo.length == 0) {
            generatePseudoCode();
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedPseudo([]);
        pseudoCancelClicked = !pseudoCancelClicked;
    };

    useEffect(() => {
        if(generatedPseudo.length > 0) {
            const editorContainer = editorRef.current;

            if (editorContainer) {
            const editor = monaco.editor.create(editorContainer, 
                {
                    value: "",
                    language: "python",
                    automaticLayout: true,
                    fontSize: 12,
                    lineHeight: 25,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    wrappingIndent: "indent",
                    lineNumbers: 'on',
                }
            );

            editorContainer.style.height = `40vh`;

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
        }
        
    }, [generatedPseudo]);

    const handleClickRun = () => {
        if (!running) {
            socket?.emit("python", {
                type: "run",
                code: userInputCode,
                from: socket.id,
                userId: context?.user?.id,
            });

            setPseudoOutput([]);
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

    useEffect(() => {
        if (running) {
            setButtonClickOver(true);
        }
    }, [running]);

    useEffect(() => {
        if(isOver){
            setIsOpen(false);
            const overlayElement = document.querySelector('.overlay') as HTMLElement;
            const editorElement = document.querySelector('.editor') as HTMLElement;
            overlayElement!.style.display = 'none';
            editorElement.style.zIndex = '1';
            var outputDiv = document.querySelector('.output');
            outputDiv!.innerHTML = '';
        }
    }, [isOver]);


    return (
        <div>
          {isOver && (
              <BaselineGenerateCode prompt={prompt} editor={editor} code={generatedCode} exp={generatedExplanation}/>
          )} 
          {isOpen && !isOver && (
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-header">
                  <div className='spark-icon'><IconsDoc iconName="spark" /></div>
                  AI Assistance:
              </div>
              <div className="modal-body">
                <p>
                  <b>Prompts: </b> {prompt}
                </p>

                {/* parsons main div */}
                {waiting && (
                  <p>Generating</p>
                )}
                {(!waiting) && (
                  <div className='pesudocode-container-div'>
                    <div ref={pseudoRef} className="pesudo-code-reader">
                        <PseudoCodeHoverable goals={generatedPseudo} />
                    </div>
                    <div className='pesudocode-writer-container'>
                        <div ref={editorRef} className="monaco-code-writer">
                        </div>
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
                        <div className="output">
                            {pseudooutput.map((i, index) => (
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
                                    key={"input-" + pseudooutput.length.toString()}
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

                                            setPseudoOutput([
                                                ...pseudooutput,
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
                )}
              </div>
              <div className="modal-footer">
              <button disabled={!buttonClickOver} type="button" className={`btn btn-secondary ${!buttonClickOver ? 'disabled' : ''}`} onClick={() => setIsOver(true)}>
                  Done
                  </button>
                <button disabled={waiting} type="button" className="btn btn-secondary" onClick={closePopup}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
    )
    
};


export default PseudoGenerateCode;
