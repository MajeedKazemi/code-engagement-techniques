import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

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


    const setWaitTime = () => {
        setIsWaitingForNextAttempt(true);
        setTimeout(() => {
            setIsWaitingForNextAttempt(false);
        },7000);
    };
    
    useEffect(() => {
      data.forEach((question, index) => {
        
        const divId = `code-container${index}`;
        const container = document.getElementById(divId);
        // set container height:
        container!.style.height = 30 * question.revealLine.split('\n').length + 'px';
        
        if (container) {

          const editor = monaco.editor.create(container, {
            value: question.revealLine,
            language: 'python',
            readOnly: true,
            automaticLayout: true,
            lineNumbers: 'off',
            minimap: {
              enabled: false
            },
            fontSize:18
          });

          editorInstances.current.push(editor);
        }
      });

      // Clean-up function to dispose old editor instances
      return () => {
        editorInstances.current.forEach(editor => editor?.dispose());
        editorInstances.current = [];
      }
    }, [data]);

    const handleSelect = (isCorrect: boolean, index: number, text: string) => {

        if (firstAnswered[index] === false) {
            const newAnswered = firstAnswered.map((an, i) => i === index ? true : an);
            setFirstAnswered(newAnswered);
            setSelectedChoice(selectedChoice.map((an, i) => i === index ? text : an));
            const correctChoice = data[index].choices.find((choice) => choice.correct);
            if (correctChoice) {
                setCorrectAnswer(correctAnswer.map((an, i) => i === index ? correctChoice.text : an));
            }

        
            if (isCorrect) {
                const newRevealAnswer = revealAnswer.map((reveal, i) => i === index ? true : reveal);
                setRevealAnswer(newRevealAnswer);
            } else {
                setWaitTime();
            }
            setCurrentQuestionIndex(index + 1);
        }else{

            const newAnswered = lastAnswered.map((an, i) => i === index ? true : an);
            setLastAnswered(newAnswered);
            setSelectedChoice(selectedChoice.map((an, i) => i === index ? text : an));
            const correctChoice = data[index].choices.find((choice) => choice.correct);
            if (correctChoice) {
                setCorrectAnswer(correctAnswer.map((an, i) => i === index ? correctChoice.text : an));
            }

        
            if (isCorrect) {
                const newRevealAnswer = revealAnswer.map((reveal, i) => i === index ? true : reveal);
                setRevealAnswer(newRevealAnswer);
            } 
            setCurrentQuestionIndex(index + 1);

        }
        
    };


    return (
        
        <div className='reveal-container'>
            {currentQuestionIndex >= data.length && <span id="game-over" style={{opacity:0}}>Game Over</span>}
            {data.map((question, index) => 
                <div className={`reveal-question-container ${index <= currentQuestionIndex ? 'active' : ''}`} key={`rq${index}`}>
                    <h1>{question.title}</h1>
                    <div className='reveal-question-content-container'><b>Q: </b> 
                        <p className='reveal-question-content'>{question.question}</p>
                    </div>
                    <>
                    {isWaitingForNextAttempt == false &&
                    <div className={`reveal-select-all ${lastAnswered[index]==true ? 'inactive' : ''}`}>
                    {question.choices.map((choice, i) => (
                        <div 
                        className="reveal-select-container" 
                        key={`${index}details${i}`} 
                        onClick={() => {
                            handleSelect(choice.correct, index, choice.text);
                         }}
                        >
                            <div className='reveal-select-dot'></div>
                            <p>{choice.text}</p>
                            <p className="reveal-answer" >{choice.correct ? "Correct" : "Incorrect"}</p>
                        </div>
                    ))}
                    </div>
                    }
                    {isWaitingForNextAttempt == true && 
                        <div className={`reveal-select-all ${lastAnswered[index]==true ? 'inactive' : ''}`}>
                        {question.choices.map((choice, i) => (
                            <div 
                            className="reveal-select-container" 
                            key={`${index}details${i}`} 
                            onClick={() => {
                                handleSelect(choice.correct, index, choice.text);
                             }}
                            >
                                <div className='reveal-select-dot'></div>
                                <p>{choice.text}</p>
                                <p className="reveal-answer" >{choice.correct ? "Correct" : "Incorrect"}</p>
                            </div>
                        ))}
                        </div>
                    }
                    {lastAnswered[index] == true || revealAnswer[index] == true &&
                    <>
                        <div className={`reveal-correct-answer-container ${lastAnswered[index]==true ? 'active' : ''}`}><b>A: </b> 
                            <p className='reveal-correct-answer reveal-question-content'>{correctAnswer[index]}</p>
                        </div>
                        <div className={`reveal-wrong-answer-container ${lastAnswered[index]==true && revealAnswer[index]==false ? 'active' : ''}`}><b>You Answered: </b> 
                            <p className='reveal-wrong-answer reveal-question-content'>{selectedChoice[index]}</p>
                        </div>
                        <div className={`code-reveal-container ${lastAnswered[index]==true || revealAnswer[index] == true ? 'active' : ''}`} id={`code-container${index}`}>
                        </div>
                    </>
                    }
                    </>
                </div>
            )}
        </div>
    );
}

export default RevealQuestionComponent;