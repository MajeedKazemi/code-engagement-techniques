import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context";

import {
    apiGetBaselineCodexSimulation,
    apiGetBaselineExplainationCodexSimulation,
    apiGetBaselineLineByLineExplanationSimulation,
    apiLogEvents,
    logError,
} from "../../api/api";
import * as monaco from "monaco-editor";
import { highlightPsudo } from "../../utils/utils";
import { ChatLoader } from "../loader";
import IconsDoc from "../docs/icons-doc";
import { HighlightedPartWithoutTab } from "../docs/highlight-code";

export let baselineCancelClicked = false;

interface LineWithLeadSpaces {
    original: string;
    trimmed: string;
    leadSpaces: number;
    currentTabs: number;
}

interface BaselineGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    code: string;
    exp: string;
    taskID: string;
    moveOn: () => void;
}

const BaselineGenerateCode: React.FC<BaselineGenerateCodeProps> = ({
    prompt,
    editor,
    code,
    exp,
    taskID,
    moveOn,
}) => {
    // Call the GPT API or any code generation logic here
    // to generate code based on the userInput
    const [generating, setGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");
    const [explanation, setGeneratedExplanation] = useState("");
    const [feedback, setFeedback] = useState("");
    const [checked, setChecked] = useState(true);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const baselineRef = useRef<HTMLDivElement | null>(null);
    const explanationRef = useRef<HTMLParagraphElement | null>(null);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [timeUsed, setTimeUsed] = useState<number>(0);
    const [runCodeNoError, setRunCodeNoError] = useState<boolean>(false);
    const [lineByLineexplaination, setLineByLineExplanation] = useState<string[]>([]);
    const [colorizedText, setColorizedText] = useState<string[]>([]);
    const [hoveringHovered, setHoveringHovered] = useState<boolean[]>(new Array(code.length).fill(false));

    useEffect(() => {
        // Create an interval that runs every second
        const interval = setInterval(() => {
            // Increment timeUsed by 1 every second
            setTimeUsed((prevTimeUsed) => prevTimeUsed + 1);
        }, 1000);

        // This is important! Clear interval when the component is unmounted to prevent memory leaks
        return () => {
            clearInterval(interval);
        };
    }, []); // Empty array dependency makes this run once after initial render

    function deepCopy(arr: any[]): any[] {
        return arr.map((item) => (Array.isArray(item) ? deepCopy(item) : item));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (document.getElementById("run-code-no-error")) {
                setRunCodeNoError(true);
                apiLogEvents(
                    context?.token,
                    taskID,
                    "User clicked run code first time successfully",
                    Date.now(),
                  )
                    .then(() => {})
                    .catch((error) => {
                        logError("sendLog: "
                        + error.toString());
                });
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        if (explanation.length > 0 && explanationRef.current) {
            explanationRef.current.innerHTML = highlightPsudo(
                explanation,
                "code-highlight"
            );
        }
    }, [explanation]);

    const cancelClick = () => {
        const overlayElement = document.querySelector(
            ".overlay"
        ) as HTMLElement;
        const editorElement = document.querySelector(".editor") as HTMLElement;
        overlayElement!.style.display = "none";
        editorElement.style.zIndex = "1";
        setGeneratedCode("");
        setGeneratedExplanation("");
        baselineCancelClicked = !baselineCancelClicked;

        //this is when they finish submit the task
        apiLogEvents(
            context?.token,
            taskID,
            "Timestamp when the prompt finished the task and submit",
            Date.now(),
          )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: "
                + error.toString());
        });
        moveOn();
    };

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

    const handleInsertCodeClick = () => {
        if (editor) {
            const position = editor.getPosition();
            if (position) {
                const range = new monaco.Range(
                    position.lineNumber,
                    position.column,
                    position.lineNumber,
                    position.column
                );
                const op = {
                    identifier: { major: 1, minor: 1 },
                    range: range,
                    text: generatedCode,
                    forceMoveMarkers: true,
                };
                editor.executeEdits("insertCodeAfterCursor", [op]);
            }
        }

        apiLogEvents(context?.token, taskID, "submit code from baseline", {
            type: "submit code from baseline",
            "time-since-displayed": timeUsed,
            "code-generated": generatedCode,
        })
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
            });
        // const editorElement = document.querySelector('.editor') as HTMLElement;
        // editorElement.style.zIndex = '1';
        // setGeneratedCode("");
        // setGeneratedExplanation("");
        // baselineCancelClicked = !baselineCancelClicked;
    };

    // const generateCode = () => {
    //     if (prompt.length === 0) {
    //         setFeedback(
    //             "You should write an instruction of the code that you want to be generated."
    //         );
    //     } else {
    //         setGenerating(true);

    //         const focusedPosition = props.editor?.getPosition();
    //         const userCode = props.editor?.getValue();
    //         let codeContext = "";

    //         if (focusedPosition && userCode && checked) {
    //             codeContext = userCode
    //                 .split("\n")
    //                 .slice(0, focusedPosition.lineNumber + 1)
    //                 .join("\n");
    //         }
    //           try {
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
    //                             setGenerating(false);
    //                         }
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     props.editor?.updateOptions({ readOnly: false });
    //                     setGenerating(false);
    //                     logError(error.toString());
    //                 });
    //         } catch (error: any) {
    //             props.editor?.updateOptions({ readOnly: false });
    //             setGenerating(false);
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
            setGenerating(true);
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

                            setGeneratedCode(data.code);
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
                                        // console.log(data.explanation);
                                        setGenerating(false);
                                    }
                                })
                                .catch((error) => {
                                    editor?.updateOptions({ readOnly: false });
                                    setGenerating(false);
                                    logError(error.toString());
                                });
                        }
                    })
                    .catch((error) => {
                        editor?.updateOptions({ readOnly: false });
                        setGenerating(false);
                        logError(error.toString());
                    });
            } catch (error: any) {
                editor?.updateOptions({ readOnly: false });
                setGenerating(false);
                logError(error.toString());
            }
        }
    };

    useEffect(() => {
        const lines = generatedCode.split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => ({
            original: line,
            trimmed: line.replace(/^\s+/, ""), // Strip leading whitespaces
            leadSpaces: line.search(/\S|$/), // Counts leading whitespaces
            currentTabs: Math.floor(line.search(/\S|$/) / 4),
        }));

        console.log(lines);

        async function getColorizedText(index: number) {
            const colorized = await monaco.editor.colorize(
                lines[index].original.replace(/\t/g, "    "),
                "python",
                {}
            );
            return colorized;
        }

        async function fetchAllColorizedText() {
            const promises = lines.map((_, index) => getColorizedText(index));
            const colorizedTextArray = await Promise.all(promises);
            return colorizedTextArray;
        }

        if (lines && lines.length > 0) {
            console.log(lines);
            fetchAllColorizedText().then((colorizedTextArray) => {
                setColorizedText(colorizedTextArray);
            });
        }

        apiGetBaselineLineByLineExplanationSimulation(
            context?.token,
            taskID,
        )
            .then(async (response) => {
                if (response.ok && editor) {
                    const data = await response.json();

                    setLineByLineExplanation(
                        data.explanation
                    );
                }
            })
            .catch((error) => {
                editor?.updateOptions({ readOnly: false });
                logError(error.toString());
            });


        
    }, [generatedCode]);

    useEffect(() => {
        if (code.length > 0 && exp.length > 0) {
            setGeneratedCode(code);
            setGeneratedExplanation(exp);
            
        } else {
            generateCode();
        }
    }, []);

    useEffect(() => {
        console.log(`runCodeNoError changed: ${runCodeNoError}`);
    }, [runCodeNoError]);


    useEffect(() => {
        if (baselineRef.current && generatedCode && !editorRef.current) {
            editorRef.current = monaco.editor.create(baselineRef.current, {
                value: generatedCode,
                language: "python",
                readOnly: true,
                automaticLayout: true,
                minimap: {
                    enabled: false,
                },
                fontSize: 16,
            });
            editorRef.current.onDidChangeModelContent(() => {
                const model = editorRef.current?.getModel();
                if (model) {
                    const lineHeight =
                        editorRef.current?.getOption(
                            monaco.editor.EditorOption.lineHeight
                        ) || 18;
                    const lineCount = Math.max(model.getLineCount(), 1);
                    const newHeight = lineHeight * (lineCount + 6);
                    const maxHeight = window.innerHeight * 0.4;
                    const height = Math.min(newHeight, maxHeight);
                    baselineRef.current!.style.height = `${height}px`;
                    editorRef.current!.layout();
                }
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.dispose();
                editorRef.current = null;
            }
        };
    }, [generatedCode]);

    const generatedCodeComponent = (
        <>
            <div className={`chat-user-prompt`}>
                <div className="baseline-feedback">
                    <div className="user-chat-container">
                        <div className="user-icon">
                            <IconsDoc iconName="person" />
                        </div>
                        <div className="baseline-feedback-user chat-bubble">
                            <div className="baseline-feedback-user-text">
                                <p>{prompt}</p>
                            </div>
                        </div>
                    </div>
                    <div className="assistant-chat-container">
                        <div className="assistant-icon">
                            <IconsDoc iconName="spark" />
                        </div>
                        <div className="baseline-feedback-assistant chat-bubble">
                            <div className="baseline-feedback-assistant-text">
                                {generating && (
                                    <div className="chat-loader">
                                        Generating <ChatLoader />{" "}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                    </div>
                                )}
                                {!generating && (
                                    <div className="chat-loader-finish">
                                        Generated
                                        Code:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {!generating && (
                    <>
                        {/* //   <div ref={baselineRef} className="read-only-editor"></div> */}
                        <div className="baseline-read-only-editor">
                            {generatedCode &&  
                                generatedCode.split("\n").map((line, index) => (
                                    <div
                                        id={`line-${index}`}
                                        key={index}
                                        className="trace-predict-tracker"
                                    >
                                        <>
                                            <pre
                                                onMouseEnter={() => {
                                                    //deepCopy of hoveringHovered
                                                    let temp = deepCopy(hoveringHovered);
                                                    //change all to false
                                                    temp.fill(false);
                                                    //change the current index to true
                                                    temp[index] = true;
                                                    setHoveringHovered(temp);
                                                }}
                                                onMouseLeave={() => {
                                                    //deepCopy of hoveringHovered
                                                    let temp = deepCopy(hoveringHovered);
                                                    //change all to false
                                                    temp.fill(false);
                                                    setHoveringHovered(temp);
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: colorizedText[index],
                                                }}
                                            ></pre>
                                            {hoveringHovered[index] && lineByLineexplaination && (
                                            <div className="hoverable-code-container-with-hint">
                                                <div
                                                    className="hoverable-code-line-explanation"
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlightPsudo(lineByLineexplaination[index]),
                                                    }}
                                                ></div>
                                            </div>
                                            )}
                                        </>
                                    </div>
                                    ))}
                                    <div
                                        id={`line-${code.split("\n").length+1}`}
                                        className="trace-predict-tracker"
                                    ></div>
                                    <div
                                        id={`line-${code.split("\n").length+2}`}
                                        className="trace-predict-tracker"
                                    ></div>
                                    <div
                                        id={`line-${code.split("\n").length+3}`}
                                        className="trace-predict-tracker"
                                    ></div>
                        </div>
                        <div className="read-only-explaination">
                            <b>Code Explanation</b>
                            <p ref={explanationRef}></p>
                        </div>
                    </>
                )}
                <div
                    className={`generated-button-container ${
                        generating ? "inactive" : ""
                    }`}
                >
                    <button className={`gpt-button ${!runCodeNoError ? 'disabled' : ''}`} onClick={cancelClick} disabled={!runCodeNoError}>
                        Next Task
                    </button>
                    <button
                        className="gpt-button insert-code"
                        onClick={handleInsertCodeClick}
                    >
                        Insert Code
                    </button>
                </div>
            </div>
        </>
    );

    return generatedCodeComponent;
};

export default BaselineGenerateCode;
