//  AI POWERED CAREER GUIDANCE BACKEND

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const multer = require("multer");
const pdfParse = require("pdf-parse");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RESUME_API_KEY = process.env.RESUME_API_KEY;
const MODEL = "gemini-2.5-flash";

// CORS (Production + Localhost)

app.use(
  cors({
    origin: [
      "https://getjobji.vercel.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());


// File Upload (Memory Storage)

const upload = multer({ storage: multer.memoryStorage() });

//FETCH LEETCODE STATS

async function fetchLeetCodeStats(username) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile { ranking reputation }
        submitStatsGlobal {
          acSubmissionNum { difficulty count }
        }
      }
    }`;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { username } },
      { headers: { "Content-Type": "application/json" } }
    );

    const user = response.data?.data?.matchedUser;
    if (!user) return null;

    return {
      username: user.username,
      ranking: user.profile?.ranking ?? "N/A",
      reputation: user.profile?.reputation ?? "N/A",
      problemsSolved:
        user.submitStatsGlobal?.acSubmissionNum?.map((x) => ({
          difficulty: x.difficulty,
          count: x.count,
        })) || [],
    };
  } catch (err) {
    console.error("⚠️ LeetCode fetch error:", err.message);
    return null;
  }
}


//  GET: LEETCODE STATS

app.get("/api/leetcode", async (req, res) => {
  const username = req.query.username;
  if (!username)
    return res.status(400).json({ error: "Username is required" });

  const stats = await fetchLeetCodeStats(username);

  if (!stats)
    return res.status(404).json({ error: "User not found on LeetCode" });

  res.json(stats);
});


//  INTERNSHIP GENERATOR (STRICT JSON)

app.post("/api/internships", async (req, res) => {
  try {
    let { education, skills, interests, location, leetcodeUsername } =
      req.body;

    let leetcodeData = null;

    if (leetcodeUsername) {
      leetcodeData = await fetchLeetCodeStats(leetcodeUsername);

      if (leetcodeData) {
        const totalSolved = leetcodeData.problemsSolved.reduce(
          (sum, p) => sum + p.count,
          0
        );

        if (totalSolved > 150) {
          skills += ", Data Structures, Algorithms, Problem Solving";
        } else if (totalSolved > 50) {
          skills += ", Logic Building, Coding Fundamentals";
        }
      }
    }

    const prompt = `
You are an AI that generates internship recommendations.

Generate EXACTLY 6 internships based on this profile:
Education: ${education}
Skills: ${skills}
Interests: ${interests}
Location Preference: ${location}

LeetCode Data:
${leetcodeData ? JSON.stringify(leetcodeData, null, 2) : "None"}

IMPORTANT:
Return ONLY a VALID JSON array.
Each internship MUST follow this structure:

[
  {
    "title": "",
    "company": "",
    "location": "",
    "duration": "",
    "description": "",
    "requiredSkills": ["", "", ""]
  }
]

NO markdown, NO explanation, ONLY JSON.
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: GEMINI_API_KEY },
      }
    );

    let rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    rawText = rawText.replace(/```json|```/g, "").trim();

    let internships;
    try {
      internships = JSON.parse(rawText);
    } catch {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    res.json({ internships });
  } catch (err) {
    console.error("Internship API error:", err);
    res.status(500).json({ error: "Internship generation failed" });
  }
});


//    RESUME ANALYZER ( PDF → TEXT → STRICT JSON )
app.post("/api/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No resume uploaded" });

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const prompt = `
Analyze this resume and return ONLY VALID JSON with this structure:

{
  "atsScore": number,
  "skills": [],
  "suggestions": []
}

Requirements:
- STRICT JSON ONLY
- NO markdown formatting
- NO explanation text
- NO backticks

Resume:
${resumeText}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: RESUME_API_KEY },
      }
    );

    let raw =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Remove ```json or ``` if included
    raw = raw.replace(/```json|```/g, "").trim();

    let parsed = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.json({
        error: "AI returned invalid JSON",
        raw,
      });
    }

    // Safe normalization
    parsed.atsScore = Number(parsed.atsScore) || 0;

    parsed.skills = Array.isArray(parsed.skills)
      ? parsed.skills
      : String(parsed.skills || "")
          .split(/[,;\n]+/)
          .map((x) => x.trim())
          .filter(Boolean);

    parsed.suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions
      : String(parsed.suggestions || "")
          .split(/[\n•-]+/)
          .map((x) => x.trim())
          .filter(Boolean);

    res.json(parsed);
  } catch (err) {
    console.error("Resume Analysis ERROR:", err);
    res.status(500).json({ error: "Resume analysis failed" });
  }
});
//    START SERVER

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
