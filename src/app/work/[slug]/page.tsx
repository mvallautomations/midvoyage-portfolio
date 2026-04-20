import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ============================================================
   mid·voyage — Case Study Placeholder (/work/[slug])
   Placeholder shell for all 3 projects.
   Replace content with real MDX case studies per project.
   ============================================================ */

// === PROJECT DATA MAP ===
// Single source of truth — update as case studies are written
const projects: Record<
  string,
  {
    title: string;
    eyebrow: string;
    description: string;
    status: string;
    year: string;
    tags: string[];
  }
> = {
  "kuya-koks": {
    title: "Kuya Kok's Griddle & Grill",
    eyebrow: "Restaurant · Web",
    description:
      "Full website build for a Filipino restaurant. Next.js 15, mobile-first, deployed to a custom domain.",
    status: "In Progress",
    year: "2025",
    tags: ["Next.js 15", "Tailwind CSS", "Vercel"],
  },
  "ra-bautista": {
    title: "R.A. Bautista — Senior Graphic Designer",
    eyebrow: "Design · Portfolio",
    description:
      "Personal portfolio for a senior graphic designer. Clean, design-forward presentation with curated work showcase and brand identity projects.",
    status: "Concept",
    year: "2025",
    tags: ["Figma", "Web Design", "Brand Identity", "Portfolio"],
  },
  "graceland-farm": {
    title: "Graceland Farm, Indang Cavite",
    eyebrow: "Agriculture · Research",
    description:
      "Competitive intelligence and farm positioning strategy. Seven-tab Excel workbook.",
    status: "In Progress",
    year: "2025",
    tags: ["Excel", "Research", "Strategy"],
  },
};

const projectShowcaseLinks: Record<
  string,
  { label: string; href?: string }[]
> = {
  "kuya-koks": [
    { label: "Live Demo (soon)" },
    { label: "Source Repo (soon)" },
    { label: "Deployment (soon)" },
  ],
  "ra-bautista": [
    { label: "Live Demo (soon)" },
    { label: "Source Repo (soon)" },
    { label: "Deployment (soon)" },
  ],
  "graceland-farm": [
    { label: "Live Demo (soon)" },
    { label: "Source Repo (soon)" },
    { label: "Deployment (soon)" },
  ],
};

// Generate static params for all known slugs
export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

// Dynamic metadata per case study
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];

  // Return 404 for unknown slugs
  if (!project) notFound();

  return (
    <>
      <Nav />

      <main>
        {/* === CASE STUDY HEADER === */}
        <section
          style={{
            paddingTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingBottom: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          <div className="mv-container">
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <Link
                href="/work"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                ← Work
              </Link>
            </div>

            <p
              className="eyebrow"
              style={{ marginBottom: "1.25rem", color: "var(--accent-terra)" }}
            >
              {project.eyebrow}
            </p>

            <h1
              style={{
                fontFamily: "var(--font-jakarta)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: "20ch",
                marginBottom: "1.5rem",
              }}
            >
              {project.title}
            </h1>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Status", value: project.status },
                { label: "Year", value: project.year },
              ].map((meta) => (
                <div key={meta.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {meta.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9375rem",
                      color: "var(--ink-primary)",
                    }}
                  >
                    {meta.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "3px",
                    border: "1px solid var(--border-light)",
                    color: "var(--ink-muted)",
                    backgroundColor: "var(--bg-elevated)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.45rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              {projectShowcaseLinks[slug]?.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "3px",
                      border: "1px solid var(--border-light)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={item.label}
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "3px",
                      border: "1px dashed var(--border-light)",
                      color: "var(--ink-muted)",
                      opacity: 0.7,
                    }}
                  >
                    {item.label}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mv-container">
          <hr className="mv-rule" />
        </div>

        {/* === PLACEHOLDER CONTENT === */}
        {/* Replace this section with MDX import when case study is written */}
        <section
          style={{
            paddingBlock: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <div
            className="mv-container"
            style={{ maxWidth: "72ch" }}
          >
            {/* Placeholder state */}
            <div
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px dashed var(--border-light)",
                borderRadius: "10px",
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-terra)",
                  marginBottom: "1.5rem",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "var(--ink-primary)",
                  marginBottom: "0.75rem",
                }}
              >
                Case study in progress.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.9375rem",
                  color: "var(--ink-secondary)",
                  lineHeight: 1.65,
                  maxWidth: "40ch",
                  margin: "0 auto 1.5rem",
                }}
              >
                {project.description} Full write-up coming soon.
              </p>
              <Link href="/work" className="mv-btn">
                ← Back to all work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
