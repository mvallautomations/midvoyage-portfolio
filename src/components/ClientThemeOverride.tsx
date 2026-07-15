"use client";

import { useEffect } from "react";

export default function ClientThemeOverride({ theme }: { theme: string }) {
  useEffect(() => {
    const html = document.documentElement;
    const oldTheme = html.getAttribute("data-theme");
    
    // Force dark mode
    html.setAttribute("data-theme", "dark");
    
    let overrides: Record<string, string> = {};

    if (theme === "ra-bautista") {
      overrides = {
        "--accent-terra": "#FACC15", // yellow-400
        "--bg-base": "#0A0A0A", // Custom background
        "--bg-surface": "#1A1A1A", // Custom surface
        "--bg-base-glass": "rgba(10, 10, 10, 0.85)",
        "--font-jakarta": "Inter, sans-serif",
        "--font-dm-sans": "Inter, sans-serif",
        "--font-dm-serif": "Georgia, serif",
      };
    } else if (theme === "kuya-koks") {
      overrides = {
        "--accent-terra": "#D4151C", // KK Red
        "--bg-base": "#0d0d0d", // Deep Black
        "--bg-surface": "#111111", // Dark Charcoal
        "--bg-base-glass": "rgba(13, 13, 13, 0.85)",
        "--font-jakarta": "Montserrat, sans-serif",
        "--font-dm-sans": "Montserrat, sans-serif",
        "--font-dm-serif": "'Bebas Neue', sans-serif",
      };
    }

    Object.entries(overrides).forEach(([key, value]) => {
      html.style.setProperty(key, value);
    });

    return () => {
      // Restore previous state
      html.setAttribute("data-theme", oldTheme || "light");
      Object.keys(overrides).forEach((key) => {
        html.style.removeProperty(key);
      });
    };
  }, []);

  return null;
}
