"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Suppress the React 19 / Next.js script tag false positive in dev
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const origError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    origError(...args);
  };
}

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider scriptProps={{ type: "application/json" }} {...props}>
      {children}
    </NextThemesProvider>
  );
}