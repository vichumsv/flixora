import React, { useEffect, useRef, useMemo } from "react";
import { useInfiniteMovies } from "../../cutom-hooks/useInfiniteQuery";
import { useMovieContext } from "../../context/MovieContext";
import { movieGenres } from "../../data/genres";

// MovieList component
const MovieList = () => {
  const { searchTerm, genre } = useMovieContext();
  // Use custom hook to fetch movie data
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteMovies(searchTerm, genre);

  const observerRef = useRef(); // Ref to target for auto scroll observer

  // Flatten nested pages of results into a single array of unique movies without duplicates
  const movies = useMemo(() => {
    const allMovies = data?.pages.flatMap((page) => page.results) ?? [];
    const uniqueMap = new Map();
    for (const movie of allMovies) {
      if (!uniqueMap.has(movie.id)) {
        uniqueMap.set(movie.id, movie);
      }
    }
    return Array.from(uniqueMap.values());
  }, [data]);

  // Set up IntersectionObserver to load more when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // Fetch next page of movies
        }
      },
      { threshold: 1 } // Fire callback when 100% in view
    );

    const current = observerRef.current;
    if (current) observer.observe(current); // Start observing the div

    return () => {
      if (current) observer.unobserve(current); // Cleanup observer
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <p>Loading...</p>; // Show while loading
  if (error) return <p>Error loading movies</p>; // Show on error

  return (
    <div className="gallery-container">
      <h2 className="mb-5 text-3xl ">Gallery</h2>
      <div className="galery-flex flex flex-wrap gap-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="gallery border border-yellow-500 flex 2xl:flex-1/5 xl:flex-1/4 md:flex-1/3 sm:w-full max-sm:w-full items-center gap-2.5 "
          >
            {/* Image */}
            <div className="image-holder w-[150px] flex-shrink-0 p-1">
              <img
                className="w-full h-full object-contain"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
              />
            </div>
            {/* Details */}
            <div className="details  p-2 text-xl">
              <div className="title">
                <span className="text-[#f2a64e]">Title:</span> {movie.title}
              </div>
              <div className="release-date">
                <span className="text-[#f2a64e]">Release:</span>{" "}
                {new Date(movie.release_date)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/ /g, "-")}
              </div>
              <div className="genre">
                <span className="text-[#f2a64e]">Genre: </span>
                {movie.genre_ids
                  .map((id) => movieGenres.find((g) => g.id === id).name)
                  .join(", ")}
              </div>
              <div className="rating">
                <span className="text-[#f2a64e]">Rating: </span>
                <span className="text-base">⭐ </span>
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={observerRef}
        className="h-10 w-full mt-5 text-center text-gray-500"
      >
        {isFetchingNextPage ? "Loading more movies..." : ""}
      </div>
    </div>
  );
};

export default MovieList;
