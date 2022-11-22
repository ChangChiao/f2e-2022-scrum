import { useStep } from "@/components/provider/StepProvider";
import clsx from "clsx";
function Sprint() {
  const step = 3;
  const { nextStep, activeStep } = useStep();
  return (
    <div className="relative flex items-center justify-center wrapper">
      <div>
        <img src="/src/assets/cat-po-2,png" alt="" />
      </div>
      <div>
        <div className="dialog">
          <p>
            產品待辦清單好了之後，我們來召集 Scrum Master 和開發團隊共同召開
            <span className="text-green-light">
              短衝規劃會議（Sprint Planning）
            </span>
            。短衝即是一個迭代，具有固定時間限制，我們會在這個會議中，決定要完成哪些工作事項來達到商業需求，列出
            <span className="text-green-light">
              短衝待辦清單（Sprint Backlog）
            </span>
            ，並由開發團隊在接下來的產品開發週期裡執行。
          </p>
          <div className="brand bg-orange-dark">PO:</div>
        </div>
        <div className="flex items-center justify-between dialog">
          <img src="/src/assets/team.png" alt="" />
          <div className="flex items-center justify-center">
            <div className="w-full h-1 bg-blue-dark"></div>
            <img className="rotate-90" src="/src/assets/Polygon 1.svg" alt="" />
            <p>
              短衝規劃會議 <br /> （Sprint Planning）
            </p>
          </div>
          <div className="text-center ">
            <img src="/src/assets/sprint_backlog.png" alt="" />
            <p>
              短衝待辦清單 <br /> （Sprint Backlog）
            </p>
          </div>
        </div>
        <div className="dialog">
          <p>
            嗨嗨 你是新來的前端吧！我是這次的{" "}
            <span className="text-green-light">Scrum Master</span>
            小花，我的工作主要是促成開發團隊成員協作、引導團隊進行自省會議，提升團隊成員對
            Scrum 瞭解。
          </p>
          <div className="brand bg-orange-light">小花:</div>
        </div>
        <button className="btn">了解</button>
      </div>
      <div className="relative bottom-0 right-4">
        <img src="/src/assets/cat-benz.png" alt="" />
      </div>
    </div>
  );
}

export default Sprint;
