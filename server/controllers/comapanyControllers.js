const { callGeminiJSON, callCompanyGemini } = require("../services/companyGeminiService");

exports.handleCompanyPack = async (req, res) => {
  try {
    const { company, role, skills, education, experience } = req.body;

    const prompt = `
You are a senior hiring manager + career coach.

Generate a detailed preparation pack for the target company and role.

Company: ${company}
Role: ${role}
Skills: ${skills}
Education: ${education}
Experience: ${experience}

Return STRICT JSON in this format:

{
  "company": "string",
  "role": "string",
  "job_patterns": ["string"],
  "coding_focus": {
    "topics": ["string"],
    "sample_questions": ["string"]
  },
  "hr_rounds": {
    "common_questions": ["string"],
    "answer_tips": ["string"]
  },
  "resume_tips": {
    "template_outline": ["string"],
    "do": ["string"],
    "dont": ["string"]
  },
  "selection_probability": "string",
  "secrets": ["string"]
}

NO markdown.
NO extra text.
JUST JSON.
`;

    const data = await callCompanyGemini(prompt);

    res.json(data);

  } catch (err) {
    console.error("Company Prep Error:", err);
    res.status(500).json({ error: "Failed to generate company prep pack" });
  }
};
