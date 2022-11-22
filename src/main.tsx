import StepContextProvider from "./components/provider/StepProvider";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StepContextProvider>
      <App />
    </StepContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
