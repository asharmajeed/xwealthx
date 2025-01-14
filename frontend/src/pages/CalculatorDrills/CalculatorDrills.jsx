import { Link } from "react-router-dom";

const CalculatorDrills = () => {
  return (
    <div className="p-5 lg:px-20">
      <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
        <h3 className="text-lg font-bold mb-3 text-blue-900">
          Calculator Drills
        </h3>
        <div className="flex flex-col gap-y-4">
          <Link
            to="/Calculator Drills/FC Financial Calculator Qbank.pdf"
            target="_blank"
            className="flex flex-col items-center bg-slate-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            FC Financial Calculator Qbank
          </Link>
          <Link
            to="/Calculator Drills/FC Financial Calculator QBank 2.pdf"
            target="_blank"
            className="flex flex-col items-center bg-slate-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            FC Financial Calculator Qbank 2
          </Link>
          <Link
            to="/Calculator Drills/FC Formual Quiz Qbank.pdf"
            target="_blank"
            className="flex flex-col items-center bg-slate-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            FC Formual Quiz Qbank
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CalculatorDrills;
