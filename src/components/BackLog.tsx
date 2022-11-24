import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";
import BackLogItem from "@/components/BackLogItem";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as PawPrint } from "@/assets/paw_print.svg";
import { ReactComponent as Polygon_1 } from "@/assets/Polygon 1.svg";
import { ReactComponent as Polygon_2 } from "@/assets/Polygon 2.svg";
import can from "@/assets/can.png";
import jira from "@/assets/jira.jpg";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type BackLogProps = {
  subStep: number;
  nextSubStep: () => void;
};

function BackLog({ subStep, nextSubStep }: BackLogProps) {
  const { nextStep } = useStep();
  const [isDone, setIsDone] = useState(false);
  const [isShowError, setError] = useState(false);

  type BackLogItem = {
    id: string;
    text: string;
    point: number;
  };

  const [contentList, setContentList] = useState([
    {
      id: "A1",
      point: 8,
      text: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
    },
    { id: "A2", point: 8, text: "前台職缺列表、應徵" },
    { id: "A3", point: 5, text: "應徵者的線上履歷編輯器" },
    { id: "A4", point: 15, text: "會員系統（登入、註冊、權限管理）" },
  ]);

  const [finishedList, setFinishedList] = useState<BackLogItem[]>([]);

  const checkPoint = () => {
    const result = finishedList.reduce((a, b) => a + b.point, 0);
    return result <= 20;
  };

  const handleDragEnd = (event: DropResult) => {
    const { source, destination } = event;

    console.log(" source, destination", source, destination);

    if (!destination) {
      return;
    }

    const sourceItems = [...contentList];
    const targetItems = [...finishedList];
    // 同一區
    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId === "drop-source") {
        const [remove] = sourceItems.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, remove);
        setContentList(sourceItems);
      } else {
        const [remove] = targetItems.splice(source.index, 1);
        targetItems.splice(destination.index, 0, remove);
        setFinishedList(targetItems);
      }
      return;
    }
    if (destination.droppableId === "drop-source") {
      const [remove] = targetItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, remove);
      setContentList(sourceItems);
      setFinishedList(targetItems);
    } else {
      const [remove] = sourceItems.splice(source.index, 1);
      targetItems.splice(destination.index, 0, remove);
      setContentList(sourceItems);
      setFinishedList(targetItems);
    }
  };
  const checkOrder = () => {
    const isPass = checkPoint();
    console.log("isPass", isPass);

    if (!isPass) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    setIsDone(true);
  };

  useEffect(() => {
    console.log("subStep", subStep);
  }, [subStep]);
  return (
    <div
      className={clsx(
        "absolute opacity-0",
        subStep === 1 && "relative opacity-100"
      )}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-between mt-20 drag">
          <div
            className={clsx([
              "relative h-[550px] w-[420px] rounded-3xl border-[20px] border-blue-light bg-white p-4",
              subStep === 1 &&
                "animate__animated animate__fadeInLeft animate__delay-1s",
            ])}
          >
            <div className="pt-8 pb-4 text-center title">
              產品待辦清單 (Product Backlog)
              <PawPrint className="inline-block mx-1" />
            </div>
            <div className="flex items-center justify-between">
              <Droppable droppableId="drop-destination">
                {(provided, snapshot) => (
                  <div
                    className="relative h-[400px] w-[300px]"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {/* {provided.placeholder} */}
                    {Array.from({ length: 4 }).map((item, i) => (
                      <div
                        className="absolute -z-10 mb-4 h-20 w-[300px] rounded-xl border-2 border-dashed border-gray-light"
                        style={{ top: `${i * 96}px` }}
                        key={`drop-${i}`}
                      ></div>
                    ))}
                    {finishedList.map((item, i) => (
                      <BackLogItem key={`finish-${i}`} {...item} index={i} />
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <Droppable droppableId="drop-source">
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={clsx(
                    "h-[400px] w-[300px]",
                    subStep === 1 &&
                      "animate__animated animate__fadeInRight animate__delay-1s"
                  )}
                >
                  <div className="pt-8 pb-4 text-center title">
                    短衝待辦清單 (Product Backlog)
                    <PawPrint className="inline-block mx-1" />
                  </div>
                  <ul className="relative h-[400px]">
                    {/* {provided.placeholder} */}
                    {contentList.map((item, i) => (
                      <BackLogItem key={`undo-${i}`} {...item} index={i} />
                    ))}
                  </ul>
                  <button
                    className={clsx(
                      "btn mt-10",
                      isShowError && "bg-red-600 text-white"
                    )}
                    onClick={checkOrder}
                  >
                    {isShowError ? (
                      <span>答錯了!再試試看吧!</span>
                    ) : (
                      <span>我完成了！</span>
                    )}
                  </button>
                </div>
              );
            }}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default BackLog;
