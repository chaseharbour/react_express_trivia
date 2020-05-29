import React, { useState, useEffect } from "react";
import he from "he";

const Trivia = ({ questions }) => {
  console.log(questions);

  return (
    <div>
      {questions.map((q, i) => {
        return (
          <div key={i}>
            <p>{he.decode(q.question)}</p>
            {q.incorrect_answers.map((a, i) => {
              return (
                <button
                  className="p-2 m-2 bg-gray-700 text-white hover:bg-black"
                  key={i}
                >
                  {he.decode(a)}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Trivia;
