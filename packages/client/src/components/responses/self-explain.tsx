import React, { useEffect, createContext, useState, useRef, useContext, createRef } from "react";
import { Editor } from "../editor";
import { FaQuestionCircle } from "react-icons/fa";
import * as monaco from "monaco-editor";
import { ChatLoader } from "../loader";

interface SelfExplainProps {
    code: string;
    questions: SelfExplainQuestion[];
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


export const SelfExplain: React.FC<SelfExplainProps> = ({ code, questions }) => {
    const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [answered, setAnswered] = useState(new Array(questions.length).fill(false));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const monacoEl = useRef(null);
    const [userResponse, setUserResponse] = useState(new Array(questions.length).fill(""));
    const [selectedChoice, setSelectedChoice] = useState(new Array(questions.length).fill(""));
    const [correctAnswer, setCorrectAnswer] = useState(new Array(questions.length).fill(""));
    const [revealAnswer, setRevealAnswer] = useState(new Array(questions.length).fill(false));

    const editorInstances = useRef<(monaco.editor.IStandaloneCodeEditor | null)[]>([]);
    
    useEffect(() => {
       console.log(questions);
      questions.forEach((question, index) => {
        
        const divId = `code-container${index}`;
        const container = document.getElementById(divId);
        // set container height:
        container!.style.height = 30 * question.questionCodeLines.split('\n').length + 'px';
        
        if (container) {

          const editor = monaco.editor.create(container, {
            value: question.questionCodeLines,
            language: 'python',
            readOnly: true,
            automaticLayout: true,
            lineNumbers: 'off',
            minimap: {
              enabled: false
            },
            fontSize:16,
          });

          editorInstances.current.push(editor);
        }
      });

      // Clean-up function to dispose old editor instances
      return () => {
        editorInstances.current.forEach(editor => editor?.dispose());
        editorInstances.current = [];
      }
    }, [questions]);


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
        
        const newAnswered = answered.map((an, i) => i === index ? true : an);
        setAnswered(newAnswered);
        setSelectedChoice(selectedChoice.map((an, i) => i === index ? text : an));
        const correctChoice = questions[index].choices!.find((choice) => choice.correct);
        if (correctChoice) {
            setCorrectAnswer(correctAnswer.map((an, i) => i === index ? correctChoice.text : an));
        }

      
        if (isCorrect) {
            const newRevealAnswer = revealAnswer.map((reveal, i) => i === index ? true : reveal);
            setRevealAnswer(newRevealAnswer);
        }
        setCurrentQuestionIndex(index + 1);
    };




    function handleClick(index: number): void {
        const newAnswered = answered.map((an, i) => i === index ? true : an);
        setAnswered(newAnswered);
        setCurrentQuestionIndex(index + 1);
    }

    function handleUserInput(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        const newUserResponse = [...userResponse];
        newUserResponse[currentQuestionIndex] = event.target.value;
        setUserResponse(newUserResponse);
    }


    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const target = event.target as HTMLTextAreaElement;
          target.value += '\n';
          target.style.height = `${target.scrollHeight}px`;
        }
    };

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
                                    <div className="self-explain-short-answer-container">
                                    <textarea
                                    className="self-explain-textbox baseline-input"
                                    id="userInput"
                                    value={userResponse[index]}
                                    onChange={handleUserInput}
                                    onKeyDown={handleKeyDown}
                                    rows={2}
                                    />
                                    <button className="self-explain-submit gpt-button" onClick={() => handleClick(index)} disabled={!userResponse[index].trim()}>
                                        Submit
                                    </button>
                                    </div>
                                    <div className={`reveal-correct-answer-container ${answered[index]==true ? 'active' : ''}`}><b>Explainaton: </b> 
                                        <p className='reveal-correct-answer explain-question-content'>{question.questionCodeLinesExplained}</p>
                                    </div>
                                    {/* show the current code the question refering to */}
                                    <div className={`code-self-explain-container`} id={`code-container${index}`}>
                                    </div>
                                </div>
                            
                                : //multiple choice
                                <div className="self-explain-question-content">
                                     <b>{question.question}</b>
                                    <div className={`self-explain-mc-container ${answered[index]==true ? 'inactive' : ''}`}>
                                    {question.choices!.map((choice, i) => (
                                        <div className="reveal-select-container" key={`${index}details${i}`} onClick={() => handleSelect(choice.correct, index, choice.text)}>
                                            <div className='reveal-select-dot'></div>
                                            {(choice.correct && answered[index]) ? <div className="reveal-correct-answer"><p>{choice.text}</p></div> :  <p>{choice.text}</p>}
                                            <p className="reveal-answer" >{choice.correct ? "Correct" : "Incorrect"}</p>
                                        </div>
                                    ))}
                                    </div>
                                    <div className={`reveal-correct-answer-container ${answered[index]==true ? 'active' : ''}`}><b>Explainaton: </b> 
                                        <p className='reveal-correct-answer explain-question-content'>{question.questionCodeLinesExplained}</p>
                                    </div>
                                    <div className={`reveal-wrong-answer-container ${answered[index]==true && revealAnswer[index]==false ? 'active' : ''}`}><b>You Answered: </b> 
                                        <p className='reveal-wrong-answer reveal-question-content'>{selectedChoice[index]}</p>
                                    </div>
                                    {/* show the current code the question refering to */}
                                    <div className={`code-self-explain-container`} id={`code-container${index}`}>
                                    </div>
                                </div>
                            }
                        </div>
                        
                        
                    </div>
                )}
            </div>
        </div>
    );

};