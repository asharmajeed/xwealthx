import { useState, useEffect } from "react";
import MCQ from "../Quiz/MCQ";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchGPQuestionsQuery as fetchGPQuestions } from "../../redux/api/gPQuestionApiSlice";
import { useFetchGPgfQuestionsQuery as fetchGPgfQuestions } from "../../redux/api/gPgfQuestionApiSlice";
import { useFetchRMQuestionsQuery as fetchRMQuestions } from "../../redux/api/rMQuestionApiSlice";
import { useFetchRMgfQuestionsQuery as fetchRMgfQuestions } from "../../redux/api/rMgfQuestionApiSlice";
import { useFetchIPQuestionsQuery as fetchIPQuestions } from "../../redux/api/iPQuestionApiSlice";
import { useFetchIPgfQuestionsQuery as fetchIPgfQuestions } from "../../redux/api/iPgfQuestionApiSlice";
import { useFetchTPQuestionsQuery as fetchTPQuestions } from "../../redux/api/tPQuestionApiSlice";
import { useFetchTPgfQuestionsQuery as fetchTPgfQuestions } from "../../redux/api/tPgfQuestionApiSlice";
import { useFetchRSQuestionsQuery as fetchRSQuestions } from "../../redux/api/rSQuestionApiSlice";
import { useFetchRSgfQuestionsQuery as fetchRSgfQuestions } from "../../redux/api/rSgfQuestionApiSlice";
import { useFetchEPQuestionsQuery as fetchEPQuestions } from "../../redux/api/ePQuestionApiSlice";
import { useFetchEPgfQuestionsQuery as fetchEPgfQuestions } from "../../redux/api/ePgfQuestionApiSlice";

