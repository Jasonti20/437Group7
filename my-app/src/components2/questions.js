export const questions = [
  {
    questionText: "Pick a movie genre you'd most like to watch right now.",
    questionType: "Multiple Choice",
    answerOptions: [
      { answerText: "Action", id: 28 },
      { answerText: "Adventure", id: 12 },
      { answerText: "Animation", id: 16 },
      { answerText: "Comedy", id: 35 },
      { answerText: "Crime", id: 80 },
      { answerText: "Documentary", id: 99 },
      { answerText: "Drama", id: 18 },
      { answerText: "Family", id: 10751 },
      { answerText: "Fantasy", id: 14 },
      { answerText: "History", id: 36 },
      { answerText: "Horror", id: 27 },
      { answerText: "Music", id: 10402 },
      { answerText: "Mystery", id: 9648 },
      { answerText: "Romance", id: 10749 },
      { answerText: "Science Fiction", id: 878 },
      { answerText: "TV Movie", id: 10770 },
      { answerText: "Thriller", id: 53 },
      { answerText: "War", id: 10752 },
      { answerText: "Western", id: 37 },
      
    ],
  },
  {
    questionText: "Choose the name of your favourite actor/actress:",
    questionType: "Search Filter",
    answerOptions: [
      { answerText: "Star Wars", id: true },
      { answerText: "The Avengers", id: true },
      { answerText: "Harry Potter", id: true },
      { answerText: "Shrek", id: true },
      
    ],
  },
  {
    questionText: "We have recommended 10 movies for you. Which movies have you not watched yet?",
    questionType: "Multiple Choice",
    answerOptions: [
      { answerText: "Movie1", id: 1 },
      { answerText: "Movie2", id: 2 },
      { answerText: "Movie3", id: 3 },
      { answerText: "Movie4", id: 4 },
      { answerText: "Movie5", id: 5 },
      { answerText: "Movie6", id: 6 },
      { answerText: "Movie7", id: 7 },
      { answerText: "Movie8", id: 8 },
      { answerText: "Movie9", id: 9 },
      { answerText: "Movie10", id: 10 },
    ],
  },
  // {
  //   questionText: "Which mind-melting movie do you like most?",
  //   questionType: "Multiple Choice",
  //   answerOptions: [
  //     { answerText: "Requiem for a Dream", id: true },
  //     { answerText: "Shutter Island", id: true },
  //     { answerText: "Cloud Atlas", id: true },
  //     { answerText: "The Truman Show", id: true },
      
  //   ],
  // },
  
];


const genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=89e8071cdf777af6e727e4cac6f685f9&language=en-US";