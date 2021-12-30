import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

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
    for (let i = 0; i < questions.length; i++) {
      const element = document.querySelector(`#question-${i}`);
      if (i >= page * 5 && i < page * 5 + 5) {
        if (element) element.style.display = "inline-block";
      } else {
        if (element) element.style.display = "none";
      }
    }
  }, [page, questions]);

  const answers = ["a", "b", "c", "d"];

  return (
    <div>
      <div className="container text-center">
        <header className="jumbotron">
          <h1>Survey</h1>
        </header>
      </div>
      {questions.map((question, index) => {
        return (
          <div key={question.id}>
            <form id={`question-${index}`}>
              <h5>
                Question {question?.id}: {question?.question}
              </h5>
              {question?.answer?.map((answer, index ) => {
              return (
                <div key={answer}>
                  <label>
                    <input
                      type={question?.multi ? "checkbox" : "radio"}
                      name={`question${question?.id}`}
                      value={answers[index]}
                    />
                    {answer}
                  </label>
                </div>
              );
            })}
            </form>
          </div>
        );
      })}
      <div className="button">
        {page > 0 ? (
          <button onClick={() => setPage(page - 1)}>Previous</button>
        ) : (
          <div></div>
        )}
        {page < Math.floor(questions?.length / 5) ? (
          <button onClick={() => setPage(page + 1)}>Next</button>
        ) : (
          <button>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
