import { useState, useEffect } from "react";
import MCQ from "../Quiz/MCQ";
import { useNavigate } from "react-router-dom";
import { useFetchRandomQuestionsQuery } from "../../redux/api/subjectApiSlice";
import { getSavedQuizProgress, saveQuizProgress } from "../../utils";
import { DEFAULT_TIME } from "../../constants";

const Revision = () => {
  const navigate = useNavigate();
  const storageKey = "RevisionProgress";

  const subjects = [
    "gpquestions",
    "gpgfquestions",
    "rmquestions",
    "rmgfquestions",
    "ipquestions",
    "ipgfquestions",
    "tpquestions",
    "tpgfquestions",
    "rsquestions",
    "rsgfquestions",
    "epquestions",
    "epgfquestions",
  ];

  const [questions, setQuestions] = useState([]);

  const [quizSessionId, setQuizSessionId] = useState(null);
  const savedProgress = getSavedQuizProgress(storageKey);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    savedProgress.currentQuestionIndex
  );
  const [timeLeft, setTimeLeft] = useState(savedProgress.timeLeft || 120);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(
    savedProgress.correctAnswersCount
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data, isLoading, error } = useFetchRandomQuestionsQuery({
    subjects,
    quizSessionId,
  });

  useEffect(() => {
    if (!quizSessionId) {
      const newSessionId = localStorage.getItem("quizSessionId") || null;
      setQuizSessionId(newSessionId || "");
    }
  }, [quizSessionId]);

  useEffect(() => {
    if (data?.quizSessionId) {
      localStorage.setItem("quizSessionId", data.quizSessionId);
    }
    if (data?.questions) {
      setQuestions(data.questions);
    }
  }, [data]);

  useEffect(() => {
    saveQuizProgress(storageKey, {
      currentQuestionIndex,
      timeLeft,
      correctAnswersCount,
    });
  }, [currentQuestionIndex, timeLeft, correctAnswersCount]);

  useEffect(() => {
    if (isLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : handleNextQuestion()));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isLoading]);

  useEffect(() => {
    const lastVisitedTime = localStorage.getItem("Revision_lastVisitedTime");
    if (lastVisitedTime) {
      const elapsedTime = (Date.now() - parseInt(lastVisitedTime, 10)) / 1000;
      if (elapsedTime > DEFAULT_TIME) setTimeLeft(DEFAULT_TIME);
    }

    const handleBeforeUnload = () => {
      localStorage.setItem("Revision_lastVisitedTime", Date.now());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.setItem("Revision_lastVisitedTime", Date.now());
    };
  }, []);

  const handleAnswerSelection = (answerIndex) => setSelectedAnswer(answerIndex);

  const handleSubmit = () => {
    if (
      selectedAnswer === questions[currentQuestionIndex]?.correctAnswerIndex
    ) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const resetQuestionState = (resetAll = false) => {
    if (resetAll === true) {
      setCurrentQuestionIndex(0);
      setCorrectAnswersCount(0);
    }
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(DEFAULT_TIME);
  };

  const clearQuizProgress = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem("Revision_lastVisitedTime");
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    resetQuestionState();
  };

  const handleFinishQuiz = () => {
    clearQuizProgress();
    navigate("/", {
      state: { subject, score: correctAnswersCount, total: questions?.length },
    });
  };

  const handleRestartQuiz = () => {
    clearQuizProgress();
    resetQuestionState(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        Error loading questions
      </div>
    );

  if (!questions?.length)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        No questions found
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl mb-4">
        Revision - Question {currentQuestionIndex + 1}/{questions?.length}
        <pre className="text-base pt-2 text-wrap">
          {questions[currentQuestionIndex]?.text}
        </pre>
      </h2>

      <MCQ
        options={questions[currentQuestionIndex]?.options}
        selectedAnswer={selectedAnswer}
        correctAnswer={questions[currentQuestionIndex]?.correctAnswerIndex}
        isSubmitted={isSubmitted}
        onAnswerSelect={handleAnswerSelection}
      />

      {isSubmitted && (
        <div className="mt-4">
          <p className="text-lg">
            {selectedAnswer ===
            questions[currentQuestionIndex]?.correctAnswerIndex
              ? "Correct!"
              : "Incorrect!"}
          </p>
          <pre className="italic text-gray-500 text-wrap">
            {questions[currentQuestionIndex]?.explanation}
          </pre>
        </div>
      )}

      <div className="flex justify-between items-center">
        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 mt-4"
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

        <button
          onClick={handleRestartQuiz}
          className="bg-yellow-500 text-white px-4 py-2 mt-4"
        >
          Restart Quiz
        </button>
      </div>

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

export default Revision;
