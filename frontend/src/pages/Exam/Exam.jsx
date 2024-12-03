import { useState, useEffect } from "react";
import MCQ from "../Quiz/MCQ";
import { useNavigate, useParams } from "react-router-dom";
// import { useFetchRandomGPQuestionsQuery as fetchGPQuestions } from "../../redux/api/gPQuestionApiSlice";
import { useFetchRandomGPgfQuestionsQuery as fetchGPgfQuestions } from "../../redux/api/gPgfQuestionApiSlice";
// import { useFetchRandomRMQuestionsQuery as fetchRMQuestions } from "../../redux/api/rMQuestionApiSlice";
import { useFetchRandomRMgfQuestionsQuery as fetchRMgfQuestions } from "../../redux/api/rMgfQuestionApiSlice";
// import { useFetchRandomIPQuestionsQuery as fetchIPQuestions } from "../../redux/api/iPQuestionApiSlice";
import { useFetchRandomIPgfQuestionsQuery as fetchIPgfQuestions } from "../../redux/api/iPgfQuestionApiSlice";
// import { useFetchRandomTPQuestionsQuery as fetchTPQuestions } from "../../redux/api/tPQuestionApiSlice";
import { useFetchRandomTPgfQuestionsQuery as fetchTPgfQuestions } from "../../redux/api/tPgfQuestionApiSlice";
// import { useFetchRandomRSQuestionsQuery as fetchRSQuestions } from "../../redux/api/rSQuestionApiSlice";
import { useFetchRandomRSgfQuestionsQuery as fetchRSgfQuestions } from "../../redux/api/rSgfQuestionApiSlice";
// import { useFetchRandomEPQuestionsQuery as fetchEPQuestions } from "../../redux/api/ePQuestionApiSlice";
import { useFetchRandomEPgfQuestionsQuery as fetchEPgfQuestions } from "../../redux/api/ePgfQuestionApiSlice";

