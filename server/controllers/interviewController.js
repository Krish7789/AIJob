// server/controllers/interviewController.js
const { callGeminiJSON } = require("../services/geminiService");

exports.handleInterview = async (req, res) => {
  try {
    const { answer, history = [], role = "Software Engineer" } = req.body;

    // how many Q/A pairs already completed
    const questionCount = history.length + 1;

    // if 5 questions already done
    if (questionCount > 5) {
      return res.json({
        done: true,
        final_message: "Interview Completed.",
        summary: "You have successfully completed the 5-question interview.",
        next_question: null,
        score: null,
        feedback_good: "",
        feedback_bad: "",
      });
    }

    const historyText = history
      .map(
        (h, idx) =>
          `Q${idx + 1}: ${h.question}\nA${idx + 1}: ${h.answer}`
      )
      .join("\n\n");

    const prompt = `
You are an interview evaluator for the role: ${role}.

Conversation so far:
${historyText || "No previous questions yet."}

Candidate's latest answer:
"${answer}"

Your tasks:
1. Evaluate ONLY the latest answer (0–10).
2. Write 1-2 lines of positive points.
3. Write 1-2 lines of improvement points.
4. Generate the next interview question (ONLY if questionCount < 5).
5. If questionCount = 5, return: "Interview Completed" and NO next question.

Return ONLY JSON:
{
  "score": number,
  "feedback_good": "string",
  "feedback_bad": "string",
  "next_question": "string or null"
}
`;

    const aiJson = await callGeminiJSON(prompt);

    let nextQ = aiJson.next_question;

    // if this is question 5 → no next question
    if (questionCount === 5) {
      nextQ = null;
    }

    return res.json({
      done: questionCount === 5,
      score: Number(aiJson.score) || 0,
      feedback_good: aiJson.feedback_good || "",
      feedback_bad: aiJson.feedback_bad || "",
      next_question: nextQ,
    });
  } catch (err) {
    console.error("Interview controller error:", err);
    res.status(500).json({
      error: "Interview analysis failed",
    });
  }
};
