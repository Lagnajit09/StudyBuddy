//THIS FILE IS FOR CONNECTION OF NODE TO MONGO DB

const mongoose = require("mongoose");
require("dotenv").config();

//const URI="mongodb://127.0.0.1:27017/mern-admin"

//
const URI = process.env.CONN_STRING;
//"mongodb+srv://Umesh:"+process.env.DBPASS+"@cluster0.52wu20t.mongodb.net/"+process.env.DBNAME+"?retryWrites=true&w=majority&appName=Cluster0"

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database connected");
  } catch (error) {
    console.log(error);
    console.error("database connection failed");
    process.exit(0);
  }
};

module.exports = connectdb;
