import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import robot from "../../assets/robot.png";
import { apiGetHierarchicalCodex, apiGetCodeToPseudoCodex, logError, apiGetBaselineCodex } from '../../api/api';
import * as monaco from 'monaco-editor';
import { AuthContext } from '../../context';
import { LogType, log } from '../../utils/logger';

export let cancelClicked = false;

interface HierarchicalGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
    code: string | null;
}

interface HierarchicalRepresentation {
    title: string;
    content: {
      description: string;
      details: {
        pseudo: string;
        code: string;
      }[];
    };
  }

const HierachicalGenerateCode: React.FC<HierarchicalGenerateCodeProps> = ({ prompt, editor, code })  => {
    const HierachicalRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [generatedHierarchical, setGeneratedHierarchical] = useState([]);
    const [userInputCode, setUserInputCode] = useState('');
    const [checked, setChecked] = useState(true);


    const cancelClick = () => {
        
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedHierarchical([]);
        setUserInputCode('');
        cancelClicked = !cancelClicked;
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
        setGeneratedHierarchical([]);
        setUserInputCode('');
        cancelClicked = !cancelClicked;
    };

    const generateHierachical = () => {
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

                                console.log("text", text);
                                apiGetHierarchicalCodex(
                                    context?.token,
                                    text,
                                    userCode ? userCode : ""
                                )
                                    .then(async (response) => {
                    
                                        if (response.ok) {
                                            const code = await response.json();
                                            // console.log(code);
                                            let hierachical_steps = code.response;
                                            
                                            // console.log(hierachical_steps);
                                            if(hierachical_steps.length == 0) {
                                                setFeedback(
                                                    "There is no code to be generated for this prompt."
                                                );
                                                setWaiting(false);
                                            }else{
                                                let generatedCodeObject:HierarchicalRepresentation[] = [];
                                                async function performAPICallsForEach(): Promise<void> {
                                                    for (const step of hierachical_steps) {
                                                      const code = step.code;
                                                    //   console.log(code);
                                                  
                                                      await (async () => {
                                                        const response = await apiGetCodeToPseudoCodex(
                                                          context?.token,
                                                          code,
                                                          userCode ? userCode : ""
                                                        );
                                                  
                                                        if (response.ok) {
                                                            const data = await response.json();
                                                            const codeRepresentations = data.response;
                                                        //   generatedCodeObject.push(codeRepresentations);
                                                            const currentComponent:HierarchicalRepresentation = {
                                                                title: step.title,
                                                                content:{
                                                                    description: step.description,
                                                                    details: codeRepresentations
                                                                }
                                                            }
                                                            generatedCodeObject.push(currentComponent);
                                                        }
                                                      })();
                                                    }
                                                  
                                                    setWaiting(false);
                                                }
                                                  
                                                  
                                                
                                                await performAPICallsForEach();
                                                console.log(generatedCodeObject);
                                            }
                                            
                                            
                                        }
                                    })
                                    .catch((error) => {
                                        props.editor?.updateOptions({ readOnly: false });
                                        setWaiting(false);
                                        logError(error.toString());
                                    });
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

        generateCode();
    }

    useEffect(() => {
        generateHierachical();
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
            <div className='generated-hierarchical-container'>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <b>prompts: </b> {prompt}
                </div>
                {waiting?  
                    <div className="preloader-2 ${waiting ? '' : 'hidden'}`}">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                        <span className="line line-3"></span>
                        <span className="line line-4"></span>
                        <span className="line line-5"></span>
                        <span className="line line-6"></span>
                        <span className="line line-7"></span>
                        <span className="line line-8"></span>
                        <span className="line line-9"></span>
                        <span className="line line-10"></span>
                        <span className="line line-11"></span>
                        <span className="line line-12"></span>
                        <span className="line line-13"></span>
                        <span className="line line-14"></span>
                        <span className="line line-15"></span>
                        <span className="line line-16"></span>
                        <span className="line line-17"></span>
                        <span className="line line-18"></span>
                        <div>Generating</div>
                    </div>
                    :
                    <>
                    {/* <b>Pseudocode: </b>
                    <div ref={pseudoRef} className="pesudo-code-reader">
                        {generatedPseudo && !waiting && <PseudoCodeHoverable code={generatedPseudo} />}
                    </div> */}
                    </>
                }
                <div>
                    <b>Editor: </b>Write your own code based on the above hierarchical expression below 
                    <div ref={editorRef} className="monaco-code-writer">
                    </div>
                </div>
            </div>
            <div className="button-container" style={{ marginTop:'3rem', display: 'flex', justifyContent: 'space-between'  }}>
                <button disabled={waiting} className="gpt-button" onClick={cancelClick}>Cancel</button>
                <button disabled={waiting} className="gpt-button" onClick={handleInsertCodeClick}>Insert Code</button>
            </div>
        </>
    );
};

export default HierachicalGenerateCode;
