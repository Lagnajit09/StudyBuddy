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

  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(4, { message: "Name must be of least 4 characters" })
    .max(50, { message: "Name must not be greater than 50 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ required_error: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be of least 8 characters" })
    .regex(
      passwordRegex,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    ),
  /*
  confirmPassword: z.string().refine(
    (value, ctx) => {
      if (value !== ctx.parent.password) {
        return z.failure("Passwords must match", ctx);
      }
      return z.success(value);
    },
    {
      message: "Passwords must match",
    }
  ),*/
});

module.exports = signupSchema






