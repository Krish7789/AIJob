import React, { useEffect, useState } from "react";
import { getRoadmap } from "../api/roadmap.api";
import RoadmapTable from "./RoadmapTable";
import type { RoadmapRequest, RoadmapResponse } from "../api/roadmap.api";

type Props = {
  studentData: RoadmapRequest | null;
};

export default function RoadmapResult({ studentData }: Props) {
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!studentData) return;

    setLoading(true);
    setError("");
    setRoadmap(null);

    getRoadmap(studentData)
      .then((data) => setRoadmap(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [studentData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-8 space-x-3">
        <svg
          className="animate-spin h-8 w-8 text-pink-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-pink-400 text-lg font-semibold select-none">
          Generating your personalized roadmap...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-red-400 whitespace-pre-wrap">
        Error: {error}
      </div>
    );
  }

  if (!roadmap) return null;

  return <RoadmapTable roadmap={roadmap} />;
}
