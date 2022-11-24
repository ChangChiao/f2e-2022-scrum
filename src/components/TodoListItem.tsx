import React from "react";
import DraggablePortalHandler from "@/components/DraggablePortalHandler";
import { Draggable, DraggingStyle } from "react-beautiful-dnd";

type TodoListItem = {
  id: string;
  text: string;
  index: number;
};

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle) => {
  return {
    ...draggableStyle,
    userSelect: "none",
    position: isDragging ? "absolute" : "static",
    background: isDragging ? "#ededed" : "#fff",
  };
};

function TodoListItem({ id, text, index }: TodoListItem) {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <DraggablePortalHandler snapshot={snapshot}>
          <li
            className="flex items-center justify-center h-20 px-4 mb-4 bg-white border rounded-lg cursor-pointer border-blue-dark"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={{
            //   ...provided.draggableProps.style,
            //   position: "static",
            //   padding: 0,
            // }}
            // @ts-ignore
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style as DraggingStyle
            )}
          >
            {text}
          </li>
        </DraggablePortalHandler>
      )}
    </Draggable>
  );
}

export default TodoListItem;
