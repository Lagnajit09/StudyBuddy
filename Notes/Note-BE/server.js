//THIS IS THE SERVER

const express = require("express");
const app = express();
const connectDb = require("./connect-db");
const router = require("./router");
app.use(express.json());
const cors = require("cors");
app.use(cors());

//Connect to DB
connectDb().then(() => {
  console.log("Hello DB");
});

//Use the Routers
app.use("/note", router);

//Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running at port:" + PORT);
});
