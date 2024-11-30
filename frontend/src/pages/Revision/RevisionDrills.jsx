import { Link } from "react-router-dom";

const RevisionDrills = () => {
  return (
    <div className="p-5 lg:px-20 font-sans">
      <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
        <h3 className="text-lg font-bold mb-2">Revision</h3>
        <p className="text-gray-700">Daily Revision</p>
        <p className="text-gray-500 mb-4">
          Sharpen your knowledge with focused revision drills—practice, refine,
          and excel.
        </p>
        <Link
          to="/revision-drills/revision"
          className="px-4 py-2 border border-pink-600 text-pink-600 bg-white rounded-md hover:bg-pink-50"
        >
          Start
        </Link>
      </div>
    </div>
  );
};
export default RevisionDrills;
