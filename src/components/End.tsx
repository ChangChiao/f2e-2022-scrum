import React from "react";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as Title } from "@/assets/title-2.svg";
import plant_1 from "@/assets/plant-1.png";
import plant_2 from "@/assets/plant-2.png";
import cat_springboard from "@/assets/cat_springboard.png";
import cat_basket from "@/assets/cat_basket.png";
import cat_benz from "@/assets/graduate-cat2.png";
import cat_gray from "@/assets/graduate-cat3.png";
import cat_flower from "@/assets/graduate-cat4.png";
import cat_po from "@/assets/graduate-cat1.png";
import graduate from "@/assets/graduate.png";
import cathand_1 from "@/assets/cathand-1.png";
import cathand_2 from "@/assets/cathand-2.png";
import cathand_3 from "@/assets/cathand-3.png";
import cathand_4 from "@/assets/cathand-4.png";
import clsx from "clsx";

function End() {
  const { activeStep } = useStep();
  const reload = () => {
    window.location.reload();
  };
  return (
    <div className="cover wrapper relative flex h-screen flex-col items-center overflow-hidden bg-[url('/src/assets/graduate-bg.jpg')] bg-contain bg-fixed bg-no-repeat">
      <img className="absolute top-0 left-0 w-full" src={graduate} alt="" />
      <div className="absolute w-full h-full">
        <img
          className="absolute bottom-[50%] -left-[40px]"
          src={cathand_1}
          alt=""
        />
        <img
          className="absolute -top-[40px] left-[30%]"
          src={cathand_2}
          alt=""
        />
        <img
          className="absolute -top-[40px] left-[70%]"
          src={cathand_3}
          alt=""
        />
        <img
          className="absolute -right-[60px] bottom-[30%]"
          src={cathand_4}
          alt=""
        />
      </div>
      <div className="animate__animated animate__bounce relative z-10 w-1/2 max-w-[1000px] pt-[8%] text-center 2xl:pt-[15%]">
        <Title className="w-full" />
      </div>
      <div
        className={clsx(
          "w-[400px] text-center",
          activeStep === 9 &&
            "animate__animated animate__flipInY animate__delay-1s"
        )}
      >
        <h3 className="text-xl">恭喜你通過</h3>
        <div className="p-4 text-xl bg-white shadow-lg rounded-3xl">
          《 敏捷任務 - 最初の試煉 》
        </div>
        <button className="w-full mt-5 btn" onClick={reload}>
          再學一次
        </button>
      </div>
      <div
        className={clsx(
          "absolute bottom-0 flex w-[85%] items-end  justify-between",
          activeStep === 9 &&
            "animate__animated animate__jackInTheBox animate__delay-1s"
        )}
      >
        <img className="w-1/4" src={cat_po} alt="" />
        <img className="w-1/4" src={cat_benz} alt="" />
        <img className="w-1/4" src={cat_gray} alt="" />
        <img className="w-1/5" src={cat_flower} alt="" />
      </div>
    </div>
  );
}

export default End;
