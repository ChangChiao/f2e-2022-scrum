import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";
import DraggablePortalHandler from "@/components/DraggablePortalHandler";
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
  NotDraggingStyle,
  DraggingStyle,
} from "react-beautiful-dnd";

type TodoProps = {
  subStep: number;
  nextSubStep: () => void;
};

function TodoList({ subStep, nextSubStep }: TodoProps) {
  const { nextStep } = useStep();
  const [isDone, setIsDone] = useState(false);
  const [isShowError, setError] = useState(false);
  const answer = ["A1", "A4", "A3", "A2"];
  const [contentList, setContentList] = useState([
    {
      id: "A1",
      text: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
    },
    { id: "A2", text: "前台職缺列表、應徵" },
    { id: "A3", text: "應徵者的線上履歷編輯器" },
    { id: "A4", text: "會員系統（登入、註冊、權限管理）" },
  ]);

  const checkAnswer = () => {
    const question = contentList.map((item) => item.id).join("");
    return question === answer.join("");
  };

  const handleDragEnd = (event: DropResult) => {
    const { source, destination } = event;

    console.log(" source, destination", source, destination);

    if (!destination) {
      return;
    }

    const newItems = [...contentList];
    const [remove] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, remove);

    setContentList(newItems);
  };
  const checkOrder = () => {
    const isPass = checkAnswer();
    if (!isPass) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    setIsDone(true);
  };

  const getPositon = () => {};

  const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle) => {
    return {
      ...draggableStyle,
      userSelect: "none",
      position: isDragging ? "absolute" : "static",
      background: isDragging ? "#ededed" : "#fff",
    };
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
      <div
        className={clsx(
          "dialog mb-10 opacity-0",
          subStep === 1 &&
            "animate__animated animate__fadeInDown animate_delay-500 opacity-100"
        )}
      >
        <h2 className="title">換你試看看吧!</h2>
        <p>
          請把需求放到產品待辦清單，並調整待辦的優先度順序。 我們喵喵也推薦使用
          <img className="inline-block w-16 mx-2" src={jira} />
          來做任務的管理呢！
        </p>
        <div className="brand bg-orange-dark">PO:</div>
      </div>

      {/* <Test /> */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="drop-id">
          {(provided, snapshot) => (
            <div
              className="flex justify-between mt-20 drag"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div
                className={clsx([
                  "relative h-[550px] w-[400px] rounded-3xl border-[20px] border-blue-light bg-white p-4",
                  "after:absolute after:-top-16 after:left-0 after:right-0 after:mx-auto after:h-[80px] after:w-[140px] after:bg-[url('/src/assets/list_clip.png')] after:bg-contain after:bg-no-repeat after:content-['']",
                  subStep === 1 &&
                    "animate__animated animate__fadeInLeft animate__delay-1s",
                ])}
              >
                <div className="pt-8 pb-4 text-center title">
                  產品待辦清單
                  <PawPrint className="inline-block mx-1" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center w-12 h-full">
                    <span className="title">高</span>
                    <Polygon_1 />
                    <span
                      className={clsx(["block h-72 w-1 bg-blue-dark"])}
                    ></span>
                    <Polygon_2 />
                    <span className="title">低</span>
                  </div>
                  <div className="w-5/6">
                    {provided.placeholder}
                    {Array.from({ length: 4 }).map((item, i) => (
                      <div
                        className="h-20 mb-4 border-2 border-dashed rounded-xl border-gray-light"
                        key={`drop-${i}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              {isDone ? (
                <div className="flex flex-col items-center">
                  <img
                    src={can}
                    className="animate__animated animate__flipInY mb-2 min-h-[180px] w-3/4"
                    alt=""
                  />
                  <div className="animate__animated animate__fadeIn">
                    <div className="w-full p-4 text-center bg-white rounded-3xl">
                      恭喜你完成了! 獲得罐罐一枚!
                    </div>
                    <button className="mt-16 btn" onClick={nextStep}>
                      參加貓貓聚會
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={clsx(
                    "h-[400px] w-[300px]",
                    subStep === 1 &&
                      "animate__animated animate__fadeInRight animate__delay-1s"
                  )}
                >
                  <>
                    <h2 className="pb-10">請拖拉至清單中並調整順序</h2>
                    <ul className="relative">
                      {contentList.map((item, i) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={i}
                        >
                          {(provided, snapshot) => (
                            <DraggablePortalHandler snapshot={snapshot}>
                              <li
                                className="flex items-center justify-center h-20 px-4 mb-4 bg-white border rounded-lg cursor-pointer border-blue-dark"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                // style={{
                                //   ...provided.draggableProps.style,
                                //   position: "static",
                                //   padding: 0,
                                // }}
                                // @ts-ignore
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style as DraggingStyle
                                )}
                              >
                                {item.text}
                              </li>
                            </DraggablePortalHandler>
                          )}
                        </Draggable>
                      ))}
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
                    </ul>
                  </>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoList;
