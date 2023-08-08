import React, { useEffect, createContext, useState } from "react";
import { DragDropContext, DragStart, Draggable, DraggableProvided, DraggableStateSnapshot, DropResult, Droppable } from "react-beautiful-dnd";
import { convertTime } from "../../utils/shared";


interface ParsonsGameProps {
    tasksOri: IDraggableTask[];
    sectionHeight?: number;
}

interface IColumn {
    name: string;
    description: string;
    items: IDraggableTask[];
  }
  
  type ColumnsType = { [key: string]: IColumn };
  
  interface IDraggableTask {
    id: string;
    content: string;
    answer: string;
    indentationLevel: number;
    currentMouseXPosition?: number;
    onDest: boolean;
    inputCorrect: boolean;
    wantedIndentation: number;
  }

// Add indentationLevel to each task
// const tasks = [
//   { id: "1", content: "First task", indentationLevel: 0, onDest: false},
//   { id: "2", content: "Second task", indentationLevel: 0, onDest: false},
//   { id: "3", content: "Third task", indentationLevel: 0, onDest: false },
//   { id: "4", content: "Fourth task", indentationLevel: 0, onDest: false },
//   { id: "5", content: "Fifth task", indentationLevel: 0, onDest: false},
// ];
function jaccardSimilarityIndex(str1: string, str2: string): boolean {
    // Remove spaces from both strings and compare for exact identity
    const trimmedStr1 = str1.replace(/\s/g, "");
    const trimmedStr2 = str2.replace(/\s/g, "");
    return trimmedStr1 === trimmedStr2;
  }

  
  
  



