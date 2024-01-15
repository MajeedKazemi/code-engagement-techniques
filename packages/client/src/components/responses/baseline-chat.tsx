import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import { apiGetBaselineCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { highlightCode } from '../../utils/utils';
import { ChatLoader } from '../loader';
import IconsDoc from '../docs/icons-doc';

export let baselineCancelClicked = false;

interface BaselineGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    code: string;
    exp: string;
}

const BaselineGenerateCode: React.FC<BaselineGenerateCodeProps> = ({ prompt, editor, code, exp })  => {
    // Call the GPT API or any code generation logic here
    // to generate code based on the userInput
    const [generating, setGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");
    const [explanation, setGeneratedExplanation] = useState("");
    const [feedback, setFeedback] = useState("");
    const [checked, setChecked] = useState(true);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const baselineRef = useRef<HTMLDivElement | null>(null);
    const explanationRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        if (explanation && explanationRef.current) {
            explanationRef.current.innerHTML = highlightCode(explanation, "code-highlight");
        }
    }, [explanation]);

    const cancelClick = () => {
        
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        baselineCancelClicked = !baselineCancelClicked;
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
        const editorElement = document.querySelector('.editor') as HTMLElement;
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        baselineCancelClicked = !baselineCancelClicked;
    };

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
            setGenerating(true);
  
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
                                setGenerating(false);                           
                            } 
                        }
                    })
                    .catch((error) => {
                        props.editor?.updateOptions({ readOnly: false });
                        setGenerating(false);
                        logError(error.toString());
                    });
            } catch (error: any) {
                props.editor?.updateOptions({ readOnly: false });
                setGenerating(false);
                logError(error.toString());
            }
  
            
        }
    };

    useEffect(() => {
        if(code.length > 0 && exp.length > 0){
            setGeneratedCode(code);
            setGeneratedExplanation(exp);
        }else{
            generateCode();
        }
    }, []);

    useEffect(() => {
        if (baselineRef.current && generatedCode && !editorRef.current) {
          editorRef.current = monaco.editor.create(baselineRef.current, {
            value: generatedCode,
            language: 'python',
            readOnly: true,
            automaticLayout: true,
            minimap: {
              enabled: false
            },
            fontSize:16,
          });
          editorRef.current.onDidChangeModelContent(() => {
            const model = editorRef.current?.getModel();
            if (model) {
                const lineHeight = editorRef.current?.getOption(monaco.editor.EditorOption.lineHeight) || 18;
                const lineCount = Math.max(model.getLineCount(), 1);
                const newHeight = lineHeight * (lineCount+6);
                const maxHeight = window.innerHeight * 0.4;
                const height = Math.min(newHeight, maxHeight);
                baselineRef.current!.style.height = `${height}px`;
                editorRef.current!.layout();
            }
          });
        }
    
        return () => {
          if (editorRef.current) {
            editorRef.current.dispose();
            editorRef.current = null;
          }
        };
    }, [generatedCode]);
    

    const generatedCodeComponent =
    <>
     <div className={`chat-user-prompt`}>
      <div className="baseline-feedback">
        <div className='user-chat-container'>
          <div className='user-icon'><IconsDoc iconName="person" /></div>
          <div className="baseline-feedback-user chat-bubble">
            <div className="baseline-feedback-user-text">
              <p>{prompt}</p>
            </div>
          </div>
        </div>
        <div className='assistant-chat-container'>
          <div className='assistant-icon'><IconsDoc iconName="spark" /></div>
          <div className="baseline-feedback-assistant chat-bubble">
            <div className="baseline-feedback-assistant-text">
              {generating && <div className='chat-loader'>Generating <ChatLoader/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>} 
              {!generating && <div className='chat-loader-finish'>Generated Code:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; </div>} 
            </div>
          </div>
        </div>
      </div>
      {!generating &&<div ref={baselineRef} className="read-only-editor"></div>}
      {!generating && 
      <div className="read-only-explaination"> 
        <b>Code Explanation</b>
        <p ref={explanationRef}></p>
      </div>}
      <div className={`generated-button-container ${generating ? "inactive" : ""}`}>
        <button className="gpt-button" onClick={cancelClick}>Cancel</button>
        <button className="gpt-button" onClick={handleInsertCodeClick}>Insert Code</button>
      </div>
      </div>
    </>

    return generatedCodeComponent;
};

export default BaselineGenerateCode;

