import { useNavigate } from "react-router-dom";
import { useSubject } from "../../context/QuizContext";

const ExamDrills = () => {
  const { setSubject } = useSubject();
  const navigate = useNavigate();

  const handleGPClick = () => {
    setSubject("General Principles of Financial Planning");
    navigate(`/exam/${encodeURIComponent("General Principles of Financial Planning")}`);
  };
  const handleRiskClick = () => {
    setSubject("Risk Management and Insurance Planning");
    navigate(`/exam/${encodeURIComponent("Risk Management and Insurance Planning")}`);
  };
  const handleIPClick = () => {
    setSubject("Investment Planning");
    navigate(`/exam/${encodeURIComponent("Investment Planning")}`);
  };
  const handleTPClick = () => {
    setSubject("Tax Planning");
    navigate(`/exam/${encodeURIComponent("Tax Planning")}`);
  };
  const handleRSClick = () => {
    setSubject("Retirement Savings and Income Planning");
    navigate(`/exam/${encodeURIComponent("Retirement Savings and Income Planning")}`);
  };
  const handleEPClick = () => {
    setSubject("Estate Planning");
    navigate(`/exam/${encodeURIComponent("Estate Planning")}`);
  };

  return (
    <div className="p-5 lg:px-20 font-sans">
      <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
        <h3 className="text-lg font-bold mb-2">Exam Drills</h3>
        <p className="text-gray-700">Exam Mastery Practice</p>
        <p className="text-gray-500 mb-4">
          Sharpen your skills with focused practice to master every exam
          question.
        </p>
        <h3 className="text-lg font-bold mb-3">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg flex flex-col justify-center items-center shadow hover:shadow-md"
              onClick={handleGPClick}
            >
              <img
                src="/general-principles.webp"
                className="w-20 h-20 object-cover"
              />
              <p>General Principles of Financial Planning</p>
            </button>
            <button
              className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg flex flex-col justify-center items-center shadow hover:shadow-md"
              onClick={handleRiskClick}
            >
              <img src="/risk-management.webp" className="h-20 object-cover" />
              <p>Risk Management and Insurance Planning</p>
            </button>
            <button
              className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg flex flex-col justify-center items-center shadow hover:shadow-md"
              onClick={handleIPClick}
            >
              <img
                src="/investment-planning.webp"
                className="h-20 object-cover"
              />
              <p>Investment Planning</p>
            </button>
            <button
              className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg flex flex-col justify-center items-center shadow hover:shadow-md"
              onClick={handleTPClick}
            >
              <img src="/tax-planning.png" className="h-20 object-cover" />
              <p>Tax Planning</p>
            </button>
            <button
              className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg flex flex-col justify-center items-center shadow hover:shadow-md"
              onClick={handleRSClick}
            >
              <img
                src="/retirement-saving.webp"
                className="h-20 object-cover"
              />
              <p>Retirement Savings and Income Planning</p>
            </button>
            <button
              className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg flex flex-col justify-center items-center shadow hover:shadow-md"
              onClick={handleEPClick}
            >
              <img src="/estate-planning.png" className="h-20 object-cover" />
              <p>Estate Planning</p>
            </button>
          </div>
      </div>
    </div>
  );
};
export default ExamDrills;
