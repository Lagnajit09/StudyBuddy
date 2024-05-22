const express = require("express");
const oAuthRouter = express.Router();
const passport = require("passport");
const session = require("express-session");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./userModel");

require("dotenv").config();

const app = express();
app.use(express.json());

oAuthRouter.use(
  session({
    secret: process.env.SESSION_KEY, //used to sign the session ID cookie, providing additional security.
    resave: false, //prevents the session from being saved to the store on every request, only saving when the session data has been modified.
    saveUninitialized: true, //If set to true, it forces an uninitialized session to be saved to the store.
    cookie: { httpOnly: true, sameSite: "Lax" },
  })
);

oAuthRouter.use(passport.initialize());
oAuthRouter.use(passport.session());

passport.serializeUser((user, done) => {
  // Serialize user data, typically by saving the user ID
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Retrieve user data based on the user ID
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, issuer, refresh, profile, cb) {
      console.log(profile.id);

      try {
        const existingUser = await User.findOne({
          name: profile.displayName,
          //   "federated_credentials.provider": issuer,
          "federated_credentials.subject": profile.id,
        });

        if (existingUser) {
          // If the user already exists, return the existing user
          return cb(null, existingUser);
        }

        // The user does not exist, create a new user record
        const newUser = new User({
          firstname: profile.given_name,
          lastname: profile.family_name
            ? profile.family_name
            : profile.given_name,
          username: profile.email,
          password: null,
          email: profile.email,
          profile_pic:
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : null,
          federated_credentials: [
            {
              provider: issuer,
              subject: profile.id,
            },
          ],
        });

        const savedUser = await newUser.save();

        return cb(null, savedUser);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

oAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Route for handling the Google callback after authentication
oAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  async (req, res) => {
    try {
      // Extract the authorization code from the URL
      const { code } = req.query;

      console.log(code);

      // Exchange the authorization code for an access token and user information
      const { tokens, profile } = await getTokensAndProfile(code);

      // Now you have the user's profile information, you can handle it as needed
      console.log("User profile:", profile);

      // Redirect the user back to the React app with the user information
      res.redirect(
        `http://localhost:5173/?user=${encodeURIComponent(
          JSON.stringify(profile)
        )}`
      );
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.status(500).send("OAuth callback error");
    }
  }
);

// Function to exchange authorization code for access token and user information
async function getTokensAndProfile(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const { data } = await oauth2.userinfo.get({ auth: oauth2Client });

  return { tokens, profile: data };
}

oAuthRouter.get("/login", async (req, res) => {
  // Check if the user is already authenticated
  if (!req.isAuthenticated()) {
    // If not authenticated, initiate Google authentication
    await passport.authenticate("google", { scope: ["email", "profile"] })(
      req,
      res
    );
  }
  res.json({ user: req.user });
});

module.exports = oAuthRouter;
