import { Course } from "@/types/course";
import { ExternalLink, Star } from "lucide-react";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="h-full w-full object-cover opacity-90"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-white/60">{course.platform} • {course.category}</p>
            <h3 className="text-lg font-semibold text-white leading-snug">
              {course.title}
            </h3>
            <p className="text-sm text-white/70 mt-1 line-clamp-2">
              {course.subtitle || "Career-ready learning with structured modules."}
            </p>
          </div>

          <div className="flex items-center gap-1 text-cyan-300 text-sm shrink-0">
            <Star className="w-4 h-4" />
            {course.rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(course.tags || []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-white/70">
          <span>{course.durationMonths} months</span>
          <span>{course.price === 0 ? "Free" : `₹${course.price}`}</span>
        </div>

        <a
          href={course.viewUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 w-full rounded-xl py-2.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          View Course <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
