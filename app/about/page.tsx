'use client';

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { toggleTheme } from "../navbar";
import { Starfield } from "../starfield"; 

const likes = ["Inclusive design", "Deadlines", "Trees", "Olives", "Art", "Robotics", "Playful UX", "Making things", "Physical AI"];
const dislikes = ["Non-wired connections", "Inefficiencies", "Colour pickers without hex values", "Tradition", "Needless jargon", "Generic design"];

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
      className="absolute grid place-items-center rounded-full will-change-transform [backface-visibility:hidden]"
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
          ? "border-[var(--like-mid)]/40 bg-[color-mix(in_srgb,var(--like-mid)_40%,white)] text-[color-mix(in_srgb,var(--like-end)_70%,black) "
          : "border-[var(--dislike-mid)]/40 bg-[color-mix(in_srgb,var(--dislike-mid)_40%,white)] text-[color-mix(in_srgb,var(--dislike-end)_70%,black) "
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
        className={`relative z-0 h-full w-full overflow-visible transition-[filter] duration-300 ${active ? "star-glow-active" : "star-glow"

          }`}
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
        />
      </motion.svg>
    </motion.button>
  );
}


export default function AboutPage() {


  const stars = useMemo(() => {
    const words = [
      ...likes.map((word) => ({ word, kind: "like" as const })),
      ...dislikes.map((word) => ({ word, kind: "dislike" as const })),
    ];

    const positions = [[70, 34], [23, 54], [13, 26], [58, 88], [44, 47], [83, 33], [30, 24], [65, 57], [37, 83], [21, 43],
    [80, 67], [49, 25], [15, 68], [74, 44], [52, 68],
    ];


    return words.map((item, index) => ({
      ...item,
      x: positions[index][0],
      y: positions[index][1],
      dx: 10 + (index % 4) * 5,
      dy: 8 + (index % 3) * 5,
      rotate: 8 + (index % 4) * 6,
    }));
}, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-12 sm:px-8">
<Starfield/>
      <section
        className="relative z-10 mx-auto mb-20 w-full max-w-4xl text-center"
        aria-labelledby="about-title"
      >
        <div className="rectangle relative mx-auto max-w-5xl overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color-mix(in_srgb,var(--accent-light)_10%,transparent)] blur-3xl" aria-hidden="true" />

          <div className="relative grid items-center gap-10 md:items-start md:grid-cols-[minmax(12rem,0.75fr)_1.25fr] md:gap-14">
            <div className="flex flex-col items-center md:items-start">
              <div className="about-image-frame">
                <img src="/me.jpeg" alt="Aayushi" className="h-full w-full object-cover" />
              </div>
              <p className=" block w-full text-center mt-5 text-xs font-bold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--accent-light)_60%,transparent)]">Based in London</p>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.34em] text-[var(--accent-light)]">Hi there, I&apos;m Aayushi</h5>
              <h1 className="mt-4 max-w-2xl text-4xl text-foreground sm:text-6xl">
                Product manager, engineer, and designer.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[color-mix(in_srgb,var(--foreground)_75%,transparent)] sm:text-lg">
                I enjoy turning fuzzy ideas into useful, thoughtful experiences. My work sits at the intersection of product strategy, playful design, and hands-on engineering, and I&apos;m happiest when I&apos;m learning, making, and connecting seemingly unrelated things.
              </p>
              <p className="mt-4 explanation-text">
                Outside of work, you&apos;ll usually find me creating something. I paint, sculpt, build Raspberry Pi projects, and dive into almost any DIY challenge that catches my attention. I&apos;m loyal to no medium, just the joy of making.
              </p>
              <p className="mt-4 explanation-text">
                Curious, energetic, and loyal to no medium, I am a jack of all trades, hoping to master a few. Recently, I&apos;ve been exploring sustainable AI and its potential to help people and the planet.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/chat" className="featured-button px-5 py-3 text-sm transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-light)_25%,transparent)]">
                  Ask my AI CV <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/CV" className="buttons bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-light)_25%,transparent)]">
                  View my CV
                </Link>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#fishbowl"
          className="group mt-8 inline-flex flex-col items-center gap-2 text-xs text-[color-mix(in_srgb,var(--accent-light)_55%,transparent)] transition hover:text-[var(--accent-light)]"
        >
          <h5>There&apos;s more below</h5>
          <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">↓</span>
        </a>
      </section>



      <section id="fishbowl" className="relative z-10 mx-auto flex max-w-5xl scroll-mt-8 flex-col items-center">
        <h5 className="mb-6 text-xs">
          Get to know me
        </h5>
        <h1 className="text-center font-serif text-4xl tracking-tight sm:text-6xl">Fishbowl of feelings</h1>
        <p className="mt-3 max-w-xl text-center text-sm leading-6 sm:text-base">
          Hover over a star, or tap one on mobile, to discover something I like or dislike.
        </p>

        <button
          type="button"
          onClick={toggleTheme}
          className="dark-mode-only mt-4 rounded-full border border-[var(--accent-light)] bg-[var(--background)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)] shadow-[0_0_12px_color-mix(in_srgb,var(--accent-light)_20%,transparent)] transition hover:-translate-y-0.5 hover:border-[var(--accent-light)] hover:bg-[var(--accent-light)] hover:text-[var(--background)] md:inline-flex"
        >
          Much better in the dark
        </button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-foreground/75">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rotate-45 bg-[var(--like-mid)] shadow-[0_0_10px_var(--like-start)]" /> stars are likes</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rotate-45 bg-[var(--dislike-mid)] shadow-[0_0_10px_var(--dislike-start)]" /> stars are dislikes</span>
        </div>

        <div
          className="relative isolate mt-8 aspect-[4/3] w-full max-w-3xl overflow-hidden border-4 border-[color-mix(in_srgb,var(--bowl-border)_35%,transparent)] bg-gradient-to-b from-[color-mix(in_srgb,var(--bowl-start)_0%,var(--background))] via-[color-mix(in_srgb,var(--bowl-mid)_25%,transparent)] to-[color-mix(in_srgb,var(--bowl-end)_80%,transparent)] shadow-[inset_0_0_50px_color-mix(in_srgb,var(--bowl-highlight)_35%,transparent),0_15px_30px_color-mix(in_srgb,var(--accent-light)_25%,transparent)] backdrop-blur-sm"
          style={{
            borderRadius: "50% 50% 42% 42% / 10% 10% 70% 70%",
            backgroundClip: "padding-box",
          }}
        >

          <div
            className="pointer-events-none absolute left-[1%] top-[1.5%] z-20 h-[18%] w-[98%] rounded-[50%] border-2 border-[color-mix(in_srgb,var(--bowl-border)_25%,transparent)] bg-gradient-to-b from-[color-mix(in_srgb,var(--bowl-highlight)_0%,var(--background) )] via-[color-mix(in_srgb,var(--bowl-mid)_15%,transparent)] to-[color-mix(in_srgb,var(--bowl-end)_20%,transparent)] shadow-[inset_0_4px_18px_color-mix(in_srgb,var(--bowl-highlight)_35%,transparent),0_0_24px_color-mix(in_srgb,var(--bowl-border)_18%,transparent)]"
            aria-hidden="true"
          />


          {bubbles.map((bubble, index) => (
            <span
              key={index}
              className="absolute rounded-full border border-[color-mix(in_srgb,var(--bowl-border)_35%,transparent)] bg-[color-mix(in_srgb,var(--bowl-start)_20%,transparent)] shadow-[0_0_14px_color-mix(in_srgb,var(--bowl-border)_25%,transparent)]"
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