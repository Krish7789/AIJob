import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import type { RoadmapRequest } from "../api/roadmap.api";

type Props = {
  onSubmit: (payload: RoadmapRequest) => void;
};

type Option = { value: string; label: string };

export default function RoadmapForm({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);

  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [endGoal, setEndGoal] = useState<string[]>([]);
  const [studentName, setStudentName] = useState("Krish"); // you hardcoded anyway
  const [year, setYear] = useState("");
  const [learningSpeed, setLearningSpeed] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    setStartDate(formatDate(today));
    setEndDate(formatDate(nextMonth));
  }, []);

  const techOptions: Option[] = useMemo(
    () => [
      { value: "Python", label: "Python" },
      { value: "Java", label: "Java" },
      { value: "C++", label: "C++" },
      { value: "JavaScript", label: "JavaScript" },
      { value: "C#", label: "C#" },
      { value: "Node.js", label: "Node.js" },
      { value: "React.js", label: "React.js" },
      { value: "Ruby", label: "Ruby" },
      { value: "PHP", label: "PHP" },
      { value: "Swift", label: "Swift" },
      { value: "Kotlin", label: "Kotlin" },
    ],
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: RoadmapRequest = {
      studentName,
      knownTech: selectedTechs,
      endGoal,
      year,
      learningSpeed,
      difficulty,
      startDate,
      endDate,
    };

    setLoading(true);
    try {
      onSubmit(payload); // parent triggers RoadmapResult
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20"
      >
        {/* Tech Stacks */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Strengths in Tech Stack
          </label>
          <Select
            isMulti
            name="techs"
            options={techOptions}
            value={techOptions.filter((opt) => selectedTechs.includes(opt.value))}
            onChange={(options) =>
              setSelectedTechs(options ? options.map((o) => o.value) : [])
            }
            className="w-full"
            styles={{
              control: (base, state) => ({
                ...base,
                background: "#232B3E",
                borderColor: state.isFocused ? "#a7b9ee" : "#64748b",
                minHeight: "48px",
                borderRadius: "0.75rem",
                boxShadow: state.isFocused ? "0 0 0 2px #f472b6" : "none",
              }),
              placeholder: (base) => ({ ...base, color: "white", opacity: 1 }),
              input: (base) => ({ ...base, color: "#fff" }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              multiValue: (base) => ({
                ...base,
                background: "#ef4444",
                borderRadius: "0.50rem",
                fontWeight: 600,
              }),
              multiValueLabel: (base) => ({ ...base, color: "#fff" }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#fff",
                ":hover": { backgroundColor: "#c026d3", color: "#fff" },
              }),
              menu: (base) => ({
                ...base,
                background: "#232B3E",
                borderRadius: "0.75rem",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isFocused
                  ? "#c026d3"
                  : isSelected
                  ? "#ef4444"
                  : "#232B3E",
                color: "#fff",
                cursor: "pointer",
                fontWeight: isSelected ? "bold" : "normal",
              }),
            }}
            placeholder="Select technologies you’re confident in."
          />
        </div>

        {/* End Goal */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Growth Areas / Weaknesses
          </label>
          <Select
            isMulti
            name="endGoals"
            options={techOptions}
            value={techOptions.filter((opt) => endGoal.includes(opt.value))}
            onChange={(options) =>
              setEndGoal(options ? options.map((o) => o.value) : [])
            }
            className="w-full"
            styles={{
              control: (base, state) => ({
                ...base,
                background: "#232B3E",
                borderColor: state.isFocused ? "#a7b9ee" : "#64748b",
                minHeight: "48px",
                borderRadius: "0.75rem",
                boxShadow: state.isFocused ? "0 0 0 2px #f472b6" : "none",
              }),
              placeholder: (base) => ({ ...base, color: "white", opacity: 1 }),
              input: (base) => ({ ...base, color: "#fff" }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              multiValue: (base) => ({
                ...base,
                background: "#ef4444",
                borderRadius: "0.50rem",
                fontWeight: 600,
              }),
              multiValueLabel: (base) => ({ ...base, color: "#fff" }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#fff",
                ":hover": { backgroundColor: "#c026d3", color: "#fff" },
              }),
              menu: (base) => ({
                ...base,
                background: "#232B3E",
                borderRadius: "0.75rem",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isFocused
                  ? "#c026d3"
                  : isSelected
                  ? "#ef4444"
                  : "#232B3E",
                color: "#fff",
                cursor: "pointer",
                fontWeight: isSelected ? "bold" : "normal",
              }),
            }}
            placeholder="Select what you want to learn or improve."
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Which year you are in
          </label>
          <div className="flex gap-4 flex-wrap">
            {["1st year 🎉", "2nd year 😍", "3rd year 🤓", "4th year 🎓"].map((y) => (
              <label
                key={y}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full cursor-pointer hover:bg-pink-500 hover:scale-105 transition"
              >
                <input
                  type="radio"
                  name="year"
                  value={y}
                  checked={year === y}
                  onChange={(e) => setYear(e.target.value)}
                  className="accent-pink-500"
                />
                {y}
              </label>
            ))}
          </div>
        </div>

        {/* Learning Speed */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Learning Speed
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Fast learner 🚀", "Medium learner 🏄", "Slow learner 🐢"].map((speed) => (
              <label
                key={speed}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full cursor-pointer hover:bg-purple-500 hover:scale-105 transition"
              >
                <input
                  type="radio"
                  name="speed"
                  value={speed}
                  checked={learningSpeed === speed}
                  onChange={(e) => setLearningSpeed(e.target.value)}
                  className="accent-purple-500"
                />
                {speed}
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            At what level do you want to learn?
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Beginner 😀", "Intermediate 🙂", "Advanced 😎"].map((lvl) => (
              <label
                key={lvl}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full cursor-pointer hover:bg-yellow-500 hover:scale-105 transition"
              >
                <input
                  type="radio"
                  name="level"
                  value={lvl}
                  checked={difficulty === lvl}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="accent-yellow-500"
                />
                {lvl}
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Select a Date Range
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 shadow-inner focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 shadow-inner focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg font-semibold rounded-xl 
bg-gradient-to-r from-cyan-500 to-blue-600
shadow-[0_12px_30px_rgba(37,99,235,0.25)]
hover:shadow-[0_16px_45px_rgba(34,211,238,0.25)]
hover:scale-[1.01] active:scale-[0.99]
transition flex items-center justify-center gap-2"

        >
          {loading ? "Generating Roadmap..." : "Generate Roadmap"}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-300">
        Roadmap will appear below after submission.
      </div>
    </div>
  );
}
