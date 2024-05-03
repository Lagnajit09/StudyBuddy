const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  c_name: {
    type: String,
    required: true,
  },
  cap: {
    type: String,
    required: true,
  },
  c_dest: {
    type: String,
    required: true,
  },
  c_link: {
    type: String,
    required: true,
  },
  cap_color: {
    type: String,
    required: true,
  },
  cap_bcolor: {
    type: String,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
