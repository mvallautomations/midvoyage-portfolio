"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* ============================================================
   mid·voyage — Navigation Component
   - Mono type for all nav labels (JetBrains Mono spec)
   - Minimal editorial style — no fills, no heavy UI
   - Theme toggle: light ↔ dark
   - Mobile: hamburger hidden menu
   ============================================================ */

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync theme with <html data-theme>
  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem("mv-theme");
    if (stored === "dark") {
      html.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const next = isDark ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("mv-theme", next);
    setIsDark(!isDark);
  }

  return (
    <header
      style={{
        backgroundColor: "var(--bg-base)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "background-color var(--dur-base)",
      }}
    >
      <nav className="mv-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Brand wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--ink-primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            {/* Filled dot mark — signature brand element */}
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-terra)",
                flexShrink: 0,
              }}
            />
            <span>mid·voyage</span>
          </Link>

          {/* Desktop nav links */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:
                    pathname === link.href
                      ? "var(--ink-primary)"
                      : "var(--ink-muted)",
                  transition: "color var(--dur-fast)",
                  textDecoration: pathname === link.href ? "none" : "none",
                  borderBottom:
                    pathname === link.href
                      ? "1px solid var(--accent-terra)"
                      : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Theme toggle — sun/moon icon */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                background: "none",
                border: "1px solid var(--border-light)",
                borderRadius: "3px",
                padding: "0.4rem 0.55rem",
                cursor: "pointer",
                color: "var(--ink-muted)",
                transition: "all var(--dur-fast)",
                minHeight: "44px",
                minWidth: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isDark ? (
                /* Sun — switch to light */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                /* Moon — switch to dark */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none", /* shown via media query in CSS */
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              minWidth: "44px",
              minHeight: "44px",
              color: "var(--ink-primary)",
              fontSize: "1.25rem",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            style={{
              paddingBlock: "1rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:
                    pathname === link.href
                      ? "var(--ink-primary)"
                      : "var(--ink-muted)",
                  padding: "0.5rem 0",
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { toggleTheme(); setMenuOpen(false); }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                background: "none",
                border: "1px solid var(--border-light)",
                borderRadius: "3px",
                padding: "0.5rem 0.75rem",
                color: "var(--ink-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                minHeight: "44px",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {isDark ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  Dark
                </>
              )}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile nav responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
