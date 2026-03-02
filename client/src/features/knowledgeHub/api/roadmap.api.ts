export type RoadmapRequest = {
  studentName: string;
  knownTech: string[];
  endGoal: string[];
  year: string;
  learningSpeed: string;
  difficulty: string;
  startDate: string;
  endDate: string;
};

export type RoadmapWeek = {
  title: string;
  topics?: string[];
  concepts?: string[];
  problems?: { name: string; url: string }[];
  youtubeLinks?: { title: string; url: string }[];
  books?: string[];
  websites?: string[];
  projects?: string[];
  notes?: string;
};

export type RoadmapResponse = {
  weeks: RoadmapWeek[];
};

export async function getRoadmap(studentData: RoadmapRequest): Promise<RoadmapResponse> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-roadmap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentData }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} ${errorText}`);
  }

  const data = (await res.json()) as RoadmapResponse;

  if (!data || !Array.isArray(data.weeks)) {
    throw new Error("Invalid roadmap format received");
  }

  return data;
}
