import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants";

const socket = io(BASE_URL, { withCredentials: true }); // Backend WebSocket server

export const registerUser = (userId) => {
  socket.emit("registerUser", userId); // Register the user with their userId
};

export default socket;