const Exam = () => {
  const { subjectName } = useParams();
  const subject = decodeURIComponent(subjectName);
  const navigate = useNavigate();
  const storageKey = `ExamProgress_${subject}`;

  // const [examSessionIdGP, setexamSessionIdGP] = useState(null);
  // const [examSessionIdRM, setexamSessionIdRM] = useState(null);
  // const [examSessionIdIP, setexamSessionIdIP] = useState(null);
  // const [examSessionIdTP, setexamSessionIdTP] = useState(null);
  // const [examSessionIdRS, setexamSessionIdRS] = useState(null);
  // const [examSessionIdEP, setexamSessionIdEP] = useState(null);
  const [examSessionIdGPgf, setexamSessionIdGPgf] = useState(null);
  const [examSessionIdRMgf, setexamSessionIdRMgf] = useState(null);
  const [examSessionIdIPgf, setexamSessionIdIPgf] = useState(null);
  const [examSessionIdTPgf, setexamSessionIdTPgf] = useState(null);
  const [examSessionIdRSgf, setexamSessionIdRSgf] = useState(null);
  const [examSessionIdEPgf, setexamSessionIdEPgf] = useState(null);

  // Initialize states from localStorage or use defaults
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem(storageKey));
    return savedData?.currentQuestionIndex ?? 0;
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem(storageKey));
    return savedData?.timeLeft ?? 10800;
  });

  const [correctAnswersCount, setCorrectAnswersCount] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem(storageKey));
    return savedData?.correctAnswersCount ?? 0;
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch data for all subjects
  // const {
  //   data: GPQuestions = [],
  //   isLoading: loadingGP,
  //   error: errorGP,
  // } = fetchGPQuestions(examSessionIdGP);
  const {
    data: GPgfQuestions = [],
    isLoading: loadingGPgf,
    error: errorGPgf,
  } = fetchGPgfQuestions(examSessionIdGPgf);
  // const {
  //   data: RMQuestions = [],
  //   isLoading: loadingRM,
  //   error: errorRM,
  // } = fetchRMQuestions(examSessionIdRM);
  const {
    data: RMgfQuestions = [],
    isLoading: loadingRMgf,
    error: errorRMgf,
  } = fetchRMgfQuestions(examSessionIdRMgf);
  // const {
  //   data: IPQuestions = [],
  //   isLoading: loadingIP,
  //   error: errorIP,
  // } = fetchIPQuestions(examSessionIdIP);
  const {
    data: IPgfQuestions = [],
    isLoading: loadingIPgf,
    error: errorIPgf,
  } = fetchIPgfQuestions(examSessionIdIPgf);
  // const {
  //   data: TPQuestions = [],
  //   isLoading: loadingTP,
  //   error: errorTP,
  // } = fetchTPQuestions(examSessionIdTP);
  const {
    data: TPgfQuestions = [],
    isLoading: loadingTPgf,
    error: errorTPgf,
  } = fetchTPgfQuestions(examSessionIdTPgf);
  // const {
  //   data: RSQuestions = [],
  //   isLoading: loadingRS,
  //   error: errorRS,
  // } = fetchRSQuestions(examSessionIdRS);
  const {
    data: RSgfQuestions = [],
    isLoading: loadingRSgf,
    error: errorRSgf,
  } = fetchRSgfQuestions(examSessionIdRSgf);
  // const {
  //   data: EPQuestions = [],
  //   isLoading: loadingEP,
  //   error: errorEP,
  // } = fetchEPQuestions(examSessionIdEP);
  const {
    data: EPgfQuestions = [],
    isLoading: loadingEPgf,
    error: errorEPgf,
  } = fetchEPgfQuestions(examSessionIdEPgf);

  const isLoading =
    loadingGPgf ||
    loadingRMgf ||
    loadingIPgf ||
    loadingTPgf ||
    loadingRSgf ||
    loadingEPgf;
  const error =
    errorGPgf || errorRMgf || errorIPgf || errorTPgf || errorRSgf || errorEPgf;

  // Ensure each data is an array, use fallback if undefined or null
  // const allGPQuestions = Array.isArray(GPQuestions.questions)
  //   ? GPQuestions.questions
  //   : [];
  const allGPgfQuestions = Array.isArray(GPgfQuestions.questions)
    ? GPgfQuestions.questions
    : [];
  // const allRMQuestions = Array.isArray(RMQuestions.questions)
  //   ? RMQuestions.questions
  //   : [];
  const allRMgfQuestions = Array.isArray(RMgfQuestions.questions)
    ? RMgfQuestions.questions
    : [];
  // const allIPQuestions = Array.isArray(IPQuestions.questions)
  //   ? IPQuestions.questions
  //   : [];
  const allIPgfQuestions = Array.isArray(IPgfQuestions.questions)
    ? IPgfQuestions.questions
    : [];
  // const allTPQuestions = Array.isArray(TPQuestions.questions)
  //   ? TPQuestions.questions
  //   : [];
  const allTPgfQuestions = Array.isArray(TPgfQuestions.questions)
    ? TPgfQuestions.questions
    : [];
  // const allRSQuestions = Array.isArray(RSQuestions.questions)
  //   ? RSQuestions.questions
  //   : [];
  const allRSgfQuestions = Array.isArray(RSgfQuestions.questions)
    ? RSgfQuestions.questions
    : [];
  // const allEPQuestions = Array.isArray(EPQuestions.questions)
  //   ? EPQuestions.questions
  //   : [];
  const allEPgfQuestions = Array.isArray(EPgfQuestions.questions)
    ? EPgfQuestions.questions
    : [];

  // Merge the question arrays for each subject
  // const questions = [
  //   ...allGPQuestions,
  //   ...allGPgfQuestions,
  //   ...allRMQuestions,
  //   ...allRMgfQuestions,
  //   ...allIPQuestions,
  //   ...allIPgfQuestions,
  //   ...allTPQuestions,
  //   ...allTPgfQuestions,
  //   ...allRSQuestions,
  //   ...allRSgfQuestions,
  //   ...allEPQuestions,
  //   ...allEPgfQuestions,
  // ];

  const getQuestionsForSubject = () => {
    switch (subject) {
      case "General Principles of Financial Planning":
        return allGPgfQuestions;
      case "Risk Management and Insurance Planning":
        return allRMgfQuestions;
      case "Investment Planning":
        return allIPgfQuestions;
      case "Tax Planning":
        return allTPgfQuestions;
      case "Retirement Savings and Income Planning":
        return allRSgfQuestions;
      case "Estate Planning":
        return allEPgfQuestions;
      default:
        return [];
    }
  };

  const questions = getQuestionsForSubject();

  // useEffect(() => {
  //   if (!examSessionIdGP) {
  //     const newSessionId = localStorage.getItem("examSessionIdGP") || null;
  //     setexamSessionIdGP(newSessionId || "");
  //   }
  // }, [examSessionIdGP]);

  // useEffect(() => {
  //   if (GPQuestions?.examSessionId) {
  //     localStorage.setItem("examSessionIdGP", GPQuestions.examSessionId);
  //   }
  // }, [GPQuestions]);

  useEffect(() => {
    if (!examSessionIdGPgf) {
      const newSessionId = localStorage.getItem("examSessionIdGPgf") || null;
      setexamSessionIdGPgf(newSessionId || "");
    }
  }, [examSessionIdGPgf]);

  useEffect(() => {
    if (GPgfQuestions?.examSessionId) {
      localStorage.setItem("examSessionIdGPgf", GPgfQuestions.examSessionId);
    }
  }, [GPgfQuestions]);

  // useEffect(() => {
  //   if (!examSessionIdRM) {
  //     const newSessionId = localStorage.getItem("examSessionIdRM") || null;
  //     setexamSessionIdRM(newSessionId || "");
  //   }
  // }, [examSessionIdRM]);

  // useEffect(() => {
  //   if (RMQuestions?.examSessionId) {
  //     localStorage.setItem("examSessionIdRM", RMQuestions.examSessionId);
  //   }
  // }, [RMQuestions]);

  useEffect(() => {
    if (!examSessionIdRMgf) {
      const newSessionId = localStorage.getItem("examSessionIdRMgf") || null;
      setexamSessionIdRMgf(newSessionId || "");
    }
  }, [examSessionIdRMgf]);

  useEffect(() => {
    if (RMgfQuestions?.examSessionId) {
      localStorage.setItem("examSessionIdRMgf", RMgfQuestions.examSessionId);
    }
  }, [RMgfQuestions]);

  // useEffect(() => {
  //   if (!examSessionIdIP) {
  //     const newSessionId = localStorage.getItem("examSessionIdIP") || null;
  //     setexamSessionIdIP(newSessionId || "");
  //   }
  // }, [examSessionIdIP]);

  // useEffect(() => {
  //   if (IPQuestions?.examSessionId) {
  //     localStorage.setItem("examSessionIdIP", IPQuestions.examSessionId);
  //   }
  // }, [IPQuestions]);

  useEffect(() => {
    if (!examSessionIdIPgf) {
      const newSessionId = localStorage.getItem("examSessionIdIPgf") || null;
      setexamSessionIdIPgf(newSessionId || "");
    }
  }, [examSessionIdIPgf]);

  useEffect(() => {
    if (IPgfQuestions?.examSessionId) {
      localStorage.setItem("examSessionIdIPgf", IPgfQuestions.examSessionId);
    }
  }, [IPgfQuestions]);

  // useEffect(() => {
  //   if (!examSessionIdTP) {
  //     const newSessionId = localStorage.getItem("examSessionIdTP") || null;
  //     setexamSessionIdTP(newSessionId || "");
  //   }
  // }, [examSessionIdTP]);

  // useEffect(() => {
  //   if (TPQuestions?.examSessionId) {
  //     localStorage.setItem("examSessionIdTP", TPQuestions.examSessionId);
  //   }
  // }, [TPQuestions]);

  useEffect(() => {
    if (!examSessionIdTPgf) {
      const newSessionId = localStorage.getItem("examSessionIdTPgf") || null;
      setexamSessionIdTPgf(newSessionId || "");
    }
  }, [examSessionIdTPgf]);

  useEffect(() => {
    if (TPgfQuestions?.examSessionId) {
      localStorage.setItem("examSessionIdTPgf", TPgfQuestions.examSessionId);
    }
  }, [TPgfQuestions]);

  // useEffect(() => {
  //   if (!examSessionIdRS) {
  //     const newSessionId = localStorage.getItem("examSessionIdRS") || null;
  //     setexamSessionIdRS(newSessionId || "");
  //   }
  // }, [examSessionIdRS]);

  // useEffect(() => {
  //   if (RSQuestions?.examSessionId) {
  //     localStorage.setItem("examSessionIdRS", RSQuestions.examSessionId);
  //   }
  // }, [RSQuestions]);

  useEffect(() => {
    if (!examSessionIdRSgf) {
      const newSessionId = localStorage.getItem("examSessionIdRSgf") || null;
      setexamSessionIdRSgf(newSessionId || "");
    }
  }, [examSessionIdRSgf]);

  useEffect(() => {
    if (RSgfQuestions?.examSessionId) {
      localStorage.setItem("examSessionIdRSgf", RSgfQuestions.examSessionId);
    }
  }, [RSgfQuestions]);

  // useEffect(() => {
  //   if (!examSessionIdEP) {
  //     const newSessionId = localStorage.getItem("examSessionIdEP") || null;
  //     setexamSessionIdEP(newSessionId || "");
  //   }
  // }, [examSessionIdEP]);

  // useEffect(() => {
  //   if (EPQuestions?.examSessionId) {
  //     localStorage.setItem("examSessionIdEP", EPQuestions.examSessionId);
  //   }
  // }, [EPQuestions]);

  useEffect(() => {
    if (!examSessionIdEPgf) {
      const newSessionId = localStorage.getItem("examSessionIdEPgf") || null;
      setexamSessionIdEPgf(newSessionId || "");
    }
  }, [examSessionIdEPgf]);

  useEffect(() => {
    if (EPgfQuestions?.examSessionId) {
      localStorage.setItem("examSessionIdEPgf", EPgfQuestions.examSessionId);
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
          handleFinishQuiz(); // Move to the next question if time runs out
          return 10800; // Reset timer for next exam
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, [currentQuestionIndex, isLoading]);

  // Track navigation away from the quiz page
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(`${subject}_exam_lastVisitedTime`, Date.now());
    };

    // Save the timestamp when navigating away
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.setItem(`${subject}_exam_lastVisitedTime`, Date.now()); // Also save on cleanup
    };
  }, []);

  // Reset timer if returning after a long time
  useEffect(() => {
    const lastVisitedTime = localStorage.getItem(
      `${subject}_exam_lastVisitedTime`
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
    // setTimeLeft(120); // Reset timer for next question
  };

  const handleFinishQuiz = () => {
    // Clear progress for this subject
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${subject}_exam_lastVisitedTime`);

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
    localStorage.removeItem(`${subject}_exam_lastVisitedTime`);

    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setCorrectAnswersCount(0); // Reset score
    setTimeLeft(10800); // Reset timer
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

      <div className="mt-4">
        <span className="text-lg">
          Time Left: {Math.floor(timeLeft / 3600)}:
          {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Exam;
