'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const likes = ["AI", "Olives", "Art", "Robotics", "Playful UX", "Making things", "Automation"];
const dislikes = ["Boring forms", "Clutter", "Tiny buttons", "Slow websites", "Needless jargon"];

const starPaths = [
  "50 4 61 35 94 35 67 54 78 87 50 67 22 87 33 54 6 35 39 35",
  "50 6 59 37 91 29 68 53 87 79 56 68 40 96 35 64 3 59 33 43",
  "50 5 62 34 95 36 68 56 79 90 50 70 20 90 31 56 5 36 38 34",
];

const bubbles = [
  { left: "18%", top: "72%", size: "clamp(4px, 3vw, 50px)", delay: "0s" },
  { left: "30%", top: "82%", size: "clamp(6px, 5vw, 34px)", delay: "1s" },
  { left: "68%", top: "76%", size: "clamp(5px, 2vw, 42px)", delay: "0.5s" },
  { left: "78%", top: "86%", size: "clamp(4px, 4vw, 30px)", delay: "1.5s" },
];

type StarItem = {
  word: string;
  kind: "like" | "dislike";
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
};

function FloatingStar({
  item,
  index,
}: {
  item: StarItem;
  index: number;
}) {
  const [active, setActive] = useState(false);
  const isLike = item.kind === "like";
  const size = `clamp(24px, ${6 + (index % 3) * 1.2}vw, ${38 + (index % 3) * 8}px)`;
  const duration = 13 + (index % 5) * 2.3;
  const path = starPaths[index % starPaths.length];

  return (
    <motion.button
      type="button"
      aria-label={`${isLike ? "Like" : "Dislike"}: ${item.word}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="absolute grid place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-4 focus-visible:ring-offset-cyan-950"
      style={{ left: `${item.x}%`, top: `${item.y}%`, width: size, height: size }}
      animate={{
        x: [0, item.dx, -item.dx * 0.55, 0],
        y: [0, -item.dy, item.dy * 0.7, 0],
        rotate: [0, item.rotate, -item.rotate * 0.55, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: index * -0.8 }}
      whileHover={{ scale: 1.18 }}
    >
      <motion.span
        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide shadow-xl backdrop-blur-md ${isLike
          ? "border-amber-100/40 bg-amber-100/90 text-amber-950"
          : "border-violet-100/40 bg-violet-100/90 text-violet-950"
          }`}
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? -3 : -28,
          scale: active ? 1 : 0.85,
        }}
        transition={{ duration: 0.2 }}
      >
        {item.word}
      </motion.span>

      <motion.svg
        viewBox="0 0 100 100"
        className="relative z-0 h-full w-full overflow-visible drop-shadow-[0_0_10px_rgba(255,255,255,0.65)]"
        animate={{ filter: active ? "brightness(1.3)" : "brightness(1)" }}
      >
        <defs>
          <linearGradient id={`star-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor={isLike ? "var(--like-start)" : "var(--dislike-start)"}
            />
            <stop
              offset="55%"
              stopColor={isLike ? "var(--like-mid)" : "var(--dislike-mid)"}
            />
            <stop
              offset="100%"
              stopColor={isLike ? "var(--like-end)" : "var(--dislike-end)"}
            />
          </linearGradient>
        </defs>

        <polygon
          points={path}
          fill={`url(#star-${index})`}
          stroke="rgba(255,255,255,.8)"
          strokeWidth="3"
        />
      </motion.svg>
    </motion.button>
  );
}

