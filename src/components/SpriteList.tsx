import { useState } from "react";
import clsx from "clsx";
import { useStep } from "@/components/provider/StepProvider";
import ModalPortal from "@/components/common/Modal";
import mousee from "@/assets/mousee.png";
import cat_po_2 from "@/assets/cat-po-2.png";
import cat_benz from "@/assets/cat-benz.png";
import cat_gray from "@/assets/cat-gray.png";
import cat_flower from "@/assets/cat-flower.png";
import DoubleList from "./DoubleLIst";
function SprintList() {
  const { activeStep, nextStep } = useStep();
  const [isDone, setIsDone] = useState(false);

  return (
    <div className="relative flex items-center justify-between wrapper">
      <div className={clsx("relative w-1/6")}>
        <img
          className={clsx(
            "ml-6 w-5/6",
            activeStep === 5 &&
              "animate__animated animate__fadeInTopLeft animate_delay-500"
          )}
          src={cat_po_2}
          alt=""
        />
        <img
          className={clsx(
            "absolute mt-10 ml-6 w-5/6",
            activeStep === 5 &&
              "animate__animated animate__fadeInBottomLeft animate_delay-500"
          )}
          src={cat_benz}
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-center w-2/3 px-10">
        {activeStep === 5 && <DoubleList setIsDone={setIsDone} />}
      </div>
      <div className={clsx("relative w-1/6")}>
        <img
          className={clsx(
            "w-3/4",
            activeStep === 5 &&
              "animate__animated animate__fadeInTopRight animate_delay-500"
          )}
          src={cat_flower}
          alt=""
        />
        <img
          className={clsx(
            "absolute mt-10 w-3/4",
            activeStep === 5 &&
              "animate__animated animate__fadeInBottomRight animate_delay-500"
          )}
          src={cat_gray}
        />
      </div>
      {isDone && activeStep === 5 && (
        <ModalPortal>
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-white/50">
            <div className="text-center ">
              <img
                className="animate__bounceIn animate__animated min-h-[500px] max-w-[500px]"
                src={mousee}
              />
              <div className="p-4 text-xl bg-white shadow-lg rounded-3xl">
                恭喜你完成了! 獲得逗貓鼠鼠一隻!
              </div>
              <button className="btn mt-10 w-[400px]" onClick={nextStep}>
                繼續了解Sprint 流程！
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default SprintList;
