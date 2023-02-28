import React from "react";
import "./questionnaire.css";
import { questions } from "./questions";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../dashboard";
import { useUserContext } from "../context/userContext";
import Row from '../components2/Row';
import requests from '../requests';
import Banner from '../components2/Banner';
import Nav from '../components2/Nav';
import '../dashboard.css';

const Questionnaire = () => {

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [answers, setAnswer] = React.useState("");
  const [showRow, setShowRow] = React.useState(false);
  const [curAns, setCurAns] = React.useState("");

  const { user, logoutUser } = useUserContext();

  function addAnswer(t) {
    setAnswer(answers + "," + t);
  }

  const handleClick = (answerText) => {
    if (currentQuestion === 0) {
      // if answering the first question
      if (answerText === "Comedy") {
        setCurAns("Comedy");
      } 
      if (answerText === "Action") {
        setCurAns("Action");
      } 
      if (answerText === "Horror") {
        setCurAns("Horror");
      } 
      if (answerText === "Romance") {
        setCurAns("Romance");
      } 
      if (answerText === "Documentaries") {
        setCurAns("Documentaries");
      } 
      else {
        setShowRow(false);
      }
    } else {
      // if answering any question other than the first one
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div>
      {showScore ? (
        <section className="dashboard">
          <div className='dashboard'>
            <Nav />
            <Banner />

            {curAns === 'Comedy' && <Row title='Suggested Comedy Movies' fetchUrl={requests.fetchComedyMovies} isLargeRow/>}
            {curAns === 'Action' && <Row title='Suggested Action Movies' fetchUrl={requests.fetchActionMovies} isLargeRow/>}
            {curAns === 'Horror' && <Row title='Suggested Horror Movies' fetchUrl={requests.fetchHorrorMovies} isLargeRow/>} 
            {curAns === 'Romance' && <Row title='Suggested Romance Movies' fetchUrl={requests.fetchRomanceMovies} isLargeRow/>}  
            {curAns === 'Documentaries' && <Row title='Suggested Documentaries Movies' fetchUrl={requests.fetchDocumentaries} isLargeRow/>} 

            <Row title='Popular Now' fetchUrl={requests.fetchPopular} isLargeRow/>     
            <Row title='Top Rated' fetchUrl={requests.fetchTopRated} isLargeRow/>
          </div>
          
        </section>
      ) : (
        <>
          <section className="question-section">
            <h1>
              Question {currentQuestion + 1}/{questions.length}
            </h1>
            <p>{questions[currentQuestion].questionText}</p>
          </section>

          <section className="answer-section">
            {questions[currentQuestion].answerOptions.map((item) => (
              <button key={item.answerText} onClick={() => handleClick(item.answerText)}>
                {item.answerText}
              </button>
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default Questionnaire