const SubjectQuiz = () => {
  const { subjectName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const navigate = useNavigate();
  const storageKey = `SubjectQuizProgress_${subject}`;

  // Initialize states from localStorage or use defaults
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem(storageKey));
    return savedData?.currentQuestionIndex ?? 0;
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem(storageKey));
    return savedData?.timeLeft ?? 120;
  });

  const [correctAnswersCount, setCorrectAnswersCount] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem(storageKey));
    return savedData?.correctAnswersCount ?? 0;
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch data for all subjects
  const {
    data: GPQuestions = [],
    isLoading: loadingGP,
    error: errorGP,
  } = fetchGPQuestions();
  const {
    data: GPgfQuestions = [],
    isLoading: loadingGPgf,
    error: errorGPgf,
  } = fetchGPgfQuestions();
  const {
    data: RMQuestions = [],
    isLoading: loadingRM,
    error: errorRM,
  } = fetchRMQuestions();
  const {
    data: RMgfQuestions = [],
    isLoading: loadingRMgf,
    error: errorRMgf,
  } = fetchRMgfQuestions();
  const {
    data: IPQuestions = [],
    isLoading: loadingIP,
    error: errorIP,
  } = fetchIPQuestions();
  const {
    data: IPgfQuestions = [],
    isLoading: loadingIPgf,
    error: errorIPgf,
  } = fetchIPgfQuestions();
  const {
    data: TPQuestions = [],
    isLoading: loadingTP,
    error: errorTP,
  } = fetchTPQuestions();
  const {
    data: TPgfQuestions = [],
    isLoading: loadingTPgf,
    error: errorTPgf,
  } = fetchTPgfQuestions();
  const {
    data: RSQuestions = [],
    isLoading: loadingRS,
    error: errorRS,
  } = fetchRSQuestions();
  const {
    data: RSgfQuestions = [],
    isLoading: loadingRSgf,
    error: errorRSgf,
  } = fetchRSgfQuestions();
  const {
    data: EPQuestions = [],
    isLoading: loadingEP,
    error: errorEP,
  } = fetchEPQuestions();
  const {
    data: EPgfQuestions = [],
    isLoading: loadingEPgf,
    error: errorEPgf,
  } = fetchEPgfQuestions();

  const isLoading =
    loadingGP ||
    loadingRM ||
    loadingIP ||
    loadingTP ||
    loadingRS ||
    loadingEP ||
    loadingGPgf ||
    loadingRMgf ||
    loadingIPgf ||
    loadingTPgf ||
    loadingRSgf ||
    loadingEPgf;
  const error =
    errorGP ||
    errorRM ||
    errorIP ||
    errorTP ||
    errorRS ||
    errorEP ||
    errorGPgf ||
    errorRMgf ||
    errorIPgf ||
    errorTPgf ||
    errorRSgf ||
    errorEPgf;

  // Ensure each data is an array, use fallback if undefined or null
  const mergedGPQuestions = Array.isArray(GPQuestions) ? GPQuestions : [];
  const mergedGPgfQuestions = Array.isArray(GPgfQuestions) ? GPgfQuestions : [];
  const mergedRMQuestions = Array.isArray(RMQuestions) ? RMQuestions : [];
  const mergedRMgfQuestions = Array.isArray(RMgfQuestions) ? RMgfQuestions : [];
  const mergedIPQuestions = Array.isArray(IPQuestions) ? IPQuestions : [];
  const mergedIPgfQuestions = Array.isArray(IPgfQuestions) ? IPgfQuestions : [];
  const mergedTPQuestions = Array.isArray(TPQuestions) ? TPQuestions : [];
  const mergedTPgfQuestions = Array.isArray(TPgfQuestions) ? TPgfQuestions : [];
  const mergedRSQuestions = Array.isArray(RSQuestions) ? RSQuestions : [];
  const mergedRSgfQuestions = Array.isArray(RSgfQuestions) ? RSgfQuestions : [];
  const mergedEPQuestions = Array.isArray(EPQuestions) ? EPQuestions : [];
  const mergedEPgfQuestions = Array.isArray(EPgfQuestions) ? EPgfQuestions : [];

  // Merge the question arrays for each subject
  const allGPQuestions = [...mergedGPQuestions, ...mergedGPgfQuestions];
  const allRMQuestions = [...mergedRMQuestions, ...mergedRMgfQuestions];
  const allIPQuestions = [...mergedIPQuestions, ...mergedIPgfQuestions];
  const allTPQuestions = [...mergedTPQuestions, ...mergedTPgfQuestions];
  const allRSQuestions = [...mergedRSQuestions, ...mergedRSgfQuestions];
  const allEPQuestions = [...mergedEPQuestions, ...mergedEPgfQuestions];

  const getQuestionsForSubject = () => {
    switch (subject) {
      case "General Principles of Financial Planning":
        return allGPQuestions;
      case "Risk Management and Insurance Planning":
        return allRMQuestions;
      case "Investment Planning":
        return allIPQuestions;
      case "Tax Planning":
        return allTPQuestions;
      case "Retirement Savings and Income Planning":
        return allRSQuestions;
      case "Estate Planning":
        return allEPQuestions;
      default:
        return [];
    }
  };

  const questions = getQuestionsForSubject();

  // Save progress to localStorage whenever states change
  useEffect(() => {
    const progress = {
      currentQuestionIndex,
      timeLeft,
      correctAnswersCount,
    };
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [currentQuestionIndex, timeLeft, correctAnswersCount]);

  // Timer logic
  useEffect(() => {
    if (isLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          handleNextQuestion(); // Move to the next question if time runs out
          return 120; // Reset timer for next question
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, [currentQuestionIndex, isLoading]);

  // Track navigation away from the quiz page
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        `${subject}_subjectQuiz_lastVisitedTime`,
        Date.now()
      );
    };

    // Save the timestamp when navigating away
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.setItem(
        `${subject}_subjectQuiz_lastVisitedTime`,
        Date.now()
      ); // Also save on cleanup
    };
  }, []);

  // Reset timer if returning after a long time
  useEffect(() => {
    const lastVisitedTime = localStorage.getItem(
      `${subject}_subjectQuiz_lastVisitedTime`
    );
    if (lastVisitedTime) {
      const elapsedTime = (Date.now() - parseInt(lastVisitedTime, 10)) / 1000; // Convert to seconds
      if (elapsedTime > 120) {
        // If more than 2 minutes passed, reset timer
        setTimeLeft(120);
      }
    }
  }, []);

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswerIndex) {
      setCorrectAnswersCount((prevCount) => prevCount + 1); // Increment score for correct answer
    }
    setIsSubmitted(true); // Mark as submitted to display explanation
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(120); // Reset timer for next question
  };

  const handleFinishQuiz = () => {
    // Clear progress for this subject
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${subject}_subjectQuiz_lastVisitedTime`);

    // Navigate to dashboard with score
    navigate("/", {
      state: {
        subject: subject,
        score: correctAnswersCount,
        total: questions?.length,
      },
    });
  };

  const handleRestartQuiz = () => {
    // Clear progress and reset states
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${subject}_subjectQuiz_lastVisitedTime`);

    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setCorrectAnswersCount(0); // Reset score
    setTimeLeft(120); // Reset timer
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
  if (questions?.length === 0)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        No questions found for this subject
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
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
