// import {answer} from "./components2/questionnaire";
const API_KEY = '89e8071cdf777af6e727e4cac6f685f9';


const requests = {
  fetchPopular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1%27`,
  fecthLatest: `/movie/latest?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchRecommended: `/movie/505642?/similar?api_key=${API_KEY}&language=en-US`,
};




export default requests;


