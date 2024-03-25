const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/socketio");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = process.env.MONGODB_URL;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/chatroom/chat", chatRouter);

mongoose.connect(mongoUrl);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
