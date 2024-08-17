import { useContext, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import {
    HighlightedPart,
    HighlightedPartWithoutTab,
} from "../docs/highlight-code";
import { apiGetBaselineLineByLineExplanationSimulation, apiGetFeedbackFromRevealShortAnswer, apiLogEvents, logError } from "../../api/api";
import { AuthContext } from "../../context";
import { highlightPsudo } from "../../utils/utils";
import React from "react";
import { ChatLoader } from "../loader";

interface QuestionObject {
    correct: boolean;
    text: string;
}

interface QuestionInterface {
    title: string;
    indent: number;
    questions: SubQuestions[];
}

interface SubQuestions {
    context: string;
    selectedQuestion: string;
    shortQuestion: string;
    mcqQuestion: string;
    hintForMCQ: string;
    explanation: string;
    choices: QuestionObject[];
    revealLine: string;
    explanationSolution: string;
}


function RevealQuestionComponent({
    data,
    taskID,
}: {
    data: QuestionInterface[];
    taskID: string;
}) {
    const { context, setContext } = useContext(AuthContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState<boolean[]>([]);
    const [firstAnswered, setFirstAnswered] = useState<boolean[]>([]);
    const [selectedChoice, setSelectedChoice] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);
    const [isWaitingForNextAttempt, setIsWaitingForNextAttempt] =
        useState(false);
    const [lastAnswered, setLastAnswered] = useState<any[]>([]);
    const [reachedMax, setReachedMax] = useState<boolean[]>([]);
    const [questionAnsweredTimes, setQuestionAnsweredTimes] = useState<any[]>([]);
    const [count, setCount] = useState(5);
    const [hoveringHovered, setHoveringHovered] = useState<boolean[]>([]);
    const [explaination, setExplanation] = useState<string[]>([]);
    const [questions, setQuestions] = useState<SubQuestions[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userResponse, setUserResponse] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string[]>([]);
    const textareaRefs = useRef(data.map((subgoal) => subgoal.questions).flat().map(() => React.createRef<HTMLTextAreaElement>()));
    const [hintForShort, setHintForShort] = useState<string[]>([]);
    const [feedbackReady, setFeedbackReady] = useState<boolean[]>(new Array(data.map((subgoal) => subgoal.questions).flat().length).fill(false));

    useEffect(() => {
        let counter: any = null;

        if (isWaitingForNextAttempt) {
            counter = setInterval(() => {
                setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
            }, 1000);
        }

        return () => {
            clearInterval(counter!);
        };
    }, [isWaitingForNextAttempt]);

    useEffect(() => {
        if (textareaRefs.current[currentQuestionIndex].current) {
            textareaRefs.current[currentQuestionIndex].current.focus();
        }
    }, [userResponse, currentQuestionIndex]);

    useEffect(() => {
        const questions = data.map((subgoal) => subgoal.questions).flat();
        
        console.log("Questions: ", questions);
        
        setRevealAnswer(new Array(questions.length).fill(false));
        setFirstAnswered(new Array(questions.length).fill(false));
        setSelectedChoice(new Array(questions.length).fill(""));
        setCorrectAnswer(new Array(questions.length).fill(""));
        setLastAnswered(new Array(questions.length).fill(false));
        setReachedMax(new Array(questions.length).fill(false));
        setQuestionAnsweredTimes(
            new Array(questions.length).fill({ currentTime: 0, currentAnswer: "" })
        );
        setUserResponse(new Array(questions.length).fill(""));
        setFeedback(new Array(questions.length).fill(""));

        setHoveringHovered(new Array(questions.length).fill(false));
        setHintForShort(new Array(questions.length).fill(""));

        setQuestions(questions);

        // retrive the line by line explanation from the apiGetBaselineLineByLineExplanationSimulation
        apiGetBaselineLineByLineExplanationSimulation(
            context?.token,
            taskID,
        )
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();

                    setExplanation(
                        data.explanation
                    );
                }
            })
            .catch((error) => {
                logError(error.toString());
            });
    }, []);

    useEffect(() => {
        if (count === 0) {
            setIsWaitingForNextAttempt(false);
        }
    }, [count]);

    useEffect(() => {
        let timer: number | undefined;
        if (isWaitingForNextAttempt) {
            timer = setTimeout(() => {
                setIsWaitingForNextAttempt(false);
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isWaitingForNextAttempt]);

    // useEffect(() => {
    //   data.forEach((question, index) => {

    //     const divId = `code-container${index}`;
    //     const container = document.getElementById(divId);
    //     // set container height:
    //     container!.style.height = 30 * question.revealLine.split('\n').length + 'px';

    //     if (container) {

    //       const editor = monaco.editor.create(container, {
    //         value: question.revealLine,
    //         language: 'python',
    //         readOnly: true,
    //         automaticLayout: true,
    //         lineNumbers: 'off',
    //         minimap: {
    //           enabled: false
    //         },
    //         fontSize:18
    //       });

    //       editorInstances.current.push(editor);
    //     }
    //   });

    //   // Clean-up function to dispose old editor instances
    //   return () => {
    //     editorInstances.current.forEach(editor => editor?.dispose());
    //     editorInstances.current = [];
    //   }
    // }, [data]);

    useEffect(() => {
        if (questions.length > 0 && questionAnsweredTimes.length > 0 && revealAnswer.length > 0) {
            const newReachedMax = reachedMax.map((reached, i) =>
                i === currentQuestionIndex
                    ? questionAnsweredTimes[i].currentTime == 4 || revealAnswer[i]
                    : reached
            );
            setReachedMax(newReachedMax);
        }
    }, [questionAnsweredTimes, revealAnswer]);

    function deepCopy(arr: any[]): any[] {
        return arr.map((item) => (Array.isArray(item) ? deepCopy(item) : item));
    }

    const handleSelect = (isCorrect: boolean, index: number, text: string) => {
        if (isWaitingForNextAttempt) return;

        // Lead and Reveal:
        // - high priority:
        // - answer question event:
        //     - question_order: {number} // which question is this? the 1st, 2nd, 3rd, ...?
        //     - code_corresponding_to_question: {string}
        //     - question text: {string}
        //     - all choices: {array string}
        //     - selected choice: {string}
        //     - is_correct: {boolean}
        //     - attempt_number: {number} // how many times the user attempted to answer this question?

        const currentQuestion = questions[index];
        apiLogEvents(
            context?.token,
            taskID,
            "lead reveal mcq question event",
            {
                type: "lead reveal answer question event",
                question_order: index,
                question_tyoe: "mcq",
                code_corresponding_to_question: currentQuestion.revealLine,
                mcq_question_text: currentQuestion.mcqQuestion,
                all_choices: currentQuestion.choices.map((choice) => choice.text),
                selected_choice: text,
                is_correct: isCorrect,
                attempt_number: questionAnsweredTimes[index].currentTime + 1,
            }
        )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
            });

        setSelectedChoice(
            selectedChoice.map((an, i) => (i === index ? text : an))
        );
        const correctChoice = currentQuestion.choices.find(
            (choice) => choice.correct
        );

        if (correctChoice) {
            console.log("Correct Choice: ", correctChoice.text);
            setCorrectAnswer(
                correctAnswer.map((an, i) =>
                    i === index ? correctChoice.text : an
                )
            );
        }

        if (isCorrect) {
            const newRevealAnswer = revealAnswer.map((reveal, i) =>
                i === index ? true : reveal
            );

            setRevealAnswer(newRevealAnswer);
            // console.log("New Reveal Answer: ", newRevealAnswer);
        } else {
            const newQuestionAnsweredTimes = questionAnsweredTimes.map(
                (question, i) =>
                    i === index
                        ? {
                              currentTime: question.currentTime + 1,
                              currentAnswer: text,
                          }
                        : question
            );
            console.log(
                "New Question Answered Times: ",
                newQuestionAnsweredTimes
            );

            setQuestionAnsweredTimes(newQuestionAnsweredTimes);
            setIsWaitingForNextAttempt(true);
            setCount(5);
        }

    };

    useEffect(() => {
        if (reachedMax[currentQuestionIndex] == true) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsWaitingForNextAttempt(false);
        }
    }, [reachedMax]);


    function handleClick(index: number): void {
        const newFeedback = [...feedback];
        newFeedback[index] = "";
        setFeedback(newFeedback);
        setButtonDisabled(true);
        setFeedbackReady(feedbackReady.map((ready, i) => i === index ? false : ready));
        //if LLM check is at least 4/5.
        // console.log(userResponse[index], questions[index].answer);
        try {
            apiGetFeedbackFromRevealShortAnswer(
                context?.token,
                questions[index].revealLine,
                userResponse[index],
                questions[index].explanationSolution,
                questions[index].shortQuestion,
            )
                .then(async (response) => {
                    if (response.ok) {
                        setButtonDisabled(false);
                        const data = await response.json();
                        console.log(data.response);

                        // - answer short-answer question event:
                        // - question_text {string}
                        // - prev_student_answer: {string} // if this is a retry and they have tried before
                        // - prev_provided_feedback: {string} // if this is a retry and they have tried before
                        // - new_student_answer: {string}
                        // - attempt_number: {number}

                        apiLogEvents(
                            context?.token,
                            taskID,
                            "lead reveal short-answer question event",
                            {
                                type: "self explain answer short-answer question event",
                                question_order: index,
                                question_text: questions[index].shortQuestion,
                                prev_student_answer:
                                    userResponse && userResponse[index - 1]
                                        ? userResponse[index - 1]
                                        : "",
                                prev_provided_feedback:
                                    feedback && feedback[index - 1]
                                        ? feedback[index - 1]
                                        : "",
                                new_student_answer: userResponse[index],
                                feedback:
                                    data.response.score >= 3
                                        ? ""
                                        : data.response.feedback,
                                score: data.response.score,
                                attempt_number:
                                    questionAnsweredTimes[index].currentTime +
                                    1,
                            }
                        );
                        if(data.response.correct == "yes") {
                            setButtonDisabled(false);
                            const newRevealAnswer = revealAnswer.map(
                                (reveal, i) => (i === index ? true : reveal)
                            );
                            const newQuestionAnsweredTimes =
                                questionAnsweredTimes.map((question, i) =>
                                    i === index
                                        ? {
                                              currentTime:
                                                  question.currentTime + 1,
                                              currentAnswer:
                                                  userResponse[index],
                                          }
                                        : question
                                );
                            setQuestionAnsweredTimes(newQuestionAnsweredTimes);
                            setRevealAnswer(newRevealAnswer);
                        }
                        else {
                            setButtonDisabled(false);
                            console.log("Feedback: ", data.response.feedback);
                            console.log(hintForShort.map((hint, i) => i === index ? data.response.feedback : hint));
                            setHintForShort(hintForShort.map((hint, i) => i === index ? data.response.feedback : hint));
                            setFeedbackReady(feedbackReady.map((ready, i) => i === index ? true : ready));

                            const newQuestionAnsweredTimes =
                                questionAnsweredTimes.map((question, i) =>
                                    i === index
                                        ? {
                                              currentTime:
                                                  question.currentTime + 1,
                                              currentAnswer:
                                                  userResponse[index],
                                          }
                                        : question
                                );
                            setQuestionAnsweredTimes(newQuestionAnsweredTimes);
                            //update the user response
                            const newUserResponse = [...userResponse];
                            newUserResponse[index] = "";
                            setUserResponse(newUserResponse);
                        }
                        

                    }
                    //     if (data.response.score >= 3) {
                    //         const newRevealAnswer = revealAnswer.map(
                    //             (reveal, i) => (i === index ? true : reveal)
                    //         );
                    //         setRevealAnswer(newRevealAnswer);
                    //     } else {
                    //         const newFeedback = [...feedback];
                    //         newFeedback[index] = data.response.feedback;
                    //         setFeedback(newFeedback);
                    //         const newQuestionAnsweredTimes =
                    //             questionAnsweredTimes.map((question, i) =>
                    //                 i === index
                    //                     ? {
                    //                           currentTime:
                    //                               question.currentTime + 1,
                    //                           currentAnswer:
                    //                               userResponse[index],
                    //                       }
                    //                     : question
                    //             );
                    //         setQuestionAnsweredTimes(newQuestionAnsweredTimes);
                    //         //update the user response
                    //         const newUserResponse = [...userResponse];
                    //         newUserResponse[index] = "";
                    //         setUserResponse(newUserResponse);
                    //     }
                    // }
                })
                .catch((error) => {
                    setButtonDisabled(false);
                    logError(error.toString());
                });
        } catch (error: any) {
            setButtonDisabled(false);
            logError(error.toString());
        }
    }

    const handleUserInput = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        const cursorPosition = event.target.selectionStart; // Get the cursor position

        setUserResponse((prevState) => {
            const newUserResponse = [...prevState];
            newUserResponse[index] = value;
            return newUserResponse;
        });

        // Wait until the state is updated and then set the cursor position
        setTimeout(() => {
            const textarea = textareaRefs.current[index].current;
            if (textarea) {
                textarea.selectionStart = cursorPosition;
                textarea.selectionEnd = cursorPosition;
            }
        }, 0);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            const target = event.target as HTMLTextAreaElement;
            target.value += "\n";
            target.style.height = `${target.scrollHeight}px`;
        }
    };

    interface LineRevealProps {
        question: SubQuestions;
        index: number;
    }
    const SingleMCQ = ({ question, index }: LineRevealProps) => {
        return (
            <div
                className={`reveal-question-container ${
                    index <= currentQuestionIndex ? "active" : ""
                } ${
                    index < currentQuestionIndex ? "answered" : ""
                }`}
                key={`rq${index}`}
            >
                <h1>{question.context}</h1>
                <div className="reveal-question-content-container">
                    <b>Question: </b>
                    <p className="reveal-question-content">
                        {question.mcqQuestion}
                    </p>
                </div>
                <>
                    {!reachedMax[index] && (
                        <>
                            <div className={`reveal-select-all`}>
                                {isWaitingForNextAttempt && (
                                    <div className="reveal-waiting-for-next-attempt">
                                        <p>
                                            You may retry in {count}{" "}
                                            seconds
                                        </p>
                                    </div>
                                )}
                                {question.choices!.map(
                                    (choice, i) => (
                                        <div
                                            className={
                                                isWaitingForNextAttempt
                                                    ? "reveal-select-container disabled"
                                                    : "reveal-select-container"
                                            }
                                            key={`${index}details${i}`}
                                            onClick={() =>
                                                handleSelect(
                                                    choice.correct,
                                                    index,
                                                    choice.text
                                                )
                                            }
                                        >
                                            <div className="reveal-select-dot"></div>
                                            {!choice.correct && questionAnsweredTimes[index] &&
                                            questionAnsweredTimes[
                                                index
                                            ].currentAnswer ==
                                                choice.text ? (
                                                <div className="reveal-wrong-answer">
                                                    <p>
                                                        {
                                                            choice.text
                                                        }
                                                    </p>
                                                </div>
                                            ) : (
                                                <p>{choice.text}</p>
                                            )}
                                            <p className="reveal-answer">
                                                {choice.correct
                                                    ? "Correct"
                                                    : "Incorrect"}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                            {questionAnsweredTimes[index].currentTime > 0 &&
                            (<div className="reveal-hint-mcq-incorrect">
                                <strong>Incorrect: </strong> {question.hintForMCQ}
                            </div>)
                            }   
                        </>
                    )}
                    {reachedMax[index] && (
                        <>
                            <div className={`reveal-select-all`}>
                                {question.choices!.map(
                                    (choice, i) => (
                                        <div
                                            className="reveal-select-container"
                                            key={`${index}details${i}`}
                                            onClick={() =>
                                                handleSelect(
                                                    choice.correct,
                                                    index,
                                                    choice.text
                                                )
                                            }
                                        >
                                            <div className="reveal-select-dot"></div>
                                            {choice.correct ? (
                                                <div className="reveal-correct-answer">
                                                    <p>
                                                        {
                                                            choice.text
                                                        }
                                                    </p>
                                                </div>
                                            ) : (
                                                <p>{choice.text}</p>
                                            )}
                                            <p className="reveal-answer">
                                                {choice.correct
                                                    ? "Correct"
                                                    : "Incorrect"}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                            {question.revealLine
                                .split("\n")
                                .map((line, i) => (
                                    <HighlightedPart part={line} />
                                ))}

                            <div className="explanation-after-reveal">
                                <strong>Explanation: </strong> {question.explanation}
                            </div>
                        </>
                    )}
                </>
            </div>
        )};

    const ShortQuestion = ({ question, index }: LineRevealProps) => {
        return (
            <div
                className={`reveal-question-container ${
                    index <= currentQuestionIndex ? "active" : ""
                } ${
                    index < currentQuestionIndex ? "answered" : ""
                }`}
                key={`rq${index}`}
            >
                {/* <h1>{question.context}</h1> */}
                {
                    question.shortQuestion && !reachedMax[index] && (
                        <div className="reveal-question-content-container">
                            <b>Short Question: </b>
                            <p className="reveal-question-content">
                                {question.shortQuestion}
                            </p>
                            <div className="reveal-short-answer-container">
                                <textarea
                                    className="reveal-lead-textbox baseline-input"
                                    id={`userInput${index}`}
                                    ref={textareaRefs.current[index]}
                                    value={userResponse[index]}
                                    onChange={(e) => handleUserInput(index, e)}
                                    onKeyDown={handleKeyDown}
                                    rows={2}
                                />
                                <button
                                    className="reveal-submit gpt-button"
                                    onClick={() =>
                                        handleClick(index)
                                    }
                                    disabled={
                                        !userResponse[
                                            index
                                        ].trim() ||
                                        buttonDisabled
                                    }
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )
                }
                {!reachedMax[index] && (
                    <div>
                        {questionAnsweredTimes[index].currentTime > 0 &&
                        (<>
                        {feedbackReady[index] ? (
                            <div className="reveal-hint-mcq-incorrect">
                                <strong>Explanation: </strong> {hintForShort[index]}
                            </div>
                        ) : (
                            <div className="step-answered-container">
                                
                                Checking Solution
                                <ChatLoader/>
                            </div>
                        )}
                        </>)
                        }
                    </div>

                )}
                {reachedMax[index] && (
                        <>
                            <div className="explanation-after-reveal">
                                    <strong>Your Response:{" "}</strong>
                                    {questionAnsweredTimes[index].currentAnswer}
                            </div>
                            {question.revealLine
                                .split("\n")
                                .map((line, i) => (
                                    <HighlightedPart part={line} />
                                ))}

                            <div className="explanation-after-reveal">
                                <strong>Explanation: </strong> {question.explanationSolution}
                            </div>
                        </>
                    )}
            </div>
        )};

    return (
        <div className="reveal-parent-container">
            <div className="reveal-container">
                {questions.length > 0 && currentQuestionIndex >= questions.length && (
                    <span id="game-over" style={{ opacity: 0 }}>
                        Game Over
                    </span>
                )}
                {questions.length > 0 && questions.map((question:SubQuestions, index) => (
                    <div className="reveal-subgoal-container">
                        {question.selectedQuestion === "mcq" ?
                            <SingleMCQ question={question} index={index} />
                            : <ShortQuestion question={question} index={index} />
                        }
                    </div>
                ))}
            </div>
            {questions.length > 0 && 
            (<div className="reveal-code-line-by-line-container">
                <h1 className="reveal-line-by-line-container-header">
                    Task Decomposition Plan + Revealed Code:
                </h1>
                {data.map((subgoals, subgoalIndex) => {
                    const cumulativeIndex = data
                    .slice(0, subgoalIndex)
                    .reduce((sum, currentSubgoal) => sum + currentSubgoal.questions.length, 0);

                    return(
                    
                    <div 
                        key={subgoalIndex} 
                        className="subgoal-title-display" 
                    >
                        <h1 style={{ marginLeft: `${subgoals.indent * 30}px` }} >{subgoals.title}</h1>

                        {subgoals.questions.map((question, index) => (
                            <div
                                className={`reveal-code-container ${
                                    cumulativeIndex < currentQuestionIndex ? "active" : "inactive"
                                } `}
                                id = {`code-container${cumulativeIndex + index}`}
                            >
                                {question.revealLine.split("\n").map((line) => (
                                    <div className="reveal-hover-line-with-explanation"
                                    onMouseEnter={() => {
                                        //deepCopy of hoveringHovered
                                        let temp = deepCopy(hoveringHovered);
                                        //change all to false
                                        temp.fill(false);
                                        //change the current index to true
                                        temp[cumulativeIndex+index] = true;
                                        setHoveringHovered(temp);
                                    }}
                                    onMouseLeave={() => {
                                        //deepCopy of hoveringHovered
                                        let temp = deepCopy(hoveringHovered);
                                        //change all to false
                                        temp.fill(false);
                                        setHoveringHovered(temp);
                                    }}
                                    >
                                        <HighlightedPartWithoutTab part={line} />

                                        {questions && hoveringHovered[cumulativeIndex+index] && explaination && (
                                        <div className="flex-box-for-line-by-line">
                                        <div className="hoverable-code-container-with-hint"
                                            style={(cumulativeIndex + index) === questions.length-1 ? { position: "relative" } : {position: "absolute"}}
                                        >
                                            <div
                                                className="hoverable-code-line-explanation"
                                                dangerouslySetInnerHTML={{
                                                    __html: highlightPsudo(explaination[cumulativeIndex+index]),
                                                }}
                                            ></div>
                                        </div>
                                        </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    )
                })}
                <div className="bottom-margin"></div>
            </div>)}
        </div>
    );
}

export default RevealQuestionComponent;
