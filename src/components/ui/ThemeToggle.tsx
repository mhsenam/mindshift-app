"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if browser supports localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      // Get stored theme or system preference
      const storedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setIsDarkMode(
        storedTheme === "dark" || (!storedTheme && systemPrefersDark)
      );
    }
  }, []);

  // Update theme when state changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDarkMode]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <FiSun className="text-yellow-400" size={20} />
      ) : (
        <FiMoon className="text-gray-700" size={20} />
      )}
    </button>
  );
}
