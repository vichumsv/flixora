import React from "react";

import LogoImg from "./images/logo.png";

const Logo = () => {
  return (
    <div className="flex gap-1 items-center">
      <div className="logo w-8">
        <img src={LogoImg} alt="Logo" title="Logo" />
      </div>
      <div className="name text-xl">Flixora</div>
    </div>
  );
};

export default Logo;
