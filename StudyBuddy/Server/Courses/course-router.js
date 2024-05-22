const Course = require("./course-model");
const express = require("express");
const courseRouter = express.Router();
const middleware = require("../middleware");

// add course to user
courseRouter.post("/add", middleware.authenticate, async (req, res) => {
  const { userId, course } = req.body;

  try {
    const courseExist = await Course.findOne({ userId, cap: course.cap });

    if (courseExist) {
      return res.status(410).json({
        message: "Course already exists!",
      });
    }

    const courseAdded = await Course.create({
      userId,
      ...course,
    });

    res.json({ courseAdded, id: courseAdded._id });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
});

courseRouter.delete("/remove", middleware.authenticate, async (req, res) => {
  const { userId, cap } = req.body;

  try {
    const course = await Course.findOne({ userId, cap });

    if (!course) {
      return res.status(410).json({
        message: "Course doesn't exist!",
      });
    }

    await Course.deleteOne({ userId, cap });
    res.json({
      message: "Deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
});

courseRouter.get("/allcourses/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const courses = await Course.find({ userId });
    res.json({ courses });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
});

module.exports = courseRouter;
