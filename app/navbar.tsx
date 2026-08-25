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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b z-20">
      <div className="relative flex items-center p-3 border-b">
        <button
          className="ml-4 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex px-4 gap-6 ">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/art">Art</Link>
          <Link href="/">CV</Link>
          <Link href="/">Skills</Link>
          <Link href="/blog">Blog</Link>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
            <div className="md:hidden flex flex-col px-4 pb-4 gap-3 absolute top-12 left-0 w-full bg-[var(--background)] border-b">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/chat">Chat</Link>
            <Link href="/art">Art</Link>
            <Link href="/">CV</Link>
            <Link href="/">Skills</Link>
            <Link href="/blog">Blog</Link>
          </div>
        )}

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-bold text-xl">
          AIyushi
        </Link>





        <label className="ml-auto flex items-center gap-2">
          <span className="hidden sm:block">Boring</span>

          <div
            onClick={toggleTheme}
            className="w-14 h-8 rounded-full cursor-pointer relative bg-foreground"
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${theme === "fun"
                  ? "translate-x-7"
                  : "translate-x-1"
                }`}
            />
          </div>

          <span className="hidden sm:block">Fun</span>
        </label>





      </div>
    </nav>
  );

}