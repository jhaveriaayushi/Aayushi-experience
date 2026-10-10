"use client";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { AIyushi } from "./ai_box";
import { Starfield } from "./starfield";
import { Notepad } from "./notepad";

type HomeIconName = "about" | "chat" | "cv" | "art";

function HomeIcon({ name }: { name: HomeIconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 inline-block h-6 w-6 shrink-0 align-[-0.2em] text-[var(--accent-light)]"
    >
      {name === "about" && (
        <>
          <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
          <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
        </>
      )}
      {name === "chat" && (
        <>
          <path d="M12 3v3" />
          <rect x="4" y="6" width="16" height="14" rx="3" />
          <path d="M9 12h.01M15 12h.01M9 16h6" />
        </>
      )}
      {name === "cv" && (
        <>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5M10 13h6M10 17h6" />
        </>
      )}
      {name === "art" && (
        <>
          <path d="M12 3a9 9 0 1 0 0 18h1.1a2 2 0 0 0 1.4-3.4 1.8 1.8 0 0 1 1.3-3.1H18a3 3 0 0 0 3-3c0-4.7-4-8.5-9-8.5Z" />
          <path d="M7.5 10h.01M10 6.5h.01M15 7.5h.01" />
        </>
      )}
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const text = "Welcome to Aayushi";
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setShowOptions(true);

    setTimeout(() => {
      optionsRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    document.body.style.overflow = showOptions ? "auto" : "hidden";
    document.documentElement.style.overflow = showOptions ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showOptions]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main
      className={"relative  overflow-x-hidden"}
    >
      <Starfield/>
      <Notepad/>
      <div
        className="absolute inset-0 z-0 translate-x-[25%] overflow-hidden w-[90%]"
      >

        <video
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 33%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 33%)',
          }}
          autoPlay
          muted
          loop
          playsInline
          className="w-full"
        >
          <source src="hero.mp4" type="video/mp4" />
        </video>
      </div>

      <section className="relative h-screen flex flex-col items-start justify-center overflow-hidden">

        <div className="fixed z-2 inset-0 bg-gradient-to-r from-background from-20% via-background/95 via-35% to-transparent to-90%" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12">
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] mb-4 leading-none">
            {displayed}
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>

          <p className="explanation-text mb-8 max-w-[38ch] border-l-2 border-[var(--accent-light)] pl-4">
            A website project to learn web development and UX design.
            Browse my work, interests, and experience here.
          </p>

          <p
            className="mb-6 text-[0.8rem] tracking-[0.04em] text-[color-mix(in_srgb,var(--foreground)_60%,transparent)]"
          >
            <span
              aria-hidden="true"
              className="mr-[0.35rem] inline-block text-[var(--accent-light)]"
            >
              ↗︎
            </span>
            Use the toggle at the top to explore different themes.
          </p>

          <button
            onClick={handleGetStarted}
            className="px-5 py-3 featured-button text-sm transition"
          > Get Started
          </button>
        </div>
      </section>


      {showOptions && (
        <section
          ref={optionsRef}
          className="relative z-10 min-h-screen flex items-center justify-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full px-6 md:px-20 pb-8"
          >
            <button
              onClick={() => router.push("/about")}
              className="group rounded-3xl p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                <HomeIcon name="about" />About Me
              </h3>
              <h4 className="mb-2 text-xs">How did I get here?</h4>
              <p className="text-sm text-foreground/70">
                Me in a nutshell and then a little bit more about me.
              </p>
            </button>

            <button
              onClick={() => router.push("/chat")}
              className="group  p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                <HomeIcon name="chat" />Ask <AIyushi />
              </h3>
              <h4 className="mb-2 text-xs">Ask me anything</h4>

              <p className="text-sm text-foreground/70">
                Have specfic questions? Ask my AI for a quick answer.
              </p>
            </button>

            <button
              onClick={() => router.push("/CV")}
              className="group rounded-3xl p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                <HomeIcon name="cv" />CV Explorer
              </h3>
              <h4 className="mb-2 text-xs">All things professional</h4>
              <p className="text-sm text-foreground/70">
                Browse my experience through interactive filters and sections.
              </p>
            </button>


            <button
              onClick={() => router.push("/art")}
              className="group rounded-3xl p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                <HomeIcon name="art" />Art Gallery
              </h3>
              <h4 className="mb-2 text-xs">Creative bits and bobs</h4>
              <p className="text-sm text-foreground/70">
                A collection of sketches and experiments from @aayushi_archives.
              </p>
            </button>

          </div>
        </section>
      )}

    </main>
  );
}