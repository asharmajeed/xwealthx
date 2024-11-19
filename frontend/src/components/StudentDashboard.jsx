// StudentDashboard.jsx
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/studentdashboard'); // Navigate to the Student Dashboard page
  };
  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-teal mb-4">Student Dashboard</h2>
      {/* Add additional content for progress report, drills, and other options */}

      <button onClick={goToDashboard}>Student Dashboard</button>
    </div>
  );
};

export default StudentDashboard;
