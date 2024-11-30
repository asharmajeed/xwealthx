import { useState, useEffect } from "react";
import MCQ from "../Quiz/MCQ";
import { useNavigate } from "react-router-dom";
import { useFetchGPAllRandomOrderQuestionsQuery as fetchGPQuestions } from "../../redux/api/gPQuestionApiSlice";
import { useFetchGPgfAllRandomOrderQuestionsQuery as fetchGPgfQuestions } from "../../redux/api/gPgfQuestionApiSlice";
import { useFetchRMAllRandomOrderQuestionsQuery as fetchRMQuestions } from "../../redux/api/rMQuestionApiSlice";
import { useFetchRMgfAllRandomOrderQuestionsQuery as fetchRMgfQuestions } from "../../redux/api/rMgfQuestionApiSlice";
import { useFetchIPAllRandomOrderQuestionsQuery as fetchIPQuestions } from "../../redux/api/iPQuestionApiSlice";
import { useFetchIPgfAllRandomOrderQuestionsQuery as fetchIPgfQuestions } from "../../redux/api/iPgfQuestionApiSlice";
import { useFetchTPAllRandomOrderQuestionsQuery as fetchTPQuestions } from "../../redux/api/tPQuestionApiSlice";
import { useFetchTPgfAllRandomOrderQuestionsQuery as fetchTPgfQuestions } from "../../redux/api/tPgfQuestionApiSlice";
import { useFetchRSAllRandomOrderQuestionsQuery as fetchRSQuestions } from "../../redux/api/rSQuestionApiSlice";
import { useFetchRSgfAllRandomOrderQuestionsQuery as fetchRSgfQuestions } from "../../redux/api/rSgfQuestionApiSlice";
import { useFetchEPAllRandomOrderQuestionsQuery as fetchEPQuestions } from "../../redux/api/ePQuestionApiSlice";
import { useFetchEPgfAllRandomOrderQuestionsQuery as fetchEPgfQuestions } from "../../redux/api/ePgfQuestionApiSlice";

