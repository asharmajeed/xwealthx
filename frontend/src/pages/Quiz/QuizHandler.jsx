import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MCQ from "./MCQ";
import { fetchQuestions } from "../../hooks/useFetchQuestions";
import { saveProgress, loadProgress } from "../../utils/progressUtils.js";
import { DEFAULT_TIME } from "../../utils/constants";

const QuizHandler = ({ type, subject, sessionId, userInfo }) => {
  const navigate = useNavigate();
  const storageKey = `${type}_Quiz_${subject}`;
  const savedProgress = loadProgress(storageKey);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(savedProgress.currentQuestionIndex);
  const [timeLeft, setTimeLeft] = useState(savedProgress.timeLeft);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(savedProgress.correctAnswersCount);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data, isLoading, error } = fetchQuestions(type, subject, sessionId);

  useEffect(() => {
    if (data) {
      const fetchedQuestions = type === "revision" ? data.flat() : data;
      setQuestions(fetchedQuestions);
    }
  }, [data]);

  useEffect(() => {
    saveProgress(storageKey, { currentQuestionIndex: currentIndex, timeLeft, correctAnswersCount });
  }, [currentIndex, timeLeft, correctAnswersCount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : handleNextQuestion()));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleAnswerSelection = (answerIndex) => setSelectedAnswer(answerIndex);

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentIndex]?.correctAnswerIndex) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    resetState();
  };

  const handleFinishQuiz = () => {
    localStorage.removeItem(storageKey);
    navigate("/", { state: { type, subject, score: correctAnswersCount, total: questions.length } });
  };

  const resetState = (resetAll = false) => {
    setCurrentIndex(resetAll ? 0 : currentIndex);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setCorrectAnswersCount(resetAll ? 0 : correctAnswersCount);
    setTimeLeft(DEFAULT_TIME);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading questions</div>;
  if (!questions.length) return <div>No questions available</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {!userInfo?.isPremium && type === "subjectQuizFree" && (
        <h2 className="font-bold text-blue-900 text-center pb-3">
          Free access is limited.{" "}
          <Link to="/premium" className="text-pink-500 underline">Upgrade to Premium</Link>
        </h2>
      )}

      <h2 className="text-2xl mb-4">
        {subject} - Question {currentIndex + 1}/{questions.length}
        <pre className="text-base pt-2">{questions[currentIndex]?.text}</pre>
      </h2>

      <MCQ
        options={questions[currentIndex]?.options}
        selectedAnswer={selectedAnswer}
        correctAnswer={questions[currentIndex]?.correctAnswerIndex}
        isSubmitted={isSubmitted}
        onAnswerSelect={handleAnswerSelection}
      />

      <div>
        {!isSubmitted && (
          <button onClick={handleSubmit} disabled={selectedAnswer === null}>Submit</button>
        )}
        {isSubmitted && currentIndex < questions.length - 1 && (
          <button onClick={handleNextQuestion}>Next</button>
        )}
        {isSubmitted && currentIndex === questions.length - 1 && (
          <button onClick={handleFinishQuiz}>Finish</button>
        )}
      </div>
      <div>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
    </div>
  );
};

export default QuizHandler;
