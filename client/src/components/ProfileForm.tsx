import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Tag,
  Code2,
  Loader2,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

interface ProfileData {
  education: string;
  skills: string;
  interests: string;
  location: string;
  leetcodeUsername?: string;
}

interface ProfileFormProps {
  onSubmit: (data: ProfileData) => void;
}

export const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileData>({
    education: "",
    skills: "",
    interests: "",
    location: "",
    leetcodeUsername: "",
  });

  const [lcLoading, setLcLoading] = useState(false);
  const [leetcodeStats, setLeetcodeStats] = useState<any>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Fetch LeetCode Stats Preview
  const handleFetchLeetCode = async () => {
    const username = formData.leetcodeUsername?.trim();
    if (!username) {
      toast.error("Please enter your LeetCode username first!");
      return;
    }

    setLcLoading(true);
    setLeetcodeStats(null);
    setFetchError(null);

    try {
      const res = await fetch(
        `https://aijob-aqmj.onrender.com/api/leetcode?username=${encodeURIComponent(
          username
        )}`
      );

      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setLeetcodeStats(data);
      toast.success("LeetCode stats fetched successfully!");
    } catch (err: any) {
      console.error("❌ LeetCode fetch error:", err);
      setFetchError(err.message || "Failed to fetch stats");
      toast.error("Could not fetch LeetCode data.");
    } finally {
      setLcLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Glass Card */}
      <div
        className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-br from-white/10 to-white/5
          backdrop-blur-xl
          shadow-[0_18px_60px_rgba(0,0,0,0.45)]
          p-6 md:p-10
        "
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span className="text-xs tracking-widest font-semibold text-cyan-300 uppercase">
                AI-Powered Adaptive Learning Hub
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Tell Us About You
            </h2>

            <p className="mt-3 text-gray-300 text-base md:text-lg">
              Share a few details to generate smarter internship matches tailored
              to your profile.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* 🎓 Education */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm md:text-base font-semibold text-white">
                <GraduationCap className="w-5 h-5 text-cyan-300" />
                Education Level
              </Label>
              <Input
                placeholder="e.g., B.Tech in Computer Science"
                value={formData.education}
                onChange={(e) => handleChange("education", e.target.value)}
                required
                className="
                  h-12 text-base
                  bg-white/5 text-white
                  placeholder:text-gray-400
                  border border-white/10
                  focus-visible:ring-cyan-500/30
                  focus-visible:border-cyan-400/40
                "
              />
            </div>

            {/* 🧠 Skills */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm md:text-base font-semibold text-white">
                <Tag className="w-5 h-5 text-cyan-300" />
                Skills
              </Label>
              <Input
                placeholder="e.g., React, Node.js, SQL, Communication"
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                required
                className="
                  h-12 text-base
                  bg-white/5 text-white
                  placeholder:text-gray-400
                  border border-white/10
                  focus-visible:ring-cyan-500/30
                  focus-visible:border-cyan-400/40
                "
              />
              <p className="text-xs md:text-sm text-gray-400">
                Tip: Separate skills with commas for best results.
              </p>
            </div>

            {/* ✅ LeetCode Username Section */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm md:text-base font-semibold text-white">
                <Code2 className="w-5 h-5 text-cyan-300" />
                LeetCode Username{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </Label>

              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your LeetCode username"
                  value={formData.leetcodeUsername || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      leetcodeUsername: e.target.value,
                    })
                  }
                  className="
                    h-12 text-base
                    bg-white/5 text-white
                    placeholder:text-gray-400
                    border border-white/10
                    focus-visible:ring-cyan-500/30
                    focus-visible:border-cyan-400/40
                  "
                />

                <Button
                  type="button"
                  onClick={handleFetchLeetCode}
                  disabled={lcLoading}
                  className="
                    h-12 px-6
                    bg-gradient-to-r from-cyan-500 to-blue-600
                    hover:from-cyan-400 hover:to-blue-500
                    text-white font-semibold
                    shadow-[0_12px_30px_rgba(37,99,235,0.22)]
                    hover:shadow-[0_16px_45px_rgba(34,211,238,0.22)]
                    transition
                  "
                >
                  {lcLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Fetching...
                    </span>
                  ) : (
                    "Fetch Stats"
                  )}
                </Button>
              </div>

              {fetchError && (
                <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <p className="text-sm text-red-200">{fetchError}</p>
                </div>
              )}

              {leetcodeStats && (
                <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-5 shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-lg font-semibold text-cyan-300">
                      {leetcodeStats.username}
                    </p>
                    <p className="text-sm text-gray-300">
                      Rank:{" "}
                      <span className="font-semibold text-white">
                        {leetcodeStats.ranking || "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-gray-300 font-semibold mb-2">
                      Problems Solved
                    </p>

                    <div className="space-y-2">
                      {leetcodeStats.problemsSolved?.map(
                        (p: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-2"
                          >
                            <span className="text-sm text-gray-200">
                              {p.difficulty}
                            </span>
                            <span className="text-sm font-semibold text-white">
                              {p.count}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 💼 Interests */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm md:text-base font-semibold text-white">
                <Briefcase className="w-5 h-5 text-cyan-300" />
                Sector Interests
              </Label>
              <Input
                placeholder="e.g., Web Development, AI, Finance"
                value={formData.interests}
                onChange={(e) => handleChange("interests", e.target.value)}
                required
                className="
                  h-12 text-base
                  bg-white/5 text-white
                  placeholder:text-gray-400
                  border border-white/10
                  focus-visible:ring-cyan-500/30
                  focus-visible:border-cyan-400/40
                "
              />
              <p className="text-xs md:text-sm text-gray-400">
                Mention domains you want to explore.
              </p>
            </div>

            {/* 📍 Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm md:text-base font-semibold text-white">
                <MapPin className="w-5 h-5 text-cyan-300" />
                Preferred Location
              </Label>
              <Input
                placeholder="e.g., Remote, Mumbai, Bangalore"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
                className="
                  h-12 text-base
                  bg-white/5 text-white
                  placeholder:text-gray-400
                  border border-white/10
                  focus-visible:ring-cyan-500/30
                  focus-visible:border-cyan-400/40
                "
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="
              w-full h-12 rounded-xl
              bg-gradient-to-r from-cyan-500 to-blue-600
              hover:from-cyan-400 hover:to-blue-500
              text-white font-semibold
              shadow-[0_14px_40px_rgba(37,99,235,0.25)]
              hover:shadow-[0_18px_60px_rgba(34,211,238,0.22)]
              transition
            "
            size="lg"
          >
            Find Internship Matches
          </Button>

          {/* Footer helper */}
          <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
            <p className="text-sm text-gray-300">
              We use your profile to generate tailored recommendations. You can
              edit these details anytime.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
