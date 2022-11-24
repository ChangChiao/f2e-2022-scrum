import React from "react";
import DraggablePortalHandler from "@/components/DraggablePortalHandler";
import { Draggable, DraggingStyle } from "react-beautiful-dnd";

type BackLogItem = {
  id: string;
  text: string;
  point: number;
  index: number;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    ...draggableStyle,
    userSelect: "none",
    position: isDragging ? "absolute" : "static",
  };
};

function BackLogItem({ id, text, index, point }: BackLogItem) {
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
            {text}
            <span className="text-white rounded-xl bg-blue-dark">{point}</span>
          </li>
        </DraggablePortalHandler>
      )}
    </Draggable>
  );
}

export default BackLogItem;
