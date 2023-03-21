import React from "react";
import "./App.css";
import { questions } from "./questions";
import { useState } from "react";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [answers, setAnswer] = React.useState("");
  
  function addAnswer(t){
    setAnswer(answers + "," + t);
  }

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswer(answers + "," + isCorrect);
    

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="app">
      {showScore ? (
        <section className="showScore-section">
          Your answers: {JSON.stringify(answers.split(",").filter(elm => elm))}
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
              <button onClick={() => {handleClick(item.answerText); addAnswer(item.answerText)}}>
                {item.answerText}
              </button>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
