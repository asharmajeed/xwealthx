import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MCQ from "../Quiz/MCQ";
import { useFetch85QuestionsQuery } from "../../redux/api/subjectApiSlice";
import {
  getSavedQuizProgress,
  saveQuizProgress,
  mapSubjectToPath,
} from "../../utils";

const Exam = () => {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const subject = decodeURIComponent(subjectName);
  const storageKey = `ExamProgress_${subject}`;

  const [questions, setQuestions] = useState([]);

  const savedProgress = getSavedQuizProgress(storageKey);

  const [examSessionId, setExamSessionId] = useState(
    savedProgress.examSessionId
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    savedProgress.currentQuestionIndex
  );
  const [timeLeft, setTimeLeft] = useState(savedProgress.timeLeft || 10800);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(
    savedProgress.correctAnswersCount
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectPath = mapSubjectToPath(subject);
  const gfPath = subjectPath.replace("questions", "gfquestions");

  const { data, isLoading, error } = useFetch85QuestionsQuery({
    subject: gfPath,
    examSessionId,
  });

  useEffect(() => {
    if (data?.examSessionId) {
      setExamSessionId(data.examSessionId);
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
      examSessionId,
    });
  }, [currentQuestionIndex, timeLeft, correctAnswersCount, examSessionId]);

  useEffect(() => {
    if (isLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading]);

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
      setTimeLeft(10800);
    }
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };

  const clearQuizProgress = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${subject}_exam_lastVisitedTime`);
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
        {subject} Exam - Question {currentQuestionIndex + 1}/{questions?.length}
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
