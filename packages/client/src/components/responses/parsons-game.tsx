import React, { useEffect, createContext, useState, useContext } from "react";
import { DragDropContext, DragStart, Draggable, DraggableProvided, DraggableStateSnapshot, DropResult, Droppable } from "react-beautiful-dnd";
import { convertTime } from "../../utils/shared";
import { BsArrowBarLeft, BsArrowBarRight, BsArrowBarDown, BsArrowBarUp } from 'react-icons/bs';
import { HighlightedPart, HighlightedPartWithoutTab } from "../docs/highlight-code";
import { apiLogEvents, logError } from "../../api/api";
import { AuthContext } from "../../context";


interface ParsonsGameProps {
    tasksOri: IDraggableTask[];
    sectionHeight?: number;
    taskID: string;
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

function jaccardSimilarityIndex(str1: string, str2: string): boolean {
    // Remove spaces from both strings and compare for exact identity
    const trimmedStr1 = str1.replace(/\s/g, "");
    const trimmedStr2 = str2.replace(/\s/g, "");
    return trimmedStr1 === trimmedStr2;
  }

export const ParsonsGame: React.FC<ParsonsGameProps> = ({ tasksOri, sectionHeight, taskID }) => {
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
    const [wrongIdObjects, setWrongIdObjects] = useState<any[]>([]);
    const [maxIndent, setMaxIndent] = useState(0);
    const { context, setContext } = useContext(AuthContext);
    const [numberOfHorizontalMovements, setNumberOfHorizontalMovements] = useState(0);
    const [numberOfVerticalMovements, setNumberOfVerticalMovements] = useState(0);
    const [submitBeyoundTimeOut, setSubmitBeyoundTimeOut] = useState(false);
    const [numberOfRetry, setNumberOfRetry] = useState(0);
    const [currentMovement, setCurrentMovement] = useState("");

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

    if(currentMovement === "horizontal"){
      console.log("horizontal");
      setNumberOfHorizontalMovements(numberOfHorizontalMovements + 1);

    }else if(currentMovement === "vertical"){
      console.log("vertical");
      setNumberOfVerticalMovements(numberOfVerticalMovements + 1);
    }

    setCurrentMovement("");

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
    console.log("vertical");
    setNumberOfVerticalMovements(numberOfVerticalMovements + 1);
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
            const differenceY = e.clientY - taskBeingDragged.currentMouseXPosition!;
            // console.log(e.clientX, taskBeingDragged.currentMouseXPosition, difference);
            if (difference >= 100) {
                setCurrentMovement("horizontal");
                taskBeingDragged.indentationLevel++;
                taskBeingDragged.currentMouseXPosition = e.clientX;
                setColumns({ ...columns });
            } else if (difference <= -10) {
                setCurrentMovement("horizontal");
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

    useEffect(() => {
      const maxIndentFromDone = Math.max(...columns.done.items.map(item => item.indentationLevel));
      setMaxIndent(maxIndentFromDone);

  }, [columns.done.items]);




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
        // const allTrue = tasks.every((task) => task.inputCorrect === true);
        // setInputCorrect(allTrue);

        // check if all tasks are in the done column
        if(columns.done.items.length === tasks.length){
          const isSequential = areIdsSequential();
          console.log(isSequential, areWantedIndentationsEqual());
          // setCompleted(allTrue);
          setCompleted(isSequential && areWantedIndentationsEqual());
        }

      }, [tasks, columns]);


