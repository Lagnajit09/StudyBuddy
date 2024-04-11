// Mapping of usernames to socket IDs

const initializeSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("userId", ({ userId }) => {
      console.log(userId);
    });

    // Handle incoming messages
    socket.on("message", (data) => {
      console.log("Received message:", data);
      // Broadcast the message to all connected clients
      io.emit("message", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

module.exports = initializeSocket;
