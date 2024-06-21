//THIS IS THE SERVER
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const connectDb = require("./connect-db");
const oAuthRouter = require("./User/oAuth");
const profileRouter = require("./User/Profile-Controller");
const courseRouter = require("./Courses/course-router");
const noteRouter = require("./router");
const chatRouter = require("./Chatroom/chat");
const communityRouter = require("./Chatroom/community");
require("dotenv").config();
const cors = require("cors");
const { handleSocketConnection } = require("./Chatroom/socketHandler");
const geminiRouter = require("./Gemini/gemini");
const signupSchema = require("./User/signup-Schema");
const validate = require("./User/validate-signup");
const auth = require("./User/auth-Controller");

app.use(express.json());
app.use(cors());

// Example route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Connect to DB
connectDb().then(() => {
  console.log("Hello DB");
});

//socket-io cors configuration
const io = require("socket.io")(server, {
  cors: {
    origin: ["https://studybuddy-52816.web.app", "http://localhost:5173", "*"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//Use the Routers

//To handle User
app.route("/signup").post(validate(signupSchema), auth.signup); //route to signup page //Validation to be added
app.route("/login").post(auth.login); //route to handle login page
app.use("/", oAuthRouter);
app.use("/user", profileRouter);
app.use("/user-course", courseRouter);
app.use("/courses", geminiRouter);
app.use("/note", noteRouter);
app.use("/chatroom/chat", chatRouter);
app.use("/chatroom/community", communityRouter);

//connect to socket.io
handleSocketConnection(io);

//Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
