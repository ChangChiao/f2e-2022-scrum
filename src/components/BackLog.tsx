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

  const [contentList, setContentList] = useState<Partial<BackLogItem>[]>([
    {
      id: "A1",
      point: 8,
      text: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
    },
    { id: "A2", point: 8, text: "前台職缺列表、應徵" },
    { id: "A3", point: 5, text: "應徵者的線上履歷編輯器" },
    { id: "A4", point: 15, text: "會員系統（登入、註冊、權限管理）" },
  ]);

  const [finishedList, setFinishedList] = useState<Partial<BackLogItem>[]>([
    {},
    {},
    {},
  ]);

  const checkPoint = () => {
    const result = finishedList.reduce((a, b) => a + b.point!, 0);
    return result <= 20;
  };

  const isEmptyObj = (obj: Object) => Object.keys(obj).length === 0;

  const getType = (id: string, key?: string) => {
    if (key === "type") {
      return id.split("-")[1];
    }
    console.log("xxx", id.split("-")[2]);

    return Number(id.split("-")[2]);
  };

  const handleDragEnd = (event: DropResult) => {
    const { source, destination } = event;

    console.log(" source, destination", source, destination);

    if (!destination) {
      return;
    }
    const isSameZone =
      getType(destination.droppableId, "type") ===
      getType(source.droppableId, "type");

    const sourceIndex = getType(source.droppableId) as number;
    const destinationIndex = getType(destination.droppableId) as number;

    console.log("sourceIndex", sourceIndex);
    console.log("destinationIndex", destinationIndex);

    const sourceItems = [...contentList];
    const destinationItems = [...finishedList];
    // 同一區
    if (isSameZone) {
      if (destination.droppableId.startsWith("drop-source")) {
        console.log("1111");
        [sourceItems[sourceIndex], sourceItems[destinationIndex]] = [
          sourceItems[destinationIndex],
          sourceItems[sourceIndex],
        ];
        // const [remove] = sourceItems.splice(sourceIndex, 1);
        // sourceItems.splice(destinationIndex, 0, remove);
        setContentList(sourceItems);
      } else {
        console.log("2222");
        [destinationItems[sourceIndex], destinationItems[destinationIndex]] = [
          destinationItems[destinationIndex],
          destinationItems[sourceIndex],
        ];
        // const [remove] = destinationItems.splice(sourceIndex, 1);
        // destinationItems.splice(destinationIndex, 0, remove);
        setFinishedList(destinationItems);
      }

      return;
    }
    if (destination.droppableId.startsWith("drop-source")) {
      const [remove] = destinationItems.splice(sourceIndex, 1, {});
      if (isEmptyObj(sourceItems[destinationIndex])) {
        sourceItems[destinationIndex] = remove;
      } else {
        sourceItems.splice(destinationIndex, 0, remove);
      }
      //   sourceItems.splice(destinationIndex, 0, remove as BackLogItem);
      setContentList(sourceItems);
      setFinishedList(destinationItems);
      console.log("3333");
    } else {
      const [remove] = sourceItems.splice(sourceIndex, 1, {});
      console.log("remove", remove);

      if (isEmptyObj(destinationItems[destinationIndex])) {
        destinationItems[destinationIndex] = remove;
      } else {
        destinationItems.splice(destinationIndex, 0, remove);
      }
      setContentList(sourceItems);
      setFinishedList(destinationItems);
      console.log("4444");
    }

    // setTimeout(() => {
    //   console.log("setContentList", contentList);
    //   console.log("setFinishedList", finishedList);
    // }, 3000);
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
    console.log("contentList", contentList);
  }, [contentList]);

  useEffect(() => {
    console.log("setFinishedList", finishedList);
  }, [finishedList]);

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
              {/* <Droppable droppableId="drop-destination"> */}
              {/* {(provided, snapshot) => ( */}
              <div className="relative h-[400px] w-[300px]">
                {contentList.map((item, i) => (
                  <BackLogItem
                    key={`finish-${i}`}
                    {...item}
                    type="source"
                    index={i}
                  />
                ))}
              </div>
              {/* )} */}
              {/* </Droppable> */}
            </div>
          </div>

          <div
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
              {finishedList.map((item, i) => (
                <BackLogItem
                  key={`undo-${i}`}
                  type="destination"
                  {...item}
                  index={i}
                />
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
        </div>
      </DragDropContext>
    </div>
  );
}

export default BackLog;
