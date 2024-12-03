import { Outlet, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { Navbar, Sidebar } from "./components";
import { useSelector } from "react-redux";
import useSocketListener from "./socket/useSocketListener";

function App() {
  useSocketListener();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation(); // Get the current URL path

  // Define pages that should use fixed layout (with navbar and sidebar)
  const fixedLayoutPaths = useMemo(() => {
    const paths = [
      "/subject-drills",
      "/subject-drills/General%20Principles%20of%20Financial%20Planning",
      "/subject-drills/Risk%20Management%20and%20Insurance%20Planning",
      "/subject-drills/Investment%20Planning",
      "/subject-drills/Tax%20Planning",
      "/subject-drills/Retirement%20Savings%20and%20Income%20Planning",
      "/subject-drills/Estate%20Planning",
      "/revision-drills",
      "/exam-drills",
      "/premium",
      "/admin-dashboard",
    ];
    if (userInfo) {
      paths.push("/");
    }
    return paths;
  }, [userInfo]);

  const isFixedLayout = fixedLayoutPaths.includes(location.pathname);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Render Fixed Layout with Navbar and Sidebar
  if (isFixedLayout) {
    return (
      <div className="h-screen flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar isSidebarOpen={isSidebarOpen} />

          {/* Overlay for Sidebar on Small Screens */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-100 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  // Render Full Page Layout without Navbar and Sidebar
  return <Outlet />;
}

export default App;
