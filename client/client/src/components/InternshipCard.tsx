import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, ExternalLink } from "lucide-react";

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  description: string;
  requiredSkills?: string[] | string;
  matchScore: number;
  link?: string;
}

interface InternshipCardProps {
  internship: Internship;
}

export const InternshipCard = ({ internship }: InternshipCardProps) => {
  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-accent bg-accent/10";
    if (score >= 75) return "text-primary bg-primary/10";
    return "text-secondary bg-secondary/10";
  };

  // ✅ Normalize skills safely
  const skills =
    typeof internship.requiredSkills === "string"
      ? internship.requiredSkills.split(",").map((s) => s.trim())
      : internship.requiredSkills || [];

  // ✅ Fix link reference name
  const validLink =
    internship.link && internship.link.trim().startsWith("http")
      ? internship.link.trim()
      : "https://internshala.com/internships";

  return (
    <Card className="flex flex-col justify-between h-full overflow-hidden hover:shadow-glow transition-all duration-300 border-border hover:border-primary/30 bg-card">
      <div className="flex flex-col flex-grow p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-1">
              {internship.title}
            </h3>
            <p className="text-muted-foreground font-medium">
              {internship.company}
            </p>
          </div>

          <div
            className={`px-3 py-1 rounded-full font-bold text-sm ${getMatchColor(
              internship.matchScore
            )}`}
          >
            {internship.matchScore}% Match
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{internship.location || "Remote / Not specified"}</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Briefcase className="w-4 h-4 text-accent" />
            <span>{internship.type || "N/A"}</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4 text-secondary" />
            <span>{internship.duration || "Not specified"}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed flex-grow">
          {internship.description || "No description provided."}
        </p>

        {/* ✅ Skills section fixed */}
        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-muted text-muted-foreground font-medium"
              >
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No specific skills mentioned
          </p>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          <a
            href={validLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button
              variant="default"
              size="lg"
              className="w-full flex items-center justify-center gap-2 py-3 group relative z-10"
            >
              <span>View Details</span>
              <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};
