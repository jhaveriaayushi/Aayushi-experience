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
    <nav className="relative z-50 border-b">
      <div className="relative flex items-center p-3 border-b">
        <button
          className="ml-4 md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="[&>a]:transition-all [&>a]:hover:font-bold theme-font hidden md:flex px-4 gap-6 ">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/art">Art</Link>
          <Link href="/CV">CV</Link>
          {/*<Link href="/skills">Skills</Link>*/}
          {/*<Link href="/blog">Blog</Link>*/}
        </div>

        {/* Mobile menu */}


        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-[998]"
            onClick={() => setMenuOpen(false)}
          />
        )}
        <div
          onClick={() => setMenuOpen(false)}
          className={`
fixed top-0 left-0 h-screen w-64 z-[999]
bg-[var(--background)] border-r
transition-transform duration-300 ease-out
${menuOpen ? "translate-x-0" : "-translate-x-full"}
md:hidden
`}
        >
          <div className="flex flex-col px-4 pt-4 gap-3">
            <h1 className="font-bold theme-font">Menu</h1>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/chat">Chat</Link>
            <Link href="/art">Art</Link>
            <Link href="/CV">CV</Link>
            {/*<Link href="/skills">Skills</Link>*/}
            {/*<Link href="/blog">Blog</Link>*/}
          </div>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-bold theme-font text-xl">
          Aayushi
        </Link>




        <label className="ml-auto flex items-center gap-2">
          <span className="hidden sm:block theme-font">Boring</span>

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

          <span className="hidden sm:block theme-font">Fun</span>
        </label>





      </div>
    </nav>
  );

}