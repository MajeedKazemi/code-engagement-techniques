import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import robot from "../../assets/robot.png";
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import { apiGetBaselineCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { highlightCode } from '../../utils/utils';
import { SelfExplain } from '../responses/self-explain';
import { GPTLoader } from '../loader';

export let selfExplainCancelClicked = false;
  


interface CodeBlock {
  id: number;
  code: string;
  answer: string;
}

  

interface SelfExplainGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
}
  

const SelfExplainGenerateCode: React.FC<SelfExplainGenerateCodeProps> = ({ prompt, editor })  => {
    const [isOpen, setIsOpen] = useState(true);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [checked, setChecked] = useState(true);
    const [generatedCode, setGeneratedCode] = useState('');
    const [generatedExplanation, setGeneratedExplanation] = useState('');
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [isOver, setIsOver] = useState(false);
    const baselineRef = useRef<HTMLDivElement | null>(null);
    const explainRef = useRef<HTMLDivElement | null>(null);
    const [passed, setPassed] = useState(false);

    useEffect(() => {
        if (explainRef.current) {
          const div = document.createElement('div');
          console.log(generatedExplanation);
          const highlightedExplanation = highlightCode(generatedExplanation, "code-highlight");
          div.innerHTML = `<b>Explanation:</b> ${highlightedExplanation}`;
          explainRef.current.appendChild(div);
          const explainContainer = explainRef.current;
          const maxHeight = window.innerHeight * 0.4;
    
          if (explainContainer.scrollHeight > maxHeight) {
            explainContainer.style.height = `${maxHeight}px`;
            explainContainer.style.overflowY = 'scroll';
          } else {
            explainContainer.style.height = 'auto';
            explainContainer.style.overflowY = 'unset';
          }
          
        }
        
      }, [isOver]);

      useEffect(() => {
        if (baselineRef.current && generatedCode && !editorRef.current) {
          editorRef.current = monaco.editor.create(baselineRef.current, {
            value: generatedCode,
            language: 'python',
            readOnly: true,
            automaticLayout: true,
          });
          editorRef.current.onDidChangeModelContent(() => {
            const model = editorRef.current?.getModel();
            if (model) {
              const lineHeight = editorRef.current?.getOption(monaco.editor.EditorOption.lineHeight) || 18;
              const lineCount = Math.max(model.getLineCount(), 1);
              const newHeight = lineHeight * (lineCount+2);
              const maxHeight = window.innerHeight * 0.4;
              const height = Math.min(newHeight, maxHeight);
              baselineRef.current!.style.height = `${height}px`;
              editorRef.current!.layout();
            }
          });
        }
    
      }, [isOver]);
    
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
                                setWaiting(false);
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
          if (document.getElementById('passed')) {
            setPassed(true);
            clearInterval(interval); 
          }
        }, 1000); 
        return () => clearInterval(interval);
    }, []);


    const cancelClick = () => {
        
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        selfExplainCancelClicked = !selfExplainCancelClicked;
    };
    
    const handleInsertCodeClick = () => {
        if (editor) {
            const position = editor.getPosition();
            if (position) {
              const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
              const op = { identifier: { major: 1, minor: 1 }, range: range, text: generatedCode, forceMoveMarkers: true };
              editor.executeEdits("insertCodeAfterCursor", [op]);
            }
          }
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        selfExplainCancelClicked = !selfExplainCancelClicked;
    };
  

    const closePopup = () => {
        setIsOpen(false);
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        selfExplainCancelClicked = !selfExplainCancelClicked;
    };

    return (
          <div>
            {isOver && (
                <>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <b>prompts: </b> {prompt}
                </div>
                <div ref={baselineRef} className="read-only-editor"></div>
                <div ref={explainRef}> </div>
                <div className="generated-button-container" style={{ marginTop:'2rem', display: 'flex', justifyContent: 'space-between'  }}>
                  <button className="gpt-button" onClick={cancelClick}>Cancel</button>
                  <button className="gpt-button" onClick={handleInsertCodeClick}>Insert Code</button>
                </div>
                </>
            )} 
            {isOpen && !isOver && (
              <div className="modal show" style={{ display: 'block' }}>
                <div className="modal-header">
                  <p>
                    <img src={robot} className="gpt-image" />
                    <b>AI Assistance: </b> Explain the highlighted code.
                  </p>
                </div>
                <div className="modal-body">
                  <p>
                    <b>Prompts: </b> {prompt}
                  </p>

                  {waiting && (
                    <div className="gptLoader">
                      <GPTLoader />
                    </div>
                  )}
                  {!waiting && (
                  
                    <SelfExplain code={generatedCode}/>
                  )}
                </div>
                <div className="modal-footer">
                <button disabled={!passed} type="button" className={`btn btn-secondary ${!passed ? 'disabled' : ''}`} onClick={() => setIsOver(true)}>
                    Done
                    </button>
                  <button disabled={waiting} type="button" className="btn btn-secondary" onClick={closePopup}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
      )
      
};

export default SelfExplainGenerateCode;
