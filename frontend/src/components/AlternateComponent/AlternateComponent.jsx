import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubject } from "../../context/QuizContext";

function AlternateComponent() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { subject } = useSubject();

  const handleStartQuiz = () => {
    setShowPopup(false);
    navigate(`/quiz/${encodeURIComponent(subject)}`);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="bg-teal-100 p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-teal-500 text-xl font-bold mb-4">{subject}</h2>
        {/* Uncomment below lines if needed */}
        {/* <p>Not yet attempted: 45</p>
        <p>Questions Available: 45</p> */}
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          Start Quiz
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
        All Topics
      </h3>
      {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TopicCard
          title="Client and planner attitudes, values, biases"
          icon="➕➖"
        />
        <TopicCard title="Behavioral finance" icon="📈" />
        <TopicCard title="Sources for money conflict" icon="💲⚙️" />
        <TopicCard title="Principles of counseling" icon="👥" />
        <TopicCard title="General principles of effective..." icon="👥👤" />
        <TopicCard title="Crisis event with severe consequences" icon="⚠️" />
      </div>*/}

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPopup(false)}
            >
              X
            </button>
            <p className="mb-4">Start the quiz now?</p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
              onClick={handleStartQuiz}
            >
              Start Quiz Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// function TopicCard({ title, icon }) {
//   return (
//     <div className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center text-center">
//       <div className="text-2xl mb-2">{icon}</div>
//       <p className="text-sm text-gray-700">{title}</p>
//     </div>
//   );
// }

export default AlternateComponent;
