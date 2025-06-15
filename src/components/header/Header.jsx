import React from "react";
import Logo from "./logo/Logo";
import Search from "./search/Search";

const Header = () => {
  return (
    <>
      <header className="p-2 pr-4 flex items-center justify-between bg-black">
        <Logo />
        <Search />
      </header>
    </>
  );
};

export default Header;
