import { useState } from "react";
import { useStep } from "@/components/provider/StepProvider";
import SpritePlan from "./SpritePlan";
import SprintDate from "./SprintDate";
import cat_po_2 from "@/assets/cat-po-2.png";
import cat_flower from "@/assets/cat-flower.png";
function Sprint() {
  const [subStep, setSubStep] = useState(0);
  const { activeStep, nextStep } = useStep();
  return (
    <div className="relative flex items-center justify-between wrapper">
      <div className="w-1/6 animate__animated animate__fadeInRight animate_delay-500">
        <img className="w-10/12 ml-6" src={cat_po_2} alt="" />
      </div>
      <div className="flex flex-col items-center w-2/3 px-10">
        <SpritePlan
          subStep={subStep}
          activeStep={activeStep}
          setSubStep={setSubStep}
        />
        <SprintDate subStep={subStep} nextStep={nextStep} />
      </div>
      <div className="flex flex-col justify-end w-1/6 h-screen animate__animated animate__fadeInLeft animate__delay-1s ">
        <img className="w-3/4" src={cat_flower} alt="" />
      </div>
    </div>
  );
}

export default Sprint;
