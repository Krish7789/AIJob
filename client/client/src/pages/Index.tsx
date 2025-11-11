import { useState, useEffect, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ProfileForm } from "@/components/ProfileForm";
import { ResumeUpload } from "@/components/ResumeUpload";
import { RecommendationsList } from "@/components/RecommendationsList";
import { Internship } from "@/components/InternshipCard";
import { fetchInternshipRecommendations } from "../lib/gemini";
import { toast } from "react-hot-toast";

type Step = "hero" | "profile" | "resume" | "results";

interface ProfileData {
  education: string;
  skills: string;
  interests: string;
  location: string;
}

interface IndexProps {
  setScrollToProfile: (fn: () => void) => void;
  setScrollToAbout: (fn: () => void) => void;
}

// ✅ Single Team Member
const teamMembers = [
  { name: "Krish Kumar", role: "Software Developer" },
];

const Index = ({ setScrollToProfile, setScrollToAbout }: IndexProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("hero");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setCurrentStep("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setScrollToProfile(() => handleGetStarted);
    setScrollToAbout(() => handleScrollToAbout);
  }, []);

  const handleProfileSubmit = async (data: ProfileData) => {
    setProfileData(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Profile saved! Now generating recommendations...");

    try {
      toast.loading("Analyzing your profile...");
      const recommendations = await fetchInternshipRecommendations(data);

      if (recommendations && recommendations.length > 0) {
        setInternships(recommendations);
        setCurrentStep("results");
        toast.dismiss();
        toast.success("Top internship matches generated!");
      } else {
        toast.dismiss();
        toast.error("No suitable internships found. Try refining your profile.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to get recommendations from Gemini API.");
      console.error("Gemini fetch error:", err);
    }
  };

  const handleResumeUpload = (file: File) => {
    console.log("Resume uploaded:", file.name);
    setCurrentStep("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Analyzing your resume and generating recommendations...");
  };

  const handleSkipResume = () => {
    setCurrentStep("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Generating recommendations...");
  };

  const handleReset = () => {
    setCurrentStep("hero");
    setProfileData(null);
    setInternships([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {currentStep === "hero" && <Hero onGetStarted={handleGetStarted} />}

      {/* Profile Form */}
      {currentStep === "profile" && (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <ProfileForm onSubmit={handleProfileSubmit} />
        </div>
      )}

      {/* Resume Upload */}
      {currentStep === "resume" && (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <ResumeUpload onUpload={handleResumeUpload} onSkip={handleSkipResume} />
        </div>
      )}

      {/* Internship Recommendations */}
      {currentStep === "results" && (
        <div className="container mx-auto px-4 py-16">
          <RecommendationsList internships={internships} onReset={handleReset} />
        </div>
      )}

      {/* About Us Section */}
      <div ref={aboutRef} className="container mx-auto px-4 py-20">
        <div className="relative max-w-4xl mx-auto bg-white/95 shadow-2xl rounded-3xl p-12 backdrop-blur-lg border border-gray-200">
          <h2 className="text-5xl font-extrabold text-center mb-6 text-secondary-glow tracking-tight">
            About Us
          </h2>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-10 text-gray-800 font-medium leading-relaxed">
            We are the team behind{" "}
            <span className="font-bold text-primary">
              AI-POWERED Career Guidance System
            </span>{" "}
            — an intelligent platform helping students find their ideal
            internship based on their skills, education, and interests. Our
            mission is to simplify career guidance with innovative AI technology
            and a seamless, user-friendly experience.
          </p>

          {/* ✅ Single centered team member */}
          <div className="flex justify-center">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md p-10 rounded-2xl text-center border border-primary/20 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex flex-col items-center w-80"
              >
                <div className="mb-4 flex items-center justify-center">
                  <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary-glow text-white text-3xl font-bold shadow">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="text-xl font-semibold text-secondary-glow mb-1 tracking-wide">
                  {member.name}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
