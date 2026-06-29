import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    title: "Kuya Kok's Brand Audit First. Business Audit Ongoing.",
    eyebrow: "Restaurant · Systems Architecture & Brand Audit",
    description:
      "Comprehensive brand audit and operational systems overhaul for a Filipino casual dining restaurant.",
    status: "Active Engagement",
    year: "2026",
    tags: ["Brand Audit", "Systems Architecture", "n8n Automations", "AI Agents"],
  },
  "ra-bautista": {
    title: "R.A. Studio — Senior Brand Partner",
    eyebrow: "Creative · Positioning Refresh",
    description:
      "Portfolio audit and value-based positioning refresh for a 14+ yr senior creative. Pivoted from hourly lowball rates to selling bought-back executive time.",
    status: "Live",
    year: "2026",
    tags: ["React / Vite", "Positioning Refresh", "Value-Based Retainers"],
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
    { label: "Client Roadmap", href: "/blog" },
    { label: "Systems Architecture", href: "/about" },
  ],
  "ra-bautista": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/ra-portfolio-site" },
  ],
  "graceland-farm": [
    { label: "Live Demo (soon)" },
    { label: "Source Repo (soon)" },
  ],
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

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
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-secondary)",
                  textDecoration: "none",
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
                maxWidth: "22ch",
                marginBottom: "1.5rem",
              }}
            >
              {project.title}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "2.5rem",
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
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-secondary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {meta.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "1rem",
                      color: "var(--ink-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {meta.value}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "3px",
                    border: "1px solid var(--border-light)",
                    color: "var(--ink-secondary)",
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
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
              }}
            >
              {projectShowcaseLinks[slug]?.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.35rem 0.7rem",
                      borderRadius: "3px",
                      border: "1px solid var(--border-medium)",
                      color: "var(--ink-primary)",
                      backgroundColor: "var(--bg-elevated)",
                      textDecoration: "none",
                    }}
                  >
                    {item.label} →
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>

        <div className="mv-container">
          <hr className="mv-rule" />
        </div>

        {/* === CASE STUDY CONTENT === */}
        <section
          style={{
            paddingBlock: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <div className="mv-container" style={{ maxWidth: "72ch" }}>
            {slug === "kuya-koks" ? (
              <article style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div style={{ padding: "2rem", backgroundColor: "var(--bg-surface)", borderRadius: "6px", borderLeft: "4px solid var(--accent-terra)" }}>
                  <p style={{ fontFamily: "var(--font-dm-serif)", fontStyle: "italic", fontWeight: 700, fontSize: "1.25rem", color: "var(--ink-primary)", marginBottom: "0.5rem" }}>
                    "Dispatches from the middle of figuring it out."
                  </p>
                  <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.75rem", color: "var(--ink-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Mishael Vallar — Quiet Observer & Systems Cartographer
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem", color: "var(--ink-primary)" }}>
                    1. The Audit Foundation
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-primary)", marginBottom: "1rem" }}>
                    Kuya Kok's Griddle and Grill represents a classic staple of Filipino casual dining—built around high-energy neighborhood service, family gatherings, and authentic griddle specialties. However, like many rapidly growing SMB restaurants in the Philippines, their operational friction grew in lockstep with customer demand.
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-secondary)" }}>
                    Rather than immediately prescribing software solutions or complex automation tools, our engagement initiated with a surgical **Brand Audit First** approach. Before automating operational flows, a business must establish unwavering clarity in its brand identity, customer touchpoints, and value proposition.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem", color: "var(--ink-primary)" }}>
                    2. Diagnosing Operational Friction
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-primary)", marginBottom: "1.5rem" }}>
                    During the ongoing discovery and diagnostic mapping, several core structural challenges emerged that required immediate alignment:
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingLeft: "1.25rem", fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", color: "var(--ink-primary)", lineHeight: 1.6 }}>
                    <li><strong>Order Intake & Flow:</strong> Reliance on manual order sheets creating communication bottlenecks between front-of-house staff and the kitchen griddle stations.</li>
                    <li><strong>Inventory & Supply Tracking:</strong> Stock levels for critical perishable ingredients tracked informally through memory and paper checklists.</li>
                    <li><strong>Compliance & HR Records:</strong> Informal management of mandatory statutory reporting (BIR receipts, SSS, PhilHealth contributions) and staff scheduling.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem", color: "var(--ink-primary)" }}>
                    3. The Roadmap: From Tier 1 Automation to Tier 2 AI Agents
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-primary)", marginBottom: "1.5rem" }}>
                    To ensure sustainable execution without overwhelming daily restaurant operations, the transformation follows a phased architectural progression:
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-elevated)", borderRadius: "6px", border: "1px solid var(--border-light)" }}>
                      <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", color: "var(--accent-terra)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
                        Phase 1 — Brand Audit & Digital Presence (Active)
                      </span>
                      <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.25rem", fontWeight: 700, margin: "0.5rem 0", color: "var(--ink-primary)" }}>
                        Standardizing Identity & Touchpoints
                      </h3>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                        Establishing a cohesive digital presence, responsive web interface, and clear menu architecture mapped to customer ordering behaviors.
                      </p>
                    </div>

                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-elevated)", borderRadius: "6px", border: "1px solid var(--border-light)" }}>
                      <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", color: "var(--accent-terra)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
                        Phase 2 — Tier 1 Automations (Pending)
                      </span>
                      <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.25rem", fontWeight: 700, margin: "0.5rem 0", color: "var(--ink-primary)" }}>
                        n8n Operational Workflows
                      </h3>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                        Deploying automated inventory depletion triggers, digital shift scheduling alerts, and standardized payroll calculation pipelines.
                      </p>
                    </div>

                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-elevated)", borderRadius: "6px", border: "1px solid var(--border-light)" }}>
                      <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", color: "var(--accent-terra)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
                        Phase 3 — Tier 2 AI Agents (Planned)
                      </span>
                      <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.25rem", fontWeight: 700, margin: "0.5rem 0", color: "var(--ink-primary)" }}>
                        Intelligent Restaurant Assistants
                      </h3>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                        Integrating conversational AI agents to handle reservations, customer inquiries, and predictive supply chain restocking based on historical sales volume.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <Link href="/work" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.8rem", fontWeight: 500, color: "var(--ink-primary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    ← Back to all work
                  </Link>
                </div>
              </article>
            ) : slug === "ra-bautista" ? (
              <article style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div style={{ padding: "2rem", backgroundColor: "var(--bg-surface)", borderRadius: "6px", borderLeft: "4px solid var(--accent-terra)" }}>
                  <p style={{ fontFamily: "var(--font-dm-serif)", fontStyle: "italic", fontWeight: 700, fontSize: "1.25rem", color: "var(--ink-primary)", marginBottom: "0.5rem" }}>
                    "Repositioning creative mastery from hourly labor to executive leverage."
                  </p>
                  <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.75rem", color: "var(--ink-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Case Study · Freelance Positioning & Brand Architecture Audit
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem", color: "var(--ink-primary)" }}>
                    1. The Hourly Freelancer Trap
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-primary)", marginBottom: "1rem" }}>
                    Despite possessing 14+ years of tier-1 graphic design and visual storytelling mastery, the client was trapped in a common professional bottleneck: competing on hourly rates, enduring scope creep, and fielding lowball negotiations from transactional clients.
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-secondary)" }}>
                    When senior creatives position themselves as generalist executioners, buyers commoditize their time. To command high-value retainers, the entire portfolio architecture needed to shift from showcasing individual aesthetic deliverables to demonstrating compounding business leverage.
                  </p>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem", color: "var(--ink-primary)" }}>
                    2. The Audit & Positioning Refresh
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-primary)", marginBottom: "1.5rem" }}>
                    We conducted a surgical portfolio overhaul focused on shifting the narrative to attracting mature founders willing to pay to buy back their executive time:
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingLeft: "1.25rem", fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", color: "var(--ink-primary)", lineHeight: 1.6 }}>
                    <li><strong>Anonymized Executive Branding:</strong> Rebranded the portfolio entity to **R.A. Studio**, establishing an authoritative studio presence that commands peer-level respect rather than subordinate freelancer dynamics.</li>
                    <li><strong>Selling Bought-Back Time:</strong> Framed her comprehensive design systems not as static artwork, but as autonomous brand engines that allow leadership teams to deploy market assets at 10x speed without operational friction.</li>
                    <li><strong>High-Contrast Premium UI:</strong> Rebuilt the web architecture using React, Vite, and Tailwind with dark glassmorphic tokens and Geist typography—signaling non-negotiable premium standards.</li>
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem", color: "var(--ink-primary)" }}>
                    3. Strategic Impact
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-primary)", marginBottom: "1.5rem" }}>
                    By structuring her offerings around high-ROI brand retainers and eliminating hourly rate cards, the repositioned portfolio immediately screens out lowball buyers and attracts established clients who value autonomy, speed, and proven mastery.
                  </p>
                </div>

                <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <Link href="/work" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.8rem", fontWeight: 500, color: "var(--ink-primary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    ← Back to all work
                  </Link>
                </div>
              </article>
            ) : (
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
                <Link href="/work" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.75rem", color: "var(--ink-primary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ← Back to all work
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
