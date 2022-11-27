import React from "react";
import DraggablePortalHandler from "@/components/DraggablePortalHandler";
import { Draggable, DraggingStyle } from "react-beautiful-dnd";
import { ReactComponent as Check } from "@/assets/check.svg";
import clsx from "clsx";

type TodoListItem = {
  id: string;
  text: string;
  index: number;
  point?: number;
  isCheck?: boolean;
  isRed?: boolean;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    ...draggableStyle,
    userSelect: "none",
    opacity: isDragging ? 0.5 : 1,
    position: isDragging ? "absolute" : "static",
  };
};

function TodoListItem({
  id,
  text,
  index,
  point,
  isCheck,
  isRed,
}: TodoListItem) {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <DraggablePortalHandler snapshot={snapshot}>
          <li
            className="relative flex items-center h-20 px-4 mb-4 bg-white border rounded-lg cursor-pointer border-gray-light"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {point && (
              <span
                className={clsx(
                  "h-10 w-10 rounded-full bg-blue-dark text-center text-lg leading-10 text-white",
                  isRed && "bg-red-default"
                )}
              >
                {point}
              </span>
            )}
            <p
              className={clsx(
                "relative w-[90%] pl-[3%]",
                isRed && "text-red-default"
              )}
            >
              {text}
              {isCheck && <Check className="absolute -bottom-4 -right-12" />}
            </p>
          </li>
        </DraggablePortalHandler>
      )}
    </Draggable>
  );
}

export default TodoListItem;
