import React from "react";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import ProgressBar from "./common/ProgressBar";
function Header() {
  return (
    <header className="animate__fadeInDown animate__animated flex h-[100px] items-center justify-center">
      <Logo className=" w-[200px]" />
      <ProgressBar />
    </header>
  );
}

export default Header;
