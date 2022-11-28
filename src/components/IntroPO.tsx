import clsx from "clsx";
import { useState } from "react";
import { useStep } from "@/components/provider/StepProvider";
import PO from "./PO";
import TodoList from "./TodoList";
import plant_2 from "@/assets/plant-2.png";
import catBox from "@/assets/cat-box.png";
import catPo from "@/assets/cat-po.png";
import BackLog from "./BackLog";
function IntroPO() {
  const step = 2;
  const { nextStep, activeStep } = useStep();
  const [subStep, setSubStep] = useState(0);
  const nextSubStep = () => {
    setSubStep((prev) => (prev += 1));
  };

  return (
    <div className="relative flex items-center justify-center pt-10 overflow-x-hidden wrapper">
      <div className="flex w-3/4 -translate-y-[60px] items-center justify-center 2xl:-translate-y-10">
        <div
          className={clsx(
            "w-1/4 min-w-[200px]",
            activeStep === step &&
              "animate__animated animate__fadeInDownBig animate_delay-500"
          )}
        >
          <img src={catPo} alt="" />
        </div>
        <div className="relative pt-20 pl-10 2xl:pt-10">
          <PO subStep={subStep} nextSubStep={nextSubStep} />
          <TodoList subStep={subStep} nextSubStep={nextSubStep} />
          {/* <BackLog subStep={subStep} nextSubStep={nextSubStep} /> */}
        </div>
      </div>
      <div className="absolute right-0 flex flex-col items-end w-1/2 pb-2 pointer-events-none bottom-10 xl:bottom-0">
        <img className="-my-[40px] w-[140px]" src={plant_2} alt="" />
        <img
          className={clsx(
            "mr-40 w-3/4",
            subStep === 1 && "animate__animated animate__bounceOutRight"
          )}
          src={catBox}
          alt=""
        />
      </div>
    </div>
  );
}

export default IntroPO;