export default function AboutPage() {
  const stars = (() => {
    const words = [
      ...likes.map((word) => ({ word, kind: "like" as const })),
      ...dislikes.map((word) => ({ word, kind: "dislike" as const })),
    ];

    const positions = [
      [13, 26], [21, 23], [30, 14], [49, 25], [70, 14], [83, 33],
      [23, 54], [44, 47], [65, 57], [80, 67], [37, 73], [58, 78],
    ];

    return words.map((item, index) => ({
      ...item,
      x: positions[index][0],
      y: positions[index][1],
      dx: 10 + (index % 4) * 5,
      dy: 8 + (index % 3) * 5,
      rotate: 8 + (index % 4) * 6,
    }));
  })();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-12 sm:px-8">

      <section
        className="relative mx-auto mb-20 w-full max-w-4xl text-center"
        aria-labelledby="about-title"
      >
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--accent-light)_20%,transparent)] bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-light)_12%,transparent)] via-[color-mix(in_srgb,var(--background)_60%,transparent)] to-[color-mix(in_srgb,var(--accent-dark)_20%,transparent)] p-6 shadow-2xl shadow-[color-mix(in_srgb,var(--accent-dark)_30%,transparent)] backdrop-blur-md sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color-mix(in_srgb,var(--accent-light)_10%,transparent)] blur-3xl" aria-hidden="true" />

          <div className="relative grid items-center gap-10 md:items-start md:grid-cols-[minmax(12rem,0.75fr)_1.25fr] md:gap-14">
            <div className="flex flex-col items-center md:items-start">
              <div className="about-image-frame relative h-48 w-48 overflow-hidden rounded-[2rem] shadow-2xl shadow-[color-mix(in_srgb,var(--accent-dark)_40%,transparent)] transition-[border-radius,transform] duration-700 ease-in-out hover:rotate-2 hover:scale-[1.02] sm:h-60 sm:w-60">
                <img src="/me.jpeg" alt="Aayushi" className="h-full w-full object-cover" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--accent-light)_60%,transparent)]">Based in London · Always making</p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.34em] text-[var(--accent-light)]">Hi there, I&apos;m Aayushi</p>
              <h2 id="about-title" className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                Product manager, designer, and engineer.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[color-mix(in_srgb,var(--foreground)_75%,transparent)] sm:text-lg">
                I enjoy turning fuzzy ideas into useful, thoughtful experiences. My work sits at the intersection of product strategy, playful design, and hands-on engineering, and I&apos;m happiest when I&apos;m learning, making, and connecting seemingly unrelated things.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[color-mix(in_srgb,var(--foreground)_55%,transparent)] sm:text-base">
                Outside of work, you&apos;ll usually find me creating something. I paint, sculpt, build Raspberry Pi projects, and dive into almost any DIY challenge that catches my attention. I&apos;m loyal to no medium, just the joy of making.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[color-mix(in_srgb,var(--foreground)_55%,transparent)] sm:text-base">
                Curious, energetic, and loyal to no medium, I am a jack of all trades, hoping to master a few. Recently, I&apos;ve been exploring sustainable AI and its potential to help people and the planet.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/chat" className="rounded-full bg-[var(--accent-light)] px-5 py-3 text-sm font-bold text-[var(--background)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-light)_25%,transparent)]">
                  Ask my AI CV <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/CV" className="rounded-full border border-[color-mix(in_srgb,var(--accent-light)_25%,transparent)] px-5 py-3 text-sm font-semibold text-[color-mix(in_srgb,var(--foreground)_80%,transparent)] transition hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent-light)_70%,transparent)] hover:text-[var(--foreground)]">
                  View my CV
                </Link>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#fishbowl"
          className="group mt-8 inline-flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--accent-light)_55%,transparent)] transition hover:text-[var(--accent-light)]"
        >
          <span>There&apos;s more below</span>
          <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">↓</span>
        </a>
      </section>



      <section id="fishbowl" className="relative mx-auto flex max-w-5xl scroll-mt-8 flex-col items-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.34em] text-cyan-200/80">
          Get to know me
        </p>
        <h1 className="text-center font-serif text-4xl tracking-tight sm:text-6xl">Fishbowl of feelings</h1>
        <p className="mt-3 max-w-xl text-center text-sm leading-6 text-cyan-50/65 sm:text-base">
          Hover over a star, or tap one on mobile, to discover something I like or dislike.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-white/75">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rotate-45 bg-amber-300 shadow-[0_0_10px_#fbbf24]" /> Golden stars are likes</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rotate-45 bg-violet-400 shadow-[0_0_10px_#a78bfa]" /> Violet stars are dislikes</span>
        </div>

        <div
          className="relative isolate mt-8 aspect-[4/3] w-full max-w-3xl overflow-hidden border-4 border-cyan-100/35 bg-gradient-to-b from-cyan-300/15 via-sky-500/10 to-indigo-950/55 shadow-[inset_0_0_50px_rgba(125,211,252,0.18),0_35px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm"
          style={{
            borderRadius: "50% 50% 42% 42% / 10% 10% 70% 70%",
            backgroundClip: "padding-box",
          }}
        >

          <div
            className="pointer-events-none absolute left-[1%] top-[1.5%] z-20 h-[18%] w-[98%] rounded-[50%] border-2 border-cyan-100/30 bg-gradient-to-b from-cyan-100/25 via-cyan-300/10 to-transparent shadow-[inset_0_4px_18px_rgba(207,250,254,0.2),0_0_24px_rgba(103,232,249,0.12)]"
            aria-hidden="true"
          />


          {bubbles.map((bubble, index) => (
            <span
              key={index}
              className="absolute rounded-full border border-cyan-100/40 bg-cyan-100/15 shadow-[0_0_14px_rgba(125,211,252,0.3)]"
              style={{
                left: bubble.left,
                top: bubble.top,
                width: bubble.size,
                height: bubble.size,
                animation: `floatBubble 4s ease-in-out ${bubble.delay} infinite`,
              }}
            />
          ))}

          {stars.map((item, index) => (
            <FloatingStar key={`${item.word}-${index}`} item={item} index={index} />
          ))}
        </div>

      </section>


    </main>
  );
}