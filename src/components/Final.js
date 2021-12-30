import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

function Final() {
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    UserService.getAllQuestions().then(
      (response) => {
        setQuestions(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setError(_content);
      }
    );
  }, []);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      const userAnswer = localStorage.getItem(`question-${i + 1}`);
      if (userAnswer !== questions[i].correctAnswer) {
        if (userAnswer.length > 1) {
          for (let j = 0; j < userAnswer.length; j++) {
            if (!questions[i].correctAnswer.includes(userAnswer[j])) {
              const element = document.querySelector(
                `#question-${i + 1}-${userAnswer[j]}`
              );
              if (element) {
                element.style.backgroundColor = "red";
              }
            }
          
          }
        }
        const element = document.querySelector(
          `#question-${i + 1}-${userAnswer}`
        );
        if (element) {
          element.style.backgroundColor = "red";
        }
      } else {
        count++;
      }
    }
    setScore(count);

    if (count) UserService.saveResult(count, user.id);
  }, [questions]);

  return (
    <div>
      {error && (
        <div className="container">
          <header className="jumbotron text-center">
            <h3>{error}</h3>
          </header>
        </div>
      )}
      {!error && (
        <div className="container mb-5">
        <header className="jumbotron text-center">
          <h3>Score: {score}/{questions.length}</h3>
        </header>
      </div>
      )}
      
      {questions.map((question) => {
        return (
          <div key={`question-${question.id}`} className="text-center border mb-2">
            {" "}
            <h5>
              Question {question?.id}: {question?.question}
            </h5>
            {Object.keys(question.answers).map((letter) => (
              <p
                key={letter}
                id={`question-${question.id}-${letter}`}
                style={
                  question.correctAnswer.includes(letter)
                    ? { backgroundColor: "green", color: "white" }
                    : {}
                }
              >
                {letter} : {question.answers[letter]}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Final;
