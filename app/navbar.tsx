"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const toggleTheme = () => {
  
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
};

export function Navbar() {
  const [theme, setTheme] = useState("light");

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


  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 border-b bg-background">
      <div className="relative flex items-center p-3 border-b">
        <button
          className="ml-4 md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="[&>a]:transition-all [&>a]:hover:font-bold sub-theme-font hidden md:flex px-4 gap-6 ">
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
            <p className="font-bold theme-font text-xl">Menu</p>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/chat">Chat</Link>
            <Link href="/art">Art</Link>
            <Link href="/CV">CV</Link>
            {/*<Link href="/skills">Skills</Link>*/}
            {/*<Link href="/blog">Blog</Link>*/}
          </div>
        </div>

        <Link href="/" className="

absolute left-1/2 -translate-x-1/2
font-bold theme-font text-xl
transition-all
hover:text-[var(--accent-light)]
hover:text-shadow-[0_0_10px_var(--accent-light)]
">
          Aayushi
        </Link>


        <label className="ml-auto flex items-center gap-2">
          <span className="hidden sm:block sub-theme-font">Light</span>

          <div
            onClick={toggleTheme}
            className="w-14 h-8 rounded-full cursor-pointer relative bg-[var(--accent-dark)] transition-colors"
          >
            <div
              className={`theme-toggle-thumb`}
            />
          </div>

          <span className="hidden sm:block sub-theme-font">Dark</span>
        </label>

      </div>

      <div className="border-t border-[color-mix(in_srgb,var(--accent-light)_15%,transparent)] bg-[color-mix(in_srgb,var(--accent-dark)_18%,transparent)] px-4 py-1.5 text-center text-xs font-medium tracking-wide text-[color-mix(in_srgb,var(--foreground)_75%,transparent)]">
        This website is still a work in progress.
      </div>
    </nav>
  );

}