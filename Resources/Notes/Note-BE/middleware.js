const jwt = require("jsonwebtoken");
const User  = require("./User/userModel");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; //get token
        jwt.verify(token, secretKey, async (err,decoded) => {   //verify
            if (err) {
                console.log(err);
                res.status(403).json({ msg: "You are not allowed to access this" });
            }
            else {
                const userData = await User.findById(decoded.userId).select(    //contain userdata except password
                    { password: 0 }
                );  
                req.user = userData;    //a header devined by me to store userData
                if (req.user && req.body.userId != req.user._id) {  //if the header data doesnt match
                    return res.status(403).json({ msg: "Unauthorized access" });
                }
                else {
                    next();
                }
            }
        });
    }
    else {
        res.status(401).json({ msg: "Auth header not found" })
    };  
};