const Revision = () => {
  const navigate = useNavigate();
  const storageKey = "RevisionProgress";

  const [quizSessionIdGP, setQuizSessionIdGP] = useState(null);
  const [quizSessionIdRM, setQuizSessionIdRM] = useState(null);
  const [quizSessionIdIP, setQuizSessionIdIP] = useState(null);
  const [quizSessionIdTP, setQuizSessionIdTP] = useState(null);
  const [quizSessionIdRS, setQuizSessionIdRS] = useState(null);
  const [quizSessionIdEP, setQuizSessionIdEP] = useState(null);
  const [quizSessionIdGPgf, setQuizSessionIdGPgf] = useState(null);
  const [quizSessionIdRMgf, setQuizSessionIdRMgf] = useState(null);
  const [quizSessionIdIPgf, setQuizSessionIdIPgf] = useState(null);
  const [quizSessionIdTPgf, setQuizSessionIdTPgf] = useState(null);
  const [quizSessionIdRSgf, setQuizSessionIdRSgf] = useState(null);
  const [quizSessionIdEPgf, setQuizSessionIdEPgf] = useState(null);

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
  } = fetchGPQuestions(quizSessionIdGP);
  const {
    data: GPgfQuestions = [],
    isLoading: loadingGPgf,
    error: errorGPgf,
  } = fetchGPgfQuestions(quizSessionIdGPgf);
  const {
    data: RMQuestions = [],
    isLoading: loadingRM,
    error: errorRM,
  } = fetchRMQuestions(quizSessionIdRM);
  const {
    data: RMgfQuestions = [],
    isLoading: loadingRMgf,
    error: errorRMgf,
  } = fetchRMgfQuestions(quizSessionIdRMgf);
  const {
    data: IPQuestions = [],
    isLoading: loadingIP,
    error: errorIP,
  } = fetchIPQuestions(quizSessionIdIP);
  const {
    data: IPgfQuestions = [],
    isLoading: loadingIPgf,
    error: errorIPgf,
  } = fetchIPgfQuestions(quizSessionIdIPgf);
  const {
    data: TPQuestions = [],
    isLoading: loadingTP,
    error: errorTP,
  } = fetchTPQuestions(quizSessionIdTP);
  const {
    data: TPgfQuestions = [],
    isLoading: loadingTPgf,
    error: errorTPgf,
  } = fetchTPgfQuestions(quizSessionIdTPgf);
  const {
    data: RSQuestions = [],
    isLoading: loadingRS,
    error: errorRS,
  } = fetchRSQuestions(quizSessionIdRS);
  const {
    data: RSgfQuestions = [],
    isLoading: loadingRSgf,
    error: errorRSgf,
  } = fetchRSgfQuestions(quizSessionIdRSgf);
  const {
    data: EPQuestions = [],
    isLoading: loadingEP,
    error: errorEP,
  } = fetchEPQuestions(quizSessionIdEP);
  const {
    data: EPgfQuestions = [],
    isLoading: loadingEPgf,
    error: errorEPgf,
  } = fetchEPgfQuestions(quizSessionIdEPgf);

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
  const mergedGPQuestions = Array.isArray(GPQuestions.questions)
    ? GPQuestions.questions
    : [];
  const mergedGPgfQuestions = Array.isArray(GPgfQuestions.questions)
    ? GPgfQuestions.questions
    : [];
  const mergedRMQuestions = Array.isArray(RMQuestions.questions)
    ? RMQuestions.questions
    : [];
  const mergedRMgfQuestions = Array.isArray(RMgfQuestions.questions)
    ? RMgfQuestions.questions
    : [];
  const mergedIPQuestions = Array.isArray(IPQuestions.questions)
    ? IPQuestions.questions
    : [];
  const mergedIPgfQuestions = Array.isArray(IPgfQuestions.questions)
    ? IPgfQuestions.questions
    : [];
  const mergedTPQuestions = Array.isArray(TPQuestions.questions)
    ? TPQuestions.questions
    : [];
  const mergedTPgfQuestions = Array.isArray(TPgfQuestions.questions)
    ? TPgfQuestions.questions
    : [];
  const mergedRSQuestions = Array.isArray(RSQuestions.questions)
    ? RSQuestions.questions
    : [];
  const mergedRSgfQuestions = Array.isArray(RSgfQuestions.questions)
    ? RSgfQuestions.questions
    : [];
  const mergedEPQuestions = Array.isArray(EPQuestions.questions)
    ? EPQuestions.questions
    : [];
  const mergedEPgfQuestions = Array.isArray(EPgfQuestions.questions)
    ? EPgfQuestions.questions
    : [];

  // Merge the question arrays for each subject
  const questions = [
    ...mergedGPQuestions,
    ...mergedGPgfQuestions,
    ...mergedRMQuestions,
    ...mergedRMgfQuestions,
    ...mergedIPQuestions,
    ...mergedIPgfQuestions,
    ...mergedTPQuestions,
    ...mergedTPgfQuestions,
    ...mergedRSQuestions,
    ...mergedRSgfQuestions,
    ...mergedEPQuestions,
    ...mergedEPgfQuestions,
  ];

  useEffect(() => {
    if (!quizSessionIdGP) {
      const newSessionId = localStorage.getItem("quizSessionIdGP") || null;
      setQuizSessionIdGP(newSessionId || "");
    }
  }, [quizSessionIdGP]);

  useEffect(() => {
    if (GPQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdGP", GPQuestions.quizSessionId);
    }
  }, [GPQuestions]);

  useEffect(() => {
    if (!quizSessionIdGPgf) {
      const newSessionId = localStorage.getItem("quizSessionIdGPgf") || null;
      setQuizSessionIdGPgf(newSessionId || "");
    }
  }, [quizSessionIdGPgf]);

  useEffect(() => {
    if (GPgfQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdGPgf", GPgfQuestions.quizSessionId);
    }
  }, [GPgfQuestions]);

  useEffect(() => {
    if (!quizSessionIdRM) {
      const newSessionId = localStorage.getItem("quizSessionIdRM") || null;
      setQuizSessionIdRM(newSessionId || "");
    }
  }, [quizSessionIdRM]);

  useEffect(() => {
    if (RMQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdRM", RMQuestions.quizSessionId);
    }
  }, [RMQuestions]);

  useEffect(() => {
    if (!quizSessionIdRMgf) {
      const newSessionId = localStorage.getItem("quizSessionIdRMgf") || null;
      setQuizSessionIdRMgf(newSessionId || "");
    }
  }, [quizSessionIdRMgf]);

  useEffect(() => {
    if (RMgfQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdRMgf", RMgfQuestions.quizSessionId);
    }
  }, [RMgfQuestions]);

  useEffect(() => {
    if (!quizSessionIdIP) {
      const newSessionId = localStorage.getItem("quizSessionIdIP") || null;
      setQuizSessionIdIP(newSessionId || "");
    }
  }, [quizSessionIdIP]);

  useEffect(() => {
    if (IPQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdIP", IPQuestions.quizSessionId);
    }
  }, [IPQuestions]);

  useEffect(() => {
    if (!quizSessionIdIPgf) {
      const newSessionId = localStorage.getItem("quizSessionIdIPgf") || null;
      setQuizSessionIdIPgf(newSessionId || "");
    }
  }, [quizSessionIdIPgf]);

  useEffect(() => {
    if (IPgfQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdIPgf", IPgfQuestions.quizSessionId);
    }
  }, [IPgfQuestions]);

  useEffect(() => {
    if (!quizSessionIdTP) {
      const newSessionId = localStorage.getItem("quizSessionIdTP") || null;
      setQuizSessionIdTP(newSessionId || "");
    }
  }, [quizSessionIdTP]);

  useEffect(() => {
    if (TPQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdTP", TPQuestions.quizSessionId);
    }
  }, [TPQuestions]);

  useEffect(() => {
    if (!quizSessionIdTPgf) {
      const newSessionId = localStorage.getItem("quizSessionIdTPgf") || null;
      setQuizSessionIdTPgf(newSessionId || "");
    }
  }, [quizSessionIdTPgf]);

  useEffect(() => {
    if (TPgfQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdTPgf", TPgfQuestions.quizSessionId);
    }
  }, [TPgfQuestions]);

  useEffect(() => {
    if (!quizSessionIdRS) {
      const newSessionId = localStorage.getItem("quizSessionIdRS") || null;
      setQuizSessionIdRS(newSessionId || "");
    }
  }, [quizSessionIdRS]);

  useEffect(() => {
    if (RSQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdRS", RSQuestions.quizSessionId);
    }
  }, [RSQuestions]);

  useEffect(() => {
    if (!quizSessionIdRSgf) {
      const newSessionId = localStorage.getItem("quizSessionIdRSgf") || null;
      setQuizSessionIdRSgf(newSessionId || "");
    }
  }, [quizSessionIdRSgf]);

  useEffect(() => {
    if (RSgfQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdRSgf", RSgfQuestions.quizSessionId);
    }
  }, [RSgfQuestions]);

  useEffect(() => {
    if (!quizSessionIdEP) {
      const newSessionId = localStorage.getItem("quizSessionIdEP") || null;
      setQuizSessionIdEP(newSessionId || "");
    }
  }, [quizSessionIdEP]);

  useEffect(() => {
    if (EPQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdEP", EPQuestions.quizSessionId);
    }
  }, [EPQuestions]);

  useEffect(() => {
    if (!quizSessionIdEPgf) {
      const newSessionId = localStorage.getItem("quizSessionIdEPgf") || null;
      setQuizSessionIdEPgf(newSessionId || "");
    }
  }, [quizSessionIdEPgf]);

  useEffect(() => {
    if (EPgfQuestions?.quizSessionId) {
      localStorage.setItem("quizSessionIdEPgf", EPgfQuestions.quizSessionId);
    }
  }, [EPgfQuestions]);

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
      localStorage.setItem("Revision_lastVisitedTime", Date.now());
    };

    // Save the timestamp when navigating away
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.setItem("Revision_lastVisitedTime", Date.now()); // Also save on cleanup
    };
  }, []);

  // Reset timer if returning after a long time
  useEffect(() => {
    const lastVisitedTime = localStorage.getItem("Revision_lastVisitedTime");
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
    localStorage.removeItem("Revision_lastVisitedTime");

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
    localStorage.removeItem("Revision_lastVisitedTime");

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
        Revision Drills - Question {currentQuestionIndex + 1}/
        {questions?.length}
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
