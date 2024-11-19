// App.js
import Sidebar from './components/Sidebar';
import './App.css';
import Navbar from './components/Navbar';
import ToggleComponent from './components/RightComponent';
function StudentDashboard() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="right-content">
          <div className="centered-button-container">
            <button className="gradient-button">
              Simulate Success: Gauge Your Abilities with Our Full-Length Mock Tests!
              <span className="arrow">➡️</span>
            </button>
          </div>
          <div><ToggleComponent/></div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

