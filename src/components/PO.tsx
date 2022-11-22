import React from "react";
import clsx from "clsx";
type POtype = {
  subStep: number;
  nextSubStep: () => void;
};
function PO({ subStep, nextSubStep }: POtype) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center pl-10 opacity-0",
        "animate__animated animate__fadeInDown animate__delay-4s",
        subStep === 1 && "animate__fadeOut"
      )}
    >
      <div className="mb-10 dialog">
        <h2 className="title">我是喵喵村的 PO。</h2>
        <p className="content">
          PO 也就是產品負責人（Product
          Owner），產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序，對齊產品目標。最後排出
          <span className=" text-green-light">
            產品待辦清單（Product Backlog）
          </span>
          唷！
        </p>
        <div className="brand bg-orange-dark">PO:</div>
      </div>
      <div className="dialog">
        <p>
          剛好我最近手邊有一個『人才招募系統』的案子，我才剛列出了『產品需求清單』。
          既然你都來了，來試試看調整產品優先度，排出產品待辦清單吧！
        </p>
      </div>
      <button className="mt-6 btn" onClick={nextSubStep}>
        準備好了!
      </button>
    </div>
  );
}

export default PO;
