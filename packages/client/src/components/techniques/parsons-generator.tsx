import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import { apiGetBaselineCodex, apiGetGeneratedCodeCodex, apiGetParsonsCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { highlightCode } from '../../utils/utils';
import { ParsonsGame } from '../responses/parsons-game';
import IconsDoc from '../docs/icons-doc';
import BaselineGenerateCode from '../responses/baseline-chat';

export let parsonsCancelClicked = false;

function convertToCodeBlocks(text: string, answer: string): CodeBlock[] {
    const lines = text.split("\n");
    const answerLines = answer.split("\n");
    const codeBlocks: CodeBlock[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      const trimmedAnswerLine = answerLines[index].trim();
      if (trimmedLine !== '' && trimmedAnswerLine !== '') {
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
}
  

const ParsonsGenerateCode: React.FC<ParsonsGenerateCodeProps> = ({ prompt, editor })  => {
    const [isOpen, setIsOpen] = useState(true);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [checked, setChecked] = useState(true);
    const [generatedCode, setGeneratedCode] = useState('');
    const [generatedExplanation, setGeneratedExplanation] = useState('');
    const [initialCodeBlocks, setInitialCodeBlocks] = useState<CodeBlock[]>([]);
    const [orderedCodeBlocks, setOrderedCodeBlocks] = useState<CodeBlock[]>([]);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const sectionHeightRef = useRef<number>(0);
    const [isOver, setIsOver] = useState(false);
    const [generatedQuestion, setGeneratedQuestion] = useState<string>("");
    
    const props = {
        taskId: "",
        editor: editor
    };

    const generateCode = () => {
        if (prompt.length === 0) {
            setFeedback(
                "You should write an instruction of the code that you want to be generated."
            );
        } else {
            setWaiting(true);
  
            const focusedPosition = props.editor?.getPosition();
            const userCode = props.editor?.getValue();
            let codeContext = "";
  
            if (focusedPosition && userCode && checked) {
                codeContext = userCode
                    .split("\n")
                    .slice(0, focusedPosition.lineNumber + 1)
                    .join("\n");
            }
  
            try {
                apiGetBaselineCodex(
                    context?.token,
                    prompt,
                    userCode ? userCode : ""
                )
                    .then(async (response) => {
  
                        if (response.ok && props.editor) {
                            const data = await response.json();
  
                            let text = data.bundle.code;
  
                            if (text.length > 0) {
                                setFeedback("");
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.PromptEvent,
                                    {
                                        code: text,
                                        userInput: prompt,
                                    }
                                );
  
                                let insertLine = 0;
                                let insertColumn = 1;
  
                                let curLineNumber = 0;
                                let curColumn = 0;
  
                                let highlightStartLine = 0;
                                let highlightStartColumn = 0;
                                let highlightEndLine = 0;
                                let highlightEndColumn = 0;
  
                                const curPos = props.editor.getPosition();
                                const curCodeLines = props.editor
                                    .getValue()
                                    .split("\n");
  
                                if (curPos) {
                                    curLineNumber = curPos.lineNumber;
                                    curColumn = curPos.column;
                                }
  
                                let curLineText =
                                    curCodeLines[curLineNumber - 1];
                                let nextLineText =
                                    curLineNumber < curCodeLines.length
                                        ? curCodeLines[curLineNumber]
                                        : null;
  
                                if (curColumn === 1) {
                                    // at the beginning of a line
                                    if (curLineText !== "") {
                                        text += "\n";
                                        insertLine = curLineNumber;
                                        insertColumn = 1;
  
                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;
  
                                        const textLines = text.split("\n");
  
                                        highlightEndLine =
                                            curLineNumber +
                                            textLines.length -
                                            1;
                                        highlightEndColumn = 1;
                                    } else {
                                        insertLine = curLineNumber;
                                        insertColumn = 1;
  
                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;
  
                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length;
                                        highlightEndColumn = 1;
                                    }
                                } else if (curColumn !== 1) {
                                    // in the middle of a line
                                    if (nextLineText !== "") {
                                        text = "\n" + text;
                                        insertLine = curLineNumber;
                                        insertColumn = curLineText.length + 1;
  
                                        const textLines = text.split("\n");
  
                                        highlightStartLine = curLineNumber + 1;
                                        highlightStartColumn = 1;
  
                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length -
                                            1;
                                        highlightEndColumn =
                                            textLines[textLines.length - 1]
                                                .length + 1;
                                    } else {
                                        insertLine = curLineNumber + 1;
                                        insertColumn = 1;
  
                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;
  
                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length;
                                        highlightEndColumn = 1;
                                    }
                                }
                                setGeneratedCode(text);
                                setGeneratedExplanation(data.bundle.explain);
                                setGeneratedQuestion(text);
                                setWaiting(false);
                                // apiGetParsonsCodex(
                                //     context?.token,
                                //     text,
                                //     userCode ? userCode : ""
                                // )
                                //     .then(async (response) => {
                    
                                //         if (response.ok) {
                                //             const data = await response.json();
                                //             setGeneratedQuestion(data.code);
                                //             setWaiting(false);
                                //         }
                                //     })
                                //     .catch((error) => {
                                //         logError(error.toString());
                                //     });
                                
                            } 
                        }
                    })
                    .catch((error) => {
                        props.editor?.updateOptions({ readOnly: false });
                        setWaiting(false);
                        logError(error.toString());
                    });
            } catch (error: any) {
                props.editor?.updateOptions({ readOnly: false });
                setWaiting(false);
                logError(error.toString());
            }
        }
    };

    useEffect(() => {
        generateCode();

        const interval = setInterval(() => {
          if (document.getElementById('game-over')) {
            setIsOver(true);
            clearInterval(interval); 
          }
        }, 1000); 
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const responseCodeObject: CodeBlock[] = convertToCodeBlocks(generatedQuestion, generatedCode);
        setInitialCodeBlocks(responseCodeObject);
        sectionHeightRef.current = (responseCodeObject.length) * 40;
    }, [generatedQuestion]);


    function shuffleArray(array: IDraggableTask[]): IDraggableTask[] {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }


    function toTask(generatedQuestion: string, generatedCode: string): IDraggableTask[] {
        let lines = generatedQuestion.split('\n');
        let answers = generatedCode.split('\n');
        return lines
            .filter((line) => line.trim() !== '')
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
  

    const closePopup = () => {
        setIsOpen(false);
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        parsonsCancelClicked = !parsonsCancelClicked;
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
                <BaselineGenerateCode prompt={prompt} editor={editor} code={generatedCode} exp={generatedExplanation}/>
            )} 
            {isOpen && !isOver && (
              <div className="modal show" style={{ display: 'block' }}>
                <div className="modal-header">
                    <div className='spark-icon'><IconsDoc iconName="spark" /></div>
                    AI Assistance:
                </div>
                <div className="modal-body">
                  <p>
                    <b>Prompts: </b> {prompt}
                  </p>

                  {/* parsons main div */}
                  {waiting && (
                    <p>Generating</p>
                  )}
                  {!waiting && (
                  
                    <ParsonsGame tasksOri={shuffleArray(toTask(generatedQuestion, generatedCode))} sectionHeight={sectionHeightRef.current}/>
                  )}
                </div>
                <div className="modal-footer">
                  <button disabled={waiting} type="button" className="btn btn-secondary" onClick={closePopup}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
      )
      
};

export default ParsonsGenerateCode;
