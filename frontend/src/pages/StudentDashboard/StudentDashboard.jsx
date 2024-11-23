import { useState } from "react";
import { Logo, DefaultComponent } from "../../components";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constants";

const StudentDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userInfo, logout } = useUser();

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    logout();
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
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
          <div className="text-pink-500">Home</div>
          <div>Subject Drills</div>
          <div>Revision Drills</div>
          <div>Exam Drills</div>
          <div className="text-[#FFD700] font-semibold">Go Premium</div>
        </nav>
      </header>

      {/* Page Content Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
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
          </div>
          <nav className="space-y-2 p-4">
            <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
              🔒 Go Premium
            </div>
            <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
              📖 Subject Drills
            </div>
            <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
              📝 Revision Drills
            </div>
            <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
              📄 Exam Drills: 85 Questions in 3 Hours
            </div>
            <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
              👥 Sign up for CFP® Tutor 1:1 at $50 an hour
            </div>
            <h5 className="text-lg font-medium text-gray-800 mb-3">Actions</h5>
            <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
              📞 Contact Us
            </div>
            <div className="block px-3 py-2 rounded-md hover:bg-gray-200">
              📜 Privacy Policy
            </div>
            <div
              onClick={handleLogout}
              className="block px-3 py-2 rounded-md hover:bg-gray-200"
            >
              ⬅️ Log off
            </div>
          </nav>
        </aside>

        {/* Overlay for Sidebar on Small Screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <DefaultComponent />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
