import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import robot from "../../assets/robot.png";
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { AuthContext } from "../../context";
import { log, LogType } from "../../utils/logger";

import { apiGetBaselineCodex, apiGetGeneratedCodeCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';
import { highlightCode } from '../../utils/utils';
import ParsonsGame from '../responses/parsons-game';

export let parsonsCancelClicked = false;

function convertToCodeBlocks(text: string): CodeBlock[] {
    const lines = text.split("\n");
    console.log(lines);
    const codeBlocks: CodeBlock[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine !== '') {
        codeBlocks.push({
          id: index + 1,
          code: trimmedLine,
        });
      }
    });
    
    return codeBlocks;
}
  

const ItemTypes = {
  CODE_BLOCK: 'codeBlock',
};

interface CodeBlock {
  id: number;
  code: string;
}

interface DragItem {
    codeBlock: CodeBlock;
    type: string;
    index: number;
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
    const [isOver, setIsOver] = useState<boolean>(false);
    const baselineRef = useRef<HTMLDivElement | null>(null);
    const explainRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (explainRef.current) {
          const div = document.createElement('div');
          // div.innerHTML = `<b>Explanation:</b> ${explanation}`;
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
    }, []);

    useEffect(() => {
        const responseCodeObject: CodeBlock[] = convertToCodeBlocks(generatedCode);
        setInitialCodeBlocks(responseCodeObject);
        sectionHeightRef.current = (responseCodeObject.length + 2) * 60;
    }, [generatedCode]);

    const checkCode = () => {
        setIsOver(true);
    };

    const handleDropLeft = (index: number, codeBlock: CodeBlock) => {
        const updatedCodeBlocks = [...initialCodeBlocks];
        updatedCodeBlocks.splice(index, 0, codeBlock);
        setInitialCodeBlocks(updatedCodeBlocks);
        setOrderedCodeBlocks(orderedCodeBlocks.filter(block => block.id !== codeBlock.id));
    };

    const handleDropRight = (index: number, codeBlock: CodeBlock) => {
        const updatedCodeBlocks = [...orderedCodeBlocks];
        updatedCodeBlocks.splice(index, 0, codeBlock);
        setOrderedCodeBlocks(updatedCodeBlocks);
        setInitialCodeBlocks(initialCodeBlocks.filter(block => block.id !== codeBlock.id));
    };

    const moveCodeBlock = (dragIndex: number, hoverIndex: number, isRight: boolean) => {
        if (isRight) {
            if (dragIndex == hoverIndex) {
                return;
            }
            const dragCodeBlock = orderedCodeBlocks[dragIndex];
            const updatedCodeBlocks = [...orderedCodeBlocks];
        
            if (dragIndex < hoverIndex) {
                updatedCodeBlocks.splice(hoverIndex + 1, 0, dragCodeBlock);
                updatedCodeBlocks.splice(dragIndex, 1);
            } else {
                updatedCodeBlocks.splice(hoverIndex, 0, dragCodeBlock);
                updatedCodeBlocks.splice(dragIndex + 1, 1);
            }
            
            setOrderedCodeBlocks(updatedCodeBlocks);

        } else {
            if (dragIndex == hoverIndex) {
                return;
            }
        
            const dragCodeBlock = initialCodeBlocks[dragIndex];
            const updatedCodeBlocks = [...initialCodeBlocks];

            if (dragIndex < hoverIndex) {
                updatedCodeBlocks.splice(hoverIndex + 1, 0, dragCodeBlock);
                updatedCodeBlocks.splice(dragIndex, 1);
            } else {
                updatedCodeBlocks.splice(hoverIndex, 0, dragCodeBlock);
                updatedCodeBlocks.splice(dragIndex + 1, 1);
            }
        
            setInitialCodeBlocks(updatedCodeBlocks);
        }
    };

    const rightDropRef = useRef<HTMLDivElement>(null);
    const leftDropRef = useRef<HTMLDivElement>(null);

    const [, leftDrop] = useDrop({
        accept: ItemTypes.CODE_BLOCK,
        drop: (item: DragItem, monitor) => {
        if (monitor.didDrop()) return;

        const isHoveringRightSection = isHoveringOverSection(monitor.getInitialClientOffset(), rightDropRef.current);
            if (
                isHoveringRightSection
            ) handleDropLeft(initialCodeBlocks.length, item.codeBlock);
        },
    });

    const [, rightDrop] = useDrop({
        accept: ItemTypes.CODE_BLOCK,
        drop: (item: DragItem, monitor) => {
        if (monitor.didDrop()) return;
        const isHoveringLeftSection = isHoveringOverSection(monitor.getInitialClientOffset(), leftDropRef.current);
        if (
            isHoveringLeftSection
        )
        handleDropRight(orderedCodeBlocks.length, item.codeBlock);
        },
    });

    const isHoveringOverSection = (clientOffset: XYCoord | null, sectionRef: HTMLDivElement | null): boolean => {
        if (!clientOffset || !sectionRef) return false;
    
        const { left, top, right, bottom } = sectionRef.getBoundingClientRect();
        const { x, y } = clientOffset;

    
        return x >= left && x <= right && y >= top && y <= bottom;
    };

    const cancelClick = () => {
        
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
        setGeneratedCode("");
        setGeneratedExplanation("");
        parsonsCancelClicked = !parsonsCancelClicked;
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
        parsonsCancelClicked = !parsonsCancelClicked;
    };
  

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
                    <b>AI Assistance: </b> Solve the Parson's problem to use the generated code.
                  </p>
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
                  <div className="parsons-problem">
                    <ParsonsGame sectionHeight={sectionHeightRef.current}/>
                  </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button disabled={waiting} type="button" className="btn btn-secondary" onClick={checkCode}>
                    Submit
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

export default ParsonsGenerateCode;
