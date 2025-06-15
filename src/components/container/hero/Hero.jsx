import React from "react";

import { useMovies } from "../../data/MoviesContext";

import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Hero = () => {
  const { movies } = useMovies(); //Calling useMovies custom hook to use Tanstack Query

  //Check if movies exists and has content - this is to avoid movies array undefined before it gets the data
  if (!movies || movies.length === 0) return null;

  // console.log(!movies);

  console.log("Movies", movies);

  return (
    <div className="swiper-container mb-5">
      <h2 className="mb-5 text-3xl">Featured Movies</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },

          500: {
            // width: 576,
            slidesPerView: 2,
          },

          767: {
            // width: 576,
            slidesPerView: 3,
          },

          1000: {
            slidesPerView: 4,
          },

          1300: {
            // width: 576,
            slidesPerView: 5,
          },
        }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {movies.slice(0, 10).map((movie, idx) => (
          <SwiperSlide key={movie.id}>
            <div className="w-full h-[400px]" key={movie.id}>
              <img
                className="w-full h-full"
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
