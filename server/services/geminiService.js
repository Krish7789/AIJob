// server/services/geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");



const apiKey = process.env.INTERVIEW_API_KEY;
if (!apiKey) {
  console.warn("INTERVIEW_API_KEY is not set in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function callGeminiJSON(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent({
    contents: [{ parts: [{ text: prompt }] }],
  });

  let text = result.response.text() || "";
  text = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini JSON:", text);
    throw new Error("Gemini returned invalid JSON");
  }

  return parsed;
}

module.exports = { callGeminiJSON };
