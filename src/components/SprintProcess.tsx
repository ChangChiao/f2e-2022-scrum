import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import TodoListItem from "@/components/TodoListItem";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as PawPrint } from "@/assets/paw_print.svg";
import { ReactComponent as Over } from "@/assets/over.svg";
import mouse from "@/assets/mouse.png";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

function SprintProcess() {
  const { nextStep, activeStep } = useStep();
  const [isDone, setIsDone] = useState(false);
  const [isShowError, setError] = useState(false);

  type ProcessProps = {
    [key: string]: { id: string; text: string } | undefined;
  };

  const [contentList, setContentList] = useState([
    {
      id: "A1",
      text: "每日站立會議 Daily Scrum",
    },
    { id: "A2", text: "短衝檢視會議Sprint Review" },
    { id: "A3", text: "短衝自省會議Sprint Retrospective" },
  ]);

  const [finishedList, setFinishedList] = useState<ProcessProps>({
    A1: undefined,
    A2: undefined,
    A3: undefined,
  });

  const getType = (id: string) => {
    return id.split("-")[2];
  };

  const getPrefix = (id: string) => {
    return id.substring(0, id.lastIndexOf("-"));
  };

  const getId = (id: string) => {
    return id.substring(id.lastIndexOf("-") + 1, id.length);
  };

  const handleDragEnd = (event: DropResult) => {
    const { source, destination } = event;

    console.log(" source, destination", source, destination);

    if (!destination) {
      return;
    }

    const sourceItems = [...contentList];
    const targetItems = { ...finishedList };
    // 同一區
    if (getPrefix(destination.droppableId) === getPrefix(source.droppableId)) {
      if (destination.droppableId === "drop-source") {
        const [remove] = sourceItems.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, remove);
        setContentList(sourceItems);
      }
      const from = getId(source.droppableId);
      const to = getId(destination.droppableId);
      const copyFrom = finishedList[from];
      const copyTo = finishedList[to];
      if (!copyTo) {
        finishedList[from] = undefined;
      } else {
        finishedList[from] = copyTo;
      }
      finishedList[to] = copyFrom;
      setFinishedList(finishedList);
      return;
    }
    const targetId = getType(destination.droppableId);
    if (destination.droppableId === "drop-source") {
      //放回去
      const remove = targetItems[targetId];
      targetItems[targetId] = undefined;
      if (!remove) return;
      sourceItems.splice(destination.index, 0, remove);
      setContentList(sourceItems);
      setFinishedList(targetItems);
    } else {
      const [remove] = sourceItems.splice(source.index, 1);
      if (targetItems[targetId]) {
        return;
      }
      targetItems[targetId] = remove;
      setContentList(sourceItems);
      setFinishedList(targetItems);
    }
  };

  const isCorrect = () => {
    for (let key in finishedList) {
      if (key !== finishedList[key]?.id) {
        return false;
      }
    }
    return true;
  };
  const checkAnswer = () => {
    console.log("finishedList", finishedList);

    if (!isCorrect()) {
      setError(true);
      console.log("fail");

      return;
    }
    setIsDone(true);
  };

  useEffect(() => {
    console.log("finishedList", finishedList);
  }, [finishedList]);

  return (
    <div className="relative wrapper">
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
          <div>
            <Droppable droppableId="drop-destination-A1">
              {(provided, snapshot) => (
                <div
                  className="relative mx-auto h-[100px] w-[300px] border-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {finishedList.A1 && (
                    <TodoListItem
                      key={`daily`}
                      {...finishedList.A1}
                      index={0}
                    />
                  )}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="drop-destination-A2">
              {(provided, snapshot) => (
                <div
                  className="relative my-20 mx-auto h-[100px] w-[300px] border-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {finishedList.A2 && (
                    <TodoListItem
                      key={`daily`}
                      {...finishedList.A2}
                      index={0}
                    />
                  )}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="drop-destination-A3">
              {(provided, snapshot) => (
                <div
                  className="relative  h-[100px] w-[300px] border-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {finishedList.A3 && (
                    <TodoListItem
                      key={`daily`}
                      {...finishedList.A3}
                      index={0}
                    />
                  )}
                </div>
              )}
            </Droppable>
          </div>
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
                      <TodoListItem key={`todo-${i}`} {...item} index={i} />
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
            <button className="btn" onClick={checkAnswer}>
              下一步
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default SprintProcess;
