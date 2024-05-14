const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  start: {
    type: String,
    required: true,
    default: Date.now,
  },
  end: {
    type: String,
    required: true,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
