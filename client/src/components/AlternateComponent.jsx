import { useNavigate } from "react-router-dom";
import "./AlternateComponent.css";
import { useState } from "react";

function AlternateComponent({ subject }) {
  const [showPopup, setShowPopup] = useState(false);

  // Handle other button clicks (for popup)
  const handleOtherButtonClick = () => {
    setShowPopup(true); // Show popup for other buttons
  };
  const navigate = useNavigate();
  // Handle start quiz button in the popup
  const handleStartQuiz = () => {
    setShowPopup(false); // Close the popup and maybe start the quiz
    if (subject === "GP") {
      navigate("/quiz");
    } else if (subject === "Risk") {
      navigate("/risk-management-quiz");
    } else if (subject === "IP") {
      navigate("/investment-planning-quiz");
    }
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup when the close button is clicked
  };
  return (
    <div className="AlternateComponent">
      <div className="header">
        {subject === "GP" && <h2>General Principles of Financial Planning</h2>}
        {subject === "Risk" && <h2>Risk Management and Insurance Planning</h2>}
        {subject === "IP" && <h2>Investment Planning</h2>}
        {/* <p>Not yet attempted: 45</p>
        <p>Questions Available: 45</p> */}
        <button className="practice-button" onClick={handleOtherButtonClick}>
          Start Quiz
        </button>
      </div>

      <h3>All Topics</h3>
      <div className="topics-container">
        <TopicCard
          title="Client and planner attitudes, values, biases"
          icon="➕➖"
        />
        <TopicCard title="Behavioral finance" icon="📈" />
        <TopicCard title="Sources for money conflict" icon="💲⚙️" />
        <TopicCard title="Principles of counseling" icon="👥" />
        <TopicCard title="General principles of effective..." icon="👥👤" />
        <TopicCard title="Crisis event with severe consequences" icon="⚠️" />
      </div>

      {/* Popup logic */}
      {showPopup && (
        <div style={popupStyle}>
          <div style={popupHeaderStyle}>
            <p>Start the quiz now?</p>
            <button onClick={handleClosePopup} style={closeButtonStyle}>
              X
            </button>
          </div>
          <button onClick={handleStartQuiz} style={startQuizButtonStyle}>
            Start Quiz Now
          </button>
        </div>
      )}
    </div>
  );
}

function TopicCard({ title, icon }) {
  return (
    <div className="topic-card">
      <div className="icon">{icon}</div>
      <p>{title}</p>
    </div>
  );
}

export default AlternateComponent;

// Popup style
const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
};

const startQuizButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

// Close button style for the popup
const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "transparent",
  border: "none",
  color: "#888",
  fontSize: "18px",
  cursor: "pointer",
};

const popupHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
