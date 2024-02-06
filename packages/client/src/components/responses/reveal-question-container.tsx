import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { HighlightedPart } from '../docs/highlight-code';

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

function RevealQuestionComponent({data}: {data: QuestionInterface[]}) {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState(new Array(data.length).fill(false));
    const [firstAnswered, setFirstAnswered] = useState(new Array(data.length).fill(false));
    const [selectedChoice, setSelectedChoice] = useState(new Array(data.length).fill(""));
    const [correctAnswer, setCorrectAnswer] = useState(new Array(data.length).fill(""));
    const editorInstances = useRef<(monaco.editor.IStandaloneCodeEditor | null)[]>([]);
    const [isWaitingForNextAttempt, setIsWaitingForNextAttempt] = useState(false);
    const [lastAnswered, setLastAnswered] = useState(new Array(data.length).fill(false));
    const [reachedMax, setReachedMax] = useState(new Array(data.length).fill(false));
    const [questionAnsweredTimes, setQuestionAnsweredTimes] = useState(new Array(data.length).fill({currentTime: 0, currentAnswer: ""}));


    useEffect(() => {
        let timer: number | undefined;
        if (isWaitingForNextAttempt) {
            timer = setTimeout(() => {
                setIsWaitingForNextAttempt(false);
            }, 10000);
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
        const newReachedMax = reachedMax.map((reached, i) => i === currentQuestionIndex ? (questionAnsweredTimes[i].currentTime == 3 || revealAnswer[i]) : reached);
        setReachedMax(newReachedMax);
    }, [questionAnsweredTimes, revealAnswer]);

    const handleSelect = (isCorrect: boolean, index: number, text: string) => {

        if(isWaitingForNextAttempt) return;
        
        setSelectedChoice(selectedChoice.map((an, i) => i === index ? text : an));
        const correctChoice = data[index].choices!.find((choice) => choice.correct);
        if (correctChoice) {
            setCorrectAnswer(correctAnswer.map((an, i) => i === index ? correctChoice.text : an));
        }

      
        if (isCorrect) {
            const newRevealAnswer = revealAnswer.map((reveal, i) => i === index ? true : reveal);
            setRevealAnswer(newRevealAnswer);
        } else {
            const newQuestionAnsweredTimes = questionAnsweredTimes.map((question, i) => i === index ? {currentTime: question.currentTime + 1, currentAnswer: text} : question);
            console.log("New Question Answered Times: ", newQuestionAnsweredTimes);
            setQuestionAnsweredTimes(newQuestionAnsweredTimes);
        }

        setIsWaitingForNextAttempt(true);
        
    };

    useEffect(() => {
        if (reachedMax[currentQuestionIndex]){
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsWaitingForNextAttempt(false);
        }
    }, [reachedMax]);


    return (
        
        <div className='reveal-container'>
            {currentQuestionIndex >= data.length && <span id="game-over" style={{opacity:0}}>Game Over</span>}
            {data.map((question, index) =>
            <div className='reveal-subgoal-container'>
                <div className={`reveal-question-container ${index <= currentQuestionIndex ? 'active' : ''} ${index < currentQuestionIndex ? 'answered' : ''}`} key={`rq${index}`}>
                    <h1>{question.title}</h1>
                    <div className='reveal-question-content-container'><b>Q: </b> 
                        <p className='reveal-question-content'>{question.question}</p>
                    </div>
                    <>
                    {!reachedMax[index] &&
                    <>
                        <div className={`reveal-select-all`}>
                        {question.choices!.map((choice, i) => (
                            <div className={isWaitingForNextAttempt ? "reveal-select-container disabled" : "reveal-select-container"} key={`${index}details${i}`} onClick={() => handleSelect(choice.correct, index, choice.text)}>
                                <div className='reveal-select-dot'></div>
                                {(!choice.correct && questionAnsweredTimes[index].currentAnswer == choice.text) ? <div className="reveal-wrong-answer"><p>{choice.text}</p></div> :  <p>{choice.text}</p>}
                                <p className="reveal-answer" >{choice.correct ? "Correct" : "Incorrect"}</p>
                            </div>
                        ))}
                        </div>
                    </>
                    }
                    {reachedMax[index] &&
                    <>
                        <div className={`reveal-select-all`}>
                            {question.choices!.map((choice, i) => (
                                <div className="reveal-select-container" key={`${index}details${i}`} onClick={() => handleSelect(choice.correct, index, choice.text)}>
                                    <div className='reveal-select-dot'></div>
                                    {(choice.correct) ? <div className="reveal-correct-answer"><p>{choice.text}</p></div> :  <p>{choice.text}</p>}
                                    <p className="reveal-answer" >{choice.correct ? "Correct" : "Incorrect"}</p>
                                </div>
                            ))}
                        </div>
                    </>
                    }
                    </>
                </div>
                <div className={`reveal-code-container ${index < currentQuestionIndex ? 'active' : ''} `} >
                    {data[index].revealLine.split('\n').map((line, i) => 
                        <HighlightedPart part={line} />
                    )}
                </div>
            </div>
            )}
        </div>
    );
}

export default RevealQuestionComponent;