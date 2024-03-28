//THIS FILE CONATINS THE VALIDATOR MIDDLEWARE FUNCTION WHICH WILL VALIDATE USER DURING SIGNUP

const validate = (signupSchema) => async (req, res, next) => {
  try {
    const parseBody = await signupSchema.parseAsync(req.body)
    req.body = parseBody;
    next();
  } catch (error) {
    //const msg=error.issues[0].message
    //console.log(error)
    res.status(400).json({ msg: error.issues[0].message });
  }
};

module.exports = validate;
