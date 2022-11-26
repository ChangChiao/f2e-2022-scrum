import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import TodoListItem from "@/components/TodoListItem";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as PawPrint } from "@/assets/paw_print.svg";
import { ReactComponent as Over } from "@/assets/over.svg";
import mouse from "@/assets/mouse.png";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

type TodoProps = {
  subStep: number;
  nextSubStep: () => void;
};

function DoubleList({ subStep, nextSubStep }: TodoProps) {
  const { nextStep } = useStep();
  const [isDone, setIsDone] = useState(false);
  const [isShowError, setError] = useState(false);
  const answer = ["A1", "A4", "A3", "A2"];

  type DoubleListItem = {
    id: string;
    text: string;
    point: number;
  };

  const [contentList, setContentList] = useState<DoubleListItem[]>([
    {
      id: "A1",
      point: 8,
      text: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
    },
    { id: "A2", point: 8, text: "前台職缺列表、應徵" },
    { id: "A3", point: 5, text: "應徵者的線上履歷編輯器" },
    { id: "A4", point: 15, text: "會員系統（登入、註冊、權限管理）" },
  ]);

  const [finishedList, setFinishedList] = useState<DoubleListItem[]>([]);

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

  const totalPoint = useMemo(() => {
    return finishedList.reduce((a, b) => {
      return (a += b.point);
    }, 0);
  }, [finishedList]);

  const checkPoint = () => {
    if (totalPoint > 20) {
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
    <div className={clsx("relative")}>
      <div
        className={clsx(
          "dialog mb-10",
          "animate__animated animate__fadeInDown animate__delay-1s"
        )}
      >
        <h2 className="title">換你試看看吧!</h2>
        <p>
          把 <span className="text-green-dark">「 產品待辦清單 」</span>
          的項目拖進{" "}
          <span className="text-green-dark">「 開發Ａ組的短衝待辦清單 」</span>
          裡吧 ！ 提示 ： 置入兩項以上的 Story ， 點數總和不能超過團隊負擔上限
          20 點唷 ！
        </p>
        <div className="text-white brand bg-blue-dark">賓士 :</div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-between mt-20 drag">
          <div
            className={clsx([
              "relative h-[550px] w-[420px] rounded-3xl border-[20px] border-blue-light bg-white p-4",
              "after:absolute after:-top-16 after:left-0 after:right-0 after:mx-auto after:h-[80px] after:w-[140px] after:bg-[url('/src/assets/list_clip.png')] after:bg-contain after:bg-no-repeat after:content-['']",
              "animate__animated animate__fadeInLeft animate__delay-1s",
            ])}
          >
            <div className="py-4 text-center">
              <h3 className="title">
                產品待辦清單
                <PawPrint className="inline-block mx-1" />
              </h3>
              <span>Product Backlog</span>
            </div>
            <div className="flex items-center justify-between">
              <Droppable droppableId="drop-source">
                {(provided, snapshot) => (
                  <div
                    className="relative mx-auto h-[400px] w-[300px]"
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
                    {contentList.map((item, i) => (
                      <TodoListItem key={`finish-${i}`} {...item} index={i} />
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <div
            className={clsx([
              "relative h-[550px] w-[420px] rounded-3xl border-[20px] border-red-default bg-white p-4",
              "after:absolute after:-top-16 after:left-0 after:right-0 after:mx-auto after:h-[80px] after:w-[140px] after:bg-[url('/src/assets/list_clip.png')] after:bg-contain after:bg-no-repeat after:content-['']",
              "animate__animated animate__fadeInLeft animate__delay-1s",
            ])}
          >
            <div className="py-4 text-center">
              <h3 className="title">
                開發Ａ組的短衝待辦清單
                <PawPrint className="inline-block mx-1" />
              </h3>
              <span>Sprint Backlog</span>
            </div>
            <div className="">
              <Droppable droppableId="drop-destination">
                {(provided, snapshot) => (
                  <div
                    className="relative mx-auto h-[300px] w-[300px]"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {/* {provided.placeholder} */}
                    {Array.from({ length: 3 }).map((item, i) => (
                      <div
                        className="absolute -z-10 mb-4 h-20 w-[300px] rounded-xl border-2 border-dashed border-gray-light"
                        style={{ top: `${i * 96}px` }}
                        key={`drop-${i}`}
                      ></div>
                    ))}
                    {finishedList.map((item, i) => (
                      <TodoListItem
                        key={`finish-${i}`}
                        {...item}
                        isRed={true}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </Droppable>
              <div className="relative">
                <img className="w-4/5 mx-auto" src={mouse} />
                {totalPoint > 20 && (
                  <Over className="absolute w-32 right-6 -bottom-2" />
                )}
                <span className="absolute text-3xl top-6 left-10 text-red-default">
                  共<strong className="px-4">{totalPoint}</strong>點
                </span>
              </div>
            </div>
            <button
              onClick={checkPoint}
              className={clsx(
                "btn relative -bottom-6 left-10 m-auto",
                (finishedList.length < 2 || totalPoint > 20) && "bg-gray-light"
              )}
            >
              我完成了！
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default DoubleList;
