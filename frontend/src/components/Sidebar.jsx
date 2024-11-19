// Sidebar.js
import { useUser } from "../context/UserContext";
import { BASE_URL } from "../utils/constants";
import "./Sidebar.css";

function Sidebar() {
  const { userInfo, logout } = useUser();

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    logout();
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src={userInfo?.image} alt="User" className="profile-pic" />
        {/* <span className="edit-icon">✏️</span> */}
        <h4>{userInfo?.name}</h4>
        {/* <div className="exam-info">
          <div className="calendar-icon">📅</div>
          <p>10 Days To Exam</p>
        </div> */}
      </div>

      <nav className="nav-links">
        <div className="nav-link">🔒 Go Premium</div>
        <div className="nav-link active">📖 Subject Drills</div>
        <div className="nav-link">📝 Revision Drills</div>
        <div className="nav-link">📄 Exam Drills: 85 Questions in 3 Hours</div>
        <div className="nav-link">👥 Sign up for  CFP® Tutor 1:1 at $50 an hour</div>
      </nav>

      <div className="actions">
        <h5>Actions</h5>
        <div className="action-link">📞 Contact Us</div>
        {/* <div className="action-link">🔗 Invite & Get Premium</div>
        <div className="action-link">🌙 Night Mode</div> */}
        <div className="action-link">📜 Privacy Policy</div>
        <div onClick={handleLogout} className="action-link">⬅️ Log off</div>
      </div>
    </div>
  );
}

export default Sidebar;
