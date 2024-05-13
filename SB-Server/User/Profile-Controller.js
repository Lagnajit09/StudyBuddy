const User = require("./userModel");
const bcrypt = require("bcryptjs");
const express = require("express");
const profileRouter = express.Router();
const middleware = require("../middleware");
const Event = require("../Event/event-model");
const { sendMail } = require("../Event/emailHandler");

//route to fetch user details when page loads
profileRouter.get("/:userId", middleware.authenticate, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json("Internl server error!");
  }
});

//route to update user details
profileRouter.patch("/update", middleware.authenticate, async (req, res) => {
  const {
    userId,
    username,
    email,
    phone,
    bio,
    profile_pic,
    password,
    currPassword,
  } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById({ _id: userId });

    if (currPassword) {
      const checkPassword = await bcrypt.compare(currPassword, user.password);
      if (!checkPassword) {
        return res.status(410).json({
          message: "Incorrect password!",
        });
      }
    }

    if (email !== user.email) {
      const checkEmailExists = await User.findOne({ email });
      if (checkEmailExists) {
        return res.status(408).json({
          message: "Email already exists!",
        });
      }
    }

    // Update user details
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (profile_pic) user.profile_pic = profile_pic;

    // Update password if newPassword is provided
    if (password) {
      console.log(password);
      const saltRound = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, saltRound);
      console.log(hashPassword);
      user.password = hashPassword;
      console.log(user.password);
    }

    // Save updated user details
    await user.save();
    console.log(user.password);

    // Generate new JWT token with updated user details
    const token = await user.generateToken();

    // Return the updated user details along with the new token
    res.status(200).json({
      user,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//To delete user account permanently
profileRouter.delete("/delete", middleware.authenticate, async (req, res) => {
  const { userId, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword);
    if (!checkPassword) {
      return res.status(404).json({
        message: "Incorrect password!",
      });
    }

    await User.deleteOne({ email });
    res.json({
      message: "Account deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      error,
    });
  }
});

profileRouter.post("/new-event", async (req, res) => {
  const { title, start, end, date, userId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    const event = await Event.create({
      title,
      date,
      start,
      end,
      userId,
    });

    const response = await sendMail(user.email, user.username, {
      title,
      date,
      start,
      end,
    });

    res.json({
      message: "Event created successfully!",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = profileRouter;
