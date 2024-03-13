import { useContext, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import {
    HighlightedPart,
    HighlightedPartWithoutTab,
} from "../docs/highlight-code";
import { apiLogEvents, logError } from "../../api/api";
import { AuthContext } from "../../context";

interface QuestionObject {
    correct: boolean;
    text: string;
}

interface QuestionInterface {
    title: string;
    question: string;
    choices: QuestionObject[];
    revealLine: string;
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
    const [revealAnswer, setRevealAnswer] = useState(
        new Array(data.length).fill(false)
    );
    const [firstAnswered, setFirstAnswered] = useState(
        new Array(data.length).fill(false)
    );
    const [selectedChoice, setSelectedChoice] = useState(
        new Array(data.length).fill("")
    );
    const [correctAnswer, setCorrectAnswer] = useState(
        new Array(data.length).fill("")
    );
    const editorInstances = useRef<
        (monaco.editor.IStandaloneCodeEditor | null)[]
    >([]);
    const [isWaitingForNextAttempt, setIsWaitingForNextAttempt] =
        useState(false);
    const [lastAnswered, setLastAnswered] = useState(
        new Array(data.length).fill(false)
    );
    const [reachedMax, setReachedMax] = useState(
        new Array(data.length).fill(false)
    );
    const [questionAnsweredTimes, setQuestionAnsweredTimes] = useState(
        new Array(data.length).fill({ currentTime: 0, currentAnswer: "" })
    );
    const [count, setCount] = useState(5);

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
        const newReachedMax = reachedMax.map((reached, i) =>
            i === currentQuestionIndex
                ? questionAnsweredTimes[i].currentTime == 3 || revealAnswer[i]
                : reached
        );
        setReachedMax(newReachedMax);
    }, [questionAnsweredTimes, revealAnswer]);

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

        apiLogEvents(
            context?.token,
            taskID,
            "lead reveal answer question event",
            {
                type: "lead reveal answer question event",
                question_order: index,
                code_corresponding_to_question: data[index].revealLine,
                question_text: data[index].question,
                all_choices: data[index].choices!.map((choice) => choice.text),
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
        const correctChoice = data[index].choices!.find(
            (choice) => choice.correct
        );

        if (correctChoice) {
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
        }

        setIsWaitingForNextAttempt(true);
        setCount(5);
    };

    useEffect(() => {
        if (reachedMax[currentQuestionIndex]) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsWaitingForNextAttempt(false);
        }
    }, [reachedMax]);

    return (
        <div className="reveal-parent-container">
            <div className="reveal-container">
                {currentQuestionIndex >= data.length && (
                    <span id="game-over" style={{ opacity: 0 }}>
                        Game Over
                    </span>
                )}
                {data.map((question, index) => (
                    <div className="reveal-subgoal-container">
                        <div
                            className={`reveal-question-container ${
                                index <= currentQuestionIndex ? "active" : ""
                            } ${
                                index < currentQuestionIndex ? "answered" : ""
                            }`}
                            key={`rq${index}`}
                        >
                            <h1>{question.title}</h1>
                            <div className="reveal-question-content-container">
                                <b>Question: </b>
                                <p className="reveal-question-content">
                                    {question.question}
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
                                                        {!choice.correct &&
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
                                        {data[index].revealLine
                                            .split("\n")
                                            .map((line, i) => (
                                                <HighlightedPart part={line} />
                                            ))}
                                    </>
                                )}
                            </>
                        </div>
                    </div>
                ))}
            </div>
            <div className="reveal-code-line-by-line-container">
                {data.map((question, index) => (
                    <div
                        className={`reveal-code-container ${
                            index < currentQuestionIndex ? "active" : ""
                        } `}
                    >
                        {data[index].revealLine.split("\n").map((line, i) => (
                            <HighlightedPartWithoutTab part={line} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RevealQuestionComponent;
