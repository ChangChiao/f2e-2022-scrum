import React from "react";
import { useStep } from "@/components/provider/StepProvider";
function Cover() {
  const { nextStep } = useStep();
  return (
    <div className="relative flex flex-col items-center cover wrapper">
      <div className="absolute top-[20%] z-0 flex w-full items-center justify-between px-10">
        <img src="/src/assets/plant-1.png" alt="" />
        <img src="/src/assets/plant-2.png" alt="" />
      </div>
      <div className="animate__animated animate__bounce relative z-10 w-1/2 max-w-[1000px] pt-[10%] text-center">
        <img src="/src/assets/title.svg" alt="" />
        <button onClick={nextStep} className="mt-5 btn">
          進入村莊
        </button>
      </div>
    </div>
  );
}

export default Cover;
