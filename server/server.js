import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

/* ======================================================
   🔹 UTILITY: Fetch LeetCode Stats via GraphQL
   ====================================================== */
async function fetchLeetCodeStats(username) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
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
      problemsSolved: (user.submitStatsGlobal?.acSubmissionNum || []).map((x) => ({
        difficulty: x.difficulty,
        count: x.count,
      })),
    };
  } catch (err) {
    console.error("⚠️ LeetCode data fetch failed:", err.message);
    return null;
  }
}

/* ======================================================
   🔹 GET: Fetch LeetCode Stats (for 'Fetch Stats' button)
   ====================================================== */
app.get("/api/leetcode", async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  console.log(`📡 Fetching LeetCode data for ${username}...`);

  const stats = await fetchLeetCodeStats(username);
  if (!stats) {
    return res.status(404).json({ error: "LeetCode user not found or failed to fetch." });
  }

  console.log("✅ LeetCode stats fetched successfully:", stats);
  res.json(stats);
});

/* ======================================================
   🔹 POST: Internship Recommendations (AI + LeetCode)
   ====================================================== */
app.post("/api/internships", async (req, res) => {
  try {
    console.log("✅ Request received at /api/internships");
    console.log("📝 Request body:", JSON.stringify(req.body, null, 2));

    let { education, skills, interests, location, leetcodeUsername } = req.body;

    // 🟩 Optional: Fetch verified LeetCode stats if provided
    let leetcodeData = null;
    if (leetcodeUsername) {
      console.log(`📡 Fetching LeetCode data for ${leetcodeUsername}...`);
      leetcodeData = await fetchLeetCodeStats(leetcodeUsername);
      if (leetcodeData) {
        console.log("✅ LeetCode data fetched:", leetcodeData);
      } else {
        console.warn("⚠️ LeetCode username not found or failed to fetch.");
      }
    }

    // 🧠 Automatically enrich skills based on LeetCode performance
if (leetcodeData && leetcodeData.problemsSolved) {
  const totalSolved = leetcodeData.problemsSolved.reduce(
    (sum, p) => sum + p.count,
    0
  );

  console.log(`📊 Total LeetCode problems solved: ${totalSolved}`);

  if (totalSolved > 150) {
    console.log("💡 Adding advanced DSA-related skills...");
    // Add more relevant skills to the user's skillset before AI prompt
    skills += ", Data Structures, Algorithms, Problem Solving";
  } else if (totalSolved > 50) {
    console.log("💡 Adding intermediate coding-related skills...");
    skills += ", Logic Building, Coding Fundamentals";
  }
}


    /* ======================================================
       🧠 Construct Smart AI Prompt
       ====================================================== */
    const leetcodeSection = leetcodeData
      ? `
LeetCode Verified Data:
Username: ${leetcodeData.username}
Ranking: ${leetcodeData.ranking}
Reputation: ${leetcodeData.reputation}
Problems Solved:
${leetcodeData.problemsSolved.map((x) => `  - ${x.difficulty}: ${x.count}`).join("\n")}
`
      : "LeetCode data: Not provided";

    const prompt = `
You are an AI career advisor.
Analyze this user's verified profile and recommend internships that best fit their coding and professional background.

Profile:
Education: ${education}
Skills: ${skills}
Interests: ${interests}
Preferred Location: ${location}
${leetcodeSection}

Requirements:
1. Recommend the top 6 internship opportunities as a JSON array.
2. Each internship must include:
   - id
   - title
   - company
   - location
   - type (On-site / Remote / Hybrid)
   - duration (e.g. 3 months)
   - description (2–3 lines)
   - requiredSkills
   - matchScore (0–100)
   - link (valid company or career site URL)
3. Respond strictly in valid JSON format — no extra text or explanation.
`;

    /* ======================================================
       🔹 Call Gemini API
       ====================================================== */
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: GEMINI_API_KEY },
      }
    );

    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("🧾 Gemini raw output:", text);

    // 🧹 Clean and safely parse JSON
    text = text.replace(/```json|```/g, "").trim();

    let internships = [];
    try {
      internships = JSON.parse(text);
    } catch (err) {
      console.warn("⚠️ Gemini output was not pure JSON — using fallback.");
      internships = [
        {
          id: 0,
          title: "Gemini Output (Unstructured)",
          company: "N/A",
          location: "N/A",
          type: "N/A",
          duration: "N/A",
          description: text,
          requiredSkills: [],
          matchScore: 0,
          link: "https://internshala.com/internships",
        },
      ];
    }

    /* ======================================================
       🔹 Normalize internship data
       ====================================================== */
    internships = internships.slice(0, 6).map((item, index) => {
      const normalized = Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key.toLowerCase().replace(/\s+/g, ""),
          value,
        ])
      );

      return {
        id: normalized.id || index + 1,
        title: normalized.title || "Untitled Internship",
        company: normalized.company || "Unknown Company",
        location: normalized.location || "Not specified",
        type: normalized.type || "N/A",
        duration: normalized.duration || "N/A",
        description: normalized.description || "No description available.",
        requiredSkills:
          normalized.requiredskills ||
          normalized.skills ||
          normalized.skillsrequired ||
          normalized.required_skills ||
          [],
        matchScore: normalized.matchscore || 0,
        link: normalized.link || "https://internshala.com/internships",
      };
    });

    console.log("✅ Final normalized internships:", internships);
    res.json({ internships });
  } catch (error) {
    console.error("❌ Error fetching Gemini data:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch internships" });
  }
});

/* ======================================================
   🚀 Start the server
   ====================================================== */
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
