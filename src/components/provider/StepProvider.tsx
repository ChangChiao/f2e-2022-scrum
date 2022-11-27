import { createContext, ReactNode, useContext, useState } from "react";

interface StepContextInterface {
  activeStep: number;
  nextStep: () => void;
}

const StepContext = createContext<StepContextInterface>(
  {} as StepContextInterface
);

const StepContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState(8);

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  return (
    <StepContext.Provider
      value={{
        nextStep,
        activeStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => useContext(StepContext);

export default StepContextProvider;
