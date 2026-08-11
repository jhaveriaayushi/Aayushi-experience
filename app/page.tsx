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


  return (
    <main>
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-extrabold mb-4">
          {displayed}
          {isTyping && <span className="animate-pulse">|</span>}
        </h1>

        <p className="text-xl text-slate-600 mb-8">
          Ask me anything about Aayushi's
          experience, technical skills,
          project work, education and career journey.
        </p>

        <button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          > Get Started
          </button>
        </section>


          {showOptions && (
          <section
          ref={optionsRef}
          className="min-h-screen flex items-center justify-center"
          >
          <div className="grid grid-cols-2 gap-8 max-w-4xl w-full px-6">
          <button 
          onClick={() => router.push("/about")}
          className="h-48 text-2xl rounded-2xl bg-blue-500 text-white">
          About
          </button>
      
          <button 
          onClick={() => router.push("/chat")}
          className="h-48 text-2xl rounded-2xl bg-purple-500 text-white">
          AI Chat
          </button>
      
          <button 
          onClick={() => router.push("/cv")}
          className="h-48 text-2xl rounded-2xl bg-green-500 text-white">
          CV
          </button>
      
          <button 
          onClick={() => router.push("/gallery")}
          className="h-48 text-2xl rounded-2xl bg-orange-500 text-white">
          Art Gallery 
          </button>
          </div>
          </section>
)}
  
    </main>
  );
}