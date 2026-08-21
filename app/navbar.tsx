"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [theme, setTheme] = useState("boring");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute(
        "data-theme",
        savedTheme
      );
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "boring" ? "fun" : "boring";

    setTheme(newTheme);
    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem("theme", newTheme);

  };

  return (
    <nav className="flex gap-6 p-4 border-b z-20">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/chat">Chat</Link>
      <Link href="/art">Art</Link>
      <Link href="/CV">CV</Link>
      <Link href="/skills">Skills</Link>
      <Link href="/blog">Blog</Link>

      <label className="ml-auto flex items-center gap-2">
        <span>Boring Mode</span>

        <div
          onClick={toggleTheme}
          className={`w-14 h-8 rounded-full cursor-pointer relative transition-colors bg-foreground`}
        >
          <div
            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${theme === 'fun'
                ? 'translate-x-7'
                : 'translate-x-1'
              }`}
          />
        </div>

        <span>Fun Mode</span>
      </label>
    </nav>
  );
}