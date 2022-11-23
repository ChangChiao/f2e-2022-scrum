import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Test() {
  const [todo, setTodo] = useState([
    {
      id: "aaa",
      text: "Learn React",
    },
    {
      id: "bbb",
      text: "Learn Redux",
    },
    {
      id: "ccc",
      text: "Watch TV",
    },
  ]);
  return (
    <DragDropContext
      onDragEnd={(result) => {
        console.log(result);
        const { source, destination, draggableId } = result;
        if (!destination) {
          return;
        }

        let arr = Array.from(todo);
        console.log(arr);
        const [remove] = arr.splice(source.index, 1);
        arr.splice(destination.index, 0, remove);
        setTodo(arr);
      }}
    >
      <Droppable droppableId="d">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todo.map((t, i) => (
              <Draggable key={t.id} draggableId={t.id} index={i}>
                {(p) => (
                  <div
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    key={t.id}
                    style={{ willChange: "unset" }}
                  >
                    {t.text}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Test;
