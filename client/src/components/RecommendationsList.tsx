import { InternshipCard, Internship } from "./InternshipCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft } from "lucide-react";

interface RecommendationsListProps {
  internships: Internship[];
  onReset: () => void;
}

export const RecommendationsList = ({ internships, onReset }: RecommendationsListProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium text-accent">
            Recommendations Ready
          </span>
        </div>
        
        <h2 className="text-4xl font-bold text-foreground">
          Your Perfect Matches
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your profile, we have found {internships.length} highly relevant internship opportunities
        </p>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-border">
        <Button 
          variant="outline" 
          size="lg"
          onClick={onReset}
          className="group"
        >
          <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Start Over
        </Button>
        
        <Button 
          variant="secondary" 
          size="lg"
        >
          <RefreshCw className="mr-2 w-5 h-5" />
          Get More Recommendations
        </Button>
      </div>
    </div>
  );
};
