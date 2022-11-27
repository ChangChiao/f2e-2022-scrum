import clsx from "clsx";
import team from "@/assets/team.png";
import sprint_planning from "@/assets/sprint_planning.png";
import sprint_backlog from "@/assets/sprint_backlog.png";
import { useStep } from "@/components/provider/StepProvider";
import { ReactComponent as Polygon } from "@/assets/Polygon 1.svg";
type SpritePlanProps = {
  subStep: number;
  activeStep: number;
  setSubStep: (param: number) => void;
};

function SpritePlan({ subStep, activeStep, setSubStep }: SpritePlanProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center",
        activeStep === 3 &&
          "animate__animated animate__fadeInDown animate__delay-1s",
        subStep === 1 && "animate__fadeOutDown absolute opacity-0"
      )}
    >
      <div className="dialog">
        <p>
          產品待辦清單好了之後，我們來召集 Scrum Master 和開發團隊共同召開
          <span className="text-green-dark">
            短衝規劃會議（Sprint Planning）
          </span>
          。短衝即是一個迭代，具有固定時間限制，我們會在這個會議中，決定要完成哪些工作事項來達到商業需求，列出
          <span className="text-green-dark">
            短衝待辦清單（Sprint Backlog）
          </span>
          ，並由開發團隊在接下來的產品開發週期裡執行。
        </p>
        <div className="brand bg-orange-dark">PO:</div>
      </div>
      <div className="flex items-center justify-between w-full mt-6 dialog">
        <img src={team} alt="" />
        <div
          className={clsx(
            "flex flex-col items-center justify-center",
            activeStep === 3 &&
              "animate__backInUp animate__animated animate__delay-1s"
          )}
        >
          <img src={sprint_planning} className="mb-4" alt="" />
          <div className="relative w-full h-1 bg-blue-dark">
            <Polygon className="absolute -right-2 -top-[5px] rotate-90" />
          </div>
          <p className="pt-4 text-center">
            短衝規劃會議 <br /> （Sprint Planning）
          </p>
        </div>
        <div className="text-center">
          <img src={sprint_backlog} alt="" />
          <p className="pt-4">
            短衝待辦清單 <br /> （Sprint Backlog）
          </p>
        </div>
      </div>
      <div className="mt-6 dialog">
        <p>
          嗨嗨 你是新來的前端吧！我是這次的{" "}
          <span className="text-green-dark">Scrum Master</span>
          小花，我的工作主要是促成開發團隊成員協作、引導團隊進行自省會議，提升團隊成員對
          Scrum 瞭解。
        </p>
        <div className="brand bg-orange-light">小花:</div>
      </div>
      <button className="mt-10 btn" onClick={() => setSubStep(1)}>
        了解
      </button>
    </div>
  );
}

export default SpritePlan;
