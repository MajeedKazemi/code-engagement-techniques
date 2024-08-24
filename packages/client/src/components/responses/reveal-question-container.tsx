import { useContext, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import {
    HighlightedPart,
    HighlightedPartWithoutTab,
} from "../docs/highlight-code";
import {
    apiGetBaselineLineByLineExplanationSimulation,
    apiGetFeedbackFromRevealShortAnswer,
    apiLogEvents,
    logError,
} from "../../api/api";
import { AuthContext } from "../../context";
import { highlightPsudo } from "../../utils/utils";
import React from "react";
import { ChatLoader } from "../loader";
import IconsDoc from "../docs/icons-doc";

interface QuestionInterface {
    revealLines: string;
    questions: SubQuestions[];
}

interface SubQuestions {
    context: string;
    question: string;
    solution: string;
}

function RevealQuestionComponent({
    data,
    taskID,
    prompt,
    code,
}: {
    data: QuestionInterface[];
    taskID: string;
    prompt: string;
    code: string;
}) {
    const { context, setContext } = useContext(AuthContext);
    const [currentSubgoalIndex, setcurrentSubgoalIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState<boolean[]>([]);
    const [reachedMax, setReachedMax] = useState<boolean[]>([]);
    const [questionAnsweredTimes, setQuestionAnsweredTimes] = useState<any[]>(
        []
    );
    const [hoveringHovered, setHoveringHovered] = useState<boolean[]>([]);
    const [explaination, setExplanation] = useState<string[]>([]);
    const [questions, setQuestions] = useState<SubQuestions[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userResponse, setUserResponse] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<string[]>([]);

    const [totalAttempts, setTotalAttempts] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalIncorrect, setTotalIncorrect] = useState(0);
    const [questionFirstDisplayed, setQuestionFirstDisplayed] = useState(
        Date.now()
    );

    const [hintForShort, setHintForShort] = useState<string[]>([]);
    const [feedbackReady, setFeedbackReady] = useState<boolean[]>(
        new Array(data.map((subgoal) => subgoal.questions).flat().length).fill(
            false
        )
    );

    const getTotalQuestionsBeforeThisSubgoal = (index: number) => {
        const num = data
            .slice(0, index + 1)
            .reduce(
                (sum, currentSubgoal) => sum + currentSubgoal.questions.length,
                0
            );
        // console.log("Total questions before this subgoal", num);
        return num;
    };

    const getCurrentSubgoalByQuestionIndex = (index: number) => {
        // console.log("Current question index", index);
        for (let i = 0; i < data.length; i++) {
            if (getTotalQuestionsBeforeThisSubgoal(i) > index) {
                // console.log("Current subgoal index", i);
                return i;
            }
        }
        return 0;
    };

    useEffect(() => {
        //check if we should update currentSubgoalIndex
        // find the corresponding subgoal index
        // add the numbers of questions up until the currentsubgoal
        // console.log("Current question index", currentQuestionIndex);
        if (
            getTotalQuestionsBeforeThisSubgoal(currentSubgoalIndex) ==
                currentQuestionIndex &&
            currentQuestionIndex != 0
        ) {
            console.log(
                "Updating currentSubgoalIndex",
                currentSubgoalIndex,
                currentQuestionIndex
            );
            setcurrentSubgoalIndex(
                (currentSubgoalIndex) => currentSubgoalIndex + 1
            );
        }
        if (currentQuestionIndex >= questions.length) {
            apiLogEvents(
                context?.token,
                taskID,
                "lead reveal total mini question summary",
                {
                    type: "lead reveal end summary event",
                    taskID: taskID,
                    total_attempts: totalAttempts,
                    total_correct: totalCorrect,
                    total_incorrect: totalIncorrect,
                }
            )
                .then(() => {})
                .catch((error) => {
                    logError("sendLog: " + error.toString());
                });
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        const questions = data.map((subgoal) => subgoal.questions).flat();

        console.log("Questions: ", questions);

        setRevealAnswer(new Array(questions.length).fill(false));
        setReachedMax(new Array(questions.length).fill(false));
        setQuestionAnsweredTimes(
            new Array(questions.length).fill({
                currentTime: 0,
                currentAnswer: "",
            })
        );
        setUserResponse(new Array(questions.length).fill(""));
        setFeedback(new Array(questions.length).fill(""));

        setHoveringHovered(new Array(code.split("\n").length).fill(false));
        setHintForShort(new Array(questions.length).fill(""));

        setQuestions(questions);

        // retrive the line by line explanation from the apiGetBaselineLineByLineExplanationSimulation
        apiGetBaselineLineByLineExplanationSimulation(context?.token, taskID)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();

                    setExplanation(data.explanation);
                }
            })
            .catch((error) => {
                logError(error.toString());
            });
    }, []);

    useEffect(() => {
        if (
            questions.length > 0 &&
            questionAnsweredTimes.length > 0 &&
            revealAnswer.length > 0
        ) {
            const newReachedMax = reachedMax.map((reached, i) =>
                i === currentQuestionIndex
                    ? revealAnswer[i]
                    : reached
            );
            setReachedMax(newReachedMax);
        }
    }, [questionAnsweredTimes, revealAnswer]);

    function deepCopy(arr: any[]): any[] {
        return arr.map((item) => (Array.isArray(item) ? deepCopy(item) : item));
    }

    useEffect(() => {
        if (questionAnsweredTimes && questionAnsweredTimes[currentQuestionIndex] && (reachedMax[currentQuestionIndex] == true || questionAnsweredTimes[currentQuestionIndex].currentTime == 3)) {
            // console.log("Updating current question index", currentQuestionIndex);
            setCurrentQuestionIndex(
                (currentQuestionIndex) => currentQuestionIndex + 1
            );

            //reset timer for the miniquestion
            apiLogEvents(
                context?.token,
                taskID,
                "lead reveal mini question time event",
                {
                    type: "lead reveal mini question time event",
                    question: questions[currentQuestionIndex].question,
                    questionNum: currentQuestionIndex,
                    time: Date.now() - questionFirstDisplayed,
                }
            ).then(() => {
                setQuestionFirstDisplayed(Date.now());
            });
        }
    }, [reachedMax, questionAnsweredTimes]);

    function handleClick(index: number): void {
        const newFeedback = [...feedback];
        newFeedback[index] = "";
        setFeedback(newFeedback);
        setButtonDisabled(true);
        setFeedbackReady(
            feedbackReady.map((ready, i) => (i === index ? false : ready))
        );
        setTotalAttempts((prevTotalAttempts) => prevTotalAttempts + 1);

        const newQuestionAnsweredTimes = questionAnsweredTimes.map(
            (question, i) =>
                i === index
                    ? {
                          currentTime: question.currentTime + 1,
                          currentAnswer: userResponse[index],
                      }
                    : question
        );
        setQuestionAnsweredTimes(newQuestionAnsweredTimes);
        //if LLM check is at least 4/5.
        // console.log(userResponse[index], questions[index].answer);
        try {
            apiGetFeedbackFromRevealShortAnswer(
                context?.token,
                code,
                data[currentSubgoalIndex].revealLines,
                userResponse[index],
                questions[index].solution,
                questions[index].question
            )
                .then(async (response) => {
                    if (response.ok) {
                        setButtonDisabled(false);
                        const data = await response.json();

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
                                question_text: questions[index].question,
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
                        if (
                            parseInt(data.response.correctness) &&
                            parseInt(data.response.correctness) > 2
                        ) {
                            setTotalCorrect(
                                (prevTotalCorrect) => prevTotalCorrect + 1
                            );
                            setButtonDisabled(false);
                            const newRevealAnswer = revealAnswer.map(
                                (reveal, i) => (i === index ? true : reveal)
                            );
                            setRevealAnswer(newRevealAnswer);
                        } else {
                            setTotalIncorrect(
                                (prevTotalIncorrect) => prevTotalIncorrect + 1
                            );
                            setButtonDisabled(false);

                            setHintForShort(
                                hintForShort.map((hint, i) =>
                                    i === index ? data.response.feedback : hint
                                )
                            );
                            setFeedbackReady(
                                feedbackReady.map((ready, i) =>
                                    i === index ? true : ready
                                )
                            );

                            //update the user response
                            const newUserResponse = [...userResponse];
                            newUserResponse[index] = "";
                            setUserResponse(newUserResponse);
                        }
                    }
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

    const handleUserInput = (
        index: number,
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = event.target.value;

        setUserResponse((prevState) => {
            const newUserResponse = [...prevState];
            newUserResponse[index] = value;
            return newUserResponse;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            const target = event.target as HTMLTextAreaElement;
            target.value += "\n";
            target.style.height = `${target.scrollHeight}px`;
        }
    };

    return (
        <div className="reveal-parent-container">
            <div className="reveal-container">
                {questions.length > 0 &&
                    currentQuestionIndex >= questions.length && (
                        <span id="game-over" style={{ opacity: 0 }}>
                            Game Over
                        </span>
                    )}
                <p>
                    <b>Your Prompt:</b> {prompt}
                </p>
                <div className="ai-initial-message">
                    <b> 🤖 AI:</b> Let's solve this task step by step. I'll give
                    a brief description of each step and ask you a question.
                    Focus on what needs to be done, and I'll guide you to the
                    right answer.
                </div>
                {questions.length > 0 &&
                    questions.map(
                        (question: SubQuestions, index) =>
                            index <= currentQuestionIndex && (
                                <div
                                    className="reveal-subgoal-container"
                                    key={index}
                                >
                                    <div
                                        className={`reveal-question-container ${
                                            index <= currentQuestionIndex
                                                ? "active"
                                                : ""
                                        } ${
                                            index < currentQuestionIndex
                                                ? "answered"
                                                : ""
                                        }`}
                                        key={`rq${index}`}
                                    >
                                        <div className="reveal-question-content-container">
                                            <div className="reveal-question-content">
                                                <b>🤖 AI: </b>
                                                {question.context}
                                            </div>

                                            <div className="reveal-question-content">
                                                <b>Question: </b>
                                                {question.question}
                                            </div>
                                            {(!reachedMax[index] && (questionAnsweredTimes[index].currentTime != 3)) && (
                                                <div className="reveal-short-answer-container">
                                                    <textarea
                                                        className="reveal-lead-textbox baseline-input"
                                                        id={`userInput${index}`}
                                                        // ref={textareaRefs.current[index]}
                                                        value={
                                                            userResponse[index]
                                                        }
                                                        onChange={(e) =>
                                                            handleUserInput(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        onKeyDown={
                                                            handleKeyDown
                                                        }
                                                        rows={2}
                                                        data-gramm="false"
                                                        data-gramm_editor="false"
                                                        autoComplete="off"
                                                        spellCheck="false"
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
                                            )}
                                        </div>
                                        {(!reachedMax[index] && (questionAnsweredTimes[index].currentTime != 3)) && (
                                            <div>
                                                {questionAnsweredTimes[index]
                                                    .currentTime != 0 && (
                                                    <>
                                                        {((questionAnsweredTimes[
                                                            index
                                                        ].currentTime == 1 &&
                                                            feedbackReady[
                                                                index
                                                            ]) ||
                                                            questionAnsweredTimes[
                                                                index
                                                            ].currentTime !=
                                                                1) && (
                                                            <div className="reveal-hint-mcq-incorrect">
                                                                <b>
                                                                    Your
                                                                    Response:{" "}
                                                                </b>
                                                                {
                                                                    questionAnsweredTimes[
                                                                        index
                                                                    ]
                                                                        .currentAnswer
                                                                }
                                                            </div>
                                                        )}
                                                        {feedbackReady[
                                                            index
                                                        ] ? (
                                                            <div className="reveal-hint-mcq-explanation">
                                                                <b>
                                                                    Explanation:{" "}
                                                                </b>{" "}
                                                                {
                                                                    hintForShort[
                                                                        index
                                                                    ]
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div className="step-answered-container">
                                                                Checking
                                                                Solution
                                                                <ChatLoader />
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        {(questionAnsweredTimes[index].currentTime == 3) && (
                                            <>
                                                <div className="reveal-hint-mcq-incorrect">
                                                    <b>
                                                        Your
                                                        Response:{" "}
                                                    </b>
                                                    {
                                                        questionAnsweredTimes[
                                                            index
                                                        ]
                                                            .currentAnswer
                                                    }
                                                </div>

                                                <div className="explanation-after-reveal">
                                                    <strong>
                                                        Explanation:{" "}
                                                    </strong>{" "}
                                                    {question.solution}
                                                </div>

                                                {getCurrentSubgoalByQuestionIndex(
                                                    index
                                                ) ==
                                                    currentSubgoalIndex - 1 &&
                                                    data[0] && (
                                                        <div>
                                                            {data[
                                                                getCurrentSubgoalByQuestionIndex(
                                                                    index
                                                                )
                                                            ].revealLines
                                                                .split("\n")
                                                                .map(
                                                                    (
                                                                        line,
                                                                        i
                                                                    ) => (
                                                                        <HighlightedPart
                                                                            part={
                                                                                line
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                        </div>
                                                    )}
                                            </>
                                        )}
                                        {reachedMax[index] && (
                                            <>
                                                <div className="correct-answer-after-reveal">
                                                    <strong>
                                                        Your answer:{" "}
                                                    </strong>
                                                    {
                                                        questionAnsweredTimes[
                                                            index
                                                        ].currentAnswer
                                                    }
                                                </div>

                                                <div className="explanation-after-reveal">
                                                    <strong>
                                                        Explanation:{" "}
                                                    </strong>{" "}
                                                    {question.solution}
                                                </div>

                                                {getCurrentSubgoalByQuestionIndex(
                                                    index
                                                ) ==
                                                    currentSubgoalIndex - 1 &&
                                                    data[0] && (
                                                        <div>
                                                            {data[
                                                                getCurrentSubgoalByQuestionIndex(
                                                                    index
                                                                )
                                                            ].revealLines
                                                                .split("\n")
                                                                .map(
                                                                    (
                                                                        line,
                                                                        i
                                                                    ) => (
                                                                        <HighlightedPart
                                                                            part={
                                                                                line
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                        </div>
                                                    )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                    )}
            </div>
            <div className="right-side-code-container">
                {questions.length > 0 && (
                    <div className="reveal-code-line-by-line-container">
                        <div className="reveal-code-title">
                            <span className="button-span">Code:</span>
                        </div>
                        <div className={"reveal-code-container active"}>
                            <div
                                className="reveal-hover-line-with-explanation"
                                onMouseEnter={() => {
                                    //deepCopy of hoveringHovered
                                    let temp = deepCopy(hoveringHovered);
                                    //change all to false
                                    temp.fill(false);
                                    //change the current index to true
                                    temp[0] = true;
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
                                <HighlightedPartWithoutTab
                                    part={code.split("\n")[0]}
                                />

                                {questions &&
                                    hoveringHovered[0] &&
                                    explaination && (
                                        <div className="flex-box-for-line-by-line">
                                            <div
                                                className="hoverable-code-container-with-hint"
                                                style={{ position: "absolute" }}
                                            >
                                                <div
                                                    className="hoverable-code-line-explanation"
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlightPsudo(
                                                            explaination[0]
                                                        ),
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        {data.map((subgoals, subgoalIndex) => {
                            let cumulativeIndex = data
                                .slice(0, subgoalIndex)
                                .reduce(
                                    (sum, currentSubgoal) =>
                                        sum +
                                        currentSubgoal.revealLines.split("\n")
                                            .length,
                                    0
                                );
                            cumulativeIndex = cumulativeIndex + 1; //since first line
                            return (
                                <div
                                    key={subgoalIndex}
                                    className="subgoal-title-display"
                                >
                                    <div
                                        className={`reveal-code-container ${
                                            subgoalIndex < currentSubgoalIndex
                                                ? "active"
                                                : "inactive"
                                        } `}
                                        id={`code-container${subgoalIndex}`}
                                    >
                                        {subgoals.revealLines
                                            .split("\n")
                                            .map((line, index) => (
                                                <div
                                                    className="reveal-hover-line-with-explanation"
                                                    id={`code-container${subgoalIndex}`}
                                                    onMouseEnter={() => {
                                                        //deepCopy of hoveringHovered
                                                        let temp =
                                                            deepCopy(
                                                                hoveringHovered
                                                            );
                                                        //change all to false
                                                        temp.fill(false);
                                                        //change the current index to true
                                                        temp[
                                                            cumulativeIndex +
                                                                index
                                                        ] = true;
                                                        setHoveringHovered(
                                                            temp
                                                        );
                                                    }}
                                                    onMouseLeave={() => {
                                                        //deepCopy of hoveringHovered
                                                        let temp =
                                                            deepCopy(
                                                                hoveringHovered
                                                            );
                                                        //change all to false
                                                        temp.fill(false);
                                                        setHoveringHovered(
                                                            temp
                                                        );
                                                    }}
                                                >
                                                    <HighlightedPartWithoutTab
                                                        part={line}
                                                    />

                                                    {questions &&
                                                        hoveringHovered[
                                                            cumulativeIndex +
                                                                index
                                                        ] &&
                                                        explaination && (
                                                            <div className="flex-box-for-line-by-line">
                                                                <div
                                                                    className="hoverable-code-container-with-hint"
                                                                    style={
                                                                        cumulativeIndex +
                                                                            index ===
                                                                        code.length -
                                                                            1
                                                                            ? {
                                                                                  position:
                                                                                      "relative",
                                                                              }
                                                                            : {
                                                                                  position:
                                                                                      "absolute",
                                                                              }
                                                                    }
                                                                >
                                                                    <div
                                                                        className="hoverable-code-line-explanation"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: highlightPsudo(
                                                                                explaination[
                                                                                    cumulativeIndex +
                                                                                        index
                                                                                ]
                                                                            ),
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            );
                        })}
                        <div className="bottom-margin"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RevealQuestionComponent;
