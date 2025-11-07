const MODEL = "models/gemini-2.5-flash"; // Stable version under your key

export async function fetchInternshipRecommendations(profile: {
  education: string;
  skills: string;
  interests: string;
  location: string;
}) {
  try {
    console.log("📤 Sending profile data to backend:", profile);

    const response = await fetch("http://localhost:5000/api/internships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Raw backend response:", data);

    const internshipsArray = Array.isArray(data)
      ? data
      : data.internships || [];

    const formattedInternships = internshipsArray.map((item: any, index: number) => ({
      id: item.id || String(index + 1),
      title: item.title || "Untitled Internship",
      company: item.company || "Unknown Company",
      location: item.location || profile.location || "Remote",
      type: item.type || "Full-time",
      duration: item.duration || "3 months",
      description: item.description || "No description available.",

      // ✅ FIXED: Pass requiredSkills properly
      requiredSkills:
        Array.isArray(item.requiredSkills)
          ? item.requiredSkills
          : typeof item.requiredSkills === "string"
          ? item.requiredSkills.split(",").map((s) => s.trim())
          : item.skills || [],

      matchScore: item.matchScore || Math.floor(Math.random() * 40) + 60,
      link: item.link || "https://internshala.com/internships",
    }));

    console.log("🎯 Formatted internships for frontend:", formattedInternships);
    return formattedInternships;
  } catch (error) {
    console.error("❌ Error fetching internships:", error);
    return [];
  }
}
