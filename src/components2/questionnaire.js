// import Auth from "./components/auth";
// import Dashboard from "./components/dashboard";
// import { useUserContext } from "./context/userContext";

// function App() {
//   const { user, loading, error } = useUserContext();

//   return (
//     <div className="App">
//       {error && <p className="error">{error}</p>}
//       {loading ? <h2>Loading...</h2> : <> {user ? <Dashboard /> : <Auth />} </>}
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./questionnaire.css";
import { questions } from "./questions";
import { BrowserRouter as Router, Switch, 
Route, Redirect,} from "react-router-dom";
import Dashboard from "../dashboard";
import { useUserContext } from "../context/userContext";
import Row from '../components2/Row';
import requests from '../requests';
import Banner from '../components2/Banner';
import Nav from '../components2/Nav';
import '../dashboard.css';
// import { useState } from "react";



const Questionnaire = () => {

    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);
    const [answer] = React.useState("");
    const { user, logoutUser } = useUserContext();


    const handleClick = (answerText) => {
    
    setScore(score + 1);
    
    

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }

  }

    return(
    <div>
      { showScore ? (
        <section className="dashboard">
            <div className='dashboard'>
      <Nav />
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
    </div>
          
        </section>
      ) :(
        <>
          <section className="question-section">
            <h1>
              Question {currentQuestion + 1}/{questions.length}
            </h1>
            <p>{questions[currentQuestion].questionText}</p>
          </section>

          <section className="answer-section">
            {questions[currentQuestion].answerOptions.map((item) => (
              <button onClick={() => handleClick(item.isCorrect)}>
                {item.answerText}
              </button>
            ))}
          </section>
        </>
      )}
    </div>
    );
};

export default Questionnaire;

