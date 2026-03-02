import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
import { fetchCourses, recommendCourses } from "@/lib/coursesApi";

const DEFAULT_STRENGTHS = ["AI/ML"];
const DEFAULT_WEAKNESSES = ["dsa", "system-design"];

export default function CourseHub() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [recommended, setRecommended] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [minRating, setMinRating] = useState("4.5");
  const [maxPrice, setMaxPrice] = useState("2000");

  const [strengths, setStrengths] = useState(DEFAULT_STRENGTHS.join(", "));
  const [weaknesses, setWeaknesses] = useState(DEFAULT_WEAKNESSES.join(", "));

  const queryParams = useMemo(() => {
    return {
      platform: platform || undefined,
      category: category || undefined,
      minRating: minRating || undefined,
      maxPrice: maxPrice || undefined,
    };
  }, [platform, category, minRating, maxPrice]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchCourses(queryParams);
      setCourses(data);
      setLoading(false);
    })();
  }, [queryParams]);

  const handleRecommend = async () => {
    setLoading(true);
    const rec = await recommendCourses({
      strengths: strengths.split(",").map((x) => x.trim()).filter(Boolean),
      weaknesses: weaknesses.split(",").map((x) => x.trim()).filter(Boolean),
      goal: category,
    });
    setRecommended(rec);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Course Recommendations
          </h1>
          <p className="mt-4 text-white/70 text-lg">
            Personalized courses aligned with your strengths, weaknesses, and goals — in the same adaptive learning system.
          </p>
        </div>

        {/* Recommendation Panel */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-white/70">Your Strengths</label>
              <input
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="Data Science, Machine Learning, Full-Stack Development"
                className="mt-2 w-full rounded-2xl bg-black/25 border border-white/10 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

        

            <div className="flex items-end">
              <button
                onClick={handleRecommend}
                className="w-full rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] active:scale-[0.99] transition"
              >
                Recommend Courses
              </button>
            </div>
          </div>

          {recommended.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-bold">Recommended For You</h2>
              <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommended.map((c) => (
                  <CourseCard key={c._id} course={c} />
                ))}
              </div>
            </>
          )}
        </div>

      {/* Filters */}
<div className="mt-12 flex flex-wrap items-end gap-6 justify-center">

  {/* Platform */}
  <div className="flex flex-col gap-2">
    <label className="text-xs text-white/60 uppercase tracking-wider">
      Platform
    </label>
    <select
      value={platform}
      onChange={(e) => setPlatform(e.target.value)}
      className="
        h-12 min-w-[180px]
        rounded-2xl
        bg-[#0f172a]
        text-white/90
        border border-white/10
        px-4
        focus:border-cyan-400/40
        focus:ring-2 focus:ring-cyan-400/20
        outline-none
        transition
      "
    >
      <option value="">All Platforms</option>
      <option value="Udemy">Udemy</option>
      <option value="Coursera">Coursera</option>
      <option value="edX">edX</option>
    </select>
  </div>

  {/* Category */}
  <div className="flex flex-col gap-2">
    <label className="text-xs text-white/60 uppercase tracking-wider">
      Category
    </label>
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="
        h-12 min-w-[200px]
        rounded-2xl
        bg-[#0f172a]
        text-white/90
        border border-white/10
        px-4
        focus:border-cyan-400/40
        focus:ring-2 focus:ring-cyan-400/20
        outline-none
        transition
      "
    >
      <option value="">All Categories</option>
      <option value="AI">AI</option>
      <option value="Web Development">Web Development</option>
      <option value="Data">Data</option>
      <option value="DSA">DSA</option>
    </select>
  </div>

  {/* Min Rating */}
  <div className="flex flex-col gap-2">
    <label className="text-xs text-white/60 uppercase tracking-wider">
      Minimum Rating
    </label>
    <input
      type="number"
      step="0.1"
      min="0"
      max="5"
      value={minRating}
      onChange={(e) => setMinRating(e.target.value)}
      className="
        h-12 w-28
        rounded-2xl
        bg-[#0f172a]
        text-white/90
        border border-white/10
        px-4
        focus:border-cyan-400/40
        focus:ring-2 focus:ring-cyan-400/20
        outline-none
        transition
      "
      placeholder="4.5"
    />
  </div>

  {/* Max Price */}
  <div className="flex flex-col gap-2">
    <label className="text-xs text-white/60 uppercase tracking-wider">
      Maximum Price (₹)
    </label>
    <input
      type="number"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      className="
        h-12 w-28
        rounded-2xl
        bg-[#0f172a]
        text-white/90
        border border-white/10
        px-4
        focus:border-cyan-400/40
        focus:ring-2 focus:ring-cyan-400/20
        outline-none
        transition
      "
      placeholder="2000"
    />
  </div>

</div>


        {/* Courses Grid */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-5">
            Explore Courses {loading ? "(loading...)" : ""}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
