import { useEffect, useRef, useState } from "react";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import catAll from "@/assets/cat-all.png";
import Cover from "./components/Cover";
import Intro from "./components/Intro";
import IntroPO from "./components/IntroPO";
import Sprint from "./components/Sprint";
import clsx from "clsx";
function App() {
  const { activeStep } = useStep();
  const container = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    container.current!.style.transform = `translateX(${activeStep * -100}vw)`;
  }, [activeStep]);
  return (
    <>
      <div className="flex w-[500vw] duration-500" ref={container}>
        <Cover />
        <Intro />
        <IntroPO />
        <Sprint />
      </div>
      <img
        className={clsx(
          "animate__animated animate__fadeInUp pointer-events-none fixed left-0 right-0 bottom-12 z-10 mx-auto w-2/3 max-w-[1000px]",
          activeStep >= 2 && "animate__fadeOutDown"
        )}
        src={catAll}
        alt=""
      />
      <Logo className="fixed top-5 left-5 w-[200px]" />
    </>
  );
}

export default App;
