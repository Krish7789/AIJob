import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GraduationCap, MapPin, Briefcase, Tag, Code2 } from "lucide-react";
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
    <Card className="p-8 shadow-medium bg-gradient-card border-0">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Tell Us About Yourself
          </h2>
          <p className="text-muted-foreground">
            Help us find the perfect internships for you
          </p>
        </div>

        <div className="space-y-5">
          {/* 🎓 Education */}
          <div className="space-y-2">
            <Label
              htmlFor="education"
              className="flex items-center gap-2 text-base font-semibold"
            >
              <GraduationCap className="w-5 h-5 text-primary" />
              Education Level
            </Label>
            <Input
              id="education"
              placeholder="e.g., Bachelor's in Computer Science"
              value={formData.education}
              onChange={(e) => handleChange("education", e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>

          {/* 🧠 Skills */}
          <div className="space-y-2">
            <Label
              htmlFor="skills"
              className="flex items-center gap-2 text-base font-semibold"
            >
              <Tag className="w-5 h-5 text-accent" />
              Your Skills
            </Label>
            <Input
              id="skills"
              placeholder="e.g., Python, Communication, Design"
              value={formData.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
              className="h-12 text-base"
              required
            />
            <p className="text-sm text-muted-foreground">
              Separate skills with commas
            </p>
          </div>

          {/* ✅ LeetCode Username Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <span className="text-cyan-400">{"</>"}</span>
              LeetCode Username (optional)
            </Label>

            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter your LeetCode username"
                value={formData.leetcodeUsername || ""}
                onChange={(e) =>
                  setFormData({ ...formData, leetcodeUsername: e.target.value })
                }
                className="h-12 text-base"
              />
              <Button
                type="button"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-5"
                onClick={handleFetchLeetCode}
              >
                Fetch Stats
              </Button>
            </div>

            {leetcodeStats && (
              <div className="mt-3 bg-[#0f172a] text-white rounded-lg p-4 shadow-md border border-cyan-600/30">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-cyan-300">
                    {leetcodeStats.username}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Rank: {leetcodeStats.ranking || "N/A"}
                  </p>
                </div>

                <p className="text-sm text-gray-400 mt-1">
                  ⭐  | 🌍{" "}
                  {leetcodeStats.country}
                </p>

                <div className="mt-3 text-sm text-gray-300">
                  <p className="font-semibold mb-1">Problems Solved:</p>
                  {leetcodeStats.problemsSolved?.map((p: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between text-gray-400"
                    >
                      <span>{p.difficulty}</span>
                      <span>{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 💼 Interests */}
          <div className="space-y-2">
            <Label
              htmlFor="interests"
              className="flex items-center gap-2 text-base font-semibold"
            >
              <Briefcase className="w-5 h-5 text-secondary" />
              Sector Interests
            </Label>
            <Input
              id="interests"
              placeholder="e.g., Technology, Finance, Marketing"
              value={formData.interests}
              onChange={(e) => handleChange("interests", e.target.value)}
              className="h-12 text-base"
              required
            />
            <p className="text-sm text-muted-foreground">
              What fields interest you?
            </p>
          </div>

          {/* 📍 Location */}
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="flex items-center gap-2 text-base font-semibold"
            >
              <MapPin className="w-5 h-5 text-destructive" />
              Preferred Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Mumbai, Remote, Bangalore"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" size="lg">
          Find Internship Matches
        </Button>
      </form>
    </Card>
  );
};
