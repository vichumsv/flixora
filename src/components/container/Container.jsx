import React from "react";
import Hero from "./Hero";
import MovieList from "./MovieList";

const Container = () => {
  return (
    <>
      <div className="mov-container bg-[#222] p-4">
        <Hero />
        <MovieList />
      </div>
    </>
  );
};

export default Container;
