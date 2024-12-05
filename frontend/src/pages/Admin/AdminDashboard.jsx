import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      key: "gp",
      label: "General Principles of Financial Planning",
      path: "gpquestions",
    },
    {
      key: "gpgf",
      label: "General Principles of Financial Planning (Google Form)",
      path: "gpgfquestions",
    },
    {
      key: "rm",
      label: "Risk Management and Insurance Planning",
      path: "rmquestions",
    },
    {
      key: "rmgf",
      label: "Risk Management and Insurance Planning  (Google Form)",
      path: "rmgfquestions",
    },
    { key: "ip", label: "Investment Planning", path: "ipquestions" },
    {
      key: "ipgf",
      label: "Investment Planning  (Google Form)",
      path: "ipgfquestions",
    },
    { key: "tp", label: "Tax Planning", path: "tpquestions" },
    {
      key: "tpgf",
      label: "Tax Planning  (Google Form)",
      path: "tpgfquestions",
    },
    {
      key: "rs",
      label: "Retirement Savings and Income Planning",
      path: "rsquestions",
    },
    {
      key: "rsgf",
      label: "Retirement Savings and Income Planning  (Google Form)",
      path: "rsgfquestions",
    },
    { key: "ep", label: "Estate Planning", path: "epquestions" },
    {
      key: "epgf",
      label: "Estate Planning  (Google Form)",
      path: "epgfquestions",
    },
  ];

  const handleSubjectClick = (subject, subjectPath) => {
    // Navigate to the AdminDashboard with subjectKey in state
    navigate("/admin-dashboard/subject-questions", { state: { subject, subjectPath } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-blue-900 text-center pb-3">
            Manage Users: <Link to="/admin-dashboard/manage-users" className="text-pink-500 underline">Click Here</Link>
          </h2>
      <h1 className="text-3xl font-bold text-center mb-8">
        Select a Subject to Manage Questions
      </h1>

      {/* Subject Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <button
            key={subject.key}
            onClick={() => handleSubjectClick(subject.label, subject.path)}
            className="bg-gray-300 py-4 px-6 rounded-lg shadow hover:shadow-lg focus:outline-none transition"
          >
            {subject.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default AdminDashboard;
