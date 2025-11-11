import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-POWERED Career Guidance System</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Perfect
              <span className="block text-secondary-glow">Internship Match</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Get personalized internship recommendations based on your skills, education, and aspirations. Made simple for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={onGetStarted}
                className="group"
              >
                Get Started
                <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl font-bold text-secondary-glow">500+</div>
                <div className="text-sm text-primary-foreground/80">Internships</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-glow">50K+</div>
                <div className="text-sm text-primary-foreground/80">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-glow">95%</div>
                <div className="text-sm text-primary-foreground/80">Match Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-accent rounded-3xl blur-2xl opacity-20" />
            <img 
              src={heroImage} 
              alt="Students collaborating on internship opportunities"
              className="relative rounded-3xl shadow-glow w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" 
                fill="hsl(var(--background))" 
          />
        </svg>
      </div>
    </section>
  );
};
