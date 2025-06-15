import axios from "axios";

const movieApi = "https://api.themoviedb.org/3/movie/popular?api_key=";
const genreApi = "https://api.themoviedb.org/3/genre/movie/list?api_key=";
const apiKey = "2f483da79ea93386cfcb0b940652a14a";

export const fetchMovies = async () => {
  const res = await axios.get(`${movieApi}${apiKey}`);
  console.log("Result", res);
  console.log("Data", res.data);
  return res.data.results; // returns movies array
};

export const fetchGenres = async () => {
  const res = await axios.get(`${genreApi}${apiKey}`);
  console.log("Genres", res.data.genres);
  return res.data.genres; // only return the array
};

export const fetchInfiniteMovies = async ({ pageParam = 1 }) => {
  const res = await axios.get(`${movieApi}${apiKey}&page=${pageParam}`);
  console.log("Infinite", res.data);
  return res.data;
};

export const useInfiniteMovies = () =>
  useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchInfiniteMovies,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
