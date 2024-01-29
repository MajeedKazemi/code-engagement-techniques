import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import { apiGetBaselineCodex, apiGetCodeToPseudoCodex, apiGetLinesToRewrite, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { highlightCode } from '../../utils/utils';
import { ExcutionSteps } from '../responses/excution-steps';
import BaselineGenerateCode from '../responses/baseline-chat';
import IconsDoc from '../docs/icons-doc';

export let excutionCancelClicked = false;
  

interface ExcutionGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
}

interface CodeRepresentation {
  pseudo: string;
  code: string;
}
  

const ExcutionGenerateCode: React.FC<ExcutionGenerateCodeProps> = ({ prompt, editor })  => {
    const [isOpen, setIsOpen] = useState(true);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [checked, setChecked] = useState(true);
    const [generatedCode, setGeneratedCode] = useState('');
    const [backendCodes, setBackendCodes] = useState<string[]>([]);
    const [generatedContext, setGeneratedContext] = useState<CodeRepresentation[]>([]);
    const [generatedExplanation, setGeneratedExplanation] = useState('');
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [isOver, setIsOver] = useState(false);
    const [format, setFormat] = useState<string[]>([]);
    const [buttonClickOver, setButtonClickOver] = useState(false);
    
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
                                if(userCode){
              
                                  apiGetLinesToRewrite(
                                      context?.token,
                                      prompt,
                                      userCode
                                  )
                                      .then(async (response) => {
                    
                                          if (response.ok && props.editor) {
                                              const data = await response.json();
                    
                                              let format = data.response.format;
                                              let codes = data.response.codes;
                    
                                              if (format.length > 0) {
                                                  setFeedback("");
                                                  log(
                                                      props.taskId,
                                                      context?.user?.id,
                                                      LogType.PromptEvent,
                                                      {
                                                          code: codes,
                                                          userInput: prompt,
                                                      }
                                                  );

                                                  let newIndex = format.indexOf('new');
                                                  let code = '';
                                                  let oldCodes: any[] = [];

                                                  for (let i = 0; i < format.length; i++) {
                                                    if(format[i] === 'old'){
                                                      oldCodes.push(codes[i]);
                                                    }
                                                  }

                                                  if (newIndex !== -1) {
                                                      code = codes[newIndex]
                                                  }
                                                  setFormat(format);
                                                  setBackendCodes(oldCodes);
                                                  setGeneratedCode(code);
                                                  // THIS PART IS COMMENTED BECAUSE WE ASSUME THE PREV GENERATED CODE ARE CORRECT
                                                  let tempContext: CodeRepresentation[] = [];
                                                  if(oldCodes.length == 1){
                                                    apiGetCodeToPseudoCodex(
                                                      context?.token,
                                                      oldCodes[0],
                                                      userCode ? userCode : ""
                                                  )
                                                      .then(async (response) => {
                                      
                                                          if (response.ok) {
                                                              const data = await response.json();
                                                              tempContext.push(data.response);
                                                              setGeneratedContext(tempContext);
                                                              setWaiting(false);
                                                          }
                                                      })
                                                      .catch((error) => {
                                                          logError(error.toString());
                                                      });
                                                  }else if(oldCodes.length == 2){
                                                    apiGetCodeToPseudoCodex(
                                                      context?.token,
                                                      oldCodes[0],
                                                      userCode ? userCode : ""
                                                  )
                                                      .then(async (response) => {
                                      
                                                          if (response.ok) {
                                                              const data = await response.json();
                                                              tempContext.push(data.response);
                                                              apiGetCodeToPseudoCodex(
                                                                context?.token,
                                                                oldCodes[1],
                                                                userCode ? userCode : ""
                                                            )
                                                                .then(async (response) => {
                                                
                                                                    if (response.ok) {
                                                                        const data = await response.json();
                                                                        tempContext.push(data.response);
                                                                        setGeneratedContext(tempContext);
                                                                        setWaiting(false);
                                                                    }
                                                                })
                                                                .catch((error) => {
                                                                    logError(error.toString());
                                                                });
                                                          }
                                                      })
                                                      .catch((error) => {
                                                          logError(error.toString());
                                                      });
                                                  }else{
                                                    setWaiting(false);
                                                  }                                   
                                              } 
                                          }
                                      })
                                      .catch((error) => {
                                          props.editor?.updateOptions({ readOnly: false });
                                          setWaiting(false);
                                          logError(error.toString());
                                      });
                              } else{
                                setGeneratedContext([]);
                                setWaiting(false);
                              }
                                
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
        excutionCancelClicked = !excutionCancelClicked;
    };

    useEffect(() => {
        if(isOver){
            setIsOpen(false);
            const overlayElement = document.querySelector('.overlay') as HTMLElement;
            const editorElement = document.querySelector('.editor') as HTMLElement;
            overlayElement!.style.display = 'none';
            editorElement.style.zIndex = '1';
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
                  {(!waiting && format.length > 0) && (
                  
                    <ExcutionSteps code={generatedCode} contextCode={generatedContext} format={format} backendCodes={backendCodes}/>
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

export default ExcutionGenerateCode;
