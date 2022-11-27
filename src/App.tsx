import { useEffect, useRef, useState } from "react";
import { useStep } from "@/components/provider/StepProvider";
import catAll from "@/assets/cat-all.png";
import Cover from "./components/Cover";
import Intro from "./components/Intro";
import IntroPO from "./components/IntroPO";
import Sprint from "./components/Sprint";
import Fibonacci from "./components/Fibonacci";
import SpriteList from "./components/SpriteList";
import SprintIntro from "./components/SprintIntro";
import SprintProcess from "./components/SprintProcess";
import SpriteRetro from "./components/SpriteRetro";
import End from "./components/End";
import clsx from "clsx";
import Header from "./components/Header";
function App() {
  const { activeStep } = useStep();
  const container = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    container.current!.style.transform = `translateX(${activeStep * -100}vw)`;
  }, [activeStep]);
  return (
    <>
      {activeStep !== 0 && <Header />}
      <div className="flex w-[1300vw] duration-500" ref={container}>
        <Cover />
        <Intro />
        <IntroPO />
        <Sprint />
        <Fibonacci />
        <SpriteList />
        <SprintIntro />
        <SprintProcess />
        <SpriteRetro />
        <End />
      </div>
      <img
        className={clsx(
          "animate__animated animate__fadeInUp pointer-events-none fixed left-0 right-0 bottom-12 z-10 mx-auto w-2/3 max-w-[1000px]",
          activeStep >= 2 && "animate__fadeOutDown"
        )}
        src={catAll}
        alt=""
      />
    </>
  );
}

export default App;
