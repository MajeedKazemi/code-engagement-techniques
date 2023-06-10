import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import robot from "../../assets/robot.png";
import { apiGetBaselineCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { AuthContext } from '../../context';
import { LogType, log } from '../../utils/logger';

interface PseudoGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    code: string | null;
}

const PseudoGenerateCode: React.FC<PseudoGenerateCodeProps> = ({ prompt, editor, code })  => {
    const pseudoRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [generatedPseudo, setGeneratedPseudo] = useState('');
    const [userInputCode, setUserInputCode] = useState('');
    const [checked, setChecked] = useState(true);

    const cancelClick = () => {
        
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
    
    };
    
    const handleInsertCodeClick = () => {
        if (editor) {
            const position = editor.getPosition();
            if (position) {
              const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
              const op = { identifier: { major: 1, minor: 1 }, range: range, text: userInputCode, forceMoveMarkers: true };
              console.log(userInputCode);
              editor.executeEdits("insertCodeAfterCursor", [op]);
            }
          }
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
      
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
                apiGetBaselineCodex(
                    context?.token,
                    prompt,
                    userCode ? userCode : ""
                )
                    .then(async (response) => {
    
                        if (response.ok && props.editor) {
                            const data = await response.json();
    
                            let steps = data.steps;
    
                            if (steps.length > 0) {
                                setFeedback("");
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.PromptEvent,
                                    {
                                        code: steps,
                                        userInput: prompt,
                                    }
                                );
                                // TODO: seperate steps into lines, each lines returns content and explanation
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
    }

    useEffect(() => {
        if (pseudoRef.current && generatedPseudo) {
          
        }
    
        return () => {
          
        };
    }, [generatedPseudo]);

    useEffect(() => {
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
            <div style={{ whiteSpace: 'pre-wrap' }}>
                <b>prompts: </b> {prompt}
            </div>
            <div ref={pseudoRef} className="pesudo-code-reader"><b>Pseudocode: </b></div>
            <div ref={editorRef} className="monaco-code-writer"><b>Editor: </b>Write your own code based on the above pseudocode below </div>
            <div style={{ marginTop:'5rem', display: 'flex', justifyContent: 'space-between'  }}>
                <button className="gpt-button" onClick={cancelClick}>Cancel</button>
                <button className="gpt-button" onClick={handleInsertCodeClick}>Insert Code</button>
            </div>
        </>
    );
};

export default PseudoGenerateCode;
