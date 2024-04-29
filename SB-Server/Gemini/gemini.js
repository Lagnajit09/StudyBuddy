const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const geminiRouter = express.Router();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

geminiRouter.get("/about/:name", async (req, res) => {
  const { name } = req.params;

  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // const prompt = `Generate an object in string containing two fields: {"about": String, "requirements": String}. The about should contain the description about ${name} of about 5000 words and the requirements in bullet points to start this course. IMPORTANT: DO NOT SEND THE RESPONSE IN BACKTICKS`;

    const prompt = `Generate an object containing two fields.
  The "about" field should be a sting containing description about ${name} of about 2000 characters or more and the "requirements" field should be a sting containing requirements to start the ${name} course in bullet points`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    console.log(text);

    const startIndex = text.indexOf("{");
    const endIndex = text.lastIndexOf("}");
    text = text.substring(startIndex, endIndex + 1);

    if (text.includes("```")) {
      text = text.replace(/```/g, "");
    }

    if (text.includes("```javascript")) {
      text = text.replace(/```javascript/g, "");
    }

    const controlCharactersRegex = /[\u0000-\u001f\u007f-\u009f]/g;
    text = text.replace(controlCharactersRegex, "");

    const json = JSON.parse(text);
    res.json(json);
  } catch (error) {
    console.log(error);
  }
});

module.exports = geminiRouter;
