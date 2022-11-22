import React from "react";
import { useStep } from "@/components/provider/StepProvider";
import clsx from "clsx";
function Intro() {
  const step = 1;
  const { nextStep, activeStep } = useStep();
  return (
    <div className="relative flex flex-col items-center justify-center wrapper">
      <div
        className={clsx(
          "dialog range -mt-[300px]",
          activeStep === step &&
            "animate__animated animate__fadeInDown animate__delay-1s"
        )}
      >
        <h2 className="title">哈囉~歡迎進入「SCRUM 新手村」</h2>
        <p className="pt-4 pb-10 content">
          在正式加入專案開發之前，需要請你先了解 Scrum 的流程與精神！
          請接受挑戰任務，成功通過 Scrum 新手村的挑戰任務吧～～
        </p>
        <button className="absolute btn -bottom-4 right-4" onClick={nextStep}>
          接受挑戰
        </button>
      </div>
      <img
        className={clsx(
          "absolute left-[5%] bottom-[10%] opacity-0",
          activeStep === step &&
            "animate__animated animate__fadeInLeft animate_delay-500"
        )}
        src="/src/assets/plant-1.png"
        alt=""
      />
      <img
        className={clsx(
          "absolute right-[5%] bottom-[30%] w-[160px] opacity-0",
          activeStep === step &&
            "animate__animated animate__fadeInRight animate_delay-500"
        )}
        src="/src/assets/plant-2.png"
        alt=""
      />
    </div>
  );
}

export default Intro;
