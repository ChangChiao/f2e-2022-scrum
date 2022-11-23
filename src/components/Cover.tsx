import React from "react";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as Title } from "@/assets/title.svg";
import plant_1 from "@/assets/plant-1.png";
import plant_2 from "@/assets/plant-2.png";
import cat_springboard from "@/assets/cat_springboard.png";
import cat_basket from "@/assets/cat_basket.png";

function Cover() {
  const { nextStep } = useStep();
  return (
    <div className="relative flex flex-col items-center cover wrapper">
      <div className="absolute top-0 bottom-0 z-0 flex items-center justify-between w-full px-10">
        <img className="max-w-[200px]" src={plant_1} alt="" />
        <img className="ml-4 max-w-[300px]" src={cat_springboard} alt="" />
        <div className="flex-1"></div>
        <img
          className="relative -top-20 mr-6 max-w-[200px]"
          src={cat_basket}
          alt=""
        />
        <img className="max-w-[200px]" src={plant_2} alt="" />
      </div>
      <div className="animate__animated animate__bounce relative z-10 w-1/2 max-w-[1000px] pt-[10%] text-center">
        <Title className="w-full" />
        <button onClick={nextStep} className="mt-5 btn">
          進入村莊
        </button>
      </div>
    </div>
  );
}

export default Cover;
