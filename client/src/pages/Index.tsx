import { useState, useEffect, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ProfileForm } from "@/components/ProfileForm";
import { ResumeUpload } from "@/components/ResumeUpload";
import { RecommendationsList } from "@/components/RecommendationsList";
import { Internship } from "@/components/InternshipCard";
import { fetchInternshipRecommendations } from "../lib/gemini";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, Mic, Code2, Users, Briefcase, ArrowRight } from "lucide-react";

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
  setGoHome?: (fn: () => void) => void;
}

const teamMembers = [{ name: "Pratyakshi Chauhan and Krish Kumar", role: "Software Developer" }];

const Index = ({
  setScrollToProfile,
  setScrollToAbout,
  setGoHome,
}: IndexProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("hero");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setCurrentStep("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setScrollToProfile(() => () => {
      setCurrentStep("profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    setScrollToAbout(() => handleScrollToAbout);

    setGoHome?.(() => () => {
      setCurrentStep("hero");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!location.state) return;

    if ((location.state as any).scrollTo === "internships") {
      setCurrentStep("profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if ((location.state as any).scrollTo === "about") {
      setCurrentStep("hero");
      setTimeout(() => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.state]);

  const handleProfileSubmit = async (data: ProfileData) => {
    setProfileData(data);
    setLoading(true);
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
          "No suitable internships found. Try refining your profile.",
        );
      }
    } catch (err) {
      toast.error("Failed to get recommendations from Gemini API.");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const handleResumeUpload = (file: File) => {
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

  const modules = [
    {
      title: "Knowledge Hub",
      desc: "Generate an AI roadmap tailored to your skills, goals, and timeline.",
      icon: Map,
      action: () => navigate("/knowledge-hub/roadmap"),
      btn: "Open Hub",
    },
    {
      title: "AI Internship Matching",
      desc: "Smart internship recommendations aligned to your profile.",
      icon: Briefcase,
      action: () => {
        setCurrentStep("profile");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      btn: "Find Internships",
    },
    {
      title: "AI Interview",
      desc: "Practice interviews with instant AI feedback.",
      icon: Mic,
      action: () => navigate("/interview"),
      btn: "Start Interview",
    },
    {
      title: "Coding Practice",
      desc: "Sharpen problem-solving with guided practice.",
      icon: Code2,
      action: () => navigate("/coding-practice"),
      btn: "Practice Now",
    },
    {
      title: "Course Recommendation",
      desc: "Recommend Courses throughout the internet.",
      icon: Users,
      action: () => navigate("/courses"),
      btn: "Generate Pack",
    },
    {
      title: "Company Prep",
      desc: "Prepare strategically for roles and companies.",
      icon: Users,
      action: () => navigate("/company-prep"),
      btn: "Generate Pack",
    },
    {
      title: "Resume Analyzer",
      desc: "Analyzes your Resume and provide ATS Score and feedback.",
      icon: Users,
      action: () => navigate("/analyze-resume"),
      btn: "Generate Pack",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* HERO */}
      {currentStep === "hero" && (
        <>
          <Hero onGetStarted={handleGetStarted} />

          {/* Modules Section (Professional) */}
          <div className="container mx-auto px-4 -mt-12 pb-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div className="w-full flex justify-center">
                  <div className="max-w-4xl text-center mb-12 px-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 mb-5">
                      <span className="text-xs tracking-widest font-semibold text-cyan-300 uppercase">
                        AI-Powered Adaptive Learning Hub
                      </span>
                    </div>


                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                      Accelerate Your Career With Intelligent Learning Tools
                    </h2>

                    <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
                      Access structured roadmaps, AI-driven internship matching,
                      mock interviews, company preparation strategies, and
                      guided coding practice — all in one adaptive platform.
                    </p>
                  </div>
                </div>
                
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {modules.map((m, idx) => {
                  const Icon = m.icon;

                  return (
                    <div
                      key={idx}
                      className="
              group rounded-2xl border border-white/10
              bg-gradient-to-br from-white/10 to-white/5
              backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)]
              hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]
              hover:border-cyan-400/30 transition-all
              p-6
            "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                  w-11 h-11 rounded-xl
                  bg-cyan-500/10 border border-cyan-400/20
                  flex items-center justify-center
                  group-hover:bg-cyan-500/15 transition
                "
                        >
                          <Icon className="w-5 h-5 text-cyan-300" />
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                          {m.title}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                        {m.desc}
                      </p>

                      <button
                        onClick={m.action}
                        className="
                mt-5 w-full rounded-xl py-2.5
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white font-semibold
                shadow-[0_10px_25px_rgba(37,99,235,0.25)]
                hover:shadow-[0_14px_35px_rgba(34,211,238,0.25)]
                hover:scale-[1.01]
                active:scale-[0.99]
                transition
                flex items-center justify-center gap-2
              "
                      >
                        {m.btn}
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* subtle bottom accent */}
                      <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </>
      )}

      {/* PROFILE */}
      {currentStep === "profile" && (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <ProfileForm onSubmit={handleProfileSubmit} />
        </div>
      )}

      {/* RESUME */}
      {currentStep === "resume" && (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <ResumeUpload
            onUpload={handleResumeUpload}
            onSkip={handleSkipResume}
          />
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-opacity-90 backdrop-blur-md z-50">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse blur-2xl opacity-40"></div>
            <div className="w-16 h-16 border-[6px] border-transparent border-t-purple-500 border-l-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-8 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse tracking-wide">
            Building your adaptive recommendations...
          </p>
        </div>
      )}

      {/* RESULTS */}
      {currentStep === "results" && (
        <div id="internship-section" className="container mx-auto px-4 py-16">
          <RecommendationsList
            internships={internships}
            onReset={handleReset}
          />
        </div>
      )}

      {/* ABOUT */}
<div ref={aboutRef} className="relative w-full py-28">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#0f172a] to-[#0b1220]" />
  <div className="absolute inset-0 opacity-30">
    <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-cyan-500 blur-3xl opacity-20" />
    <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-blue-600 blur-3xl opacity-20" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-purple-600 blur-3xl opacity-10" />
  </div>

  <div className="relative container mx-auto px-6">
    <div className="max-w-6xl mx-auto text-center">

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        About{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          AI-Powered Adaptive Learning Hub
        </span>
      </h2>

      <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        <span className="font-semibold text-cyan-300">
          AI-Powered Adaptive Learning Hub
        </span>{" "}
        is an intelligent AI platform engineered to personalize learning and
        accelerate career growth based on each student’s skills, timeline, and goals.
      </p>

      <p className="mt-8 text-gray-400 text-base md:text-lg">
        Our ecosystem integrates:
      </p>

      {/* Feature Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {[
          {
            title: "Knowledge Hub",
            desc: "Generate adaptive AI-driven roadmaps tailored to your skills and aspirations.",
          },
          {
            title: "AI Internship Matching",
            desc: "Receive intelligent internship recommendations aligned with your profile.",
          },
          {
            title: "AI Mock Interviews",
            desc: "Practice interviews with instant AI evaluation and feedback.",
          },
          {
            title: "Personalized Skill Roadmaps",
            desc: "Structured growth paths customized for your career direction.",
          },
          {
            title: "Coding Practice",
            desc: "Enhance problem-solving abilities with guided AI assistance.",
          },
          {
            title: "Company Preparation",
            desc: "Strategically prepare for top companies and specific roles.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-[0_0_30px_rgba(0,0,0,0.25)] hover:border-cyan-500/40 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
              {item.title}
            </h3>
            <p className="mt-3 text-gray-300 leading-relaxed">
              {item.desc}
            </p>

            <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 rounded-full" />
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mt-20 flex justify-center">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center shadow-[0_0_30px_rgba(0,0,0,0.25)] hover:border-cyan-500/40 transition-all duration-300 w-72"
          >
            <div className="mb-4 flex items-center justify-center">
              <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-2xl font-bold shadow-lg">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            <div className="text-xl font-semibold text-white">
              {member.name}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {member.role}
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
</div>

    </div>
  );
};

export default Index;
