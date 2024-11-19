


import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#0A3C4B]">
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

