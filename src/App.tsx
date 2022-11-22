import { useRef, useState } from "react";
import { useStep } from "@/components/provider/StepProvider";
import Cover from "./components/Cover";
import Intro from "./components/Intro";
import PO from "./components/PO";
import Sprint from "./components/Sprint";
import SprintDate from "./components/SprintDate";
import TodoList from "./components/TodoList";
function App() {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const { nextStep, reset } = useStep();
  return (
    <div ref={wrapper}>
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
