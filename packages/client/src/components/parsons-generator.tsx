import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import robot from "../assets/robot.png";
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { AuthContext } from "../context";
import { log, LogType } from "../utils/logger";

import Parser from 'web-tree-sitter';
import { apiGetBaselineCodex, logError } from '../api/api';
import * as monaco from 'monaco-editor';

function convertToCodeBlocks(text: string): CodeBlock[] {
    const lines = text.split("\n");
    
    const codeBlocks: CodeBlock[] = lines.map((line, index) => {
      return {
        id: index + 1,
        code: line.trim(),
      };
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

var highestIndex = 0;

const CodeBlockItem: React.FC<{ codeBlock: CodeBlock, index: number, moveCodeBlock: (dragIndex: number, hoverIndex: number) => void }> = ({ codeBlock, index, moveCodeBlock }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [dragIndex, setDragIndex] = useState<number>(0);
    const [hoverIndex, setHoverIndex] = useState<number>(0);
    const [initialClientOffset, setInitialClientOffset] = useState<{ x: number, y: number } | null>(null);
    const [indentationLevel, setIndentationLevel] = useState<number>(0);
    const [isDropping, setIsDropping] = useState<boolean>(false);
    const [canDrag, setCanDrag] = useState<boolean>(true);
  
    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.CODE_BLOCK,
        item: { codeBlock, type: ItemTypes.CODE_BLOCK, index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            setInitialClientOffset(monitor.getClientOffset());
        }
    });
  
    const [, drop] = useDrop({
      accept: ItemTypes.CODE_BLOCK,
      hover(item: DragItem, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        setDragIndex(dragIndex);
        setHoverIndex(hoverIndex);
        if (dragIndex === hoverIndex) {
            const rightSectionElement = document.getElementsByClassName('right-section')[0];
            if (rightSectionElement) {
                if(initialClientOffset == null){
                    setInitialClientOffset(monitor.getClientOffset());
                }
                const { x } = rightSectionElement.getBoundingClientRect();
                if (x < monitor.getClientOffset()!.x) {
                    //setInitialClientOffset(monitor.getClientOffset());
                    if(monitor.getClientOffset() && initialClientOffset) {
                        console.log(monitor.getClientOffset()!.x, initialClientOffset?.x);
                        const dragOffsetX = monitor.getClientOffset()!.x - initialClientOffset?.x;
                        let newIndentationLevel;
                        if (dragOffsetX > 50) {
                            if (indentationLevel < 6)
                            {
                                newIndentationLevel = indentationLevel + 1;
                                const indentElement = document.getElementById(`indent${indentationLevel+1}`);
                                if (indentElement) {
                                    indentElement.classList.remove('hidden');
                                }
                                if(highestIndex < newIndentationLevel) {
                                    highestIndex = newIndentationLevel;
                                }
                                console.log(newIndentationLevel+1);
                            } else {
                                newIndentationLevel = indentationLevel;
                            }
                        } else if (dragOffsetX < -50) {
                            if (indentationLevel > 0)                    
                            {
                                newIndentationLevel = indentationLevel - 1;
                                if(highestIndex == indentationLevel) {
                                    highestIndex -= 1;
                                }
                                const indentElement = document.getElementById(`indent${indentationLevel}`);
                                if (indentElement) {
                                    indentElement.classList.add('hidden');
                                }
                            } else {
                                newIndentationLevel = indentationLevel;
                            }
                        } else {
                            setIsDropping(true);
                            //setInitialClientOffset(monitor.getClientOffset());
                            return;
                        }
                        setIsDropping(true);
                        setInitialClientOffset(monitor.getClientOffset());
                        if (newIndentationLevel !== indentationLevel) {
                            setIndentationLevel(newIndentationLevel);
                        }
                    }
                }
            }
            
            return;
        }

        
        
        moveCodeBlock(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    });
  
    useEffect(() => {
        if (isDragging) {
          // Disable dragging for 1 second
          setCanDrag(false);
          const timeout = setTimeout(() => {
            setCanDrag(true);
            setIsDropping(false);
          }, 1000);
    
          return () => clearTimeout(timeout);
        }
      }, [isDropping]);

    drag(drop(ref));

    return (<div
    ref={ref}
    className="code-block"
    style={{
        opacity: isDragging ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        marginLeft: `${indentationLevel * 4}rem`,
    }}
    >
    {codeBlock.code}
    </div>);
  };
  

const ParsonsGenerateCode: React.FC<ParsonsGenerateCodeProps> = ({ prompt, editor })  => {
    const [isOpen, setIsOpen] = useState(true);
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const [checked, setChecked] = useState(true);
    const [generatedCode, setGeneratedCode] = useState('');
    const [initialCodeBlocks, setInitialCodeBlocks] = useState<CodeBlock[]>([]);
    const [orderedCodeBlocks, setOrderedCodeBlocks] = useState<CodeBlock[]>([]);
    const sectionHeightRef = useRef<number>(0);
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
                                setGeneratedCode(text);
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
        sectionHeightRef.current = (responseCodeObject.length + 3) * 60;
    }, [generatedCode]);



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
  

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {isOpen && (
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
                        <div className="parsons-problem">
                            <div className="left-section-container" ref={leftDropRef}>
                            <h2>Code Blocks</h2>
                            <div className="left-section" ref={leftDrop} style={{ height: `${sectionHeightRef.current}px` }}>
                                {initialCodeBlocks.map((codeBlock, index) => (
                                <CodeBlockItem key={codeBlock.id} codeBlock={codeBlock} index={index} moveCodeBlock={(dragIndex, hoverIndex) => moveCodeBlock(dragIndex, hoverIndex, false)} />
                                ))}
                            </div>
                            </div>
                            <div className="right-section-container" ref={rightDropRef}>
                            <h2>Ordered Code</h2>
                            <div className="right-section" ref={rightDrop} style={{ height: `${sectionHeightRef.current}px` }}>
                                {orderedCodeBlocks.map((codeBlock, index) => (
                                <React.Fragment key={codeBlock.id}>
                                <CodeBlockItem codeBlock={codeBlock} index={index} moveCodeBlock={(dragIndex, hoverIndex) => moveCodeBlock(dragIndex, hoverIndex, true)} />
                                </React.Fragment>
                                ))}
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <div key={index} className="vertical-line hidden" id={`indent${index + 1}`} style={{ left: `${4 * (index+1)}rem` }}></div>
                                ))}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closePopup}>
                            Insert Code
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParsonsGenerateCode;
