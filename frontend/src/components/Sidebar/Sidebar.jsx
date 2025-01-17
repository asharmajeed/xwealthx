import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/authSlice";

const Sidebar = ({ isSidebarOpen }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-100 text-gray-800 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex-shrink-0 overflow-y-auto`}
    >
      <div className="flex flex-col items-center py-5">
        <img
          src={userInfo?.image}
          alt="User"
          className="w-12 h-12 rounded-full mb-2"
        />
        <h4 className="text-lg font-semibold">{userInfo?.name}</h4>
        {userInfo?.isAdmin && (
          <>
            <Link to="/admin-dashboard" className="text-pink-500 underline">
              Admin Dashboard
            </Link>
            <Link to="/admin-dashboard/add-case-study" className="text-pink-500 underline">
              Add Case Studies
            </Link>
          </>
        )}
      </div>
      <nav className="space-y-2 p-4">
        {!userInfo?.isPremium && (
          <NavLink
            to="/premium"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md hover:bg-gray-200 ${
                isActive && "bg-gray-200"
              }`
            }
          >
            🔒 Go Premium
          </NavLink>
        )}
        <NavLink
          to="/subject-drills"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive && "bg-gray-200"
            }`
          }
        >
          📖 Subject Drills
        </NavLink>
        <NavLink
          to="/revision-drills"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive && "bg-gray-200"
            }`
          }
        >
          📝 Revision Drills
        </NavLink>
        <NavLink
          to="/exam-drills"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive && "bg-gray-200"
            }`
          }
        >
          📄 Exam Drills: 85 Questions in 3 Hours
        </NavLink>
        <NavLink
          to="/calculator-drills"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive && "bg-gray-200"
            }`
          }
        >
          📱 Calculator Drills
        </NavLink>
        <NavLink
          to="/case-studies"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md hover:bg-gray-200 ${
              isActive && "bg-gray-200"
            }`
          }
        >
          📝 Case Studies
        </NavLink>
        <Link
          to="/tutor-form"
          target="_blank"
          className="block px-3 py-2 rounded-md hover:bg-gray-200"
        >
          👥 Sign up for CFP® Tutor 1:1 at $50 an hour
        </Link>
        <h5 className="text-lg font-medium text-gray-800 mb-3">Actions</h5>
        <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
          📞 Contact Us
        </div>
        <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
          📜 Privacy Policy
        </div>
        <div
          onClick={handleLogout}
          className="block px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          ⬅️ Log off
        </div>
      </nav>
    </aside>
  );
};
export default Sidebar;
