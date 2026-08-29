"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="
          flex
          items-center
          justify-center
          p-2
          bg-transparent
          text-gray-700
          dark:text-[#D5DDF0]
          hover:text-[#2D7DFF]
          dark:hover:text-[#2D7DFF]
          transition-colors
          duration-300
        "
      />
    );
  }

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      aria-label="Toggle theme"
      className="
        flex
        items-center
        justify-center
        p-2
        bg-transparent
        text-gray-700
        dark:text-[#D5DDF0]
        hover:text-[#2D7DFF]
        dark:hover:text-[#2D7DFF]
        transition-colors
        duration-300
      "
    >
      {theme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}