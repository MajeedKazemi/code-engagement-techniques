import React, { useEffect, createContext, useState, useRef, useContext, createRef } from "react";
import { Editor } from "../editor";
import { FaQuestionCircle } from "react-icons/fa";
import * as monaco from "monaco-editor";
import { ChatLoader } from "../loader";
import { apiGetFeedbackByResponse, apiLogEvents, logError } from "../../api/api";
import { AuthContext } from "../../context";
import { HighlightedPart, HighlightedPartWithoutTab } from "../docs/highlight-code";

interface SelfExplainProps {
    code: string;
    questions: SelfExplainQuestion[];
    taskID: string;
}

interface FeedbackProps {
    score: number;
    feedback: string;
}

interface MultipleChoiceQuestion {
    correct: boolean;
    text: string;
  }
  
interface SelfExplainQuestion {
    type: string;
    question: string;
    answer?: string;
    choices?: MultipleChoiceQuestion[];
    lines: number[];
    questionCodeLines: string;
    questionCodeLinesExplained: string;
}


export const SelfExplain: React.FC<SelfExplainProps> = ({ code, questions, taskID }) => {
    const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const [answered, setAnswered] = useState(new Array(questions.length).fill(false));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const monacoEl = useRef(null);
    const [userResponse, setUserResponse] = useState(new Array(questions.length).fill(""));
    const [selectedChoice, setSelectedChoice] = useState(new Array(questions.length).fill(""));
    const [correctAnswer, setCorrectAnswer] = useState(new Array(questions.length).fill(""));
    const [revealAnswer, setRevealAnswer] = useState(new Array(questions.length).fill(false));
    const [questionAnsweredTimes, setQuestionAnsweredTimes] = useState(new Array(questions.length).fill({currentTime: 0, currentAnswer: ""}));
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [reachedMax, setReachedMax] = useState(new Array(questions.length).fill(false));
    const [feedback, setFeedback] = useState(new Array(questions.length).fill(""));

    const editorInstances = useRef<(monaco.editor.IStandaloneCodeEditor | null)[]>([]);
    
    // useEffect(() => {
    //    console.log(questions);
    //   questions.forEach((question, index) => {
        
    //     const divId = `code-container${index}`;
    //     const container = document.getElementById(divId);
    //     // set container height:
    //     container!.style.height = 30 * question.questionCodeLines.split('\n').length + 'px';
        
    //     if (container) {

    //       const editor = monaco.editor.create(container, {
    //         value: question.questionCodeLines,
    //         language: 'python',
    //         readOnly: true,
    //         automaticLayout: true,
    //         lineNumbers: 'off',
    //         minimap: {
    //           enabled: false
    //         },
    //         fontSize:16,
    //       });

    //       editorInstances.current.push(editor);
    //     }
    //   });

    //   // Clean-up function to dispose old editor instances
    //   return () => {
    //     editorInstances.current.forEach(editor => editor?.dispose());
    //     editorInstances.current = [];
    //   }
    // }, [questions]);


    function getContentBetweenLines(startLine:number, endLine:number) {
        const lines = code.split('\n');
        const extractedLines = [];
    
        for (let i = startLine - 1; i < endLine; i++) {
            extractedLines.push(lines[i]);
        }
    
        const extractedContent = extractedLines.join('\n');
        return extractedContent;
    }

    // const markResponse = (responseString: string, time: number) => {
    //     try {
    //         apiGetFeedbackByResponse(
    //             context?.token,
    //             code,
    //             selectedCode[currentQuestion],
    //             generatedQuestion[currentQuestion],
    //             responseString,
    //         )
    //             .then(async (response) => {

    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     if(time == 1){
    //                         const scoreCopy = [...score];
    //                         scoreCopy[currentQuestion] = data.score;
    //                         setScore(scoreCopy);
    //                         const feedbackCopy = [...feedback];
    //                         feedbackCopy[currentQuestion] = data.feedback;
    //                         setFeedback(feedbackCopy);
    //                     }else if(time == 2){
    //                         const scoreCopy = [...secondScore];
    //                         scoreCopy[currentQuestion] = data.score;
    //                         setSecondScore(scoreCopy);
    //                         const feedbackCopy = [...secondFeedback];
    //                         feedbackCopy[currentQuestion] = data.feedback;
    //                         setSecondFeedback(feedbackCopy);
    //                     }
                        
    //                     } 
    //             })
    //             .catch((error) => { 
    //                 logError(error.toString());
    //             });
    //         } catch (error: any) {
    //             logError(error.toString());
    //         }
    // };



    useEffect(() => {
        const editor = monaco.editor.create(
            monacoEl.current!,
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
            
                }
            },
          });
        // console.log(code);
        // the the current highlighted lines
        if(questions[currentQuestionIndex]){
            const numOfLines = questions[currentQuestionIndex].lines.length;
            let startLine = questions[currentQuestionIndex].lines[0];
            let endLine =questions[currentQuestionIndex].lines[numOfLines-1];
            console.log(startLine, endLine);

            editor.deltaDecorations([], [
                {
                    range: new monaco.Range(startLine, 1, endLine, 1),
                    options: { isWholeLine: true, className: 'questionLineDecoration' }
                }
            ]);
            editor.revealLineInCenterIfOutsideViewport(startLine+1, monaco.editor.ScrollType.Smooth);
        }
    

        editor.onDidPaste((e) => {
            console.log(e);
        });

        setEditor(editor);

        return () => editor?.dispose();
    }, [currentQuestionIndex]);


    const handleSelect = (isCorrect: boolean, index: number, text: string) => {
        if(isDisabled) return;
        
        const newAnswered = answered.map((an, i) => i === index ? true : an);
        setAnswered(newAnswered);
        setSelectedChoice(selectedChoice.map((an, i) => i === index ? text : an));
        const correctChoice = questions[index].choices!.find((choice) => choice.correct);
        if (correctChoice) {
            setCorrectAnswer(correctAnswer.map((an, i) => i === index ? correctChoice.text : an));
        }

        // - answer multiple-choice question event:
		// - question text: {string}
		// - all choices: {array string}
		// - selected choice: {string}
		// - is_correct: {boolean}
		// - attempt_number: {number}
        apiLogEvents(
            context?.token,
            taskID,
            "self explain answer multiple-choice question event",
            {   
                type:"self explain answer multiple-choice question event",
                question_order: index,
                all_choices: questions[index].choices!,
                question_text: questions[index].question,
                selected_choice: text,
                is_correct: isCorrect,
                attempt_number: questionAnsweredTimes[index].currentTime + 1
            }
          )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
        });

      
        if (isCorrect) {
            const newRevealAnswer = revealAnswer.map((reveal, i) => i === index ? true : reveal);
            setRevealAnswer(newRevealAnswer);
        } else {
            const newQuestionAnsweredTimes = questionAnsweredTimes.map((question, i) => i === index ? {currentTime: question.currentTime + 1, currentAnswer: text} : question);
            // console.log("New Question Answered Times: ", newQuestionAnsweredTimes);
            setQuestionAnsweredTimes(newQuestionAnsweredTimes);
        }

        setIsDisabled(true);

    };

    useEffect(() => {
        let timer: number | undefined;
        if (isDisabled) {
            timer = setTimeout(() => {
                setIsDisabled(false);
            }, 10000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isDisabled]);

    useEffect(() => {
        if (reachedMax[currentQuestionIndex]){
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }, [reachedMax]);


    function handleClick(index: number): void {
        const newFeedback = [...feedback];
        newFeedback[index] = "";
        setFeedback(newFeedback);
        setButtonDisabled(true);
        const newAnswered = answered.map((an, i) => i === index ? true : an);
        setAnswered(newAnswered);
        //if LLM check is at least 4/5.
        // console.log(userResponse[index], questions[index].answer);
        try {
            apiGetFeedbackByResponse(
                context?.token,
                code,
                questions[index].questionCodeLines,
                questions[index].question,
                questions[index].answer!,
                userResponse[index],
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
                            "self explain answer short-answer question event",
                            {   
                                type:"self explain answer short-answer question event",
                                question_order: index,
                                question_text: questions[index].question,
                                prev_student_answer: userResponse && userResponse[index-1] ? userResponse[index-1] : "",
                                prev_provided_feedback: feedback && feedback[index-1] ? feedback[index-1] : "",
                                new_student_answer: userResponse[index],
                                feedback: data.response.score >= 3 ? "" : data.response.feedback,
                                score: data.response.score,
                                attempt_number: questionAnsweredTimes[index].currentTime + 1
                            }
                        )

                        if (data.response.score >= 3) {
                            const newRevealAnswer = revealAnswer.map((reveal, i) => i === index ? true : reveal);
                            setRevealAnswer(newRevealAnswer);
                        } else {
                            const newFeedback = [...feedback];
                            newFeedback[index] = data.response.feedback;
                            setFeedback(newFeedback);
                            const newQuestionAnsweredTimes = questionAnsweredTimes.map((question, i) => i === index ? {currentTime: question.currentTime + 1, currentAnswer: userResponse[index]} : question);
                            setQuestionAnsweredTimes(newQuestionAnsweredTimes);
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

    function handleUserInput(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        const newUserResponse = [...userResponse];
        newUserResponse[currentQuestionIndex] = event.target.value;
        setUserResponse(newUserResponse);
    }


    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
          const target = event.target as HTMLTextAreaElement;
          target.value += '\n';
          target.style.height = `${target.scrollHeight}px`;
        }
    };

    //set reached max, reachMax = true if the user has answered the question 3 times (setQuestionAnsweredTimes[currentQuestion].currentTime == 3, or revealAnswer[currentQuestion] == true)
    useEffect(() => {
        const newReachedMax = reachedMax.map((reached, i) => i === currentQuestionIndex ? (questionAnsweredTimes[i].currentTime == 3 || revealAnswer[i]) : reached);
        setReachedMax(newReachedMax);
    }, [questionAnsweredTimes, revealAnswer]);

    return (
        <div className="self-explain-container">
            <div ref={monacoEl} className="monaco-editor-container" />
            <div className="question-container">
                {currentQuestionIndex >= questions.length && <span id="game-over" style={{opacity:0}}>Game Over</span>}
                {questions.map((question, index) => 
                    <div className={`self-explain-question-container ${index <= currentQuestionIndex ? 'active' : ''} ${index < currentQuestionIndex ? 'answered' : ''}`} key={`rq${index}`}>
                        <div className="self-explain-question-header">
                        <FaQuestionCircle /> {question.type}
                        </div>
                        <div className='self-explain-question-content-container'>
                            {question.type.split(' ')[0] === 'Short' ? 
                                //short answer
                                <div className="self-explain-question-content">
                                    <b>{question.question}</b>
                                    {!reachedMax[index] &&
                                    <>
                                        <div className="self-explain-short-answer-container">
                                            <textarea
                                            className="self-explain-textbox baseline-input"
                                            id="userInput"
                                            value={userResponse[index]}
                                            onChange={handleUserInput}
                                            onKeyDown={handleKeyDown}
                                            rows={2}
                                            />
                                            <button className="self-explain-submit gpt-button" onClick={() => handleClick(index)} disabled={!userResponse[index].trim() || buttonDisabled}>
                                                Submit
                                            </button>
                                        </div>
                                        {questionAnsweredTimes[index].currentAnswer &&
                                        <div className={`reveal-wrong-answer-container`}><b>You answered: </b> 
                                            <p className='reveal-wrong-answer explain-question-content'>{questionAnsweredTimes[index].currentAnswer}</p>
                                            <p> Hint: {feedback[index]}</p>
                                        </div>
                                        }
                                        {/* show the current code the question refering to */}
                                        <div className={`code-self-explain-container`} id={`code-container${index}`}>
                                            {question.questionCodeLines.split('\n').map((line, i) =>
                                                <HighlightedPart part={line} />
                                            )}
                                        </div>
                                    </>
                                    }
                                    {reachedMax[index] &&
                                    <>
                                        <div className={`reveal-correct-answer-container`}><b>Explainaton: </b> 
                                            <p className='reveal-correct-answer explain-question-content'>{question.questionCodeLinesExplained}</p>
                                        </div>
                                        {/* show the current code the question refering to */}
                                        <div className={`code-self-explain-container`} id={`code-container${index}`}>
                                            {question.questionCodeLines.split('\n').map((line, i) =>
                                                <HighlightedPart part={line} />
                                            )}
                                        </div>
                                    </>
                                    }
                                </div>
                            
                                : //multiple choice
                                <div className="self-explain-question-content">
                                    <b>{question.question}</b>
                                    {!reachedMax[index] &&
                                    <>
                                        <div className={`self-explain-mc-container`}>
                                        {question.choices!.map((choice, i) => (
                                            <div className={isDisabled ? "reveal-select-container disabled" : "reveal-select-container"} key={`${index}details${i}`} onClick={() => handleSelect(choice.correct, index, choice.text)}>
                                                <div className='reveal-select-dot'></div>
                                                {(!choice.correct && questionAnsweredTimes[index].currentAnswer == choice.text) ? <div className="reveal-wrong-answer"><p>{choice.text}</p></div> :  <p>{choice.text}</p>}
                                                <p className="reveal-answer" >{choice.correct ? "Correct" : "Incorrect"}</p>
                                            </div>
                                        ))}
                                        </div>
                                        {/* show the current code the question refering to */}
                                        <div className={`code-self-explain-container`} id={`code-container${index}`}>
                                            {question.questionCodeLines.split('\n').map((line, i) =>
                                                <HighlightedPart part={line} />
                                            )}
                                        </div>
                                    </>
                                    }
                                    {reachedMax[index] &&
                                    <>
                                        <div className={`self-explain-mc-container`}>
                                            {question.choices!.map((choice, i) => (
                                                <div className="reveal-select-container" key={`${index}details${i}`} onClick={() => handleSelect(choice.correct, index, choice.text)}>
                                                    <div className='reveal-select-dot'></div>
                                                    {(choice.correct) ? <div className="reveal-correct-answer"><p>{choice.text}</p></div> :  <p>{choice.text}</p>}
                                                    <p className="reveal-answer" >{choice.correct ? "Correct" : "Incorrect"}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={`reveal-correct-answer-container`}><b>Explainaton: </b> 
                                            <p className='reveal-correct-answer explain-question-content'>{question.questionCodeLinesExplained}</p>
                                        </div>
                                        {/* show the current code the question refering to */}
                                        <div className={`code-self-explain-container`} id={`code-container${index}`}>
                                            {question.questionCodeLines.split('\n').map((line, i) =>
                                                <HighlightedPart part={line} />
                                            )}
                                        </div>
                                    </>
                                    }
                                </div>
                            }
                        </div>
                        
                        
                    </div>
                )}
            </div>
        </div>
    );

};