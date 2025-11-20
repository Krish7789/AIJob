import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AtsGauge from "@/components/ATS/AtsGauge"; // ⭐ Import gauge

// Normalize arrays from AI response
const normalizeArray = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);

  if (typeof value === "string")
    return value
      .split(/[\n,;•-]+/)
      .map((v) => v.trim())
      .filter(Boolean);

  return [];
};

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  /* 
        Upload Handler
  */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    if (uploaded.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setUploading(true);
    setTimeout(() => {
      setFile(uploaded);
      setUploading(false);
      toast.success("Resume uploaded successfully!");
    }, 1000);
  };

  /* 
       Analyze Resume Handler
*/
  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/analyze-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.error) {
        toast.error("Resume analysis failed.");
      } else {
        setAnalysis(data);
        toast.success("Resume analyzed successfully!");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <Card className="w-full max-w-3xl p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-xl">

        {/* Page Heading */}
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Resume Analyzer
        </h2>

        {/* Upload Section */}
        <div className="mb-8">
          <label className="block mb-2 text-gray-200 font-semibold">
            Upload Resume (PDF only)
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="w-full bg-gray-900 text-white rounded-lg p-3 border border-gray-700"
          />

          {/* Upload Spinner */}
          {uploading && (
            <p className="text-cyan-400 mt-2 animate-pulse text-sm">
              Uploading...
            </p>
          )}
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-md hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </Button>

        {/*
              RESULTS AREA (Appears after analysis)
     */}
        {analysis && (
          <div className="mt-10 space-y-12">

            {/* ⭐ ATS GAUGE METER */}
            <div className="flex justify-center">
              <AtsGauge value={analysis.atsScore || 0} />
            </div>

            {/* Extracted Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                Extracted Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {normalizeArray(analysis.skills).map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gray-800 rounded-lg text-gray-200 border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Suggestions
              </h3>

              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                {normalizeArray(analysis.suggestions).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </Card>
    </div>
  );
}
