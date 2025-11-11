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

// ✅ POST endpoint for internship recommendations
app.post("/api/internships", async (req, res) => {
  try {
    console.log("✅ Request received at /api/internships");
    console.log("📝 Request body:", JSON.stringify(req.body, null, 2));

    // 🧠 Construct dynamic AI prompt
    const prompt = `
You are an AI career advisor. 
Given the following user profile:
Education: ${req.body.education}
Skills: ${req.body.skills}
Interests: ${req.body.interests}
Preferred Location: ${req.body.location}

Recommend the top 6 internship opportunities as a JSON array.
Each internship must include:
id, title, company, location, type, duration, description, requiredSkills, matchScore (0–100), and a valid "link" (a realistic company/career site URL).

Respond **strictly** in JSON format with no extra text or commentary.
Example:
[
  {
    "id": 1,
    "title": "Frontend Developer Intern",
    "company": "TechCorp",
    "location": "Bangalore, India",
    "type": "Hybrid",
    "duration": "3 months",
    "description": "Work with React and TailwindCSS to build UI components.",
    "requiredSkills": ["React", "JavaScript", "CSS"],
    "matchScore": 92,
    "link": "https://techcorp.com/careers/frontend-intern"
  }
]
`;

    // 🔹 Call Gemini API
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

    // ✅ Normalize all internship objects with flexible key handling
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
    console.error(
      "❌ Error fetching Gemini data:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch internships" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
