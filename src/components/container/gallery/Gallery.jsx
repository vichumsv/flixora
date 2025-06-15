import React from "react";

import { useMovies } from "../../data/MoviesContext";
import { useGenres } from "../../data/GenreContext";

const Gallery = () => {
  const { movies } = useMovies(); //Calling useMovies custom hook to use Tanstack Query
  const { genres } = useGenres(); //Calling useGenres custom hook to use Tanstack Query

  //Check if movies exists and has content - this is to avoid movies array undefined before it gets the data

  if (!movies || movies.length === 0) return null;
  if (!genres || genres.length === 0) return null;

  // xl:flex-1/5 md:flex-1/3 sm:w-full max-sm:w-full
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
                  .map((id) => genres.find((g) => g.id === id).name)
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
    </div>
  );
};

export default Gallery;
