import io from "socket.io-client";

const socket = io("https://studybuddy-iota.vercel.app", {
  withCredentials: true,
  transports: ["websocket"], // Explicitly specify the transport to use, recommended for socket.io
  cors: {
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"], // Allow GET and POST requests
  },
});

export default socket;
