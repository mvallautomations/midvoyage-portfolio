"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* ============================================================
   mid·voyage — Navigation Component (WCAG 2.2 Compliant)
   - Mono type for all nav labels (JetBrains Mono spec)
   - Segmented theme toggle (Light / Dark) resolving name mismatch
   - Contrast enhanced to var(--ink-secondary) / font-weight 500
   ============================================================ */

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem("mv-theme");
    if (stored === "dark") {
      html.setAttribute("data-theme", "dark");
      setTimeout(() => setIsDark(true), 0);
    }
  }, []);

  function setTheme(dark: boolean) {
    const html = document.documentElement;
    const next = dark ? "dark" : "light";
    html.setAttribute("data-theme", dark ? "dark" : "");
    if (!dark) html.removeAttribute("data-theme");
    localStorage.setItem("mv-theme", next);
    setIsDark(dark);
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
              textDecoration: "none",
            }}
          >
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
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:
                    pathname === link.href
                      ? "var(--ink-primary)"
                      : "var(--ink-muted)",
                  transition: "color var(--dur-fast)",
                  textDecoration: "none",
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

            {/* Segmented sun/moon toggle matching components-nav.html */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid var(--border-light)",
                borderRadius: "3px",
                overflow: "hidden",
                background: "transparent",
              }}
              role="group"
              aria-label="Theme selection"
            >
              <button
                onClick={() => setTheme(false)}
                aria-label="Light mode"
                aria-pressed={!isDark}
                title="Light mode"
                style={{
                  background: !isDark ? "var(--bg-elevated)" : "none",
                  border: "none",
                  width: "34px",
                  height: "34px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: !isDark ? "var(--ink-primary)" : "var(--ink-muted)",
                  boxShadow: !isDark ? "inset 0 0 0 1px var(--border-medium)" : "none",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ width: "15px", height: "15px" }} aria-hidden="true">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path><path d="M12 20v2"></path>
                  <path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path>
                  <path d="M2 12h2"></path><path d="M20 12h2"></path>
                  <path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path>
                </svg>
              </button>
              <button
                onClick={() => setTheme(true)}
                aria-label="Dark mode"
                aria-pressed={isDark}
                title="Dark mode"
                style={{
                  background: isDark ? "var(--bg-elevated)" : "none",
                  border: "none",
                  width: "34px",
                  height: "34px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: isDark ? "var(--ink-primary)" : "var(--ink-muted)",
                  boxShadow: isDark ? "inset 0 0 0 1px var(--border-medium)" : "none",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "15px", height: "15px" }} aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>
            </div>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
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
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color:
                    pathname === link.href
                      ? "var(--ink-primary)"
                      : "var(--ink-secondary)",
                  padding: "0.5rem 0",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => { setTheme(false); setMenuOpen(false); }}
                aria-label="Light theme"
                style={{
                  background: !isDark ? "var(--bg-elevated)" : "none",
                  border: "1px solid var(--border-light)",
                  borderRadius: "3px",
                  padding: "0.5rem 1rem",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.7rem",
                  color: !isDark ? "var(--ink-primary)" : "var(--ink-secondary)",
                  minHeight: "44px",
                  cursor: "pointer",
                }}
              >
                Light
              </button>
              <button
                onClick={() => { setTheme(true); setMenuOpen(false); }}
                aria-label="Dark theme"
                style={{
                  background: isDark ? "var(--bg-elevated)" : "none",
                  border: "1px solid var(--border-light)",
                  borderRadius: "3px",
                  padding: "0.5rem 1rem",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.7rem",
                  color: isDark ? "var(--ink-primary)" : "var(--ink-secondary)",
                  minHeight: "44px",
                  cursor: "pointer",
                }}
              >
                Dark
              </button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