      useEffect(() => {
        const id = setInterval(() => {
            setElapsedTime(Date.now() - startTime);

            // is there enough time to continue?
            if (elapsedTime / 1000 > timeLimit) {
              setTimeUp(true);
              setSubmitBeyoundTimeOut(true);
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
      let wrongObjects = [];
    
      for (let i = 0; i < doneIds.length; i++) {
        if (doneIds[i] !== i+1) {
          wrongObjects.push({
            id: doneIds[i],
            shouldMoveDown: doneIds[i] > i+1,
            shouldMoveUp: doneIds[i] < i+1,
          });
          wrong.push(doneIds[i]);
        }
      }
    
      if (wrong.length > 0) {
        setWrongIds(wrong);
        setWrongIdObjects(wrongObjects);
        return false;
      }else{
        return true;
      }
    
    }

    const VerticalLines: React.FC = () => {
      return (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
            key={i}  
            className="indent-line" 
            style={{ 
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${3 * (i+1)}rem`,
              width: '1px',
              opacity: i < maxIndent ? 0.2 : 0,
            }}
            id={`indent-line-${i+1}`} 
            />
          ))}
        </>
      );
    };
         
  
    function checkCode() {
        setNumberOfRetry(numberOfRetry + 1);
        if (completed) {
          setGameOver(true);

        } else {
            //remove all borders first
            for (let i = 1; i <= tasks.length; i++) {
              const divElement = document.getElementById("drag" + i);
              if (divElement) {
                divElement.style.border = "none";
              }
              const arrowElement = document.getElementById("indent" + i);
                  if (arrowElement) {
                    arrowElement.style.display = "none";
              }

              const upElement = document.getElementById("idElement" + i);
                  if (upElement) {
                    upElement.style.display = "none";
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

            const indentationWrongBlocks = columns.done.items.filter(item => item.wantedIndentation !== item.indentationLevel);

            //log identationWrongBlocks, and wrongIds
            // - submission event:
            // - number of incorrectly placed items: {number}
            // - number of correctly placed items: {number}
            apiLogEvents(
              context?.token,
              taskID,
              "submission event parsons",
              {
                type: "submission event parsons",
                "number_of_incorrectly_placed_items": wrongIds.length,
                "incorrectly_placed_items": wrongIds,
                "number_of_correctly_placed_items": columns.done.items.length - wrongIds.length,
                "number_of_incorrrectly_indented_items": indentationWrongBlocks.length,
                "incorrectly_indented_items": indentationWrongBlocks.map(item => item.id),
              },
            )
              .then(() => {})
              .catch((error) => {
                  logError("sendLog: " + error.toString());
            });


            //if indentations are wrong
            if(!areWantedIndentationsEqual()){
              columns.done.items.forEach(item => {
                if (item.wantedIndentation !== item.indentationLevel) {
                  const divElement = document.getElementById("indent" + item.id);
                  if (divElement) {
                    divElement.style.display = "block";
                  }
                }
              });

            }
            //if the order is wrong
            if(!areIdsSequential()){
              console.log(wrongIds);
              for (const wrongId of wrongIds) {
                const divElement = document.getElementById("drag" + wrongId);
                const idElements = document.getElementById("idElement" + wrongId);
                if (idElements) {
                  idElements.style.display = "block";
                }
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

    useEffect(() => {
      const interval = setInterval(() => {
        if (document.getElementById('send-log')) {
          
          // mid priority:
          // - movement event:
          //   - is initial drag from left blocks? {boolean} (used to filter out)
          //   - horizontal movement: {number}
          //   - vertical movement: {number}
          //   - relative_correctness: { obj } // if it can be determined for each movement
          apiLogEvents(
              context?.token,
              taskID,
              "movement event parsons",
              {
                  type: "movement event parsons",
                  "horizontal_movement": numberOfHorizontalMovements,
                  "vertical_movement": numberOfVerticalMovements,
                  "submit_beyound_time_out": submitBeyoundTimeOut,
                  "total_number_of_retry": numberOfRetry,
              },
            )
              .then(() => {})
              .catch((error) => {
                  logError("sendLog: " + error.toString());
          });

          clearInterval(interval); 
        }
      }, 1000); 
      return () => clearInterval(interval);
  }, []);  

  return (
    <>
    {
    <div className="submit-urgent-message">
        {/* {!timeUp && 
        <><span>You have <strong>{convertTime(timeLimit)}</strong> mins to finish the game!</span>

        <span className="time-indicator">
            {convertTime(elapsedTime / 1000)}
        </span>
        </>
        } */}
        {/* {!gameOver && 
            <button 
                disabled={columns.done.items.length != tasks.length} 
                type="button" 
                className={`parson-hint-button btn btn-secondary ${columns.done.items.length !== tasks.length ? 'disabled' : ''}`} 
                onClick={checkCode}>
                Hint
            </button>
        } */}

        {!gameOver && 
            <button 
                disabled={columns.done.items.length != tasks.length} 
                type="button" 
                className={`check-button btn btn-secondary ${columns.done.items.length !== tasks.length ? 'disabled' : ''}`} 
                onClick={checkCode}>
                Check Code
            </button>
        }
        {/* {timeUp &&
        <button
          type="button"
          className="continue-button btn btn-secondary"
          onClick={() => setGameOver(true)}
        >
          Continue
        </button>
        } */}
        {gameOver && <span id="game-over" style={{opacity:0}}>Game Over</span>}
        {gameOver && <span id="send-log" style={{opacity:0}}>Game Over</span>}
    </div>
    }
    <div className="parsons-problem">
    <div style={{ display: "flex", justifyContent: "center", height: "100%", width: "100%" }}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} onDragStart={(start) => onDragStart(start)}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <div style={{ display: "flex", flexDirection: "column" }} key={columnId} className={`parsons-game-${index}`}>
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="div-droppable">
                  {columnId === 'done' && <VerticalLines/>}
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            marginLeft: `${item.indentationLevel == 0 ? '5px' : `${3 * item.indentationLevel}rem`}`,
                            ...provided.draggableProps.style,
                            display: "flex",
                          }}
                          id = {"drag"+item.id}
                          className="parsons-game-draggable"
                        >
                          {item.wantedIndentation < item.indentationLevel ? <BsArrowBarLeft id={"indent"+item.id} className="arrow-left"/> : item.wantedIndentation > item.indentationLevel && <BsArrowBarRight id={"indent"+item.id} className="arrow-right"/> }

                          {(wrongIdObjects.length>0 && wrongIds.findIndex(i => i == parseInt(item.id)) >= 0) && wrongIdObjects[wrongIds.findIndex(i => i == parseInt(item.id))].shouldMoveUp ? 
                          <BsArrowBarUp id={"idElement"+item.id} className="arrow-up"/> : 
                          <BsArrowBarDown id={"idElement"+item.id} className="arrow-down"/> 
                          }
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
                            
                            {/* {part} */}
                            <HighlightedPart part={part} />
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