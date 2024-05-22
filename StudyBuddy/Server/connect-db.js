//THIS FILE IS FOR CONNECTION OF NODE TO MONGO DB

const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.CONN_STRING;

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
    console.error("database connection failed");
    process.exit(0);
  }
};

module.exports = connectdb;
