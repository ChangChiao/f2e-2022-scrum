import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import TodoListItem from "@/components/TodoListItem";
import { useStep } from "@/components/provider/StepProvider";
import ModalPortal from "@/components/common/Modal";
import { ReactComponent as Line } from "@/assets/line.svg";
import cat_gray from "@/assets/cat-gray.png";
import fish from "@/assets/fish.png";

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

  const checkCount = useMemo(() => {
    return Object.values(finishedList).every((item) => item !== undefined);
  }, [finishedList]);

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
    const sourceId = getType(source.droppableId);
    if (destination.droppableId === "drop-source") {
      //放回去

      const remove = targetItems[sourceId];
      if (!remove) return;

      targetItems[sourceId] = undefined;
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
      if (key === "source") continue;
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
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    setIsDone(true);
  };

  useEffect(() => {
    console.log("finishedList", finishedList);
  }, [finishedList]);

  return (
    <div className="wrapper relative flex items-center justify-between  pt-[100px] 2xl:pt-0">
      <div className="w-1/6">
        <img className="ml-10" src={cat_gray} />
        <button
          className={clsx(
            "btn mt-10 ml-10",
            !checkCount && "bg-gray-dark",
            isShowError && "bg-red-600 text-white"
          )}
          onClick={checkAnswer}
        >
          {isShowError ? (
            <span>答錯了!再試試看吧!</span>
          ) : (
            <span>我完成了！</span>
          )}
        </button>
      </div>
      <div className="w-3/4">
        <div
          className={clsx(
            "dialog relative z-10 mx-auto",
            activeStep === 7 &&
              "animate__animated animate__fadeInDown animate__delay-1s"
          )}
        >
          <h2 className="title">換你試看看吧!</h2>
          <p>
            在這經典的 Surum 流程圖中 ， 這些流程分別代表哪一個會議呢 ？ 提示 ：
            把右側的三個流程拖移至正確的位置上吧 ！
          </p>
          <div className="text-white brand bg-gray-dark">灰灰 :</div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="drag relative w-[1200px] lg:scale-75 xl:scale-90">
            <div
              className={clsx(
                "map relative -top-10 ",
                activeStep === 7 &&
                  "animate__animated animate__fadeInRight animate__delay-1s"
              )}
            >
              <Line />
              <ul className="text-2x absolute top-8 left-6 w-[360px] px-0 text-center text-xl">
                <li className="list-item-block mb-7">
                  產品待辦清單 <span>Product Backlog</span>
                </li>

                <li className="list-item-block mb-7">
                  短衝規劃<span>Sprint Planning</span>
                </li>

                <li className="list-item-block">
                  短衝待辦清單<span>Sprint Backlog</span>
                </li>
              </ul>
              <div className="absolute bottom-[130px] left-[18%] flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-white text-center text-xl">
                短衝 <br /> Sprint
              </div>
              <Droppable droppableId="drop-destination-A1">
                {(provided, snapshot) => (
                  <div
                    className="line-box absolute left-[40%] top-[340px] mx-auto h-[84px] w-[300px] translate-x-[40px]"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {finishedList.A1 && (
                      <TodoListItem
                        key={`daily`}
                        isRed={true}
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
                    className="line-box absolute top-[450px] left-[34%] my-20 mx-auto h-[84px] w-[300px] translate-x-5"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {finishedList.A2 && (
                      <TodoListItem
                        isRed={true}
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
                    className="line-box absolute top-[530px] left-[43%] h-[84px]  w-[300px] translate-x-[230px]"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {finishedList.A3 && (
                      <TodoListItem
                        key={`daily`}
                        isRed={true}
                        {...finishedList.A3}
                        index={0}
                      />
                    )}
                  </div>
                )}
              </Droppable>
            </div>

            <div
              className={clsx(
                "absolute top-4 right-40 flex items-center justify-between",
                activeStep === 7 &&
                  "animate__animated animate__fadeInLeft animate__delay-1s"
              )}
            >
              <Droppable droppableId="drop-source">
                {(provided, snapshot) => (
                  <div
                    className=" mx-auto h-[400px] w-[300px]"
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
                    {contentList.map((item, i) => (
                      <TodoListItem
                        isRed={true}
                        key={`todo-${i}`}
                        {...item}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
      {isDone && activeStep === 7 && (
        <ModalPortal>
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white/50">
            <div className="text-center ">
              <img
                className="animate__bounceIn animate__animated min-h-[500px] max-w-[500px]"
                src={fish}
              />
              <div className="p-4 text-xl bg-white shadow-lg rounded-3xl">
                恭喜你完成了! 獲得魚魚一隻!
              </div>
              <button className="btn mt-10 w-[400px]" onClick={nextStep}>
                繼續了解Retro！
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default SprintProcess;
