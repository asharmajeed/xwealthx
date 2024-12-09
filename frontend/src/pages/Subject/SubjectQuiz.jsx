import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MCQ from "../Quiz/MCQ";
import { useFetchQuestionsBySubjectQuery } from "../../redux/api/subjectApiSlice";
import {
  getSavedQuizProgress,
  saveQuizProgress,
  mapSubjectToPath,
} from "../../utils";
import { DEFAULT_TIME } from "../../constants";

const SubjectQuiz = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const subject = decodeURIComponent(subjectName);
  const storageKey = `SubjectQuizProgress_${subject}`;

  const savedProgress = getSavedQuizProgress(storageKey);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    savedProgress.currentQuestionIndex
  );
  const [timeLeft, setTimeLeft] = useState(savedProgress.timeLeft || 120);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(
    savedProgress.correctAnswersCount
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectPath = mapSubjectToPath(subject);
  const gfPath = subjectPath.replace("questions", "gfquestions");

  const {
    data: mainQuestions,
    isLoading: mainLoading,
    error: mainError,
  } = useFetchQuestionsBySubjectQuery(subjectPath);
  const {
    data: gfQuestions,
    isLoading: gfLoading,
    error: gfError,
  } = useFetchQuestionsBySubjectQuery(gfPath);

  useEffect(() => {
    if (mainQuestions && gfQuestions) {
      setQuestions([...mainQuestions, ...gfQuestions]);
    }
  }, [mainQuestions, gfQuestions]);

  useEffect(() => {
    saveQuizProgress(storageKey, {
      currentQuestionIndex,
      timeLeft,
      correctAnswersCount,
    });
  }, [currentQuestionIndex, timeLeft, correctAnswersCount]);

  useEffect(() => {
    if (mainLoading || gfLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : handleNextQuestion()));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, mainLoading, gfLoading]);

  useEffect(() => {
    const lastVisitedTime = localStorage.getItem(
      `${subject}_quiz_lastVisitedTime`
    );
    if (lastVisitedTime) {
      const elapsedTime = (Date.now() - parseInt(lastVisitedTime, 10)) / 1000;
      if (elapsedTime > DEFAULT_TIME) setTimeLeft(DEFAULT_TIME);
    }

    const handleBeforeUnload = () => {
      localStorage.setItem(`${subject}_quiz_lastVisitedTime`, Date.now());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.setItem(`${subject}_quiz_lastVisitedTime`, Date.now());
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
    localStorage.removeItem(`${subject}_quiz_lastVisitedTime`);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    clearQuizProgress();
    navigate("/", {
      state: { subject, score: correctAnswersCount, total: questions?.length },
    });
  };

  const handleRestartQuiz = () => {
    clearQuizProgress();
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    resetQuestionState(true);
  };

  if (mainLoading || gfLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        Loading...
      </div>
    );

  if (mainError || gfError)
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
      {!userInfo?.isPremium && (
        <h2 className="font-bold text-blue-900 text-center pb-3">
          Free access is limited.{" "}
          <Link to="/premium" className="text-pink-500 underline">
            Upgrade to Premium
          </Link>
        </h2>
      )}

      <h2 className="text-2xl mb-4">
        {subject} - Question {currentQuestionIndex + 1}/{questions?.length}
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

export default SubjectQuiz;
