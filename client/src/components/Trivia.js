import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  //const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&category=23")
      .then((res) => setQuestions(res.data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {questions.map((q, i) => {
        return (
          <div>
            <p key={i}>{he.decode(q.question)}</p>
            <ul>
              <li>-{q.correct_answer}</li>
              {q.incorrect_answers.map((answer) => {
                return <li>-{answer}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Trivia;
