import { useState } from "react";
import clsx from "clsx";
import { useStep } from "@/components/provider/StepProvider";
import SpritePlan from "./SpritePlan";
import SprintDate from "./SprintDate";
import cat_po_2 from "@/assets/cat-po-2.png";
import cat_benz from "@/assets/cat-benz.png";
import cat_gray from "@/assets/cat-gray.png";
import cat_flower from "@/assets/cat-flower.png";
function Sprint() {
  const [subStep, setSubStep] = useState(0);
  const { activeStep, nextStep } = useStep();
  return (
    <div className="relative flex items-center justify-between wrapper">
      <div
        className={clsx(
          "w-1/6",
          activeStep === 3 &&
            "animate__animated animate__fadeInRight animate_delay-500"
        )}
      >
        <img className="w-5/6 ml-6" src={cat_po_2} alt="" />
        <img
          className={clsx(
            "absolute mt-10 ml-6 w-5/6 opacity-0",
            subStep === 1 && "animate__animated animate__fadeInUp opacity-100"
          )}
          src={cat_benz}
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-center w-2/3 px-10">
        <SpritePlan
          subStep={subStep}
          activeStep={activeStep}
          setSubStep={setSubStep}
        />
        <SprintDate
          activeStep={activeStep}
          subStep={subStep}
          nextStep={nextStep}
        />
      </div>
      <div
        className={clsx(
          "w-1/6",
          activeStep === 3 &&
            "animate__animated animate__fadeInLeft animate__delay-1s"
        )}
      >
        <img className="w-3/4" src={cat_flower} alt="" />
        <img
          className={clsx(
            "absolute mt-10 w-3/4 opacity-0",
            subStep === 1 && "animate__animated animate__fadeInUp opacity-100"
          )}
          src={cat_gray}
        />
      </div>
    </div>
  );
}

export default Sprint;
