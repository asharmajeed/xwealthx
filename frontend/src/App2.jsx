// App.js
import HomePage from "./components/HomePage";
import ConsultationForm from "./components/ConsultationForm";
import MentorForm from "./components/MentorForm";
import PricingPage from "./components/PricingPage";
import StudentDashboard from "./components/StudentDashboard";
import Flashcards from "./components/Flashcards";
import SecondHalfHomePage from "./components/SecondHalfHomepage";
import MentorSection from "./components/MentorSection";

function App2() {
  // Sample data
  const flashcardData = [
    {
      front: "What is a fiduciary duty?",
      back: "A fiduciary duty is an ethical and legal responsibility to act in the best interest of another party.",
    },
    {
      front: "Define risk tolerance.",
      back: "Risk tolerance is an investor's ability or willingness to endure declines in the value of investments.",
    },
    {
      front: "Explain 'compound interest.'",
      back: "Interest calculated on the initial principal and also on the accumulated interest from previous periods.",
    },
  ];

  return (
    <div className="App">
      <HomePage />
      <SecondHalfHomePage />
      <MentorSection /> 
      {/* <PricingPage />
      <Flashcards cards={flashcardData} /> */}
      {/* <StudentDashboard /> */}
      {/* QuizComponent can be included wherever it is needed */}
    </div>
  );
}

export default App2;
