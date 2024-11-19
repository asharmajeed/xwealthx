import { useState, useEffect } from "react";
import MCQ from "./MCQ";
import { useNavigate } from "react-router-dom";
import { finalArray as questions } from "../data/IPQuestions";

const IPQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          handleNextQuestion(); // Move to the next question if time runs out
          return 120;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, [currentQuestionIndex]);

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer; // Save the selected answer
    setAnswers(updatedAnswers);
    setIsSubmitted(true); // Mark as submitted to display explanation
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(120); // Reset timer for next question
  };

  const handleFinishQuiz = () => {
    navigate("/studentdashboard", { state: { questions, answers } });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">
        Question {currentQuestionIndex + 1}/85:{" "}
        <pre className="text-base pt-2 text-wrap">
          {questions[currentQuestionIndex].text}
        </pre>
      </h2>

      <MCQ
        options={questions[currentQuestionIndex].options}
        selectedAnswer={selectedAnswer}
        correctAnswer={questions[currentQuestionIndex].correctAnswerIndex}
        isSubmitted={isSubmitted}
        onAnswerSelect={handleAnswerSelection}
      />

      {isSubmitted && (
        <div className="mt-4">
          <p className="text-lg">
            {selectedAnswer ===
            questions[currentQuestionIndex].correctAnswerIndex
              ? "Correct!"
              : "Incorrect!"}
          </p>
          <pre className="italic text-gray-300 text-wrap">
            {questions[currentQuestionIndex].explanation}
          </pre>
        </div>
      )}

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue text-white px-4 py-2 mt-4"
          disabled={selectedAnswer === null}
        >
          Submit
        </button>
      )}

      {isSubmitted && currentQuestionIndex < questions.length - 1 && (
        <button
          onClick={handleNextQuestion}
          className="bg-green-500 text-white px-4 py-2 mt-4"
        >
          Next Question
        </button>
      )}

      {isSubmitted && currentQuestionIndex === questions.length - 1 && (
        <button
          onClick={handleFinishQuiz}
          className="bg-red-500 text-white px-4 py-2 mt-4"
        >
          Finish Quiz
        </button>
      )}

      {!isSubmitted && (
        <div className="mt-4">
          <span className="text-lg">
            Time Left: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
};

export default IPQuiz;
