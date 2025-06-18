import { useInfiniteQuery } from "@tanstack/react-query"; // Import TanStack's infinite query hook
import { fetchMovies } from "../fetch-data/fetchMovies"; // Import the API call function

// Custom hook to fetch paginated movies
export const useInfiniteMovies = (searchTerm, genre) => {
  return useInfiniteQuery({
    queryKey: ["movies", { searchTerm, genre }], // Cache key that changes on search/genre
    queryFn: ({ pageParam = 1 }) =>
      fetchMovies({ page: pageParam, searchTerm, genre }), // Fetch function
    getNextPageParam: (lastPage) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined, // Logic to get next page
    staleTime: 1000 * 60 * 5, // Cache is fresh for 5 minutes
  });
};
