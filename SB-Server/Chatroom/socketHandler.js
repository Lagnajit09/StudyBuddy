const userSocketMap = new Map();

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("userId", (userId) => {
      console.log(userId);
      userSocketMap.set(userId, socket.id);
    });

    // Handle incoming messages
    socket.on("message", (data) => {
      console.log("Received message:", data);
      // Broadcast the message to all connected clients
      io.emit("message", data);
    });

    // Handle incoming community messages
    socket.on("community:message", (data) => {
      console.log("Received community message:", data);
      // Broadcast the message to all connected clients
      io.emit("community:message", data);
    });

    socket.on("updateChatUsers", ({ recipientId, senderId }) => {
      const recipientSocketId = userSocketMap.get(recipientId);
      if (recipientSocketId) {
        // Notify recipient to update chat users list
        io.to(recipientSocketId).emit("chatUsersUpdated", senderId);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = { handleSocketConnection };
