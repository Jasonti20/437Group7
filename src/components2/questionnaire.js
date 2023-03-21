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
  //const [answers, setAnswer] = React.useState("");
  const [answerArray, setAnswerArray] = React.useState([]);
  
  const [showRow, setShowRow] = React.useState(false);
  const [curAns, setCurAns] = React.useState("");


  const { user, logoutUser } = useUserContext();
  

  function addAnswer(t) {
    //setAnswer(answers + "," + t);
    if(answerArray.length<=currentQuestion){
      setAnswerArray([...answerArray, t]);
    }else{
      const newArray = answerArray.map((c, i) =>{
        if (i === currentQuestion){
          return t;
        }else{
          return c;
        }
      });
      setAnswerArray(newArray);
    }
  }

  const handleClickMultiple = event => {
    if(event.currentTarget.classList.contains('selectedButton')){
      event.currentTarget.classList.remove('selectedButton');
    }else{
      event.currentTarget.classList.toggle('selectedButton');
    }
  };

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
          {/* {console.log(JSON.stringify(answers.split(",").filter(elm => elm)))} */}
          {console.log(JSON.stringify(answerArray))}
          <div className='dashboard'>
            <Nav />
            <Banner />
            <Row
            title='Popular Now' fetchUrl={requests.fetchPopular} 
            isLargeRow
            />
            <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
            {curAns === 'Comedy' && <Row title='Suggested Comedy Movies' fetchUrl={requests.fetchComedyMovies} />}
            {curAns === 'Action' && <Row title='Suggested Action Movies' fetchUrl={requests.fetchActionMovies} />}
            {curAns === 'Horror' && <Row title='Suggested Horror Movies' fetchUrl={requests.fetchHorrorMovies} />} 
            {curAns === 'Romance' && <Row title='Suggested Romance Movies' fetchUrl={requests.fetchRomanceMovies} />}  
            {curAns === 'Documentaries' && <Row title='Suggested Documentaries Movies' fetchUrl={requests.fetchDocumentaries} />}  
          </div>
        </section>
      ) : (
        <>
          <section className="question-section">
            <h1>
              Question {currentQuestion + 1}/{questions.length}
            </h1>
            <p>{questions[currentQuestion].questionText + " (" + questions[currentQuestion].questionType + ")"}</p>
          </section>

          <section className="answer-section">
            {questions[currentQuestion].questionType === "Single Choice" && questions[currentQuestion].answerOptions.map((item) => (
              <button key={item.answerText} onClick={() => {handleClick(item.answerText); addAnswer(item.answerText)}}>
                {item.answerText}
              </button>
            ))}
            {questions[currentQuestion].questionType === "Multiple Choice" && questions[currentQuestion].answerOptions.map((item) => (
              <button key={item.answerText} onClick={handleClickMultiple}>
                {item.answerText}
              </button>
            ))}
          </section>

          <section className="back-button">
            {currentQuestion !== 0 && <button onClick={() => {setCurrentQuestion(currentQuestion-1)}}
              >Previous
                
              </button>}
            {questions[currentQuestion].questionType === "Multiple Choice" && <button onClick={() => {
              const allSelected = Array.from(document.getElementsByClassName('selectedButton'));
              let multipleAns = "";
              if(allSelected.length <= 0){
                alert("Please select at least one option, or skip this question.");
              }else{
                for (let i = 0; i < allSelected.length; i++){
                  multipleAns += allSelected[i].innerText;
                  multipleAns += "+";
                }
                addAnswer(multipleAns.slice(0, -1));
                if(currentQuestion < questions.length-1){
                  setCurrentQuestion(currentQuestion+1);
                }else{
                  setShowScore(true);
                }
              }
              
              }
            }
              >Next
              </button>}
            
              
          </section>

          <section className="skip-button">
            {currentQuestion < questions.length-1 && <button onClick={() => {setCurrentQuestion(currentQuestion+1); addAnswer("Skipped")}}
            >Skip</button>}
            {currentQuestion === questions.length-1 && <button onClick={() => {addAnswer("Skipped"); setShowScore(true);}}
            >Skip</button>}
          
          </section>
        </>
      )}
    </div>
  );
};

export default Questionnaire
