import React, { useMemo } from "react";
import { useStep } from "@/components/provider/StepProvider";
function ProgressBar() {
  const { activeStep } = useStep();
  const percentage = useMemo(() => {
    return Math.round((activeStep / 11) * 100);
  }, [activeStep]);
  return (
    <div className="w-2/3 pl-10">
      <h4 className="pb-4">新手進度</h4>
      <div className="h-5 overflow-hidden bg-white rounded-xl">
        <div
          style={{ width: percentage + "%" }}
          className="h-5 rounded-xl bg-orange-dark"
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
