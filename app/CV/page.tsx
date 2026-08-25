"use client";

import {
  education,
  experiences,
  projects,
  certifications,
} from "./data";

import { useState, useEffect } from "react";



const allTags = [
  "All",
  ...new Set([
    ...experiences.flatMap(item => item.tags),
    ...education.flatMap(item => item.tags),
    ...projects.flatMap(item => item.tags),
    ...certifications.flatMap(item => item.tags),
  ]),
];

export default function CVPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filterItems = <T extends { tags: string[] }>(items: T[]) =>
    selectedTag === "All"
      ? items
      : items.filter(item => item.tags.includes(selectedTag));

  const filteredExperiences = filterItems(experiences);
  const filteredEducation = filterItems(education);
  const filteredProjects = filterItems(projects);
  const filteredCertifications = filterItems(certifications);


const [showAllProjects, setShowAllProjects] = useState(false);
const [initialProjects, setInitialProjects] = useState(3);

useEffect(() => {
  const updateProjectCount = () => {
    if (window.innerWidth >= 1024) {
      setInitialProjects(5); // desktop
    } else if (window.innerWidth >= 768) {
      setInitialProjects(4); // tablet
    } else {
      setInitialProjects(3); // mobile
    }
  };

  updateProjectCount();
  window.addEventListener("resize", updateProjectCount);

  return () => window.removeEventListener("resize", updateProjectCount);
}, []);

const displayedProjects = showAllProjects
  ? filteredProjects
  : filteredProjects.slice(0, initialProjects);


  return (
    <main className="w-full max-w-[1200px] mx-auto px-8 py-8">
      <h1 className="text-5xl font-bold mb-8">Experience</h1>

      <div className="flex flex-wrap gap-3 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full transition ${selectedTag === tag
              ? "bg-white text-black"
              : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-6 w-full">
        {filteredExperiences.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
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
          </>
        )}

        {filteredEducation.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4 mt-12">Education</h2>
            {filteredEducation.map((exp, index) => (
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
          </>
        )}

        {filteredProjects.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4 mt-12">Projects</h2>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayedProjects.map((project) => (
                <button
                  key={project.title}
                  className="group text-left flex flex-col"
                >
                  <div className="overflow-hidden rounded-2xl aspect-square border border-white/10 bg-black/20">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    >
                      {project.video}
                    </video>
                  </div>

                  <h3 className="mt-2 text-sm font-semibold">
                    {project.title}
                  </h3>
                </button>
              ))}
            </div>

            {filteredProjects.length > initialProjects && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {showAllProjects
                    ? "Show Less"
                    : `+ ${filteredProjects.length - initialProjects} More Projects`}
                </button>
              </div>
            )}
          </>
        )}

        {filteredCertifications.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4 mt-8">Certifications</h2>
            {filteredCertifications.map((exp, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-2xl p-12 bg-black/20 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-1xl font-semibold">
                      {exp.title}
                    </h2>
                    <p className="text-gray-400">{exp.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

      </div>
    </main>
  );
}