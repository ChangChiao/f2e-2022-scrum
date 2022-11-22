import React from "react";
import { useStep } from "@/components/provider/StepProvider";
function Cover() {
  const { nextStep } = useStep();
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      <div className="absolute top-[20%] z-0 flex w-full items-center justify-between px-10">
        <img src="/src/assets/plant-1.png" alt="" />
        <img src="/src/assets/plant-2.png" alt="" />
      </div>
      <div className="relative z-10 w-1/2 text-center">
        <img src="/src/assets/title.svg" alt="" />
        <button onClick={nextStep} className="mt-5 btn">
          進入村莊
        </button>
      </div>
      <img
        className="relative z-10 w-2/3"
        src="/src/assets/cat-all.png"
        alt=""
      />
    </div>
  );
}

export default Cover;
