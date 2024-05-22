//THIS FILE CONTAINS THE VALIDATION REQUIRED FOR SIGNUP

const { z } = require("zod");

//Regex fro password validation
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

//creating an object schema
const signupSchema = z.object({
  firstname: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(3, { message: "Name must be of least 3 characters" })
    .max(30, { message: "Name must not be greater than 30 characters" }),

  lastname: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(3, { message: "Name must be of least 3 characters" })
    .max(30, { message: "Name must not be greater than 30 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ required_error: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be of least 6 characters" }),

  profile_pic: z.string(),
});

module.exports = signupSchema;
