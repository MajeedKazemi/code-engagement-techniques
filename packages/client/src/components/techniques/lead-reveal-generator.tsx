import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";

import {
    logError,
    apiGetBaselineCodexSimulation,
    apiGetBaselineExplainationCodexSimulation,
    apiGetLeadReviewSimulation,
    apiLogEvents,
} from "../../api/api";
import * as monaco from "monaco-editor";
import RevealQuestionComponent from "../responses/reveal-question-container";
import BaselineGenerateCode from "../responses/baseline-chat";
import IconsDoc from "../docs/icons-doc";
import { GPTLoader } from "../loader";

export let revealCancelClicked = false;

interface RevealGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    taskID: string;
    moveOn: () => void;
}

interface QuestionInterface {
    revealLines: string;
    questions: SubQuestions[];
}

interface SubQuestions {
    context: string;
    question: string;
    solution: string;
}

function responseToQuestion(response: any, code: string): QuestionInterface[] {
    return response.subgoals.map((item: any) => {
        // question details:
        let questionsInSubgoals = [];
        const questionLines = item["subgoal-code-lines-to-be-revealed"];

        // revealLines
        const codeLines = code.split("\n");
        const revealLines = Array.isArray(questionLines)
            ? questionLines
            : [questionLines];
        const lines = revealLines
            .map((index: number) => codeLines[index - 1])
            .filter((line: string) => typeof line === "string")
            .join("\n");

        for (let i = 0; i < item["questions"].length; i++) {
            const questionDetails = item["questions"][i];

            questionsInSubgoals.push({
                context: questionDetails["context-so-far"],
                question: questionDetails["question"],
                solution: questionDetails["answer"],
            });
        }

        return {
            revealLines: lines,
            questions: questionsInSubgoals,
        };
    });
}

const RevealGenerateCode: React.FC<RevealGenerateCodeProps> = ({
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
    const [generatedExplanation, setGeneratedExplanation] = useState("");
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);
    const [isOver, setIsOver] = useState(false);
    const [buttonClickOver, setButtonClickOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [timeoutValue, setTimeoutValue] = useState<number>(0);

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

                            apiGetLeadReviewSimulation(context?.token, taskId)
                                .then(async (response) => {
                                    if (response.ok && editor) {
                                        const data = await response.json();
                                        console.log(data.leadReveal);
                                        setQuestions(
                                            responseToQuestion(
                                                data.leadReveal,
                                                text
                                            )
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
    //                             apiGenerateRevealQuestion(
    //                                 context?.token,
    //                                 text,
    //                                 prompt,
    //                             )
    //                                 .then(async (response) => {

    //                                     if (response.ok && props.editor) {
    //                                         const data = await response.json();
    //                                         console.log(data.response);
    //                                         setQuestions(responseToQuestion(data.response, text));
    //                                         setWaiting(false);

    //                                     }
    //                                 })
    //                                 .catch((error) => {
    //                                     props.editor?.updateOptions({ readOnly: false });
    //                                     setWaiting(false);
    //                                     logError(error.toString());
    //                                 });

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

    useEffect(() => {
        generateCode();
        const interval = setInterval(() => {
            if (document.getElementById("game-over")) {
                // setIsOver(true);
                setButtonClickOver(true);
                //this is when they get out of the technique
                apiLogEvents(
                    context?.token,
                    taskID,
                    "Timestamp when the prompt get out of the technique",
                    Date.now()
                )
                    .then(() => {})
                    .catch((error) => {
                        logError("sendLog: " + error.toString());
                    });
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

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
                const newTimeout = prevTimeout + 1;

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
                            <span>
                                <b>AI Assistance: </b> Additional Steps
                            </span>
                        </div>

                        <div className="elapsed-time-container">
                            Elapsed Time:{" "}
                            <span className="elapsed-time-value">
                                {timeoutValue + " mins"}
                            </span>
                        </div>
                    </div>
                    <div className="modal-body leadreveal">
                        {(waiting || counter < 5) && (
                            <div className="gptLoader">
                                <GPTLoader />
                            </div>
                        )}
                        {!waiting && counter >= 5 && (
                            <RevealQuestionComponent
                                data={questions}
                                taskID={taskID}
                                prompt={prompt}
                                code={generatedCode}
                            />
                        )}
                    </div>
                    <div className="modal-footer">
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

export default RevealGenerateCode;