export const ParsonsGame: React.FC<ParsonsGameProps> = ({ tasksOri, sectionHeight }) => {
    const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
    const [inputCorrect, setInputCorrect] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);
    const [indentationCorrect, setIndentationCorrect] = useState<boolean>(false);
    const [orderedIds, setOrderedIds] = useState<string[]>([]);
    const [tasks, setTasks] = useState<IDraggableTask[]>(tasksOri);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [gameOver, setGameOver] = useState(false);
    const [wrongIds, setWrongIds] = useState<Number[]>([]);
    //for each of the line, add 30 seconds
    const timeLimit = 60 * tasks.length;

    const taskStatus = {
        requested: { name: "Code Blocks", description: "Drag from here", items: tasks },
        done: { name: "Ordered Code", description: "Construct your solution here, including indents", items: [] },
      };
    const [columns, setColumns] = useState<ColumnsType>(taskStatus);
    const [taskBeingDragged, setTaskBeingDragged] = useState<IDraggableTask | null>(null);

    const onDragEnd = (result: DropResult, columns: any, setColumns: React.Dispatch<React.SetStateAction<any>>) => {
        if (!result.destination) return;
        const { source, destination } = result;

  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
  
      // Detect the direction and set onDest value
      if (destination.droppableId === 'done') {
        removed.onDest = true;
      } else if (destination.droppableId === 'requested') {
        removed.onDest = false;
      }
  
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({ 
        ...columns, 
        [source.droppableId]: { ...column, items: copiedItems },
      });

      const updatedTasks = tasks.map((task) => ({ ...task }));
    const movedTask = updatedTasks.find((task) => task.id === removed.id);
    if (movedTask) {
    // Filter out the moved task from the updatedTasks array
    updatedTasks.splice(source.index, 1);

    // Insert the moved task at the new destination index
    updatedTasks.splice(destination.index, 0, movedTask);

    // Update the state with the new updatedTasks array
    setTasks(updatedTasks);
    }
    }
  
    setTaskBeingDragged(null);
  };

    const onDragStart = (start: DragStart) => {
        const column = columns[start.source.droppableId];
        const task = column.items[start.source.index] as IDraggableTask;
        task.currentMouseXPosition = start.source.index;
        setTaskBeingDragged(task);
        setColumns({...columns});
    };
 
    const handleMouseMove = (e: MouseEvent) => {
        if (taskBeingDragged && taskBeingDragged.onDest) {
            const difference = e.clientX - taskBeingDragged.currentMouseXPosition!;
            // console.log(e.clientX, taskBeingDragged.currentMouseXPosition, difference);
            if (difference >= 100) {
                if(taskBeingDragged.indentationLevel === 7) return;
                taskBeingDragged.indentationLevel++;
                taskBeingDragged.currentMouseXPosition = e.clientX;
                setColumns({ ...columns });
            } else if (difference <= -10) {
                taskBeingDragged.indentationLevel = Math.max(
                0,
                taskBeingDragged.indentationLevel - 1
                );
                taskBeingDragged.currentMouseXPosition = e.clientX;
                setColumns({ ...columns });
            }
        }
    };
    
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [columns]);



    const handleInputChange = (itemId: string, inputIndex: number, inputValue: string) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [itemId]: {
              ...prevInputValues[itemId],
              [inputIndex]: inputValue,
            },
          }));

          const updatedTasks = tasks.map((task) => ({ ...task }));
      
          const lineContent = tasks.find((task) => task.id === itemId)?.content;
          const lines = lineContent?.split("{input}");
          if (lines && lines.length > inputIndex + 1) {
            const line = `${lines.slice(0, inputIndex + 1).join(inputValue)}${inputValue}${lines.slice(inputIndex + 1).join("")}`;
      
            // Get the corresponding item
            const item = tasks.find((task) => task.id === itemId);
      
      
          // Calculate the Jaccard similarity index between line and item.answer
          const similar = jaccardSimilarityIndex(line, item!.answer);
      
          if (similar) {
            // Set the answerList to true for the corresponding input of the item
            updatedTasks.find((task) => task.id === itemId)!.inputCorrect = true;
          } else {
            // Set the answerList to false for the corresponding input of the item
            updatedTasks.find((task) => task.id === itemId)!.inputCorrect = false;
            
          }
          setTasks(updatedTasks);
        }
      };

      useEffect(() => {
        // Check if all inputCorrect properties are true for each task
        const allTrue = tasks.every((task) => task.inputCorrect === true);
        setInputCorrect(allTrue);
        const isSequential = areIdsSequential();
        console.log(allTrue, isSequential, areWantedIndentationsEqual());
        // setCompleted(allTrue);
        setCompleted(allTrue && isSequential && areWantedIndentationsEqual());
      }, [tasks, columns]);


      useEffect(() => {
        const id = setInterval(() => {
            setElapsedTime(Date.now() - startTime);

            // is there enough time to continue?
            if (elapsedTime / 1000 > timeLimit) {
              setTimeUp(true);
                setCompleted(true);
            }
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [startTime, elapsedTime]);
      
    function areWantedIndentationsEqual(): boolean {
      const currTasks = columns.done.items
      return currTasks.every((task) => task.wantedIndentation === task.indentationLevel);
    }

    function areIdsSequential() {
      if (columns.done.items.length !== tasks.length) {
        // console.log("Number of items in columns.done is different from tasks length");
        return false;
      }
    
      const doneIds = columns.done.items.map(item => parseInt(item.id));
      let wrong = [];
    
      for (let i = 0; i < doneIds.length; i++) {
        if (doneIds[i] !== i+1) {
          wrong.push(doneIds[i]);
        }
      }
    
      if (wrong.length > 0) {
        setWrongIds(wrong);
        return false;
      }else{
        return true;
      }
    
    }
         
  
    function checkCode(){
        if (completed) {
          setGameOver(true);

        } else {
            //remove all borders first
            for (let i = 1; i <= tasks.length; i++) {
              const divElement = document.getElementById("drag" + i);
              if (divElement) {
                divElement.style.border = "none";
              }
            }
            tasks.forEach(task => {
              task.content.split("{input}").forEach((part, index) => {
                if (index > 0) {
                  const inputElement = document.getElementById(`input-${task.id}-${index - 1}`);
                  if (inputElement) {
                    inputElement.style.color = "black";
                  }
                }
              });
            });
            //if there are input wrong
            if(!inputCorrect){
              // Check for incorrect inputs
              tasks.forEach(task => {
                task.content.split("{input}").forEach((part, index) => {
                  if (index > 0 && !task.inputCorrect) {
                    const inputElement = document.getElementById(`input-${task.id}-${index - 1}`);
                    if (inputElement) {
                      inputElement.style.color = "red";
                    }
                  }
                });
              });

              // Check for correct inputs
              tasks.forEach(task => {
                task.content.split("{input}").forEach((part, index) => {
                  if (index > 0 && task.inputCorrect) {
                    const inputElement = document.getElementById(`input-${task.id}-${index - 1}`);
                    if (inputElement) {
                      inputElement.style.color = "green";
                    }
                  }
                });
              });
            }
            //if indentations are wrong
            if(!areWantedIndentationsEqual()){
            }
            //if the order is wrong
            if(!areIdsSequential()){
              //console.log(wrongIds);
              for (const wrongId of wrongIds) {
                const divElement = document.getElementById("drag" + wrongId);
                if (divElement) {
                  divElement.style.border = "2px solid red";
                }
              }
              //find the ids that are not in wrongids but in tasks
              const correctIds = tasks.map(task => parseInt(task.id)).filter(id => !wrongIds.includes(id));
              for (const correctId of correctIds) {
                const divElement = document.getElementById("drag" + correctId);
                if (divElement) {
                  divElement.style.border = "2px solid green";
                }
              }
            }
        }
    }

  return (
    <>
    {
    <div className="submit-urgent-message">
        {!timeUp && 
        <><span>Please finish the game sooner!</span>

        <span className="time-indicator">
            {convertTime(elapsedTime / 1000)}
        </span>
        </>
        }
        <button type="button" className="btn btn-secondary" onClick={checkCode}>
        Check
        </button>
        {gameOver && <span id="game-over" style={{opacity:0}}>Game Over</span>}
    </div>
    }
    <div className="parsons-problem">
    <div style={{ display: "flex", justifyContent: "center", height: "100%", width: "100%" }}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} onDragStart={(start) => onDragStart(start)}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <div style={{ display: "flex", flexDirection: "column" }} key={columnId} className={`parsons-game-${index}`}>
            <h2>{column.name}</h2>
            <p>{column.description}</p>
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{ padding: 4, height: sectionHeight ? `${sectionHeight}px` : 'auto' }}>
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            marginLeft: `${3 * item.indentationLevel}rem`,
                            ...provided.draggableProps.style,
                          }}
                          id = {"drag"+item.id}
                          className="parsons-game-draggable"
                        >
                          {item.content.split("{input}").map((part, index) => (
                            <React.Fragment key={index}>
                            {index > 0 ? (
                                <input
                                className={`parsons-game-input`}
                                id = {`input-${item.id}-${index - 1}`}
                                type="text"
                                onChange={(event) => handleInputChange(item.id, index - 1, event.target.value)}
                                value={(inputValues[item.id] && inputValues[item.id][index - 1]) || ""}
                                />
                            ) : null}
                            {part}
                            </React.Fragment>
                        ))}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
    </div>
    </>
  );
};