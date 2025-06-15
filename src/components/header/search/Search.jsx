import React from "react";

const Search = () => {
  return (
    <>
      <div className="">
        <input
          className="p-2 text-xl text-white bg-[#333] focus-visible:outline-2 focus-visible:outline-yellow-600"
          type="search"
          id="mov-search"
          name="mov-search"
          placeholder="Search"
        ></input>
      </div>
    </>
  );
};

export default Search;
