import React, { useState } from "react";
import clsx from "clsx";
import { useStep } from "@/components/provider/StepProvider";

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
      <div
        className={clsx(
          "flex  flex-col items-center",
          "animate__animated animate__fadeInDown animate__delay-2s"
        )}
      >
        <div className="mb-10 dialog">
          <p>
            等等等等等，你應該還不知道什麼是 Sprint 吧？ 讓我先為你介紹一下～
            仔細聽好唷，等等會考考你！
          </p>
          <div className="brand bg-orange-dark">PO:</div>
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
        <ul className="flex">
          {contentList.map((item, i) => (
            <li
              key={`tab-${i}`}
              className="flex items-center justify-between px-4 cursor-pointer"
              onClick={() => setActive(i)}
            >
              <h4>{item.title}</h4>
              <span>{item.subTitle}</span>
            </li>
          ))}
        </ul>
        <div className="pt-10">
          {active === 0 && (
            <div>
              <p> 每天都要進行的會議，以 15 分鐘為限制 ： </p>
              <ul>
                <li> 昨天為團隊的短衝目標（Sprint Goal）做了那些進度</li>
                <li>今天我會如何準備來幫助團隊達到短衝目標</li>
                <li>過程中有遇到什麼問題、難題 </li>
              </ul>
              <p>透過團隊分享，追蹤大家的工作狀況。</p>
            </div>
          )}
          {active === 1 && (
            <div>
              <p>
                向利害關係人（Stakeholder）展示工作結果，蒐集使用回饋，分享市場反應，並一起討論下一步工作方向。
              </p>
              <p>
                在短衝檢視會議過程中，會取得使用者或利害關係人對於本次短衝增量的回饋數據或意見，討論哪些想法值得納入至產品待辦清單去實踐。
              </p>
            </div>
          )}
          {active === 2 && (
            <div>
              <p>
                團隊在自省會議裡，會共同回顧該短衝歷程發生的事情、好的地方及可以改進的地方。
              </p>
              <p>
                檢討如何維持已有的成功經驗、優化工作流程，讓團隊運作愈來愈進步。
              </p>
              <p> 推薦工具：</p>
            </div>
          )}
        </div>
        <button className="mt-6 btn" onClick={nextStep}>
          準備好了!
        </button>
      </div>
    </div>
  );
}

export default SprintIntro;
