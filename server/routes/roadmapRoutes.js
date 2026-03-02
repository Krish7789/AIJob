const express = require("express");
const axios = require("axios");

const router = express.Router();

/**
 * GET /api/test-roadmap
 */
router.get("/test-roadmap", (req, res) => {
  res.json({
    weeks: [
      {
        title: "Test Week 1",
        topics: ["Arrays"],
        concepts: ["Time complexity"],
        problems: [{ name: "Two Sum", url: "https://leetcode.com/problems/two-sum/" }],
        youtubeLinks: [{ title: "Arrays", url: "https://youtube.com" }],
        books: ["CLRS"],
        websites: ["LeetCode"],
        projects: ["Mini project"],
        notes: "Test roadmap",
      },
    ],
  });
});

function calculateWeeksBetweenDates(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.ceil(diffDays / 7));
}

function extractJsonFromGemini(text) {
  if (!text || typeof text !== "string") throw new Error("Empty model output");

  let content = text.trim();

  // Gemini often returns ```json ... ```
  if (content.startsWith("```")) {
    content = content.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "").trim();
  }

  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in Gemini response");

  return JSON.parse(match[0]);
}

/**
 * POST /api/generate-roadmap
 * Body: { studentData: {...} }
 */
router.post("/generate-roadmap", async (req, res) => {
  try {
    const { studentData } = req.body;

    if (!studentData) {
      return res.status(400).json({ error: "Missing studentData in request body" });
    }
    if (!studentData.startDate || !studentData.endDate) {
      return res.status(400).json({ error: "Missing startDate or endDate in studentData" });
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

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY missing in backend env" });
    }

    // Use your big backend model setting if you want:
    // const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    // but roadmap prompt was tuned for flash, keep it stable:
    const MODEL = "gemini-2.5-flash";

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { contents: [{ parts: [{ text: promptText }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: GEMINI_API_KEY },
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const roadmap = extractJsonFromGemini(rawText);
    return res.json(roadmap);
  } catch (err) {
    console.error("Roadmap API ERROR:", err?.response?.data || err);

    const message =
      err?.response?.data?.error?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Unknown server error";

    return res.status(err?.response?.status || 500).json({ error: message });
  }
});

module.exports = router;
