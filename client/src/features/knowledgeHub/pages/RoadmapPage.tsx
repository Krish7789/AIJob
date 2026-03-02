import React, { useState } from "react";
import RoadmapForm from "../components/RoadmapForm";
import RoadmapResult from "../components/RoadmapResult";
import type { RoadmapRequest } from "../api/roadmap.api";

export default function RoadmapPage() {
  const [studentData, setStudentData] = useState<RoadmapRequest | null>(null);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
         Get Your Personalized Roadmap 🚀
      </h1>
       

        <RoadmapForm onSubmit={(payload) => setStudentData(payload)} />

        {/* Result Section */}
        <div className="mt-10">
          <RoadmapResult studentData={studentData} />
        </div>
      </div>
    </div>
  );
}
