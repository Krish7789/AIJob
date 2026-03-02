import React from "react";
import type { RoadmapResponse } from "../api/roadmap.api";

type Props = {
  roadmap: RoadmapResponse;
};

export default function RoadmapTable({ roadmap }: Props) {
  if (!roadmap?.weeks || !Array.isArray(roadmap.weeks)) {
    return <p className="text-gray-300">No roadmap data available.</p>;
  }

  return (
    <div className="space-y-10">
      {roadmap.weeks.map((week, wIndex) => (
        <section
          key={wIndex}
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">{week.title}</h2>

          <ul className="text-gray-300 space-y-3 list-disc list-inside">
            {week.topics?.length ? (
              <li>
                <strong>Topics:</strong> {week.topics.join(", ")}
              </li>
            ) : null}

            {week.concepts?.length ? (
              <li>
                <strong>Concepts:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.concepts.map((concept, i) => (
                    <li key={i}>{concept}</li>
                  ))}
                </ul>
              </li>
            ) : null}

            {week.problems?.length ? (
              <li>
                <strong>LeetCode Problems:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.problems.map((problem, i) => (
                    <li key={i}>
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {problem.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : null}

            {week.youtubeLinks?.length ? (
              <li>
                <strong>YouTube Links:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.youtubeLinks.map((yt, i) => (
                    <li key={i}>
                      <a
                        href={yt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {yt.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : null}

            {week.books?.length ? (
              <li>
                <strong>Books:</strong> {week.books.join(", ")}
              </li>
            ) : null}

            {week.websites?.length ? (
              <li>
                <strong>Websites:</strong> {week.websites.join(", ")}
              </li>
            ) : null}

            {week.projects?.length ? (
              <li>
                <strong>Projects:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.projects.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              </li>
            ) : null}

            {week.notes ? (
              <li>
                <strong>Notes:</strong> <em>{week.notes}</em>
              </li>
            ) : null}
          </ul>
        </section>
      ))}
    </div>
  );
}
