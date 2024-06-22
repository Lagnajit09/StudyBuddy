const jwt = require('jsonwebtoken');
const User = require('../User/userModel');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

module.exports = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(403).json({ msg: 'You are not allowed to access this' });
      } else {
        try {
          const userData = await User.findById(decoded.userId).select({ password: 0 });
          if (
            userData &&
            (req.body?.userId ? req.body.userId != userData._id : req.params.userId != userData._id)
          ) {
            res.status(403).json({ msg: 'Unauthorized access' });
          } else {
            res.status(200).json({ user: userData });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'Internal server error' });
        }
      }
    });
  } else {
    res.status(401).json({ msg: 'Auth header not found' });
  }
};
