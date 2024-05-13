const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

async function sendMail(user, event) {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "web.studybuddy@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "StudyBuddy <web.studybuddy@gmail.com>",
      to: user,
      subject: "🗓️ Your Event Details 🗒️",
      text: "Here are the details of your scheduled event:",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333;">Your Event Details</h1>
            <hr style="border: none; border-top: 1px solid #dddddd;">
            <p style="color: #555555;">Dear StudyBuddy User,</p>
            <p style="color: #555555;">We're excited to remind you about your upcoming event:</p>
            <p style="color: #555555;"><strong>Title:</strong> Your Event Title</p>
            <p style="color: #555555;"><strong>Date:</strong> May 15, 2024</p>
            <p style="color: #555555;"><strong>Start Time:</strong> 10:00 AM</p>
            <p style="color: #555555;"><strong>End Time:</strong> 12:00 PM</p>
            <p style="color: #555555;">This event is scheduled in your StudyBuddy account.</p>
            <p style="color: #555555;">We hope you have a productive and enjoyable time!</p>
            <p style="color: #555555;">Best regards,<br>StudyBuddy Team</p>
          </div>
        </div>
      `,
    };

    const result = await transport.sendMail(mailOptions);

    console.log("Email sent...", result);

    return result;
  } catch (error) {
    // Check if the error is due to non-existent email
    if (
      error ||
      error.responseCode === 550 ||
      error.response.includes("Mailbox not found")
    ) {
      console.log("Email does not exist");
    } else {
      console.log(error); // throw other errors
    }
  }
}

// sendMail()
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));

module.exports = { sendMail };
