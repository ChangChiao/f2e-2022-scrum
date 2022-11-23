import React from "react";
import clsx from "clsx";
import { ReactComponent as Polygon } from "@/assets/Polygon 1.svg";
import { ReactComponent as Point } from "@/assets/point20.svg";
import week from "@/assets/week.png";
type SprintDateProps = {
  subStep: number;
  nextStep: () => void;
};

function SprintDate({ subStep, nextStep }: SprintDateProps) {
  return (
    <div
      className={clsx(
        "date",
        `a_${subStep}`,
        subStep === 0 && "absolute opacity-0",
        subStep === 1 &&
          "animate__animated animate__fadeInDown animate__delay-1s relative opacity-100"
      )}
    >
      <div className="dialog">
        <p>
          這兩位是賓士和灰灰，是我們開發團為的成員唷～ 目前我們團隊{" "}
          <span className="text-green-dark">一次 Sprint 週期是兩週的時間</span>
          ，依照我的觀察，目前團隊可以負擔的點數{" "}
          <span className="text-green-dark">(Sprint Point) 大約是 20 點</span>
          左右。
        </p>
        <div className="brand bg-orange-light">小花:</div>
      </div>
      <div className="flex items-center justify-between w-full p-12 mt-6 dialog">
        <div className="text-center">
          <img src={week} alt="" />
          <p className="pt-4">兩週的時間</p>
        </div>
        <div className="relative w-full h-1 bg-blue-dark">
          <Polygon className="absolute -right-2 -top-[5px] rotate-90" />
        </div>
        <div className="text-center">
          <Point />
          <p className="pt-4">負擔點數 20 點</p>
        </div>
      </div>
      <div className="mt-20 dialog">
        <p>
          欸新來的，你應該不知道點數是什麼意思吧 哈哈 我來跟你介紹一下吧～
          Sprint Point 目的是為了衡量速度，是用大概花費的時間預估出的相對點數。
        </p>
        <div className="text-white brand bg-blue-dark">賓士 :</div>
      </div>
      <button className="mt-10 btn" onClick={nextStep}>
        了解
      </button>
    </div>
  );
}

export default SprintDate;
