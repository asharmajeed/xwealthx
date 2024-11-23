import { useState } from "react";
import { AlternateComponent } from "../";
import { useLocation } from "react-router-dom";
import { useSubject } from "../../context/QuizContext";

const DefaultComponent = () => {
  const location = useLocation();
  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  const { setSubject } = useSubject();

  const [showAlternate, setShowAlternate] = useState(false);

  const handleGPClick = () => {
    setShowAlternate(true);
    setSubject("General Principles of Financial Planning");
  };
  const handleRiskClick = () => {
    setShowAlternate(true);
    setSubject("Risk Management and Insurance Planning");
  };
  const handleIPClick = () => {
    setShowAlternate(true);
    setSubject("Investment Planning");
  };
  const handleTPClick = () => {
    setShowAlternate(true);
    setSubject("Tax Planning");
  };
  const handleRSClick = () => {
    setShowAlternate(true);
    setSubject("Retirement Savings and Income Planning");
  };
  const handleEPClick = () => {
    setShowAlternate(true);
    setSubject("Estate Planning");
  };

  const handleBackClick = () => {
    setShowAlternate(false);
  };

  return (
    <div className="p-5 lg:px-20 font-sans">
      {/* Score Section */}
      {total > 0 && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
          <h2 className="text-lg font-bold mb-2">Your Quiz Score</h2>
          <p className="text-gray-700">
            You got {score} out of {total} correct!
          </p>
        </div>
      )}

      {/* Show Alternate Section */}
      {showAlternate ? (
        <div>
          <button
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 mb-4"
            onClick={handleBackClick}
          >
            Back to Default Page
          </button>
          <AlternateComponent />
        </div>
      ) : (
        <div>
          {/* Subjects Section */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
            <h3 className="text-lg font-bold mb-3">Subjects</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg text-center shadow hover:shadow-md"
                onClick={handleGPClick}
              >
                General Principles of Financial Planning
              </button>
              <button
                className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg text-center shadow hover:shadow-md"
                onClick={handleRiskClick}
              >
                Risk Management and Insurance Planning
              </button>
              <button
                className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg text-center shadow hover:shadow-md"
                onClick={handleIPClick}
              >
                Investment Planning
              </button>
              <button
                className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg text-center shadow hover:shadow-md"
                onClick={handleTPClick}
              >
                Tax Planning
              </button>
              <button
                className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg text-center shadow hover:shadow-md"
                onClick={handleRSClick}
              >
                Retirement Savings and Income Planning
              </button>
              <button
                className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg text-center shadow hover:shadow-md"
                onClick={handleEPClick}
              >
                Estate Planning
              </button>
            </div>
          </div>

          {/* Revision Section */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
            <h3 className="text-lg font-bold mb-2">Revision</h3>
            <p className="text-gray-700">Daily Revision</p>
            <p className="text-gray-500">
              Revise mistakes from the last 3 days to improve on your weak
              areas.
            </p>
            <p className="text-gray-500">Questions Available: 0</p>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed mt-3"
              disabled
            >
              Start
            </button>
          </div>

          {/* Flashcards Section */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
            <h3 className="text-lg font-bold mb-2">Flashcards</h3>
            <p className="text-gray-700">Practice Flashcards</p>
            <p className="text-gray-500">Available: 1,307</p>
            <button className="px-4 py-2 border border-pink-600 text-pink-600 bg-white rounded-md hover:bg-pink-50 mt-3">
              Select Subjects
            </button>
          </div>

          {/* Daily Test Series Section */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
            <h3 className="text-lg font-bold mb-2">Daily Test Series</h3>
            <div className="border border-gray-300 rounded-lg p-3 bg-pink-50 mb-3">
              <p className="text-sm text-gray-600">THU, 21 NOV</p>
              <p className="text-base font-medium text-gray-800">
                CFP® Exam Prep Rapid Quiz
              </p>
              <p className="text-sm text-gray-600">10 Qs, 15 mins</p>
              <p className="text-sm text-gray-600">Runs for: 3 days</p>
            </div>
            <button className="px-4 py-2 border border-pink-600 text-pink-600 bg-white rounded-md hover:bg-pink-50">
              Show All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultComponent;
