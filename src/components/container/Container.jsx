import React from "react";
import Hero from "./hero/Hero";
import Gallery from "./gallery/Gallery";

const Container = () => {
  return (
    <>
      <div className="mov-container bg-[#222] p-4">
        <Hero />
        <Gallery />
      </div>
    </>
  );
};

export default Container;
