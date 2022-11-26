import React from "react";
import clsx from "clsx";
import { useStep } from "@/components/provider/StepProvider";
type SprintDateProps = {
  subStep: number;
  activeStep: number;
  nextStep: () => void;
};

function SpriteRetro() {
  const { nextStep, activeStep } = useStep();
  return (
    <div
      className={clsx(
        "flex flex-col items-center",
        activeStep === 3 && "absolute opacity-0",
        "animate__animated animate__fadeInDown animate__delay-1s relative opacity-100"
      )}
    >
      <div className="dialog">
        <p>
          哇新來的，你真的很幸運，今天剛好是開發 B 組的
          Retro，你也來見識一下，看看 Retro 都該做些什麼吧～～
          我們會在會議裡請團隊成員提出哪些是做得好的地方、哪些可以繼續改善的地方？並記錄在
          <span className="text-green-dark">Confluence 中</span>。
        </p>
        <div className="brand bg-orange-light">小花:</div>
      </div>
      <div className="dialog">
        <p>
          重點在於『正面表述』，你也思考看看，哪一些是適合 Retro 的回饋吧～～
        </p>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <h3 className="title">做得好的地方</h3>
          <ul>
            <li>這次我幫很多人救火欸</li>
            <li>大家在開發上都會互相幫助，讓任務準時在時間內完成</li>
          </ul>
        </div>
        <div className="w-1/2">
          <h3>有哪些可以做得更好？</h3>
          <ul>
            <li>可以記錄這次的開發時間，讓預估團隊點數可以更精準。</li>
            <li>開發時間預估不準確，請後端下次改進，避免 delay 到我。</li>
          </ul>
        </div>
      </div>
      <button className="mt-10 btn" onClick={nextStep}>
        了解
      </button>
    </div>
  );
}

export default SpriteRetro;
