import React from "react";
import DraggablePortalHandler from "@/components/DraggablePortalHandler";
import { Draggable, Droppable } from "react-beautiful-dnd";

type BackLogItem = {
  id: string;
  text: string;
  point: number;
  index: number;
  type: string;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    ...draggableStyle,
    userSelect: "none",
    position: isDragging ? "absolute" : "static",
  };
};

function BackLogItem({ id, text, index, point, type }: Partial<BackLogItem>) {
  return (
    <Droppable droppableId={`drop-${type}-${index}`}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            className="mb-4 h-20 w-[300px] rounded-xl border-2 border-dashed border-gray-light"
            ref={provided.innerRef}
          >
            {id ? (
              <Draggable
                key={id}
                draggableId={`drag-${type}-${id}`}
                index={index as number}
              >
                {(provided, snapshot) => (
                  <DraggablePortalHandler snapshot={snapshot}>
                    <div
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
                      <span className="text-white rounded-xl bg-blue-dark">
                        {point}
                      </span>
                    </div>
                  </DraggablePortalHandler>
                )}
              </Draggable>
            ) : (
              <></>
            )}
          </div>
        );
      }}
    </Droppable>
  );
}

export default BackLogItem;
