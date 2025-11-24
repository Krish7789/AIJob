const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.COMPANY_API_KEY;
if (!apiKey) {
  console.warn("COMPANY_API_KEY is not set in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function callCompanyGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent({
    contents: [{ parts: [{ text: prompt }] }],
  });

  let text = result.response.text() || "";
  text = text.replace(/```json|```/g, "").trim();

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.error("CompanyPrep JSON Parse Error:", text);
    throw new Error("Gemini returned invalid JSON for Company Prep Pack");
  }

  return parsed;
}

module.exports = { callCompanyGemini };
