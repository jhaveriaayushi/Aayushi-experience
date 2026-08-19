"use client";

import { useState } from "react";

const facts = [
  "🎨 Artist",
  "💻 Developer",
  "🤖 AI Product Manager",
  "📊 Public Sector Consultant",
  "⚡ Automation Enthusiast",
  "🌍 Problem Solver",
];

export default function AboutPage() {
  const [selected, setSelected] = useState("About");

  return (
    <main className="min-h-screen bg-background theme-font px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-pink-400 uppercase tracking-[0.3em] mb-4">
            ABOUT ME
          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Hi, I'm
            <span className="text-pink-400"> Aayushi</span>.
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            I blend technology, creativity, and strategy to build things that
            make people's lives easier. From developing AI products and
            automating complex workflows to creating artwork and websites,
            I love turning ideas into reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4">My Story</h2>

              <p className="text-gray-300 leading-relaxed">
                I'm a Technical Product Manager and Consultant based in London.
                My background spans software engineering, AI, public sector
                transformation, automation, and design.
              </p>

              <p className="text-gray-300 mt-4 leading-relaxed">
                When I'm not building products or automating processes,
                you'll usually find me painting, experimenting with creative
                technology, or working on side projects like AIyushi.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Things I Love
              </h2>

              <div className="flex flex-wrap gap-3">
                {facts.map((fact) => (
                  <span
                    key={fact}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-pink-500/20 transition"
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Quick Facts
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-semibold">London 🇬🇧</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Degree</p>
                <p className="font-semibold">EEE 🎓</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Favourite Tech</p>
                <p className="font-semibold">AI + Automation</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Current Focus</p>
                <p className="font-semibold">Building Intelligent Products</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-bold mb-4">Currently Exploring</h3>

              <div className="space-y-3">
                {[
                  "Generative AI",
                  "Product Strategy",
                  "Creative Coding",
                  "Digital Transformation",
                ].map((item) => (
                  <div key={item}>
                    <div className="flex justify-between mb-1">
                      <span>{item}</span>
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-pink-500 to-purple-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-10 w-full py-4 rounded-2xl bg-pink-500 hover:bg-pink-400 transition font-semibold">
              Ask AIyushi About Me →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}