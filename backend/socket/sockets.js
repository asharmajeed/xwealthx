const userSockets = {}; // Object to store userId -> socketId mapping

export const handleSockets = (io) => {
  io.on("connection", (socket) => {
    // Listen for user registration
    socket.on("registerUser", (userId) => {
      userSockets[userId] = socket.id; // Store userId as key and socketId as value
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      for (const userId in userSockets) {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId]; // Remove user when disconnected
          break;
        }
      }
    });
  });
};

// Function to emit updates to a specific user by userId
export const emitUserUpdate = (io, userId, updatedUser) => {
  const socketId = userSockets[userId]; // Get socketId from object
  if (socketId) {
    io.to(socketId).emit("userUpdated", updatedUser); // Send update to specific user
  }
};
