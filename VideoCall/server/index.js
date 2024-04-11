const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chat");
const communityRouter = require("./routes/community");
const mongoose = require("mongoose");
const http = require("http");

require("dotenv").config();
const mongoUrl = process.env.MONGODB_URL;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/chatroom/chat", chatRouter);
app.use("/chatroom/community", communityRouter);

mongoose.connect(mongoUrl);

// ==================================SOCKET.IO LOGIC======================================================
const userSocketMap = new Map();

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

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
