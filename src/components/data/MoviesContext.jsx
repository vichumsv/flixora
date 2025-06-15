import { createContext, useContext } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "./movies";

const MoviesContext = createContext(); // Creates a context

//--Provider that wraps whole app--//
export const MoviesProvider = ({ children }) => {
  //--Fetch movie data with TanStack Query--//
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 5000, // 5 seconds caching
  });

  //--Centralized loading & error handling--//
  isLoading && <p className="text-center mt-10">Loading movies...</p>;
  error && (
    <p className="text-red-500 text-center mt-10">Failed to load movies.</p>
  );

  //--Provide fetched movie data to children--//
  return (
    <MoviesContext.Provider value={{ movies }}>
      {children}
    </MoviesContext.Provider>
  );
};

//--Custom Hook to access movies context easily--//
export const useMovies = () => useContext(MoviesContext);
