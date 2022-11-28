import { createContext, ReactNode, useContext, useState } from "react";

interface StepContextInterface {
  activeStep: number;
  nextStep: () => void;
  resetStep: () => void;
}

const StepContext = createContext<StepContextInterface>(
  {} as StepContextInterface
);

const StepContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const resetStep = () => {
    setActiveStep(0);
  };

  return (
    <StepContext.Provider
      value={{
        nextStep,
        resetStep,
        activeStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => useContext(StepContext);

export default StepContextProvider;
