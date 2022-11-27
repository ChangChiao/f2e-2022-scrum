import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import TodoListItem from "@/components/TodoListItem";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as PawPrint } from "@/assets/paw_print.svg";
import catBox from "@/assets/cat-box.png";
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
    nextStep();
  };

  useEffect(() => {
    console.log("finishedList", finishedList);
  }, [finishedList]);

  return (
    <div className="relative wrapper">
      <div
        className={clsx(
          "dialog mx-auto mb-10 w-2/3",
          activeStep === 7 &&
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
            className={clsx(
              "map relative mt-10 w-2/3",
              activeStep === 7 &&
                "animate__animated animate__fadeInRight animate__delay-1s"
            )}
          >
            <ul className="text-2x absolute -top-[80px] w-[240px] px-0 text-center text-xl">
              <li className="pb-4">產品待辦清單</li>
              <li>
                <div className="arrow-bar"></div>
              </li>
              <li className="pb-4">短衝規劃</li>
              <li>
                <div className="arrow-bar"></div>
              </li>
              <li>短衝待辦清單</li>
            </ul>
            {/* left */}
            <div className="line-v relative left-[40%] h-[200px]"></div>
            <div className="absolute top-20 left-[40%] -translate-x-[140px] text-4xl font-bold">
              Sprint
            </div>
            <div className="line-v arrow absolute top-0  left-[40%] h-[150px] -translate-x-[200px] after:-bottom-[20px] after:-left-[6px] after:-rotate-90"></div>
            <div className="line-h absolute left-[40%] top-[0] w-[200px] -translate-x-[200px]"></div>
            <div className="line-h arrow relative after:-top-[18px] after:-right-[20px] after:rotate-180"></div>
            {/* right */}
            <div className="line-v absolute left-[40%] -top-12 h-12 -translate-x-10"></div>
            <div className="line-h absolute left-[40%] -top-12 w-[400px] -translate-x-[30px]"></div>
            <div className="line-v absolute left-[40%] -top-12 h-[160px] translate-x-[360px]"></div>
            <div className="line-h arrow absolute left-[40%] top-[100px] w-[200px] translate-x-[160px] after:-left-4 after:-top-[18px]"></div>
            <Droppable droppableId="drop-destination-A1">
              {(provided, snapshot) => (
                <div
                  className="line-box absolute left-[40%] -top-[20px] mx-auto h-[88px] w-[300px] translate-x-[40px]"
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
                  className="line-box absolute top-[80px] left-[40%] my-20 mx-auto h-[88px] w-[300px] translate-x-5"
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
                  className="line-box absolute top-[160px] left-[50%] h-[88px]  w-[300px] translate-x-[230px]"
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
            <img className="w-1/2 mx-auto mt-20" src={catBox} alt="" />
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
                    {Array.from({ length: 3 }).map((item, i) => (
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
            <button
              className={clsx(
                "btn translate-x-10",
                isShowError && "bg-red-600 text-white "
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
        </div>
      </DragDropContext>
    </div>
  );
}

export default SprintProcess;
