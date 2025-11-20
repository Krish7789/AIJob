import { useEffect, useState } from "react";

interface GaugeProps {
  value: number; // ATS Score (0–100)
}

export default function AtsGauge({ value }: GaugeProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  // Gauge color
  const getColor = () => {
    if (value >= 80) return "#00f2ff"; // Cyan
    if (value >= 60) return "#00d26a"; // Green
    if (value >= 40) return "#ffb300"; // Orange
    return "#ff4b4b"; // Red
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-[200px] h-[220px]">

      {/* SVG Circle */}
      <svg width="200" height="200" className="drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#1e293b"
          strokeWidth="15"
          fill="none"
        />

        <circle
          cx="100"
          cy="100"
          r="80"
          stroke={getColor()}
          strokeWidth="15"
          fill="none"
          strokeDasharray={2 * Math.PI * 80}
          strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 80}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
          transform="rotate(-90 100 100)"
        />
      </svg>

      {/* Centered Score */}
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%] flex flex-col items-center">
        <h2 className="text-6xl font-extrabold text-cyan-300 drop-shadow-lg">
          {value}
        </h2>
      </div>

      {/* Label */}
      <p className="absolute bottom-0  text-lg font-semibold text-gray-300">
        ATS Score
      </p>
    </div>
  );
}
