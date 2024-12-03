import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";

const Navbar = ({ toggleSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="bg-[#333333] shadow py-2 px-5 flex justify-between items-center flex-shrink-0">
      <Logo />
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
        onClick={toggleSidebar}
      >
        Menu
      </button>
      {/* Navbar Menu (Visible on medium and larger screens) */}
      <nav className="hidden md:flex space-x-4 text-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-pink-500 ${isActive && "text-pink-500"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/subject-drills"
          className={({ isActive }) =>
            `hover:text-pink-500 ${isActive && "text-pink-500"}`
          }
        >
          Subject Drills
        </NavLink>
        <NavLink
          to="/revision-drills"
          className={({ isActive }) =>
            `hover:text-pink-500 ${isActive && "text-pink-500"}`
          }
        >
          Revision Drills
        </NavLink>
        <NavLink
          to="/exam-drills"
          className={({ isActive }) =>
            `hover:text-pink-500 ${isActive && "text-pink-500"}`
          }
        >
          Exam Drills
        </NavLink>
        {!userInfo?.isPremium && (
          <NavLink to="/premium" className="text-[#FFD700] font-semibold">
            Go Premium
          </NavLink>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
