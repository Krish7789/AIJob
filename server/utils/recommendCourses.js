export function recommendCourses(allCourses, { strengths = [], weaknesses = [], goal = "" }) {
  const s = new Set(strengths.map((x) => String(x).toLowerCase().trim()));
  const w = new Set(weaknesses.map((x) => String(x).toLowerCase().trim()));
  const g = String(goal || "").toLowerCase().trim();

  return allCourses
    .map((c) => {
      const tags = (c.tags || []).map((t) => String(t).toLowerCase());
      let score = 0;

      // Weakness improvement is most important
      for (const t of tags) if (w.has(t)) score += 6;

      // Strength alignment
      for (const t of tags) if (s.has(t)) score += 3;

      // Goal match
      if (g) {
        if (String(c.category || "").toLowerCase().includes(g)) score += 4;
        if (tags.includes(g)) score += 4;
      }

      score += Number(c.rating || 0);

      return { ...c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}
