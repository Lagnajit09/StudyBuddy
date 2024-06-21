import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
  cors: {
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"], // Allow GET and POST requests
  },
});

// const socket = 12;

export default socket;
