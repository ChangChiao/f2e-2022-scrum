import React from "react";
const contentList = [
  "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
  "前台職缺列表、應徵",
  "應徵者的線上履歷編輯器",
  "會員系統（登入、註冊、權限管理）",
];
function TodoList() {
  return (
    <div>
      <div className="mb-10 dialog">
        <h2 className="title">我是喵喵村的 PO。</h2>
        <p className="content">
          PO 也就是產品負責人（Product
          Owner），產品負責人會負責評估產品待辦清單的價值與重要性，依序排列要執行的優先順序，對齊產品目標。最後排出產品待辦清單（Product
          Backlog）唷！
        </p>
        <div className="brand bg-orange-dark">PO:</div>
      </div>
      <div className="flex items-center justify-between">
        <div
          className="border-[20px]border-blue-light relative w-1/2 rounded-3xl bg-white 
        after:absolute after:top-0 after:left-0 after:right-0 after:mx-auto after:w-[140px] after:bg-[url('/src/assets/list_clip.png')] after:bg-contain after:content-['']"
        >
          <div className="title">
            產品待辦清單
            <img src="/assets/paw_print.svg" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-row items-center h-full">
              <span className="title">高</span>
              <span className="w-1 bg-blue-dark"></span>
              <span className="title">低</span>
            </div>
            <div>
              {Array.from({ length: 4 }).map((item, i) => (
                <div
                  className="mb-2 border-dashed border-gray-light"
                  key={`drop-${i}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <ul>
          {contentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
