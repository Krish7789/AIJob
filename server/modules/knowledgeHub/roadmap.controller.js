import { generateRoadmap } from "./roadmap.service.js";

export async function testRoadmap(req, res) {
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
}

export async function generateRoadmapHandler(req, res) {
  try {
    const { studentData } = req.body;

    const roadmap = await generateRoadmap(studentData);
    return res.json(roadmap);
  } catch (err) {
    console.error("Roadmap error:", err?.response?.data || err);

    const message =
      err?.response?.data?.error ||
      err?.message ||
      "Unknown server error";

    return res.status(err?.response?.status || 500).json({ error: message });
  }
}
