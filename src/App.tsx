import { useEffect, useRef, useState } from "react";
import { useStep } from "@/components/provider/StepProvider";
import Cover from "./components/Cover";
import Intro from "./components/Intro";
import PO from "./components/PO";
import Sprint from "./components/Sprint";
import SprintDate from "./components/SprintDate";
import TodoList from "./components/TodoList";
function App() {
  const { activeStep } = useStep();
  const wrapper = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    wrapper.current!.style.transform = `translateX(${activeStep * -100}vw)`;
  }, [activeStep]);
  return (
    <div className="flex w-[500vw] duration-500" ref={wrapper}>
      <Cover />
      <Intro />
      <PO />
      <TodoList />
      <Sprint />
      <SprintDate />
    </div>
  );
}

export default App;
