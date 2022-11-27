import React, { useState } from "react";
import clsx from "clsx";
import team from "@/assets/team.png";
import { ReactComponent as PawPrint } from "@/assets/paw_print.svg";
import { useStep } from "@/components/provider/StepProvider";
type SprintDateProps = {
  subStep: number;
  activeStep: number;
  nextStep: () => void;
};

type keyType = "A1" | "A2";

function SpriteRetro() {
  const { nextStep, activeStep } = useStep();
  const [isShowError, setError] = useState(false);
  const [ans, setAns] = useState({
    A1: 1,
    A2: 1,
  });

  const setAnsByKey = (key: keyType, val: number) => {
    setAns((prevState) => {
      const temp = { ...prevState };
      temp[key] = val;
      return temp;
    });
  };

  const checkAnswer = () => {
    if (ans.A1 !== 2 || ans.A2 !== 1) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    nextStep();
  };
  return (
    <div className={clsx("wrapper")}>
      <div
        className={clsx(
          "flex items-center justify-center",
          activeStep === 8 &&
            "animate__animated animate__fadeInDown animate__delay-1s"
        )}
      >
        <div className="w-1/6">
          <img src={team} alt="" />
        </div>
        <div className="w-2/3">
          <div className="dialog">
            <p>
              哇新來的，你真的很幸運，今天剛好是開發 B 組的
              Retro，你也來見識一下，看看 Retro 都該做些什麼吧～～
              我們會在會議裡請團隊成員提出哪些是做得好的地方、哪些可以繼續改善的地方？並記錄在
              <span className="text-green-dark">Confluence 中</span>。
            </p>
            <div className="brand bg-orange-light">All:</div>
          </div>
          <div className="mt-6 dialog">
            <p>
              重點在於『正面表述』，你也思考看看，哪一些是適合 Retro
              的回饋吧～～
            </p>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "mx-auto flex w-3/4 justify-between pt-20",
          activeStep === 8 &&
            "animate__animated animate__fadeInUp animate__delay-1s"
        )}
      >
        <div className="w-1/2 p-4">
          <h3 className="text-center title">做得好的地方</h3>
          <ul className="pt-4">
            <li
              onClick={() => setAnsByKey("A1", 1)}
              className={clsx(
                "option",
                ans.A1 === 1 ? "bg-white" : "opacity-50"
              )}
            >
              {ans.A1 === 1 && <PawPrint className="mr-2" />}
              這次我幫很多人救火欸
            </li>
            <li
              onClick={() => setAnsByKey("A1", 2)}
              className={clsx(
                "option",
                ans.A1 === 2 ? "bg-white" : "opacity-50"
              )}
            >
              {ans.A1 === 2 && <PawPrint className="mr-2" />}
              大家在開發上都會互相幫助，讓任務準時在時間內完成
            </li>
          </ul>
        </div>
        <div className="w-1/2 p-4">
          <h3 className="text-center title">有哪些可以做得更好？</h3>
          <ul className="pt-4">
            <li
              onClick={() => setAnsByKey("A2", 1)}
              className={clsx(
                "option",
                ans.A2 === 1 ? "bg-white" : "opacity-50"
              )}
            >
              {ans.A2 === 1 && <PawPrint className="mr-2" />}
              可以記錄這次的開發時間，讓預估團隊點數可以更精準。
            </li>
            <li
              onClick={() => setAnsByKey("A2", 2)}
              className={clsx(
                "option",
                ans.A2 === 2 ? "bg-white" : "opacity-50"
              )}
            >
              {ans.A2 === 2 && <PawPrint className="mr-2" />}
              開發時間預估不準確，請後端下次改進，避免 delay 到我。
            </li>
          </ul>
        </div>
      </div>
      <button
        className={clsx(
          "btn relative left-1/2 mt-10 -translate-x-[144px]",
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
  );
}

export default SpriteRetro;
