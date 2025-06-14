import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/header/Header";

function App() {
  const [movies, setMovies] = useState([]); //Movie data stored in movies
  const [page, setPage] = useState(1); //page number in api data. Each page has 20 movies in results array

  const apiURL = "https://api.themoviedb.org/3/movie/popular?api_key=";
  const apiKey = "2f483da79ea93386cfcb0b940652a14a";
  const apiPage = `&page=${page}`;

  //Using useEffect fetch the data only one time.
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${apiURL}${apiKey}${apiPage}`);
        setMovies(response.data.results);
        console.log(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchMovies();
  }, []);

  console.log(movies);
  return (
    <>
      <div>
        <h1 className="text-amber-800">Popular Movies</h1>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
