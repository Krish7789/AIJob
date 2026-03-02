const express = require("express");
const router = express.Router();

const { courses } = require("../data/courses.data"); 
const { recommendCourses } = require("../utils/recommendCourses"); 


router.get("/courses", (req, res) => {
  try {
    const { platform, category, minRating, maxPrice, q } = req.query;

    let filtered = [...courses];

    if (platform) filtered = filtered.filter((c) => c.platform === platform);
    if (category) filtered = filtered.filter((c) => c.category === category);

    if (minRating) filtered = filtered.filter((c) => (c.rating || 0) >= Number(minRating));
    if (maxPrice) filtered = filtered.filter((c) => (c.price || 0) <= Number(maxPrice));

    if (q) {
      const query = String(q).toLowerCase().trim();
      filtered = filtered.filter((c) => {
        const title = String(c.title || "").toLowerCase();
        const subtitle = String(c.subtitle || "").toLowerCase();
        const tags = (c.tags || []).map((t) => String(t).toLowerCase());
        return (
          title.includes(query) ||
          subtitle.includes(query) ||
          tags.some((t) => t.includes(query))
        );
      });
    }

    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return res.json({ courses: filtered });
  } catch (e) {
    console.error("❌ Courses fetch error:", e);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
});


router.post("/courses/recommend", (req, res) => {
  try {
    const { strengths = [], weaknesses = [], goal = "" } = req.body || {};

    const recommendations = recommendCourses(courses, {
      strengths,
      weaknesses,
      goal,
    });

    return res.json({ recommendations });
  } catch (e) {
    console.error("❌ Courses recommend error:", e);
    return res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

module.exports = router;
