import { useState } from "react";
import clsx from "clsx";
import { useStep } from "@/components/provider/StepProvider";

import cat_po_2 from "@/assets/cat-po-2.png";
import cat_benz from "@/assets/cat-benz.png";
import cat_gray from "@/assets/cat-gray.png";
import cat_flower from "@/assets/cat-flower.png";
import DoubleList from "./DoubleLIst";
function SprintList() {
  const [subStep, setSubStep] = useState(0);
  const { activeStep, nextStep } = useStep();

  const nextSubStep = () => {
    setSubStep((prev) => (prev += 1));
  };

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
        {activeStep === 5 && (
          <DoubleList subStep={subStep} nextSubStep={nextSubStep} />
        )}
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
    </div>
  );
}

export default SprintList;
