import { Button } from "@/components/ui/button";
import {
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  Mic,
  Code2,
  Briefcase,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import heroImage from "../assets/hero-image.png"
import { motion } from "framer-motion";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="text-primary-foreground space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                AI-Powered Adaptive Learning Hub
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Build your
              <span className="block text-secondary-glow">
                AI-Driven Learning Journey
              </span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              A single platform that adapts to your skills, goals, and timeline —
              internships, interviews, company prep, coding practice, and your
              personalized learning roadmap.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" onClick={onGetStarted} className="group">
                Start Personalized Plan
                <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Open Knowledge Hub
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20 text-sm">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-secondary-glow" />
                Internship AI
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary-glow" />
                Knowledge Hub
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-secondary-glow" />
                AI Interview
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-secondary-glow" />
                Coding Practice
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary-glow" />
                Company Prep
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary-glow" />
                Adaptive Roadmaps
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE (ANIMATED) */}
          <div className="relative">
            {/* Floating glow blobs */}
            <motion.div
              className="absolute -top-10 -left-8 w-40 h-40 rounded-full bg-cyan-400/30 blur-3xl"
              animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-12 -right-10 w-52 h-52 rounded-full bg-blue-500/25 blur-3xl"
              animate={{ y: [0, -16, 0], x: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-10 right-24 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Shimmer border frame */}
            <motion.div
              className="relative rounded-3xl p-[2px] bg-gradient-to-r from-cyan-400/60 via-blue-500/40 to-purple-500/60 shadow-glow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Shine overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                aria-hidden
              >
                <motion.div
                  className="absolute -inset-y-10 -left-1/2 w-1/2 bg-white/10 blur-xl rotate-12"
                  animate={{ x: ["-60%", "220%"] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />
              </motion.div>

              {/* Image with hover + gentle float */}
              <motion.div
                className="rounded-3xl bg-[#0b1220]/40 backdrop-blur-sm overflow-hidden"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                <motion.img
                  src={heroImage}
                  alt="AI Learning Platform"
                  className="w-auto h-auto object-cover"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H0V0Z"
            fill="#0f172a"

          />
        </svg>
      </div>
    </section>
  );
};
