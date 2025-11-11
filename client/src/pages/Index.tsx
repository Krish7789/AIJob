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
  setGoHome?: (fn: () => void) => void; // ✅ new prop
}

// ✅ Single Team Member
const teamMembers = [
  { name: "Krish Kumar", role: "Backend Developer" },
  { name: "Pratyakshi Chauhan", role: "DevOps Engineer" },
  { name: "Vansh Thapa", role: "Data Engineer" },
  { name: "Karan Sharma", role: "AI/ML Engineer" },
  { name: "Krrish Khurana", role: "Database Handler" },
  { name: "Tanish Sharma", role: "Frontend Developer" },
];

const Index = ({ setScrollToProfile, setScrollToAbout, setGoHome }: IndexProps) => {

  const [currentStep, setCurrentStep] = useState<Step>("hero");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setCurrentStep("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
  // ✅ Register scroll functions for Navbar
  setScrollToProfile(() => () => setCurrentStep("results"));
  setScrollToAbout(() => handleScrollToAbout);

  // ✅ Register goHome function
  setGoHome?.(() => () => {
    setCurrentStep("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}, []);


  const handleProfileSubmit = async (data: ProfileData) => {
    setProfileData(data);
    setLoading(true); // show spinner
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Profile saved! Now generating recommendations...");

    try {
      const recommendations = await fetchInternshipRecommendations(data);

      if (recommendations && recommendations.length > 0) {
        setInternships(recommendations);
        setCurrentStep("results");
        toast.success("Top internship matches generated!");
      } else {
        toast.error(
          "No suitable internships found. Try refining your profile."
        );
      }
    } catch (err) {
      toast.error("Failed to get recommendations from Gemini API.");
      console.error("Gemini fetch error:", err);
    } finally {
      setLoading(false); // hide spinner
      toast.dismiss();
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
          <ResumeUpload
            onUpload={handleResumeUpload}
            onSkip={handleSkipResume}
          />
        </div>
      )}
      {/* Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-opacity-90 backdrop-blur-md z-50">
          {/* Glowing animated orb */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse blur-2xl opacity-40"></div>
            <div className="w-16 h-16 border-[6px] border-transparent border-t-purple-500 border-l-blue-500 rounded-full animate-spin"></div>
          </div>

          {/* Text animation */}
          <p className="mt-8 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse tracking-wide">
            Finding your perfect internships...
          </p>
        </div>
      )}

      {/* Internship Recommendations */}
      {currentStep === "results" && (
        <div className="container mx-auto px-4 py-16">
          <RecommendationsList
            internships={internships}
            onReset={handleReset}
          />
        </div>
      )}

      {/* 🌟 About Us Section */}
<div ref={aboutRef} className="container mx-auto px-4 py-20">
  <div className="relative max-w-5xl mx-auto bg-white/95 shadow-2xl rounded-3xl p-12 backdrop-blur-lg border border-gray-200">
    <h2 className="text-5xl font-extrabold text-center mb-6 text-secondary-glow tracking-tight">
      About Us
    </h2>

    <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 text-gray-800 font-medium leading-relaxed">
      We are the team behind{" "}
      <span className="font-bold text-primary">
        AI-Powered Internship Recommendation System
      </span>
      — an intelligent platform helping students find their ideal internships
      based on skills, education, and interests. Our mission is to simplify
      career guidance through innovative AI and seamless user experiences.
    </p>

    {/* 👥 Team Members Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {teamMembers.map((member, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md p-8 rounded-2xl text-center border border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center w-72"
        >
          {/* Avatar */}
          <div className="mb-4 flex items-center justify-center">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary-glow text-white text-2xl font-bold shadow">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>

          {/* Name & Role */}
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
