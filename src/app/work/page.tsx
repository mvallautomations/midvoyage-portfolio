import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkCard, { WorkCardProps } from "@/components/WorkCard";

/* ============================================================
   mid·voyage — Work Index (/work)
   Grid of case study cards with filters (future-ready)
   ============================================================ */

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI systems, web builds, and strategy work by Mishael Vallar. Solo founder, Philippines.",
};

// === ALL WORK — expand as projects grow ===
const allWork: WorkCardProps[] = [
  {
    slug: "kuya-koks",
    eyebrow: "Restaurant · Web",
    title: "Kuya Kok's Griddle & Grill",
    description:
      "Full website build for a Filipino restaurant. Next.js 15, mobile-first design, deployed on a custom domain. Sibling project — real brief, real constraints, zero budget.",
    tags: ["Next.js 15", "Tailwind CSS", "Vercel", "HTML/CSS"],
    status: "in-progress",
    year: "2025",
    featured: true,
    showcaseLinks: [
      { label: "Live Demo (soon)" },
      { label: "Source Repo (soon)" },
      { label: "Deployment (soon)" },
      { label: "Case Study", href: "/work/kuya-koks" },
    ],
  },
  {
    slug: "ra-bautista",
    eyebrow: "Creative · Positioning Refresh",
    title: "R.A. Studio — Senior Brand Partner",
    description:
      "Portfolio audit and value-based positioning refresh for a 14+ yr senior creative. Pivoted from hourly lowball rates to selling bought-back executive time.",
    tags: ["React / Vite", "Positioning Refresh", "Value-Based Retainers"],
    status: "live",
    year: "2026",
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/ra-portfolio-site" },
      { label: "Case Study", href: "/work/ra-bautista" },
    ],
  },
  {
    slug: "graceland-farm",
    eyebrow: "Agriculture · Research",
    title: "Graceland Farm, Indang Cavite",
    description:
      "Competitive intelligence report for a family farm. Seven-tab Excel workbook covering market positioning, comparable farm analysis, and infrastructure investment roadmap.",
    tags: ["Excel", "Research", "Strategy", "Competitive Intel"],
    status: "in-progress",
    year: "2025",
    showcaseLinks: [
      { label: "Live Demo (soon)" },
      { label: "Source Repo (soon)" },
      { label: "Deployment (soon)" },
      { label: "Case Study", href: "/work/graceland-farm" },
    ],
  },
];

export default function WorkPage() {
  return (
    <>
      <Nav />

      <main>
        {/* === PAGE HEADER === */}
        <section
          style={{
            paddingTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingBottom: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          <div className="mv-container">
            <p
              className="eyebrow fade-up"
              style={{
                marginBottom: "1.25rem",
                color: "var(--accent-terra)",
              }}
            >
              Work · {allWork.length} projects
            </p>
            <h1
              className="fade-up fade-up-delay-1"
              style={{
                fontFamily: "var(--font-jakarta)",
                fontWeight: 800,
                fontSize: "clamp(2.25rem, 6vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: "16ch",
                marginBottom: "1.5rem",
              }}
            >
              Projects &{" "}
              <span className="ghost-word" style={{ fontSize: "inherit" }}>
                case studies.
              </span>
            </h1>
            <p
              className="fade-up fade-up-delay-2"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: "var(--ink-secondary)",
                maxWidth: "55ch",
              }}
            >
              Pre-revenue builds, family business projects, and strategy work.
              All done solo, at $0 tooling cost, documented in public.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="mv-container">
          <hr className="mv-rule" />
        </div>

        {/* === WORK GRID === */}
        <section
          style={{
            paddingBlock: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          <div className="mv-container">
            {/* Grid — 2 col on md+, 1 col mobile */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap: "1.25rem",
              }}
            >
              {allWork.map((project) => (
                <WorkCard key={project.slug} {...project} />
              ))}
            </div>

            {/* Future state note — placeholder for when more projects land */}
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-terra)",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                More projects being documented. Building in public.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
