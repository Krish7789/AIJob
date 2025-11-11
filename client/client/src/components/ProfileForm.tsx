import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GraduationCap, MapPin, Briefcase, Tag } from "lucide-react";

interface ProfileData {
  education: string;
  skills: string;
  interests: string;
  location: string;
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // ✅ directly submit without any resume upload
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          {/* Education */}
          <div className="space-y-2">
            <Label htmlFor="education" className="flex items-center gap-2 text-base font-semibold">
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

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills" className="flex items-center gap-2 text-base font-semibold">
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
            <p className="text-sm text-muted-foreground">Separate skills with commas</p>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label htmlFor="interests" className="flex items-center gap-2 text-base font-semibold">
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
            <p className="text-sm text-muted-foreground">What fields interest you?</p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2 text-base font-semibold">
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

        {/* ✅ Directly fetch internships instead of resume upload */}
        <Button type="submit" className="w-full" size="lg">
          Find Internship Matches
        </Button>
      </form>
    </Card>
  );
};
