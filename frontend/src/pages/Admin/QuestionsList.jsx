import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useFetchQuestionsBySubjectQuery,
  useUpdateQuestionMutation,
} from "../../redux/api/subjectApiSlice";

const QuestionsList = () => {
  const location = useLocation();
  const { subject } = location.state || {};
  const { subjectPath } = location.state || {};

  const {
    data: questions,
    isFetching,
    error,
    refetch,
  } = useFetchQuestionsBySubjectQuery(subjectPath);
  const [updateQuestion] = useUpdateQuestionMutation();
  const [editing, setEditing] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [questionNumber, setQuestionNumber] = useState("");

  if (!subject) {
    return (
      <div className="text-center text-lg font-semibold">
        No subject selected.
      </div>
    );
  }

  if (isFetching)
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

  const handleUpdate = async (id) => {
    try {
      if (!editedData || Object.keys(editedData).length === 0) {
        throw new Error("No updates to save.");
      }

      // Attempt to update and unwrap the result to handle any rejected promises
      await updateQuestion({
        subject: subjectPath,
        id,
        updates: editedData,
      }).unwrap();

      refetch();
      setEditing(null);
      setEditedData({});
      alert("Question updated successfully!");
    } catch (error) {
      console.error("Failed to update the question:", error?.message || error);
      alert(
        `An error occurred while updating the question: ${
          error?.data?.message || error.message || "Unknown error"
        }`
      );
    }
  };

  const handleCorrectAnswer = (value) => {
    const index = value.toUpperCase().charCodeAt(0) - 65;
    return index >= 0 && index <= 4 ? index : null;
  };

  const scrollToQuestion = () => {
    const questionIndex = parseInt(questionNumber, 10) - 1;
    if (questionIndex >= 0 && questionIndex < questions.length) {
      document
        .getElementById(`question-${questionIndex}`)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEditChange = (key, value) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Managing {subject.toUpperCase()} Questions
      </h1>
      <div className="flex flex-row items-center mb-6 gap-4 md:w-[50%]">
        <input
          type="number"
          min="1"
          max={questions.length}
          placeholder="Enter question number"
          value={questionNumber}
          onChange={(e) => setQuestionNumber(e.target.value)}
          className="flex-grow-[2] p-2 border rounded-lg sm:w-auto focus:ring focus:ring-blue-300"
        />
        <button
          onClick={scrollToQuestion}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Go to Question
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1">
        {questions?.map((question, idx) => (
          <div
            key={question._id}
            id={`question-${idx}`}
            className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Question {idx + 1}</h2>
            {editing === question._id ? (
              <div>
                <textarea
                  rows={7}
                  defaultValue={question.text}
                  onChange={(e) => handleEditChange("text", e.target.value)}
                  className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                />
                {question.options.map((option, optionIdx) => (
                  <div key={optionIdx} className="flex items-center mb-3">
                    <span className="mr-2 font-semibold">
                      {String.fromCharCode(65 + optionIdx)}:
                    </span>
                    <input
                      type="text"
                      defaultValue={option}
                      onChange={(e) =>
                        handleEditChange("options", {
                          ...question.options,
                          [optionIdx]: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg w-full"
                    />
                  </div>
                ))}
                <input
                  type="text"
                  maxLength="1"
                  placeholder="Correct Answer (A, B, C, etc.)"
                  onChange={(e) => {
                    const index = handleCorrectAnswer(e.target.value);
                    if (index !== null)
                      handleEditChange("correctAnswerIndex", index);
                  }}
                  className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                />
                {question.explanation && (
                  <textarea
                    rows={5}
                    defaultValue={question.explanation}
                    onChange={(e) =>
                      handleEditChange("explanation", e.target.value)
                    }
                    className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                )}
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
                  onClick={() => handleUpdate(question._id)}
                >
                  Done Editing
                </button>
              </div>
            ) : (
              <div onClick={() => setEditing(question._id)}>
                <pre className="font-semibold font-sans text-wrap">
                  {question.text}
                </pre>
                {question.options.map((option, optionIdx) => (
                  <p key={optionIdx} className="text-sm mt-1">
                    <span className="font-bold">
                      {String.fromCharCode(65 + optionIdx)}:
                    </span>{" "}
                    {option}
                  </p>
                ))}
                <p className="mt-2">
                  <strong>Correct Answer:</strong>{" "}
                  {String.fromCharCode(65 + question.correctAnswerIndex)}
                </p>
                {question.explanation && (
                  <pre className="mt-2 font-sans text-wrap">
                    <strong>Explanation:</strong> {question.explanation}
                  </pre>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
