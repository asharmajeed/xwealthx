// import { useDispatch, useSelector } from "react-redux";
import { useSubject } from "../../context/QuizContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useGetCurrentUserQuery } from "../../redux/api/usersApiSlice";
// import { setCredentials } from "../../redux/features/authSlice";
// import { useEffect } from "react";

const HomeLoggedIn = () => {
  // const { userInfo } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const {
  //   data: currentUserInfo,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGetCurrentUserQuery();

  const location = useLocation();
  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  const { setSubject } = useSubject();
  const navigate = useNavigate();

  // Refetch user info only when necessary (if not available or if there's an error)
  // useEffect(() => {
  //   if (!currentUserInfo && !isLoading && !isError) {
  //     refetch();
  //   }
  // }, [currentUserInfo, isLoading, isError, refetch]);

  // // Dispatch the user credentials when currentUserInfo is available
  // useEffect(() => {
  //   if (currentUserInfo) {
  //     dispatch(setCredentials({ ...userInfo, ...currentUserInfo }));
  //   }
  // }, [currentUserInfo, dispatch, userInfo]);

  // Conditional loading and error handling
  // if (isLoading)
  //   return (
  //     <div className="flex justify-center items-center h-screen w-full">
  //       Loading...
  //     </div>
  //   );
  // if (isError)
  //   return (
  //     <div className="flex justify-center items-center h-screen w-full">
  //       Error loading user
  //     </div>
  //   );

  // Handle subject clicks
  const handleSubjectClick = (subject) => {
    setSubject(subject);
    navigate(`/subject-drills/${encodeURIComponent(subject)}`);
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

      <div>
        {/* Subjects Section */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
          <h3 className="text-lg font-bold mb-3">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "General Principles of Financial Planning",
              "Risk Management and Insurance Planning",
              "Investment Planning",
              "Tax Planning",
              "Retirement Savings and Income Planning",
              "Estate Planning",
            ].map((subject) => (
              <button
                key={subject}
                className="flex-1 min-w-[48%] p-4 bg-gray-100 rounded-lg text-center shadow hover:shadow-md"
                onClick={() => handleSubjectClick(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Revision Section */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
          <h3 className="text-lg font-bold mb-2">Revision</h3>
          <p className="text-gray-700">Daily Revision</p>
          <p className="text-gray-500 mb-4">
            Sharpen your knowledge with focused revision drills—practice,
            refine, and excel.
          </p>
          <Link
            to="/revision-drills/revision"
            className="px-4 py-2 border border-pink-600 text-pink-600 bg-white rounded-md hover:bg-pink-50"
          >
            Start
          </Link>
        </div>

        {/* Flashcards Section */}
        <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow bg-white">
          <h3 className="text-lg font-bold mb-2">Flashcards</h3>
          <p className="text-gray-700">Practice Flashcards</p>
          <p className="text-gray-500 mb-4">Available: 1,307</p>
          <button className="px-4 py-2 border border-pink-600 text-pink-600 bg-white rounded-md hover:bg-pink-50">
            Select Subjects
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
