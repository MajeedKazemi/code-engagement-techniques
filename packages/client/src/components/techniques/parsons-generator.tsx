import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context";

import {
    apiGetBaselineCodexSimulation,
    apiGetBaselineExplainationCodexSimulation,
    logError,
} from "../../api/api";
import * as monaco from "monaco-editor";
import { ParsonsGame } from "../responses/parsons-game";
import IconsDoc from "../docs/icons-doc";
import BaselineGenerateCode from "../responses/baseline-chat";
import { GPTLoader } from "../loader";

export let parsonsCancelClicked = false;

function convertToCodeBlocks(text: string, answer: string): CodeBlock[] {
    const lines = text.split("\n");
    const answerLines = answer.split("\n");
    const codeBlocks: CodeBlock[] = [];

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        const trimmedAnswerLine = answerLines[index].trim();
        if (trimmedLine !== "" && trimmedAnswerLine !== "") {
            codeBlocks.push({
                id: index + 1,
                code: trimmedLine,
                answer: trimmedAnswerLine,
            });
        }
    });

    return codeBlocks;
}

interface CodeBlock {
    id: number;
    code: string;
    answer: string;
}

interface IDraggableTask {
    id: string;
    content: string;
    answer: string;
    indentationLevel: number;
    wantedIndentation: number;
    currentMouseXPosition?: number;
    onDest: boolean;
    inputCorrect: boolean;
}

interface ParsonsGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    taskID: string;
    moveOn: () => void;
}

const ParsonsGenerateCode: React.FC<ParsonsGenerateCodeProps> = ({
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
    const [initialCodeBlocks, setInitialCodeBlocks] = useState<CodeBlock[]>([]);
    const [orderedCodeBlocks, setOrderedCodeBlocks] = useState<CodeBlock[]>([]);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const sectionHeightRef = useRef<number>(0);
    const [isOver, setIsOver] = useState(false);
    const [generatedQuestion, setGeneratedQuestion] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonClickOver, setButtonClickOver] = useState(false);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);

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
    //                             setGeneratedQuestion(text);
    //                             setWaiting(false);
    //                             // apiGetParsonsCodex(
    //                             //     context?.token,
    //                             //     text,
    //                             //     userCode ? userCode : ""
    //                             // )
    //                             //     .then(async (response) => {

    //                             //         if (response.ok) {
    //                             //             const data = await response.json();
    //                             //             setGeneratedQuestion(data.code);
    //                             //             setWaiting(false);
    //                             //         }
    //                             //     })
    //                             //     .catch((error) => {
    //                             //         logError(error.toString());
    //                             //     });

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

                            setGeneratedCode(data.code);
                            console.log(taskId);
                            setGeneratedQuestion(data.code);
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
                setButtonClickOver(true);
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const responseCodeObject: CodeBlock[] = convertToCodeBlocks(
            generatedQuestion,
            generatedCode
        );
        setInitialCodeBlocks(responseCodeObject);
        sectionHeightRef.current = responseCodeObject.length * 40;
    }, [generatedQuestion]);

    function shuffleArray(array: IDraggableTask[]): IDraggableTask[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function toTask(
        generatedQuestion: string,
        generatedCode: string
    ): IDraggableTask[] {
        let lines = generatedQuestion.split("\n");
        let answers = generatedCode.split("\n");
        return lines
            .filter((line) => line.trim() !== "")
            .map((line, index) => {
                const indentationLevel = line.search(/\S|$/);

                return {
                    id: (index + 1).toString(),
                    content: line,
                    answer: answers[index],
                    indentationLevel: 0,
                    onDest: false,
                    inputCorrect: !line.includes("{input}"),
                    wantedIndentation: Math.round(indentationLevel / 4),
                };
            });
    }

    useEffect(() => {
        generateCode();
        const interval = setInterval(() => {
            if (document.getElementById("game-over")) {
                // setIsOver(true);
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
            parsonsCancelClicked = !parsonsCancelClicked;
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

                        {/* parsons main div */}
                        {(waiting || counter < 5) && (
                            <div className="gptLoader">
                                <GPTLoader />
                            </div>
                        )}
                        {!waiting && counter >= 5 && (
                            <ParsonsGame
                                tasksOri={shuffleArray(
                                    toTask(generatedQuestion, generatedCode)
                                )}
                                sectionHeight={sectionHeightRef.current}
                                taskID={taskID}
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

export default ParsonsGenerateCode;
