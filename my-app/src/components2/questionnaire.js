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
  const [actorArray, setActorArray] = React.useState([]);
  const [actorJSON, setActorJSON] = React.useState("");

  const [movieJSON, setMovieJSON] = React.useState("");

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

  function handleClickSearchFilter() {
    setActorArray([]);
    setActorJSON("");
    let inputName = document.getElementById("nameInput").value;
    let nameQuery = inputName.replace(" ", "+");
    let url = "https://api.themoviedb.org/3/search/person?api_key=89e8071cdf777af6e727e4cac6f685f9&language=en-US&query=" + nameQuery;
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(stuff){
      let jsonData = JSON.parse(JSON.stringify(stuff));
      setActorArray(jsonData["results"].map(s=>[s.name, s.id, s.profile_path, s.known_for_department]));
      let j = jsonData["results"].map(({name, id, profile_path, known_for_department}) => ({name, id, profile_path, known_for_department}));
      j = j.filter(function(item){
        return item.known_for_department == "Acting" && item.profile_path!= null;
      });
      setActorJSON(j);

      console.log(actorJSON);

    })
    .catch(function(error){
      console.log('Found an error: ' + error);
    });

  };

  function fetchMovie(genreIds, actorId) {
    setMovieJSON("");
    console.log(genreIds);
    let url = "https://api.themoviedb.org/3/person/" + actorId + "?api_key=89e8071cdf777af6e727e4cac6f685f9&append_to_response=credits";
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(stuff){
      let jsonData = JSON.parse(JSON.stringify(stuff));
      console.log(jsonData.credits.cast);
      let j = jsonData.credits.cast.map(({title, id, genre_ids, poster_path, popularity}) => ({title, id, genre_ids, poster_path, popularity}));
      
      j = j.filter(function(item){
        return item.genre_ids.filter(x => genreIds.map(x => parseInt(x)).includes(x)).length > 0;
      });
      
      j = j.sort((a,b) => {
        if (a.popularity > b.popularity){
          return -1;
        }
      });
      
      if(j.length > 10){
        j = j.slice(0,10);
      }

      
      console.log(j);

      setMovieJSON(j);
      // console.log(j[0].popularity);
      // console.log(j[1].popularity);
      // console.log(j[2].popularity);
      // console.log(j[3].popularity);

      // console.log(j[0].genre_ids);
      // console.log(genreIds.map(x => parseInt(x)));
      // console.log(j[0].genre_ids.filter(x => genreIds.map(x => parseInt(x)).includes(x)));
      // console.log(movieJSON);

    })
    .catch(function(error){
      console.log('Found an error: ' + error);
    });

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
            {/* {questions[currentQuestion].questionType === "Single Choice" && questions[currentQuestion].answerOptions.map((item) => (
              <button key={item.answerText} onClick={() => {handleClick(item.answerText); addAnswer(item.answerText)}}>
                {item.answerText}
              </button>
            ))} */}
            {currentQuestion === 0 && questions[currentQuestion].answerOptions.map((item) => (
              <button key={item.id} id={item.id} onClick={handleClickMultiple}>
                {item.answerText}
              </button>
            ))}
            {currentQuestion === 1 && <input type="text" placeholder="Actor or Actress" id="nameInput"></input> 
            }
            {currentQuestion === 1 && 
            <button onClick={() => {handleClickSearchFilter();}} class="searchButton">Search</button> }

            {currentQuestion === 1 && actorJSON.length !== 0 && actorJSON.map((item) => (
              <button key={item.id} id={item.id} 
              onClick={() => {handleClick(item.name); 
                  addAnswer(item.id);
                  fetchMovie(answerArray[0], item.id);
              }}>
                <img src={"https://image.tmdb.org/t/p/original/"+item.profile_path} width="20%" height="50%"></img>
                {item.name}
              </button>
            ))}

            {currentQuestion === 2 && movieJSON.length !==0 && movieJSON.map((item) => (
              <button key={item.id} id={item.id} onClick={handleClickMultiple}>
                <img src={"https://image.tmdb.org/t/p/original/"+item.poster_path} width="20%" height="50%"></img>
                {item.title}
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
                  multipleAns += allSelected[i].id;
                  multipleAns += ",";
                }
                multipleAns = multipleAns.slice(0, -1);
                let multipleAnsArray = multipleAns.split(",");
                addAnswer(multipleAnsArray);
                if(currentQuestion < questions.length-1){
                  setCurrentQuestion(currentQuestion+1);
                }else{
                  setShowScore(true);
                }
              }

            }}
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
