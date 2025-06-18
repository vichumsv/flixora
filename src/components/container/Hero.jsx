import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useMovieContext } from "../../context/MovieContext";

const Hero = () => {
  const { featuredMovies: feaMovies } = useMovieContext();

  return (
    <div className="swiper-container mb-5">
      <h2 className="mb-5 text-3xl">Featured Movies</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          300: { slidesPerView: 1 },
          500: { slidesPerView: 2 },
          767: { slidesPerView: 3 },
          1000: { slidesPerView: 4 },
          1300: { slidesPerView: 5 },
        }}
      >
        {feaMovies.map((feaMovie, idx) => (
          <SwiperSlide key={feaMovie.id}>
            <div className="w-full h-[400px]">
              <img
                className="w-full h-full"
                src={`https://image.tmdb.org/t/p/w780${feaMovie.poster_path}`}
                alt={feaMovie.title}
                title={feaMovie.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
