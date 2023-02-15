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
// import { useState } from "react";



const Questionnaire = () => {

    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);
    const [answer] = React.useState("");


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
    <div className="questionnaire">
      { showScore ? (
        <section className="showScore-section">
          Your answer is {answer}
          
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

