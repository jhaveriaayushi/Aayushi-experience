"use client";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { AIyushi } from "./ai_box";

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
      className={"relative min-h-[250vh]"}
    >
      <div
        className="absolute inset-0 translate-x-[25%] overflow-hidden w-[90%]"
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

        <div className="fixed inset-0 bg-gradient-to-r from-background from-20% via-background/95 via-35% to-transparent to-90%" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12">
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] theme-font mb-4 leading-none">
            {displayed}
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>

          <p className="text-[clamp(1rem,4vw,1.25rem)] theme-sub-font foreground mb-8 max-w-[40ch]">
            Ask me anything about Aayushi's
            experience, technical skills,
            project work, education and career journey.
          </p>

          <button
            onClick={handleGetStarted}
            className="px-8 py-4 buttons rounded-xl transition"
          > Get Started
          </button>
        </div>
      </section>


      {showOptions && (
        <section
          ref={optionsRef}
          className="relative min-h-screen flex items-center justify-center"
        >
          {/*<div className="absolute bottom-0 h-250 left-0 right-0 bg-gradient-to-t from-black/100 via-black/90 to-transparent"></div>*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full px-6 md:px-20"
          >
            <button
              onClick={() => router.push("/about")}
              className="group rounded-3xl p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                ✨ About Me
              </h3>
                            <h4 className="mb-2 italic">How did I get here?</h4>
              <p className="text-sm text-white/70">
                Discover my journey, favourite things, pet peeves, and the path that brought me here.
              </p>
            </button>

            <button
              onClick={() => router.push("/chat")}
              className="group rounded-3xl p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                🤖 Ask <AIyushi />
              </h3>
              <h4 className="mb-2 italic">Ask me anything</h4>

              <p className="text-sm text-white/70">
              This AI knows my interests, experience, and plenty of wonderfully random facts.
              </p>
            </button>

            <button
              onClick={() => router.push("/CV")}
              className="group rounded-3xl p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                📄 CV Explorer
              </h3>
                            <h4 className="mb-2 italic">All you need to know professionally</h4>
              <p className="text-sm text-white/70">
                Browse my experience through interactive filters and themes.
              </p>
            </button>


            <button
              onClick={() => router.push("/art")}
              className="group rounded-3xl p-6 text-left backdrop-blur-sm buttons"
            >
              <h3 className="mb-2 text-2xl font-bold">
                🎨 Art Gallery
              </h3>
                            <h4 className="mb-2 italic">My creative corner</h4>
              <p className="text-sm text-white/70">
                A collection of sketches and experimentsfrom @aayushi_archives.
              </p>
            </button>

          </div>
        </section>
      )}

    </main>
  );
}