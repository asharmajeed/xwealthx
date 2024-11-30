import { useState } from "react";
import { DefaultComponent, Navbar, Sidebar } from "../../components";

const StudentDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Page Content Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
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
          <DefaultComponent />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
