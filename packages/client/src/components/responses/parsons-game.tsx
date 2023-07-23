import React, { useEffect, useState } from "react";
import { DragDropContext, DragStart, Draggable, DraggableProvided, DraggableStateSnapshot, DropResult, Droppable } from "react-beautiful-dnd";

interface ParsonsGameProps {
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
    indentationLevel: number;
    currentMouseXPosition?: number;
    onDest: boolean;
  }

// Add indentationLevel to each task
const tasks = [
  { id: "1", content: "First task", indentationLevel: 0, onDest: false},
  { id: "2", content: "Second task", indentationLevel: 0, onDest: false},
  { id: "3", content: "Third task", indentationLevel: 0, onDest: false },
  { id: "4", content: "Fourth task", indentationLevel: 0, onDest: false },
  { id: "5", content: "Fifth task", indentationLevel: 0, onDest: false},
];

const taskStatus = {
  requested: { name: "Code Blocks", description: "Drag from here", items: tasks },
  done: { name: "Ordered Code", description: "Construct your solution here, including indents", items: [] },
};




const ParsonsGame: React.FC<ParsonsGameProps> = ({ sectionHeight }) => {
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
  
  return (
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
                          className="parsons-game-draggable"
                        >
                          <div className="parsons-token">{item.content}</div>
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
  );
};

export default ParsonsGame;