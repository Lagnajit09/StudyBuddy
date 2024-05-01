//THIS FILE CONTAINS 2 FUNCTION TO CONTROL THE SIGNUPO AND LOGIN

const User = require("./userModel");
const bcrypt = require("bcryptjs");

//SIGNUP FUNCTION
exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, profile_pic } = req.body; //get data from frontend

    const mailExist = await User.findOne({ email: email }); //Find id the email already exisit
    if (mailExist) {
      //If email exists
      return res.status(400).json("Email already exists!");
    }

    // Generate Username function

    //else create a new user in the DB
    const userCreated = await User.create({
      firstname,
      lastname,
      email,
      password,
      username: email,
      profile_pic,
    });

    //oAuth function to send email

    //Send mag, JWT token to user
    res.status(200).json({
      user: userCreated, //can show a message too
      token: await userCreated.generateToken(), //must send
      userId: userCreated._id, //optional
    });
  } catch (error) {
    //Handle interal error
    console.log(error);
    res.status(500).json("Internl server error!");
  }
};

//LOGIN FUNTION
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; //get data from the login page
    const userExist = await User.findOne({ email }); //check if user already esist in DB

    if (!userExist) {
      //if doesnt exist
      return res.status(404).json("Email doesn't exist!"); //email id not found
    }

    //else compare password
    const user = await bcrypt.compare(password, userExist.password); //true if matched
    if (user) {
      //If matched
      res.status(200).json({
        user: userExist,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      //If not matched
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    //Handle internal error
    console.log(error);
    res.status(500).json("Internl server error!");
  }
};

exports.fetchUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json("Internl server error!");
  }
};

// Update user details route
exports.updateUser = async (req, res) => {
  const {
    _id,
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
    const user = await User.findById(_id);

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
      const saltRound = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, saltRound);
      user.password = hashPassword;
    }

    // Save updated user details
    await user.save();

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
};
