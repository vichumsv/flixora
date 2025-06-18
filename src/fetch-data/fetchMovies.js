import axios from "axios";

const apiKey = "2f483da79ea93386cfcb0b940652a14a";

// Fetching movies using optional parameters: page, searchTerm, and genre
export const fetchMovies = async ({
  page = 1,
  searchTerm = "",
  genre = "",
}) => {
  // Choose url based on whether a search term is entered or not
  const url = searchTerm
    ? "https://api.themoviedb.org/3/search/movie"
    : "https://api.themoviedb.org/3/discover/movie";

  // Send request using axios and pass API key and other params
  const { data } = await axios.get(url, {
    params: {
      api_key: apiKey,
      query: searchTerm,
      with_genres: genre,
      page,
    },
  });

  // Return structured data for react-query
  return {
    results: data.results, // Movies array
    nextPage: page + 1, // For pagination
    totalPages: data.total_pages, // Total number of pages available
  };
};
