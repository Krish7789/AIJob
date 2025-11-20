const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const multer = require("multer");
const pdfParse = require("pdf-parse");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://getjobji.vercel.app",
      "http://localhost:5173",
      "http://localhost:8080",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:8080",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// File upload handler for resume
const upload = multer({ storage: multer.memoryStorage() });

const PORT = 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RESUME_API_KEY = process.env.RESUME_API_KEY;
const MODEL = "gemini-2.5-flash";

/* ======================================================
    FETCH LEETCODE STATS
====================================================== */
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

/* ======================================================
    GET: LEETCODE STATS
====================================================== */
app.get("/api/leetcode", async (req, res) => {
  const username = req.query.username;
  if (!username)
    return res.status(400).json({ error: "Username is required" });

  const stats = await fetchLeetCodeStats(username);

  if (!stats)
    return res.status(404).json({ error: "User not found on LeetCode" });

  res.json(stats);
});

/* ======================================================
    INTERNSHIP GENERATOR (GEMINI + LEETCODE)
====================================================== */
app.post("/api/internships", async (req, res) => {
  try {
    let { education, skills, interests, location, leetcodeUsername } = req.body;

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
User profile:
Education: ${education}
Skills: ${skills}
Interests: ${interests}
Location: ${location}

LeetCode Stats:
${leetcodeData ? JSON.stringify(leetcodeData, null, 2) : "None"}

Return a valid JSON array of exactly 6 internships.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" }, params: { key: GEMINI_API_KEY } }
    );

    let rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    rawText = rawText.replace(/```json|```/g, "").trim();

    let internships = [];
    try {
      internships = JSON.parse(rawText);
    } catch {
      internships = [{ id: 0, title: "Invalid JSON", description: rawText }];
    }

    res.json({ internships });
  } catch (err) {
    console.error("Internship API error:", err);
    res.status(500).json({ error: "Internship generation failed" });
  }
});

/* ======================================================
    RESUME ANALYZER (PDF → TEXT → GEMINI)
====================================================== */
app.post("/api/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No resume uploaded" });

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const prompt = `
Analyze this resume and return ONLY JSON with:
{
  "atsScore": number,
  "skills": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" }, params: { key: RESUME_API_KEY } }
    );

    let raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    raw = raw.replace(/```json|```/g, "").trim();

    let parsed = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.json({ error: "AI returned invalid JSON", raw });
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

/* ======================================================
    START SERVER
====================================================== */
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
