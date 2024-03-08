import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import robot from "../../assets/shining.png";
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import { apiGetBaselineCodex, apiGetBaselineCodexSimulation, apiGetBaselineExplainationCodexSimulation, apiGetGenerateQuestionForSelfExplain, apiGetSelfExplainQuestionsSimulation, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { highlightCode } from '../../utils/utils';
import { SelfExplain } from '../responses/self-explain';
import { GPTLoader } from '../loader';
import BaselineGenerateCode from '../responses/baseline-chat';
import IconsDoc from '../docs/icons-doc';

export let selfExplainCancelClicked = false;
  
interface SelfExplainGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    taskID: string;
    moveOn: () => void;
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

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function responseToQuestion(response: any, code:string): SelfExplainQuestion[] {
  return response.map((item: any) => {

      // revealLines
      const codeLines = code.split('\n');
      const revealLines = item["question-code-lines"].map(Number);
      const lines = revealLines
          .map((index: number) => codeLines[index-1])
          .filter((line: string) => typeof line === 'string')
          .join('\n');

      if (item.type === 'Multiple Choice') {
          // randomize choices, save them in questionObject forml
          var answer = item.answer;
          const choices = shuffleArray([
            { correct: true, text: answer["correct-choice"] },
            { correct: false, text: answer["incorrect-choice-1"] },
            { correct: false, text: answer["incorrect-choice-2"] },
            { correct: false, text: answer["incorrect-choice-3"] },
          ]);

          return {
            type: item.type,
            question: item.question,
            questionCodeLines: lines,
            lines: revealLines,
            questionCodeLinesExplained: item["question-code-lines-explained"],
            choices: choices as MultipleChoiceQuestion[],
          };

        }else{
          return {
            type: item.type,
            question: item.question,
            answer: item.answer,
            lines: revealLines,
            questionCodeLines: lines,
            questionCodeLinesExplained: item["question-code-lines-explained"],
        };
        }


  });
}

// {
//   "format": [
//       "short-answer",
//       "multiple-choice",
//       "short-answer"
//   ],
//   "questions": [
//       {
//           "type": "short-answer",
//           "question": "What does the 'lambda' function do in this context?",
//           "answer": "It sorts the intervals based on the first element of each tuple.",
//           "question-code-lines": [
//               "2"
//           ],
//           "question-code-lines-explained": "sorted_intervals = sorted(intervals, key=lambda x: x[0]) # This line sorts the intervals based on the first element of each tuple."
//       },
//       {
//           "type": "multiple-choice",
//           "question": "What does the 'if' condition check?",
//           "answer": {
//               "correct-choice": "It checks if the start of the current interval is less than or equal to the end of the previous interval.",
//               "incorrect-choice-1": "It checks if the start of the current interval is greater than the end of the previous interval.",
//               "incorrect-choice-2": "It checks if the end of the current interval is less than or equal to the start of the previous interval.",
//               "incorrect-choice-3": "It checks if the end of the current interval is greater than the start of the previous interval."
//           },
//           "question-code-lines": [
//               "6"
//           ],
//           "question-code-lines-explained": "if current[0] <= previous[1]: # This line checks if the start of the current interval is less than or equal to the end of the previous interval."
//       },
//       {
//           "type": "short-answer",
//           "question": "What does the 'else' condition do?",
//           "answer": "It appends the current interval to the merged list if it does not overlap with the previous interval.",
//           "question-code-lines": [
//               "9",
//               "10"
//           ],
//           "question-code-lines-explained": "else:\n    merged.append(current) # These lines append the current interval to the merged list if it does not overlap with the previous interval."
//       }
//   ]
// }
  

const SelfExplainGenerateCode: React.FC<SelfExplainGenerateCodeProps> = ({ prompt, editor, taskID, moveOn })  => {
    const [isOpen, setIsOpen] = useState(true);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [checked, setChecked] = useState(true);
    const [generatedCode, setGeneratedCode] = useState('');
    const [generatedExplanation, setGeneratedExplanation] = useState('');
    const [generatedQuestions, setGeneratedQuestions] = useState<SelfExplainQuestion[]>([]);
    const [isOver, setIsOver] = useState(false);
    const [passed, setPassed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);


    useEffect(() => {
      generateCode();
      const interval = setInterval(() => {
        if (document.getElementById('game-over')) {
          // setIsOver(true);
          setPassed(true);
          clearInterval(interval); 
        }
      }, 1000); 
      return () => clearInterval(interval);
  }, []);

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
                apiGetBaselineCodexSimulation(
                    context?.token,
                    taskID,
                )
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

                                        setGeneratedExplanation(data.explanation);
                                        // setWaiting(false);                           
                                    }
                                })
                                .catch((error) => {
                                    editor?.updateOptions({ readOnly: false });
                                    // setWaiting(false);
                                    logError(error.toString());
                                });  
                                
                                apiGetSelfExplainQuestionsSimulation(
                                    context?.token,
                                    taskId,
                                )
                                    .then(async (response) => {
                
                                        if (response.ok && editor) {
                                            const data = await response.json();
                                            // console.log(data.verifyReview);
                                            console.log(data.selfExplainQuestions);
                                            setGeneratedQuestions(responseToQuestion(data.selfExplainQuestions.questions, text));
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
    //                             if (text.length >= 0){
    //                               try {
    //                                 apiGetGenerateQuestionForSelfExplain(
    //                                     context?.token,
    //                                     text,
    //                                     prompt
    //                                 )
    //                                     .then(async (response) => {
                        
    //                                         if (response.ok) {
    //                                             const data = await response.json();
                                                
    //                                             setGeneratedQuestions(responseToQuestion(data.response.questions, text));
    //                                             console.log(data.response);
                        
    //                                             setWaiting(false);
    //                                             } 
    //                                     })
    //                                     .catch((error) => {
    //                                         setWaiting(false);
    //                                         logError(error.toString());
    //                                     });
    //                                 } catch (error: any) {
    //                                     setWaiting(false);
    //                                     logError(error.toString());
    //                                 }
    //                             }
                                
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
  

    const closePopup = async () => {
      setIsModalOpen(true);
    };
  
    const handleModalClick = (confirmed: boolean) => {
      setIsModalOpen(false);
      
      if (confirmed) {
        setIsOpen(false);
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        moveOn();
        selfExplainCancelClicked = !selfExplainCancelClicked;
      }
    };

    useEffect(() => {
      if(isOver){
          setIsOpen(false);
          const overlayElement = document.querySelector('.overlay') as HTMLElement;
          const editorElement = document.querySelector('.editor') as HTMLElement;
          overlayElement!.style.display = 'none';
          editorElement.style.zIndex = '1';
          var outputDiv = document.querySelector('.output');
          outputDiv!.innerHTML = '';
      }
  }, [isOver]);

  useEffect(() => {
    let intervalId: number | null = null;

    if (isTimerStarted) {
      // Setup a timer that increments the counter every second
      intervalId = window.setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 4) { // Check if the counter is about to become 5
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


    return (
          <div>
            {isOver && (
                <BaselineGenerateCode prompt={prompt} editor={editor} code={generatedCode} exp={generatedExplanation} taskID={taskID} moveOn={moveOn}/>
            )} 
            {isOpen && !isOver && (
              <div className="modal show" style={{ display: 'block' }}>
                <div className="modal-header">
                    <div className='spark-icon'><IconsDoc iconName="spark" /></div>
                    AI Assistance:
                </div>
                <div className="modal-body">
                  {/* <p>
                    <b>Prompts: </b> {prompt}
                  </p> */}

                  {(waiting || counter < 5) && (
                    <div className="gptLoader">
                      <GPTLoader />
                    </div>
                  )}
                  {(!waiting && counter >= 5) && (
                  
                    <SelfExplain code={generatedCode} questions={generatedQuestions} taskID={taskID}/>
                  )}
                </div>
                <div className="modal-footer">
                <button disabled={!passed} type="button" className={`btn btn-secondary ${!passed ? 'disabled' : ''}`} onClick={() => setIsOver(true)}>
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
                  )}
                </div>
              </div>
            )}
          </div>
      )
      
};

export default SelfExplainGenerateCode;
