import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { apiGetGeneratedCodeCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { AuthContext } from '../../context';
import { LogType, log } from '../../utils/logger';
import {  WriteOver } from '../responses/write-over';

export let writeOverCancelClicked = false;

interface WriteOverGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    code: string | null;
}

const WriteOverGenerateCode: React.FC<WriteOverGenerateCodeProps> = ({ prompt, editor, code })  => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [userInputCode, setUserInputCode] = useState('');
    const [checked, setChecked] = useState(true);


    const cancelClick = () => {
        
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setUserInputCode('');
        writeOverCancelClicked = !writeOverCancelClicked;
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
        setUserInputCode('');
        writeOverCancelClicked = !writeOverCancelClicked;
    };

    const generatePseudoCode = () => {
        const props = {
            taskId: "",
            editor: editor
        }
    
        const generateCode = () => {
        if (prompt.length === 0) {
            setFeedback(
                "You should write an instruction of the code that you want to be generated."
            );
        } else {
            setWaiting(true);
    
            const focusedPosition = props.editor?.getPosition();
            const userCode = code;
            console.log("code to be use", userCode);
            let codeContext = "";
    
            if (focusedPosition && userCode && checked) {
                codeContext = userCode
                    .split("\n")
                    .slice(0, focusedPosition.lineNumber + 1)
                    .join("\n");
            }
    
            try {
                apiGetGeneratedCodeCodex(
                    context?.token,
                    prompt,
                    userCode ? userCode : ""
                )
                    .then(async (response) => {
  
                        if (response.ok && props.editor) {
                            const data = await response.json();
  
                            let text = data.code;
  
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

                                console.log("text", text);

                                setGeneratedCode(text);
                            } 
                        }
                        setWaiting(false);
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

        generateCode();
    }
    

    const writeRef = React.useRef<HTMLDivElement>();
        useEffect(() => {
            if (writeRef.current) {
                writeRef.current.focus();
            }
        }, []);

    useEffect(() => {
        generatePseudoCode();
        const editorContainer = editorRef.current;
        const windowHeight = window.innerHeight;
        const editorHeight = Math.floor(windowHeight * 0.35);

        if (editorContainer) {
        const editor = monaco.editor.create(editorContainer, 
            {
                value: "",
                language: "python",
                automaticLayout: true,
                fontSize: 12,
                lineHeight: 25,
                minimap: { enabled: false },
                wordWrap: "on",
                wrappingIndent: "indent",
                lineNumbers: 'on',
            }
        );

        editorContainer.style.height = `${editorHeight}px`;

        editor.onDidChangeModelContent(() => {
            const updatedCode = editor.getValue();
            setUserInputCode(updatedCode);
        });

        editor.layout();
        editor.focus();

        return () => {
            editor.dispose();
        };
        }
    }, []);


    return (
        <>
        <b>Code: </b>
        <div 
            className="writeover-code-reader" 
            tabIndex={-1} 
            onKeyDown={(e) => e.key === 'Tab' && e.preventDefault()} >
            {generatedCode && !waiting && <WriteOver text={generatedCode}/>}
        </div>
        </>
    );
};

export default WriteOverGenerateCode;
