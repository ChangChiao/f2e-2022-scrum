import clsx from "clsx";
import { useState } from "react";
import { useStep } from "@/components/provider/StepProvider";
import PO from "./PO";
function IntroPO() {
  const step = 2;
  const { nextStep, activeStep } = useStep();
  const [subStep, setSubStep] = useState(0);
  const nextSubStep = () => {
    setSubStep((prev) => prev++);
  };

  return (
    <div className="relative flex items-center justify-center wrapper">
      <div className="flex w-3/4 -translate-y-[80px] items-end  justify-center">
        <div
          className={clsx(
            "w-1/4 min-w-[200px]",
            activeStep === step &&
              "animate__animated animate__fadeInDownBig animate_delay-500"
          )}
        >
          <img src="/src/assets/cat-po.png" alt="" />
        </div>
        {subStep === 0 && <PO subStep={subStep} nextSubStep={nextSubStep} />}
      </div>
      <div className="absolute right-0 flex flex-col items-end w-1/2 pb-2 pointer-events-none bottom-10 xl:bottom-0">
        <img
          className="-my-[40px] w-[140px]"
          src="/src/assets/plant-2.png"
          alt=""
        />
        <img className="w-3/4 mr-40" src="/src/assets/cat-box.png" alt="" />
      </div>
    </div>
  );
}

export default IntroPO;
