import React, { useCallback, useEffect, useRef, useState } from 'react';
import robot from "../assets/robot.png";
import { XYCoord, useDrag, useDrop } from 'react-dnd';

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
  

const ParsonsGenerateCode: React.FC<ParsonsGenerateCodeProps> = ({ prompt })  => {
    const [isOpen, setIsOpen] = useState(true);
    const responseCodeObject:CodeBlock[] = [
        { id: 1, code: 'for (let i = 0; i < 10; i++) {' },
        { id: 2, code: 'console.log(i);' },
        { id: 3, code: '}' },
    ];
    const [initialCodeBlocks, setInitialCodeBlocks] = useState<CodeBlock[]>(responseCodeObject);
    const [orderedCodeBlocks, setOrderedCodeBlocks] = useState<CodeBlock[]>([]);

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

    const leftSectionHeight = (responseCodeObject.length + 3) * 60;
    const rightSectionHeight = (responseCodeObject.length + 3) * 60;


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
                            <div className="left-section" ref={leftDrop} style={{ height: `${leftSectionHeight}px` }}>
                                {initialCodeBlocks.map((codeBlock, index) => (
                                <CodeBlockItem key={codeBlock.id} codeBlock={codeBlock} index={index} moveCodeBlock={(dragIndex, hoverIndex) => moveCodeBlock(dragIndex, hoverIndex, false)} />
                                ))}
                            </div>
                            </div>
                            <div className="right-section-container" ref={rightDropRef}>
                            <h2>Ordered Code</h2>
                            <div className="right-section" ref={rightDrop} style={{ height: `${rightSectionHeight}px` }}>
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
