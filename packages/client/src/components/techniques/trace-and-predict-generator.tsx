import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import {
    apiGetBaselineCodexSimulation,
    apiGetBaselineExplainationCodexSimulation,
    apiGetTestCaseSimulation,
    apiLogEvents,
    logError,
} from "../../api/api";
import * as monaco from "monaco-editor";
import { ExcutionSteps } from "../responses/excution-steps";
import BaselineGenerateCode from "../responses/baseline-chat";
import IconsDoc from "../docs/icons-doc";
import { GPTLoader } from "../loader";
import { highlightPsudo } from "../../utils/utils";

export let excutionCancelClicked = false;

interface ExcutionGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    taskID: string;
    moveOn: () => void;
}

const TraceAndPredictGenerator: React.FC<ExcutionGenerateCodeProps> = ({
    prompt,
    editor,
    taskID,
    moveOn,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [checked, setChecked] = useState(true);
    const [generatedCode, setGeneratedCode] = useState("");
    const [backendCodes, setBackendCodes] = useState<string[]>([]);
    const [generatedExplanation, setGeneratedExplanation] = useState("");
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [isOver, setIsOver] = useState(false);
    const [buttonClickOver, setButtonClickOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [timeoutValue, setTimeoutValue] = useState<number>(13);
    const [showTimeout, setShowTimeout] = useState<boolean>(false);

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
    //                             if(userCode){

    //                               apiGetLinesToRewrite(
    //                                   context?.token,
    //                                   prompt,
    //                                   userCode
    //                               )
    //                                   .then(async (response) => {

    //                                       if (response.ok && props.editor) {
    //                                           const data = await response.json();

    //                                           let format = data.response.format;
    //                                           let codes = data.response.codes;

    //                                           if (format.length > 0) {
    //                                               setFeedback("");
    //                                               log(
    //                                                   props.taskId,
    //                                                   context?.user?.id,
    //                                                   LogType.PromptEvent,
    //                                                   {
    //                                                       code: codes,
    //                                                       userInput: prompt,
    //                                                   }
    //                                               );

    //                                               let newIndex = format.indexOf('new');
    //                                               let code = '';
    //                                               let oldCodes: any[] = [];

    //                                               for (let i = 0; i < format.length; i++) {
    //                                                 if(format[i] === 'old'){
    //                                                   oldCodes.push(codes[i]);
    //                                                 }
    //                                               }

    //                                               if (newIndex !== -1) {
    //                                                   code = codes[newIndex]
    //                                               }
    //                                               setFormat(format);
    //                                               setBackendCodes(oldCodes);
    //                                               setGeneratedCode(code);
    //                                               // THIS PART IS COMMENTED BECAUSE WE ASSUME THE PREV GENERATED CODE ARE CORRECT
    //                                               let tempContext: CodeRepresentation[] = [];
    //                                               if(oldCodes.length == 1){
    //                                                 apiGetCodeToPseudoCodex(
    //                                                   context?.token,
    //                                                   oldCodes[0],
    //                                                   userCode ? userCode : ""
    //                                               )
    //                                                   .then(async (response) => {

    //                                                       if (response.ok) {
    //                                                           const data = await response.json();
    //                                                           tempContext.push(data.response);
    //                                                           setWaiting(false);
    //                                                       }
    //                                                   })
    //                                                   .catch((error) => {
    //                                                       logError(error.toString());
    //                                                   });
    //                                               }else if(oldCodes.length == 2){
    //                                                 apiGetCodeToPseudoCodex(
    //                                                   context?.token,
    //                                                   oldCodes[0],
    //                                                   userCode ? userCode : ""
    //                                               )
    //                                                   .then(async (response) => {

    //                                                       if (response.ok) {
    //                                                           const data = await response.json();
    //                                                           tempContext.push(data.response);
    //                                                           apiGetCodeToPseudoCodex(
    //                                                             context?.token,
    //                                                             oldCodes[1],
    //                                                             userCode ? userCode : ""
    //                                                         )
    //                                                             .then(async (response) => {

    //                                                                 if (response.ok) {
    //                                                                     const data = await response.json();
    //                                                                     tempContext.push(data.response);
    //                                                                     setWaiting(false);
    //                                                                 }
    //                                                             })
    //                                                             .catch((error) => {
    //                                                                 logError(error.toString());
    //                                                             });
    //                                                       }
    //                                                   })
    //                                                   .catch((error) => {
    //                                                       logError(error.toString());
    //                                                   });
    //                                               }else{
    //                                                 setWaiting(false);
    //                                               }
    //                                           }
    //                                       }
    //                                   })
    //                                   .catch((error) => {
    //                                       editor?.updateOptions({ readOnly: false });
    //                                       setWaiting(false);
    //                                       logError(error.toString());
    //                                   });
    //                           } else{
    //                             setWaiting(false);
    //                           }

    //                         }
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     editor?.updateOptions({ readOnly: false });
    //                     setWaiting(false);
    //                     logError(error.toString());
    //                 });
    //         } catch (error: any) {
    //             editor?.updateOptions({ readOnly: false });
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

                            // setGeneratedCode(data.code);
                            // console.log(taskId);
                            // setBackendCodes(data.code.split('\n'));
                            apiGetTestCaseSimulation(context?.token, taskId)
                                .then(async (response) => {
                                    if (response.ok && editor) {
                                        const data = await response.json();
                                        setFeedback("");
                                        log(
                                            taskID,
                                            context?.user?.id,
                                            LogType.PromptEvent,
                                            {
                                                code: data.code,
                                                userInput: prompt,
                                            }
                                        );
                                        setGeneratedCode(data.code);
                                        setBackendCodes(data.code.split("\n"));
                                    }
                                })
                                .catch((error) => {
                                    editor?.updateOptions({ readOnly: false });
                                    logError(error.toString());
                                });
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

    useEffect(() => {
        generateCode();
        const interval = setInterval(() => {
            if (document.getElementById("game-over")) {
                // setIsOver(true);
                //this is when they get out of the technique
                apiLogEvents(
                    context?.token,
                    taskID,
                    "Timestamp when the prompt get out of the technique",
                    Date.now(),
                  )
                    .then(() => {})
                    .catch((error) => {
                        logError("sendLog: "
                        + error.toString());
                });
                setButtonClickOver(true);
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
            excutionCancelClicked = !excutionCancelClicked;
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

    useEffect(() => {
        const interval = setInterval(() => {
          setTimeoutValue((prevTimeout) => {
            const newTimeout = prevTimeout - 1;
            if (newTimeout < 3) {
              setShowTimeout(true);
            }
            return newTimeout;
          });
        }, 60000); // 60000 milliseconds = 1 minute
    
        return () => {
          clearInterval(interval);
        };
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
                        <div className="icon-div">
                        <div className="spark-icon">
                            <IconsDoc iconName="spark" />
                        </div>
                        AI Assistance:
                        </div>
                        {showTimeout && (timeoutValue >= 0 ?
                            <div className="warning">
                                You have <strong>{timeoutValue}</strong> mins left!                       
                            </div> : 
                            <div>
                                <strong>Time's up!</strong> Please finish up.
                            </div>)
                        }
                    </div>
                    <div className="modal-body">
                        <div className="prompt-text">
                            <span className="button-span">Prompt:</span>{" "}
                            {prompt}
                        </div>
                        <div className="overall-explanation-container">
                            {generatedExplanation && (
                                <div className="overall-explanation">
                                    <b>Explanation:</b> 
                                    <div dangerouslySetInnerHTML={{
                                        __html: highlightPsudo(generatedExplanation, "code-highlight"),
                                    }}>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <p>
                    <b>Prompts: </b> {prompt}
                  </p> */}

                        {/* parsons main div */}
                        {(waiting || counter < 5) && (
                            <div className="gptLoader">
                                <GPTLoader />
                            </div>
                        )}
                        {!waiting && counter >= 5 && (
                            <ExcutionSteps
                                code={generatedCode}
                                backendCodes={backendCodes}
                                taskID={taskID}
                            />
                        )}
                    </div>
                    <div className="modal-footer">
                        {/* <button disabled={!buttonClickOver} type="button" className={`btn btn-secondary ${!buttonClickOver ? 'disabled' : ''}`} onClick={() => setIsOver(true)}>
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
                        {buttonClickOver && (
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
                                    disabled={!buttonClickOver}
                                    type="button"
                                    className={`btn btn-secondary ${
                                        !buttonClickOver ? "disabled" : ""
                                    }`}
                                    onClick={() => setIsOver(true)}
                                >
                                    Return to Editor
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TraceAndPredictGenerator;
