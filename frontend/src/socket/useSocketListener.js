import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket, { registerUser } from "./socket";
import { setCredentials } from "../redux/features/authSlice";

const useSocketListener = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Register the user on connection
    if (userInfo?._id) {
      registerUser(userInfo._id); // Register user's ID with the server
    }

    // Listen for updates to this user's info
    socket.on("userUpdated", (updatedUser) => {
      if (updatedUser._id === userInfo?._id) {
        dispatch(setCredentials({ ...userInfo, ...updatedUser })); // Update state
        if (updatedUser?.isPremium) {
          alert("You got Premium access.");
        } else {
          alert("Your Premium Plan is Expired.");
        }
      }
    });

    return () => {
      socket.off("userUpdated"); // Clean up listener on component unmount
    };
  }, [dispatch, userInfo?._id, userInfo]);
};

export default useSocketListener;
