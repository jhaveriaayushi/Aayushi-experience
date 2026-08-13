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


  return (
    <main
  className={"relative min-h-[250vh]"}
>
  <div
  className="absolute inset-0 translate-x-[20%] -translate-y-[30%]"
>
  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-contain object-[90%_30%]"
>
    <source src="hero.mp4" type="video/mp4" />
  </video>

</div>

      <section className="relative h-screen flex flex-col items-start justify-center overflow-hidden">

      <div className="fixed inset-0 bg-gradient-to-r from-black/100 via-black/90 to-transparent"></div>

        <div className="relative z-10 w-full px-12">
        <h1 className="text-6xl font-extrabold mb-4 text-left">
          {displayed}
          {isTyping && <span className="animate-pulse">|</span>}
        </h1>

        <p className="text-xl foreground mb-8">
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
          <div className="grid grid-cols-2 gap-8 max-w-4xl w-full px-6 relative z-10">
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
          onClick={() => router.push("/cv")}
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