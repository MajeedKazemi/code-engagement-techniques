import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import { apiGetBaselineCodex, apiGenerateRevealQuestion, logError, apiGetBaselineCodexSimulation, apiGetBaselineExplainationCodexSimulation, apiGetLeadReviewSimulation } from '../../api/api';
import * as monaco from 'monaco-editor';
import { highlightCode } from '../../utils/utils';
import RevealQuestionComponent from '../responses/reveal-question-container';
import BaselineGenerateCode from '../responses/baseline-chat';
import IconsDoc from '../docs/icons-doc';

export let revealCancelClicked = false;
  

interface RevealGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    taskID: string;
}

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

function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function responseToQuestion(response: any, code:string): QuestionInterface[] {
    return response.subgoals.map((item: any) => {
        // question details:
        const questionDetails = item["sub-subgoal-items"][0]["leading-questions"][0];
        const questionLines = item["sub-subgoal-items"][0]["code-lines-to-be-revealed"];
        // randomize choices, save them in questionObject format
        const choices = shuffleArray([
            { correct: true, text: questionDetails["correct-choice"] },
            { correct: false, text: questionDetails["incorrect-choice-1"] },
            { correct: false, text: questionDetails["incorrect-choice-2"] },
            { correct: false, text: questionDetails["incorrect-choice-3"] },
        ]);

        // revealLines
        const codeLines = code.split('\n');
        const revealLines = Array.isArray(questionLines) ? questionLines : [];
        const lines = revealLines
            .map((index: number) => codeLines[index-1])
            .filter((line: string) => typeof line === 'string')
            .join('\n');

        return {
            title: item.title,
            question: questionDetails["mcq-question"],
            choices: choices,
            revealLine: lines,
        };
    });
}

// index
// response.subgoals[index].title
// response.subgoals[index].sub-subgoal-items[index].leading-questions[index].mcq-question

// below are random ordered should be
// response.subgoals[index].sub-subgoal-items[index].leading-questions[index].correct-choice
// response.subgoals[index].sub-subgoal-items[index].leading-questions[index].incorrect-choice-1
// response.subgoals[index].sub-subgoal-items[index].leading-questions[index].incorrect-choice-2
// response.subgoals[index].sub-subgoal-items[index].leading-questions[index].incorrect-choice-3

// response.subgoals[index].sub-subgoal-items[index].code-lines-to-be-revealed[index]

