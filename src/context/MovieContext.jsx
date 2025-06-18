import React, { createContext, useContext, useState } from "react";
import { useInfiniteMovies } from "../cutom-hooks/useInfiniteQuery";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const infiniteQuery = useInfiniteMovies(searchTerm, genre);

  // Get the first 10 movies only once from the first page
  const firstPage = infiniteQuery.data?.pages?.[0]?.results ?? [];
  const featuredMovies = firstPage.slice(0, 10);

  const value = {
    searchTerm,
    setSearchTerm,
    genre,
    setGenre,
    featuredMovies, // derived from first page
    ...infiniteQuery,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
