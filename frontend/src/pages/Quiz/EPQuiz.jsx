// import { useState, useEffect } from "react";
// import MCQ from "./MCQ";
// import { useNavigate, useParams } from "react-router-dom";
// import { useFetch20EPQuestionsQuery as fetchEPQuestions } from "../../redux/api/ePQuestionApiSlice";

// const EPQuiz = () => {
//   const { subjectName } = useParams();
//   const subject = decodeURIComponent(subjectName);
//   const navigate = useNavigate();
//   const storageKey = `quizProgress_${subject}`;

//   // Initialize states from localStorage or use defaults
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
//     const savedData = JSON.parse(localStorage.getItem(storageKey));
//     return savedData?.currentQuestionIndex ?? 0;
//   });

//   const [timeLeft, setTimeLeft] = useState(() => {
//     const savedData = JSON.parse(localStorage.getItem(storageKey));
//     return savedData?.timeLeft ?? 120;
//   });

//   const [correctAnswersCount, setCorrectAnswersCount] = useState(() => {
//     const savedData = JSON.parse(localStorage.getItem(storageKey));
//     return savedData?.correctAnswersCount ?? 0;
//   });

//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const { data: questions, isLoading, error } = fetchEPQuestions();

//   // Save progress to localStorage whenever states change
//   useEffect(() => {
//     const progress = {
//       currentQuestionIndex,
//       timeLeft,
//       correctAnswersCount,
//     };
//     localStorage.setItem(storageKey, JSON.stringify(progress));
//   }, [currentQuestionIndex, timeLeft, correctAnswersCount]);

//   // Timer logic
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime > 0) {
//           return prevTime - 1;
//         } else {
//           handleNextQuestion(); // Move to the next question if time runs out
//           return 120; // Reset timer for next question
//         }
//       });
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup the timer
//   }, [currentQuestionIndex]);

//   // Track navigation away from the quiz page
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       localStorage.setItem(`${subject}_quiz_lastVisitedTime`, Date.now());
//     };

//     // Save the timestamp when navigating away
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       localStorage.setItem(`${subject}_quiz_lastVisitedTime`, Date.now()); // Also save on cleanup
//     };
//   }, []);

//   // Reset timer if returning after a long time
//   useEffect(() => {
//     const lastVisitedTime = localStorage.getItem(
//       `${subject}_quiz_lastVisitedTime`
//     );
//     if (lastVisitedTime) {
//       const elapsedTime = (Date.now() - parseInt(lastVisitedTime, 10)) / 1000; // Convert to seconds
//       if (elapsedTime > 120) {
//         // If more than 2 minutes passed, reset timer
//         setTimeLeft(120);
//       }
//     }
//   }, []);

//   const handleAnswerSelection = (answerIndex) => {
//     setSelectedAnswer(answerIndex);
//   };

//   const handleSubmit = () => {
//     if (selectedAnswer === questions[currentQuestionIndex].correctAnswerIndex) {
//       setCorrectAnswersCount((prevCount) => prevCount + 1); // Increment score for correct answer
//     }
//     setIsSubmitted(true); // Mark as submitted to display explanation
//   };

//   const handleNextQuestion = () => {
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     setSelectedAnswer(null);
//     setIsSubmitted(false);
//     setTimeLeft(120); // Reset timer for next question
//   };

//   const handleFinishQuiz = () => {
//     // Clear progress for this subject
//     localStorage.removeItem(storageKey);
//     localStorage.removeItem(`${subject}_quiz_lastVisitedTime`);

//     // Navigate to dashboard with score
//     navigate("/", {
//       state: {
//         subject: subject,
//         score: correctAnswersCount,
//         total: questions?.length,
//       },
//     });
//   };

//   const handleRestartQuiz = () => {
//     // Clear progress and reset states
//     localStorage.removeItem(storageKey);
//     localStorage.removeItem(`${subject}_quiz_lastVisitedTime`);

//     setCurrentQuestionIndex(0);
//     setSelectedAnswer(null);
//     setIsSubmitted(false);
//     setCorrectAnswersCount(0); // Reset score
//     setTimeLeft(120); // Reset timer
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen w-full">
//         Loading...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen w-full">
//         Error loading questions
//       </div>
//     );
//   if (questions?.length === 0)
//     return (
//       <div className="flex justify-center items-center h-screen w-full">
//         No questions found for this subject
//       </div>
//     );

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">
//       <h2 className="text-2xl mb-4">
//         {subject} - Question {currentQuestionIndex + 1}/{questions?.length}
//         <pre className="text-base pt-2 text-wrap">
//           {questions[currentQuestionIndex]?.text}
//         </pre>
//       </h2>

//       <MCQ
//         options={questions[currentQuestionIndex]?.options}
//         selectedAnswer={selectedAnswer}
//         correctAnswer={questions[currentQuestionIndex]?.correctAnswerIndex}
//         isSubmitted={isSubmitted}
//         onAnswerSelect={handleAnswerSelection}
//       />

//       {isSubmitted && (
//         <div className="mt-4">
//           <p className="text-lg">
//             {selectedAnswer ===
//             questions[currentQuestionIndex]?.correctAnswerIndex
//               ? "Correct!"
//               : "Incorrect!"}
//           </p>
//           <pre className="italic text-gray-500 text-wrap">
//             {questions[currentQuestionIndex]?.explanation}
//           </pre>
//         </div>
//       )}

//       <div className="flex justify-between items-center">
//         {!isSubmitted && (
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white px-4 py-2 mt-4"
//             disabled={selectedAnswer === null}
//           >
//             Submit
//           </button>
//         )}

//         {isSubmitted && currentQuestionIndex < questions.length - 1 && (
//           <button
//             onClick={handleNextQuestion}
//             className="bg-green-500 text-white px-4 py-2 mt-4"
//           >
//             Next Question
//           </button>
//         )}

//         {isSubmitted && currentQuestionIndex === questions.length - 1 && (
//           <button
//             onClick={handleFinishQuiz}
//             className="bg-red-500 text-white px-4 py-2 mt-4"
//           >
//             Finish Quiz
//           </button>
//         )}

//         <button
//           onClick={handleRestartQuiz}
//           className="bg-yellow-500 text-white px-4 py-2 mt-4"
//         >
//           Restart Quiz
//         </button>
//       </div>

//       {!isSubmitted && (
//         <div className="mt-4">
//           <span className="text-lg">
//             Time Left: {Math.floor(timeLeft / 60)}:
//             {String(timeLeft % 60).padStart(2, "0")}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EPQuiz;

import React, { useEffect, useState } from 'react';
import { useFetchGPAllRandomOrderQuestionsQuery } from '../../redux/api/gPQuestionApiSlice';

const EPQuiz = () => {
  const [quizSessionId, setQuizSessionId] = useState(null);

  // Fetch questions using the query hook
  const { data, error, isLoading } = useFetchGPAllRandomOrderQuestionsQuery(quizSessionId);

  useEffect(() => {
    // Generate a new session ID on component mount
    if (!quizSessionId) {
      const newSessionId = localStorage.getItem('quizSessionId') || null;
      setQuizSessionId(newSessionId || '');
    }
  }, [quizSessionId]);

  useEffect(() => {
    if (data?.quizSessionId) {
      // Store session ID in localStorage to reuse later
      localStorage.setItem('quizSessionId', data.quizSessionId);
    }
  }, [data]);

  if (isLoading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Quiz Questions</h1>
      {data?.questions?.map((question, index) => (
        <div key={index}>
          <p><span className='font-bold'>Question {index + 1} : </span>{question.text}</p>
        </div>
      ))}
    </div>
  );
};

export default EPQuiz;
