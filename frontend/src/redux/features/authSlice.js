import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      startTokenExpirationCheck(state.userInfo?.token); // Ensure it starts when credentials are set
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Helper function to check token validity
const startTokenExpirationCheck = (token) => {
  if (token) {
    const { exp } = jwtDecode(token);
    const checkTokenValidity = () => {
      if (exp < Date.now() / 1000) {
        alert("Your session has expired! Please login again.");
        localStorage.removeItem("userInfo");
        window.location.reload(); // Reload the page or redirect
      }
    };
    checkTokenValidity(); // Initial check
    const interval = setInterval(checkTokenValidity, 60 * 1000); // Check every minute
    return () => clearInterval(interval); // Cleanup
  }
};

// Run the token expiration check on page load if token exists
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo?.token) {
  startTokenExpirationCheck(userInfo.token);
}
