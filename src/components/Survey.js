import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

import UserService from "../services/user.service";

const Survey = () => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [options, setOptions] = useState("");

  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    UserService.getQuestion(id).then(
      (response) => {
        setQuestion(response.data);
        setOptions(Object.keys(response.data.answers));
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
  }, [id]);

  const getAnswer = () => {
    const quest = document.querySelector(`#question-${id}`);
    if (question?.multi) {
      const answer = Array.from(quest.querySelectorAll(`input:checked`)).map(input => input.value).sort().join("")
      localStorage.setItem(`question-${id}`, answer)
    } else {
      const answer = quest.querySelector(`input:checked`)?.value;
      localStorage.setItem(`question-${id}`, answer)
    }
  }

  const handlePrevious = () => {
    history.push(`/question/${Number(id) - 1}`);
  };

  const handleNext = () => {
    getAnswer();
    history.push(`/question/${Number(id) + 1}`);
  };

  const handleSubmit = () => {
   getAnswer();
   history.push(`/result`)
  };

  return (
    <div>
      {error && (
        <div className="container">
          <header className="jumbotron">
            <h3>{error}</h3>
          </header>
        </div>
      )}
      {!error && (
        <div>
          <div className="container text-center">
            <header className="jumbotron">
              <h1>Survey</h1>
            </header>
          </div>
          <div className="quiz-container text-center border">
            <div className="quiz" id={`question-${question.id}`}>
              <div className="question lead">
                Question {question?.id}: {question?.question}
              </div>
              <div className="answers">
                {Array.isArray(options) &&
                  options.map((letter) => {
                    return (
                      <label key={letter}>
                        {" "}
                        <input
                          type={question?.multi ? "checkbox" : "radio"}
                          name={`question-${question.id}`}
                          value={letter}
                        />
                        {letter} : {question?.answers?.[letter]}
                      </label>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
      {!error && (
        <div className="text-center mt-3">
          {id > 1 && (
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {id < 5 && (
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {Number(id) === 5 && (
            <button
              type="button"
              className="btn btn-danger mx-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}{" "}
        </div>
      )}
    </div>
  );
};

export default Survey;
