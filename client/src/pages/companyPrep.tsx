import { useState } from "react";
import { Loader2 } from "lucide-react";


export default function CompanyPrep() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const companies = ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Flipkart"];

  const generatePack = async () => {
    if (!company || !role) return alert("Please select company and role.");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/company-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          role,
          skills,
          education,
          experience
        })
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.error("Company prep error:", err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 px-8">

      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        Get Ready for Your Dream Company
      </h1>

      <p className="text-gray-300 text-center mb-10">
        Select a company and generate your personalized preparation pack.
      </p>

      {/* Company Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {companies.map((c) => (
          <button
            key={c}
            onClick={() => setCompany(c)}
            className={`px-5 py-2 rounded-lg border 
              ${company === c ? "bg-cyan-600" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto bg-white/5 p-6 rounded-xl border border-cyan-500/20">

        <input
          className="w-full px-4 py-2 mb-3 rounded bg-gray-800"
          placeholder="Role (e.g., SDE Intern)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <textarea
          className="w-full px-4 py-2 mb-3 rounded bg-gray-800"
          placeholder="Your skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 mb-3 rounded bg-gray-800"
          placeholder="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 mb-5 rounded bg-gray-800"
          placeholder="Experience (0-1 years, etc)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <button
          onClick={generatePack}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg w-full"
        >
          Generate Pack
        </button>
      </div>

      {/* Loading */}
     {loading && (
  <div className="flex flex-col items-center justify-center mt-10 animate-fade-in">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-transparent border-t-cyan-400 border-l-blue-400 rounded-full animate-spin"></div>

      <div className="absolute inset-0 blur-xl opacity-40 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse"></div>
    </div>

    <p className="mt-4 flex items-center gap-2 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
  <Loader2 className="w-5 h-5 animate-spin" />
  Generating your Company Pack…
</p>

  </div>
)}


      {/* Results */}
      {result && (
        <div className="mt-12 space-y-8 max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold text-center text-cyan-400">
            {result.company} — {result.role} Preparation Pack
          </h2>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-blue-300 mb-2">Job Patterns</h3>
            <ul className="list-disc pl-6">
              {result.job_patterns.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-blue-300 mb-2">Coding Focus</h3>

            <h4 className="font-semibold text-cyan-300">Topics</h4>
            <ul className="list-disc pl-6 mb-4">
              {result.coding_focus.topics.map((t: string, i: number) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-cyan-300">Sample Questions</h4>
            <ul className="list-disc pl-6">
              {result.coding_focus.sample_questions.map((q: string, i: number) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-blue-300 mb-2">HR Rounds</h3>
            <h4 className="font-semibold text-cyan-300">Common Questions</h4>
            <ul className="list-disc pl-6 mb-4">
              {result.hr_rounds.common_questions.map((q: string, i: number) => (
                <li key={i}>{q}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-cyan-300">Answer Tips</h4>
            <ul className="list-disc pl-6">
              {result.hr_rounds.answer_tips.map((tip: string, i: number) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-blue-300 mb-2">Resume Tips</h3>

            <h4 className="font-semibold text-cyan-300">Outline</h4>
            <ul className="list-disc pl-6 mb-4">
              {result.resume_tips.template_outline.map((t: string, i: number) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-cyan-300">Do</h4>
            <ul className="list-disc pl-6 mb-4">
              {result.resume_tips.do.map((t: string, i: number) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-cyan-300">Don't</h4>
            <ul className="list-disc pl-6">
              {result.resume_tips.dont.map((t: string, i: number) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-blue-300 mb-2">Selection Probability</h3>
            <p>{result.selection_probability}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-blue-300 mb-2">Secrets to Crack</h3>
            <ul className="list-disc pl-6">
              {result.secrets.map((tip: string, i: number) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}
