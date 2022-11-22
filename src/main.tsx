import StepContextProvider from "./components/provider/StepProvider";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "animate.css";

ReactDOM.render(
  <React.StrictMode>
    <StepContextProvider>
      <App />
    </StepContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
