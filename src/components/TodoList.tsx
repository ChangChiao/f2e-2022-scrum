import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useStep } from "@/components/provider/StepProvider";
const contentList = [
  "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
  "前台職缺列表、應徵",
  "應徵者的線上履歷編輯器",
  "會員系統（登入、註冊、權限管理）",
];

type TodoProps = {
  subStep: number;
  nextSubStep: () => void;
};

function TodoList({ subStep, nextSubStep }: TodoProps) {
  const { nextStep } = useStep();
  const [isDone, setIsDone] = useState(false);
  const checkOrder = () => {
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
          <img className="inline-block w-16 mx-2" src="/src/assets/jira.jpg" />
          來做任務的管理呢！
        </p>
        <div className="brand bg-orange-dark">PO:</div>
      </div>
      <div className="flex justify-between">
        <div
          className={clsx([
            "relative w-1/2 rounded-3xl border-[20px] border-blue-light bg-white p-4",
            "after:absolute after:-top-16 after:left-0 after:right-0 after:mx-auto after:h-[80px] after:w-[140px] after:bg-[url('/src/assets/list_clip.png')] after:bg-contain after:bg-no-repeat after:content-['']",
            subStep === 1 &&
              "animate__animated animate__fadeInLeft animate__delay-1s",
          ])}
        >
          <div className="pt-8 pb-4 text-center title">
            產品待辦清單
            <img
              className="inline-block mx-1"
              src="/src/assets/paw_print.svg"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center w-12 h-full">
              <span className="title">高</span>
              <img src="/src/assets/Polygon 1.svg" alt="" />
              <span className={clsx(["block h-72 w-1 bg-blue-dark"])}></span>
              <img src="/src/assets/Polygon 2.svg" alt="" />
              <span className="title">低</span>
            </div>
            <div className="w-5/6">
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
              src="/src/assets/can.png"
              className="w-3/4 mb-2 animate__animated animate__flipInY animate__delay-1s"
              alt=""
            />
            <div className="w-full p-4 text-center bg-white rounded-3xl">
              恭喜你完成了! 獲得罐罐一枚!
            </div>
            <button className="mt-16 btn" onClick={nextStep}>
              參加貓貓聚會
            </button>
          </div>
        ) : (
          <div
            className={clsx(
              subStep === 1 &&
                "animate__animated animate__fadeInRight animate__delay-1s"
            )}
          >
            <>
              <h2 className="pb-10">請拖拉至清單中並調整順序</h2>
              <ul className="w-[300px]">
                {contentList.map((item, i) => (
                  <li
                    className="flex items-center h-20 px-4 mb-4 bg-white border rounded-lg cursor-pointer border-blue-dark"
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <button className="mt-10 btn" onClick={checkOrder}>
                我完成了！
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
