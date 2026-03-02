import axios from "axios";

function calculateWeeksBetweenDates(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.ceil(diffDays / 7));
}

function extractJsonFromGemini(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Empty model output");
  }

  let content = text.trim();

  // Remove triple backticks safely (Gemini often returns ```json ... ```)
  if (content.startsWith("```")) {
    content = content.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "").trim();
  }

  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in Gemini response");

  return JSON.parse(match[0]);
}

export async function generateRoadmap(studentData) {
  if (!studentData) throw new Error("Missing studentData in request body");
  if (!studentData.startDate || !studentData.endDate) {
    throw new Error("Missing startDate or endDate in studentData");
  }

  const numberOfWeeks = calculateWeeksBetweenDates(
    studentData.startDate,
    studentData.endDate
  );

  const promptText = `
You are an AI that generates a detailed learning roadmap.
Output MUST be valid JSON with this structure:

{
  "weeks": [
    {
      "title": "Week 1: Data Structures Basics",
      "topics": ["Arrays", "Linked Lists", "Strings"],
      "concepts": ["Time/Space Complexity"],
      "problems": [{"name":"Two Sum","url":"https://leetcode.com/problems/two-sum/"}],
      "youtubeLinks": [{"title":"Arrays and Linked Lists","url":"https://youtube.com/example1"}],
      "books": ["Introduction to Algorithms"],
      "websites": ["LeetCode", "GeeksforGeeks"],
      "projects": ["Basic CRUD using arrays/lists"],
      "notes": "Focus on writing efficient code and understanding basic patterns."
    }
  ]
}

Generate a detailed ${numberOfWeeks}-week roadmap for this student:
${JSON.stringify(studentData)}

Output only the JSON object — no extra text.
Do not return empty weeks or empty arrays.
`;

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) throw new Error("GEMINI_API_KEY missing in env");

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      contents: [{ parts: [{ text: promptText }] }],
    },
    { headers: { "Content-Type": "application/json" } }
  );

  const candidates = response.data?.candidates;
  const parts = candidates?.[0]?.content?.parts;

  if (!parts?.length) {
    throw new Error("No parts in Gemini response");
  }

  const rawText = parts[0]?.text;
  return extractJsonFromGemini(rawText);
}
