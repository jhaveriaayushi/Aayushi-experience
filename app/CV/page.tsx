"use client";

import { useState } from "react";

const experiences = [
  {
    title: "Technical Product Manager",
    company: "frog",
    period: "2025 - Present",
    description:
      "Leading AI and digital transformation products, defining requirements, managing stakeholders and delivery.",
    tags: ["Product", "AI", "Strategy"],
    skills: ["Product Management", "AI", "Strategy"],
  },
  {
    title: "Associate Consultant",
    company: "Capgemini Invent",
    period: "2023 - Present",
    description:
      "Delivering public sector transformation projects, automating contract management and using AI solutions.",
    tags: ["Consulting", "AI", "Python"],
    skills: ["Python", "AI", "Strategy"],
  },
  {
    title: "Experiment Set-up Designer",
    company: "UCL",
    period: "2022",
    description:
      "Designed and built experimental hardware and software solutions.",
    tags: ["Engineering", "Python"],
    skills: ["Python", "Engineering"],
  },
  {
    title: "Software & Electrical Engineering Intern",
    company: "The Little Car Company",
    period: "2021",
    description:
      "Worked across software development and embedded systems projects.",
    tags: ["Engineering", "Software"],
    skills: ["Software", "Engineering"],
  },
];

const allTags = [
  "All",
  ...new Set(experiences.flatMap((exp) => exp.tags)),
];

export default function CVPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredExperiences =
    selectedTag === "All"
      ? experiences
      : experiences.filter((exp) =>
          exp.tags.includes(selectedTag)
        );

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-5xl font-bold mb-8">Experience</h1>

      <div className="flex flex-wrap gap-3 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full transition ${
              selectedTag === tag
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredExperiences.map((exp, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-semibold">
                  {exp.title}
                </h2>
                <p className="text-gray-400">{exp.company}</p>
              </div>

              <span className="text-sm text-gray-500">
                {exp.period}
              </span>
            </div>

            <p className="mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}