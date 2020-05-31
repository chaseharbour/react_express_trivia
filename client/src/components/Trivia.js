import React, { useState, useEffect } from "react";
import he from "he";

const Trivia = ({ questions, gameState, socket }) => {
  const [gameStarted, setGameStarted] = useState(gameState);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionCorrect, setQuestionCorrect] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    setGameStarted(gameState);
  });

  useEffect(() => {
    setAllQuestions([...questions]);
  }, [questions]);

  useEffect(() => {
    socket.emit("answer", userAnswer);
  }, [userAnswer]);

  const chooseAnswer = (event) => {
    setUserAnswer(he.decode(event.target.innerText));
  };

  const checkAnswer = (event) => {
    const correctAns = questions[currentQuestion].correct_answer;
    setClicked(true);

    he.decode(event.target.innerText) === correctAns
      ? setQuestionCorrect(true)
      : setQuestionCorrect(false);
  };

  return (
    <div>
      <p>Your answer is: {userAnswer}</p>
      {gameStarted ? (
        <div>
          {questions.map((q, i) => {
            return (
              <div key={i}>
                <p>{he.decode(q.question)}</p>
                {q.incorrect_answers.map((a, i) => {
                  return (
                    <button
                      className={`p-2 m-2 ${
                        questionCorrect && clicked
                          ? "bg-red-500"
                          : "bg-gray-700"
                      } text-white hover:bg-black`}
                      key={i}
                      onClick={(e) => chooseAnswer(e)}
                    >
                      {he.decode(a)}
                    </button>
                  );
                })}
                <button
                  className={`p-2 m-2 ${
                    questionCorrect ? "bg-green-500" : "bg-gray-700"
                  } text-white hover:bg-black`}
                  onClick={(e) => chooseAnswer(e)}
                >
                  {he.decode(q.correct_answer)}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Game has not yet started</h1>
      )}
    </div>
  );
};

export default Trivia;
