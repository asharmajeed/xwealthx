import React, { useState } from "react";
import AlternateComponent from "./AlternateComponent";

// Define the Default Component
const DefaultComponent = ({ onBack }) => {
  const [showAlternate, setShowAlternate] = useState(false);
  const [subject, setSubject] = useState("");

  // Handle the click on workout item
  const handleGPClick = () => {
    setShowAlternate(true); // Show the alternate page when a workout item is clicked
    setSubject("GP");
  };
  const handleRiskClick = () => {
    setShowAlternate(true); // Show the alternate page when a workout item is clicked
    setSubject("RM");
  };
  const handleIPClick = () => {
    setShowAlternate(true); // Show the alternate page when a workout item is clicked
    setSubject("IP");
  };
  const handleTPClick = () => {
    setShowAlternate(true); // Show the alternate page when a workout item is clicked
    setSubject("TP");
  };
  const handleRSClick = () => {
    setShowAlternate(true); // Show the alternate page when a workout item is clicked
    setSubject("RS");
  };
  const handleEPClick = () => {
    setShowAlternate(true); // Show the alternate page when a workout item is clicked
    setSubject("EP");
  };

  // Handle going back to the default page from the alternate page
  const handleBackClick = () => {
    setShowAlternate(false); // Hide the alternate page and go back to default
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Show alternate page */}
      {showAlternate ? (
        <div>
          <button style={backButtonStyle} onClick={handleBackClick}>
            Back to Default Page
          </button>
          <AlternateComponent subject={subject} />
        </div>
      ) : (
        <div>
          {/* Case Studies Section */}
          {/* <div style={sectionStyle}>
            <h3>Case Studies</h3>
            <div>Practice Case Studies</div>
            <div>Unlocked: 1</div>
            <div>Available: 6</div>
            <button style={selectButtonStyle} onClick={handleOtherButtonClick}>
              Select Case Studies
            </button>
          </div> */}

          {/* Workout Section */}
          <div
            style={{
              ...sectionStyle,
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <button style={workoutItemStyle} onClick={handleGPClick}>
              General Principles of Financial Planning
            </button>
            <button style={workoutItemStyle} onClick={handleRiskClick}>
              Risk Management and Insurance Planning
            </button>
            <button style={workoutItemStyle} onClick={handleIPClick}>
              Investment Planning
            </button>
            <button style={workoutItemStyle} onClick={handleTPClick}>
              Tax Planning
            </button>
            <button style={workoutItemStyle} onClick={handleRSClick}>
              Retirement Savings and Income Planning
            </button>
            <button style={workoutItemStyle} onClick={handleEPClick}>
              Estate Planning
            </button>
            {/* <button style={workoutItemStyle} onClick={handleWorkoutClick}>
              Psychology of Financial Planning
            </button>
            <button style={workoutItemStyle} onClick={handleWorkoutClick}>
              Professional Conduct and Regulation
            </button> */}
          </div>

          {/* Revision Section */}
          <div style={sectionStyle}>
            <h3>Revision</h3>
            <p>Daily Revision</p>
            <p>
              Revise mistakes from last 3 days to improve on your weak areas.
            </p>
            <p>Questions Available: 0</p>
            <button style={disabledButtonStyle} disabled>
              Start
            </button>
          </div>

          {/* Flashcards Section */}
          <div style={sectionStyle}>
            <h3>Flashcards</h3>
            <p>Practice Flashcards</p>
            <p>Available: 1,307</p>
            <button style={selectButtonStyle}>
              Select subjects
            </button>
          </div>

          {/* Daily Test Series Section */}
          <div style={sectionStyle}>
            <h3>Daily Test Series</h3>
            <div style={testSeriesStyle}>
              <p>THU, 21 NOV</p>
              <p>CFP® Exam Prep Rapid Quiz</p>
              <p>10 Qs, 15 mins</p>
              <p>Runs for: 3 days</p>
            </div>
            <button style={showAllButtonStyle}>
              Show All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Style objects for buttons and sections
const sectionStyle = {
  border: "1px solid #eee",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
};

const workoutItemStyle = {
  width: "48%",
  padding: "16px",
  backgroundColor: "#f7f7f7",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};

const selectButtonStyle = {
  padding: "8px 16px",
  border: "1px solid #6c63ff",
  color: "#6c63ff",
  backgroundColor: "white",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  marginTop: "8px",
};

const disabledButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#ccc",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "not-allowed",
  marginTop: "8px",
};

const testSeriesStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "8px",
  backgroundColor: "#f5f5ff",
};

const showAllButtonStyle = {
  padding: "8px 16px",
  border: "1px solid #6c63ff",
  color: "#6c63ff",
  backgroundColor: "white",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};

// Style for the back button
const backButtonStyle = {
  padding: "8px 16px",
  border: "1px solid #6c63ff",
  backgroundColor: "#6c63ff",
  color: "white",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  marginBottom: "16px",
};

export default DefaultComponent;