// {
//     "response": {
//         "subgoals": [
//             {
//                 "title": "Function Definition",
//                 "sub-subgoal-items": [
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "What should be the input to the function?",
//                                 "correct-choice": "A list of intervals",
//                                 "incorrect-choice-1": "A single interval",
//                                 "incorrect-choice-2": "Two lists of intervals",
//                                 "incorrect-choice-3": "A list of numbers"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             1
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "title": "Sort Intervals",
//                 "sub-subgoal-items": [
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "Why do we need to sort the intervals?",
//                                 "correct-choice": "To ensure we process intervals in increasing order",
//                                 "incorrect-choice-1": "To make the intervals look neat",
//                                 "incorrect-choice-2": "To reduce the complexity of the function",
//                                 "incorrect-choice-3": "Sorting is not necessary"
//                             },
//                             {
//                                 "mcq-question": "On what basis should we sort the intervals?",
//                                 "correct-choice": "The start of each interval",
//                                 "incorrect-choice-1": "The end of each interval",
//                                 "incorrect-choice-2": "The length of each interval",
//                                 "incorrect-choice-3": "The middle point of each interval"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             2
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "title": "Initialize Merged List",
//                 "sub-subgoal-items": [
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "Why do we need to initialize the merged list with the first interval?",
//                                 "correct-choice": "To have a starting point for merging",
//                                 "incorrect-choice-1": "To ensure the merged list is not empty",
//                                 "incorrect-choice-2": "To make the code look neat",
//                                 "incorrect-choice-3": "Initialization is not necessary"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             3
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "title": "Iterate Over Sorted Intervals",
//                 "sub-subgoal-items": [
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "Why do we need to iterate over the sorted intervals?",
//                                 "correct-choice": "To check and merge overlapping intervals",
//                                 "incorrect-choice-1": "To find the longest interval",
//                                 "incorrect-choice-2": "To find the shortest interval",
//                                 "incorrect-choice-3": "Iteration is not necessary"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             4
//                         ]
//                     },
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "Why do we need to keep track of the previous interval?",
//                                 "correct-choice": "To check if the current interval overlaps with it",
//                                 "incorrect-choice-1": "To find the longest interval",
//                                 "incorrect-choice-2": "To find the shortest interval",
//                                 "incorrect-choice-3": "Keeping track of the previous interval is not necessary"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             5
//                         ]
//                     },
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "How can we check if two intervals overlap?",
//                                 "correct-choice": "If the start of the current interval is less than or equal to the end of the previous interval",
//                                 "incorrect-choice-1": "If the start of the current interval is greater than the end of the previous interval",
//                                 "incorrect-choice-2": "If the end of the current interval is less than the start of the previous interval",
//                                 "incorrect-choice-3": "If the end of the current interval is greater than the start of the previous interval"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             6
//                         ]
//                     },
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "How can we merge two overlapping intervals?",
//                                 "correct-choice": "Take the start of the previous interval and the maximum of the ends of the two intervals",
//                                 "incorrect-choice-1": "Take the start of the current interval and the end of the previous interval",
//                                 "incorrect-choice-2": "Take the start of the previous interval and the end of the current interval",
//                                 "incorrect-choice-3": "Take the start of the current interval and the maximum of the ends of the two intervals"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             7,
//                             8
//                         ]
//                     },
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "What should we do if the current interval does not overlap with the previous interval?",
//                                 "correct-choice": "Add the current interval to the merged list",
//                                 "incorrect-choice-1": "Ignore the current interval",
//                                 "incorrect-choice-2": "Remove the previous interval from the merged list",
//                                 "incorrect-choice-3": "Replace the previous interval in the merged list with the current interval"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             9,
//                             10
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "title": "Return Merged Intervals",
//                 "sub-subgoal-items": [
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "What should the function return?",
//                                 "correct-choice": "The list of merged intervals",
//                                 "incorrect-choice-1": "The list of sorted intervals",
//                                 "incorrect-choice-2": "The list of original intervals",
//                                 "incorrect-choice-3": "The length of the list of merged intervals"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             11
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "title": "Test Function",
//                 "sub-subgoal-items": [
//                     {
//                         "leading-questions": [
//                             {
//                                 "mcq-question": "Why should we test the function with different inputs?",
//                                 "correct-choice": "To ensure the function works correctly in all cases",
//                                 "incorrect-choice-1": "To make the code look neat",
//                                 "incorrect-choice-2": "To increase the length of the code",
//                                 "incorrect-choice-3": "Testing is not necessary"
//                             }
//                         ],
//                         "code-lines-to-be-revealed": [
//                             13,
//                             14,
//                             15
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     "success": true
// }


  

const RevealGenerateCode: React.FC<RevealGenerateCodeProps> = ({ prompt, editor, taskID })  => {
    const [isOpen, setIsOpen] = useState(true);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [checked, setChecked] = useState(true);
    const [generatedCode, setGeneratedCode] = useState('');
    const [generatedExplanation, setGeneratedExplanation] = useState('');
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);
    const [isOver, setIsOver] = useState(false);
    const [buttonClickOver, setButtonClickOver] = useState(false);


    const generateCode = () => {
        if (prompt.length === 0) {
            setFeedback(
                "You should write an instruction of the code that you want to be generated."
            );
        } else {
            setWaiting(true);
  
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
                                
                                apiGetLeadReviewSimulation(
                                    context?.token,
                                    taskId,
                                )
                                    .then(async (response) => {
                
                                        if (response.ok && editor) {
                                            const data = await response.json();
                                            console.log(data.leadReveal);
                                            setQuestions(responseToQuestion(data.leadReveal, text));
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
          if (document.getElementById('game-over')) {
            // setIsOver(true);
            setButtonClickOver(true);
            clearInterval(interval); 
          }
        }, 1000); 
        return () => clearInterval(interval);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        revealCancelClicked = !revealCancelClicked;
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

    return (
          <div>
            {isOver && (
                <BaselineGenerateCode prompt={prompt} editor={editor} code={generatedCode} exp={generatedExplanation} taskID={taskID}/>
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

                  {/* parsons main div */}
                  {waiting && (
                    <p>Generating</p>
                  )}
                  {(!waiting) && (
                    <RevealQuestionComponent data={questions}/>
                    
                  )}
                </div>
                <div className="modal-footer">
                <button disabled={!buttonClickOver} type="button" className={`btn btn-secondary ${!buttonClickOver ? 'disabled' : ''}`} onClick={() => setIsOver(true)}>
                    Done
                    </button>
                  <button disabled={waiting} type="button" className="btn btn-secondary" onClick={closePopup}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
      )
      
};

export default RevealGenerateCode;
function setGeneratedQuestion(code: any) {
    throw new Error('Function not implemented.');
}

