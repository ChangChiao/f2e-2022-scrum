import React from "react";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as Title } from "@/assets/title.svg";
import plant_1 from "@/assets/plant-1.png";
import plant_2 from "@/assets/plant-2.png";
import cat_springboard from "@/assets/cat_springboard.png";
import cat_basket from "@/assets/cat_basket.png";
import cat_benz from "@/assets/cat-benz.png";
import cat_gray from "@/assets/cat-gray.png";
import cat_flower from "@/assets/cat-flower.png";
import cat_po from "@/assets/cat-po-2.png";
import clsx from "clsx";

function End() {
  const { activeStep } = useStep();
  return (
    <div className="relative flex flex-col items-center h-screen cover wrapper">
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
      <div className="animate__animated animate__bounce relative z-10 w-1/2 max-w-[1000px] pt-[8%] text-center">
        <Title className="w-full" />
      </div>
      <div
        className={clsx(
          "text-center",
          activeStep === 9 &&
            "animate__animated animate__flipInY animate__delay-1s"
        )}
      >
        <h2 className="pb-4 text-5xl font-bold">Congratulation !</h2>
        <h3 className="text-xl">恭喜通過 Scrum 新手村！</h3>
      </div>
      <div
        className={clsx(
          "relative mt-[8%] flex h-[200px] w-2/3 items-center justify-center",
          activeStep === 9 &&
            "animate__animated animate__jackInTheBox animate__delay-1s"
        )}
      >
        <img className="w-1/4" src={cat_benz} alt="" />
        <img className="w-1/4" src={cat_gray} alt="" />
        <img className="w-1/4" src={cat_flower} alt="" />
        <img className="w-1/4" src={cat_po} alt="" />
      </div>
    </div>
  );
}

export default End;
