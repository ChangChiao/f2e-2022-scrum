import React, { useState } from "react";
import clsx from "clsx";
import { useStep } from "@/components/provider/StepProvider";
import catGray from "../assets/cat-gray.png";
import plant_2 from "@/assets/plant-2.png";
import Meeting1 from "@/assets/Meeting1.png";
import Meeting2 from "@/assets/Meeting2.png";
import Meeting3 from "@/assets/Meeting3.png";
const contentList = [
  { title: "每日站立會議", subTitle: "Daily Scrum" },
  {
    title: "短衝檢視會議",
    subTitle: "Sprint Review",
  },
  { title: "短衝自省會議", subTitle: "Sprint Retrospective" },
];

function SprintIntro() {
  const [active, setActive] = useState(0);
  const { nextStep, activeStep } = useStep();
  return (
    <div className="relative flex items-center justify-center wrapper">
      <div className="flex px-10">
        <img
          className={clsx(
            "mx-auto w-3/4",
            activeStep === 6 &&
              "animate__animated animate__bounceIn animate_delay-500"
          )}
          src={catGray}
          alt=""
        />
      </div>
      <div
        className={clsx(
          "flex  w-2/3 flex-col items-center",
          activeStep === 6 &&
            "animate__animated animate__fadeInDown animate__delay-2s"
        )}
      >
        <div className="mb-4 dialog">
          <p>
            等等等等等，你應該還不知道什麼是 Sprint 吧？ 讓我先為你介紹一下～
            仔細聽好唷，等等會考考你！
          </p>
          <div className="text-white brand bg-gray-dark">灰灰:</div>
        </div>
        <div className="dialog">
          <p>
            Sprint
            是一個短衝，如同前面敏捷教練所提到的，一次sprint一次sprint週期為2周。開發團隊會在這期間執行開發。在這段期間內，開發團隊舉辦{" "}
            <span className=" text-green-dark">
              每日站立會議（Daily Scrum）
            </span>{" "}
            ，追蹤成員間的工作狀況。除了每日站立會議，在 Sprint 的結束也會包含
            <span className=" text-green-dark">
              短衝檢視會議（Sprint Review）、短衝自省會議（Sprint Retrospective
            </span>
            ）。
          </p>
        </div>
        <ul className="flex pt-6">
          {contentList.map((item, i) => (
            <li
              key={`tab-${i}`}
              className={clsx(
                "mr-3 flex cursor-pointer items-center justify-between rounded-2xl  px-4 py-2 shadow-lg",
                active === i ? "bg-white" : "bg-gray-200 text-gray-500"
              )}
              onClick={() => setActive(i)}
            >
              <h4 className="text-xl">{item.title}</h4>
              <span className="pl-2">{item.subTitle}</span>
            </li>
          ))}
        </ul>
        <div className="dialog mt-10 h-[300px] w-full overflow-y-scroll p-4 px-10 text-lg leading-8">
          {active === 0 && (
            <div className="flex items-center justify-between h-full">
              <div>
                <p> 每天都要進行的會議，以 15 分鐘為限制 ： </p>
                <ul>
                  <li>·昨天為團隊的短衝目標（Sprint Goal）做了那些進度</li>
                  <li>·今天我會如何準備來幫助團隊達到短衝目標</li>
                  <li>·過程中有遇到什麼問題、難題 </li>
                </ul>
                <p>透過團隊分享，追蹤大家的工作狀況。</p>
              </div>
              <img src={Meeting1} className="w-1/3" alt="" />
            </div>
          )}
          {active === 1 && (
            <div className="flex items-center justify-between h-full">
              <p>用來檢視該次短衝增量的成果 ， 以蒐集相關的回饋數據或意見 。</p>
              <img src={Meeting2} alt="" />
            </div>
          )}
          {active === 2 && (
            <div className="flex items-center justify-between h-full">
              <div>
                <p>
                  團隊在自省會議裡，會共同回顧該短衝歷程發生的事情、好的地方及可以改進的地方。
                </p>
                <ul>
                  <li>·好的地方</li>
                  <li>·可以改進的地方 </li>
                  <li>·如何維持我們已有的成功經驗</li>
                </ul>
              </div>
              <img src={Meeting3} alt="" />
            </div>
          )}
        </div>
        <button className="mt-6 btn" onClick={nextStep}>
          練習去囉!
        </button>
      </div>
      <div className="">
        <img
          className={clsx(
            "mx-auto w-2/3",
            activeStep === 6 &&
              "animate__animated animate__bounceIn animate__delay-1s"
          )}
          src={plant_2}
          alt=""
        />
      </div>
    </div>
  );
}

export default SprintIntro;
