"use client";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

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
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] theme-font font-extrabold mb-4 leading-none">
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
          className="px-8 py-4 buttons rounded-xl hover:bg-blue-700 transition"
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
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full px-6"
>
          <button 
          onClick={() => router.push("/about")}
          className="cursor-pointer h-48 text-2xl rounded-2xl buttons">
          About
          </button>
      
          <button 
          onClick={() => router.push("/chat")}
          className="cursor-pointer h-48 text-2xl rounded-2xl buttons">
          AI Chat
          </button>
      
          <button 
          onClick={() => router.push("/CV")}
          className="cursor-pointer h-48 text-2xl rounded-2xl buttons">
          CV
          </button>
      
          <button 
          onClick={() => router.push("/art")}
          className="cursor-pointer h-48 text-2xl rounded-2xl buttons">
          Art Gallery 
          </button>
          </div>
          </section>
)}
  
    </main>
  );
}