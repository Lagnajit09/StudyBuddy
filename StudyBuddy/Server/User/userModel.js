//THIS FILE CONTAINS THE USER SCHEMA AND THE FUNCTION FOR THE JWT TOKEN TOO

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Topic = require(".././Topic/topicModel");

const Schema = mongoose.Schema;

// const federatedCredentialsSchema = new mongoose.Schema({
//   provider: { type: String, required: true, default: null },
//   subject: { type: String, required: true, unique: true, default: null },
// });

//User Model Schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: "String",
    required: [true, "A user must have a first name"],
  },
  lastname: {
    type: "String",
    required: [true, "A user must have a last name"],
  },
  username: {
    type: "String",
    unique: true,
  },
  email: {
    type: "String",
    required: [true, "Please enter your emailID"],
    unique: true,
  },
  password: {
    type: "String",
    required: [true, "Please enter your password"],
  },
  profile_pic: {
    type: "String",
    default: "#A197FC",
  },
  bio: {
    type: "String",
    default: "Hey there!",
  },
  phone: {
    type: "String",
  },
  folders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note", // Assuming you have a Note model
    },
  ],
  communities: {
    type: Array,
  },
  recent_chats: {
    type: Array,
  },
  wishlist: {
    type: Array,
  },
  events: {
    type: Array,
  },
  recommendations: {
    type: Array,
  },
  topics: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    validate: {
      validator: function (val) {
        return val.length <= 12; //one can create max 6 topics as 6 are already provided
      },
      message: "Topics array cannot exceed 12 elements",
    },
  },
});

//Securing User Password by Bcrypt
userSchema.pre("save", async function (next) {
  //On creating user

  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    if (this.isNew) {
      const saltRound = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, saltRound);
      user.password = hashPassword;
      //only runs for the first time when user is created
      const defaultTopics = [
        "Biology",
        "Physics",
        "Chemistry",
        "IT and Software",
        "Mathematics",
        "Cloud Computing",
      ];
      const userId = this._id;

      // Create default topics for the new user
      await Promise.all(
        defaultTopics.map(async (topicName) => {
          //Make 6 default topics
          const topic = new Topic({
            name: topicName,
            created_by: userId,
          });
          await topic.save();
          user.topics.push(topic._id);
        })
      );
    }
  } catch (error) {
    console.log(error);
    //next(error)
  }
});

//Generat JWT(json web token)
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//Creating new User and exporting
const User = mongoose.model("User", userSchema);
module.exports = User;
