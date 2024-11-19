/* eslint-disable */
// src/components/ScoreDashboard.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const ScoreDashboard = () => {
  const location = useLocation();
  const { questions, answers } = location.state || { questions: [], answers: [] };

  const correctAnswersCount = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-4">
        Your Score: {correctAnswersCount}/{questions.length}
      </h2>
      {questions.map((question, index) => (
        <div key={index} className="my-4">
          <h4 className="font-semibold">{question.question}</h4>
          <p>
            <span className="font-bold">Correct Answer:</span>{" "}
            {question.options[question.correctAnswer]}
          </p>
          <p>
            <span className="font-bold">Your Answer:</span>{" "}
            {answers[index] !== undefined
              ? question.options[answers[index]]
              : "Skipped"}
          </p>
          <p className="italic text-gray-600">{question.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default ScoreDashboard;
