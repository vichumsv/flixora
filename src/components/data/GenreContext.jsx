import React from "react";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "./movies";

const GenreContext = createContext();

//--Provider that wraps whole app--//
export const GenresProvider = ({ children }) => {
  //--Fetch Genres data with TanStack Query--//
  const {
    data: genres,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 5000, // 5 seconds caching
  });

  //--Centralized loading & error handling--//
  isLoading && <p className="text-center mt-10">Loading movies...</p>;
  error && (
    <p className="text-red-500 text-center mt-10">Failed to load movies.</p>
  );

  //--Provide fetched Genres data to children--//
  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
};

//--Custom Hook to access Genres context easily--//
export const useGenres = () => useContext(GenreContext);
