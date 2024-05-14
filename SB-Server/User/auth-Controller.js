//THIS FILE CONTAINS 2 FUNCTION TO CONTROL THE SIGNUPO AND LOGIN

const User = require("./userModel");
const bcrypt = require("bcryptjs");

//SIGNUP FUNCTION
exports.signup = async (req, res) => {
  const topics = [];

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

    console.log(userExist);

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
