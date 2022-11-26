import React from "react";
import DraggablePortalHandler from "@/components/DraggablePortalHandler";
import { Draggable, DraggingStyle } from "react-beautiful-dnd";

type TodoListItem = {
  id: string;
  text: string;
  index: number;
  point?: number;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    ...draggableStyle,
    userSelect: "none",
    opacity: isDragging ? 0.5 : 1,
    position: isDragging ? "absolute" : "static",
  };
};

function TodoListItem({ id, text, index, point }: TodoListItem) {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <DraggablePortalHandler snapshot={snapshot}>
          <li
            className="flex items-center h-20 px-4 mb-4 bg-white border rounded-lg cursor-pointer border-blue-dark"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {point && (
              <span className="w-10 h-10 text-lg leading-10 text-center text-white rounded-full bg-blue-dark">
                {point}
              </span>
            )}
            <p className="w-[90%] pl-[3%]"> {text}</p>
          </li>
        </DraggablePortalHandler>
      )}
    </Draggable>
  );
}

export default TodoListItem;
