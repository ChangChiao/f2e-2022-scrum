import React from "react";
import { useStep } from "@/components/provider/StepProvider";
import blackboard from "@/assets/blackboard.png";
import cat_benz from "@/assets/cat-benz.png";
import cat_gray from "@/assets/cat-gray.png";
import cat_flower from "@/assets/cat-flower.png";
import clsx from "clsx";
function Fibonacci() {
  const { activeStep, nextStep } = useStep();
  return (
    <div className="flex items-center justify-between wrapper">
      <div className="relative w-1/6 pl-10">
        <img className="" src={cat_gray} alt="" />
        <img
          className="absolute -bottom-[150px] left-36 w-5/6"
          src={cat_benz}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center w-1/2">
        <img
          className={clsx(
            activeStep === 4 &&
              "animate__swing animate__animated animate__delay-1s"
          )}
          src={blackboard}
          alt=""
        />
        <div className="mt-10 dialog ml-14">
          <p>
            以
            <span className="text-green-dark">
              「費氏數列」的1、2、3、5、8、13、21
            </span>
            來估算各項 Story 的分數。 Story Point 越小,表示這個Story
            花費時間越少 ; 越大, 花費時間則越多。
            如果出現了一個21分,可能表示這個 Story 太龐大,需要再拆分細項執行唷!
          </p>
          <div className="text-white brand bg-blue-dark">賓士 :</div>
        </div>
        <button className="btn mt-10 w-[400px]" onClick={nextStep}>
          就算黑貓問號，我也要挑戰！
        </button>
      </div>
      <div className="w-1/6">
        <img className="w-3/4" src={cat_flower} alt="" />
      </div>
    </div>
  );
}

export default Fibonacci;
