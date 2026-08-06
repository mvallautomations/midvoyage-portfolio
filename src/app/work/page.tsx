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

// === ALL WORK ===
// Rewritten 2026-08-06 (M's call): the prior three entries — kuya-koks,
// ra-bautista, graceland-farm — were unpaid engagements not to be presented as
// client work, and ra-bautista was never permission-cleared. Do not re-add them.
// Every entry below is own-operations work with a verifiable public link.
const allWork: WorkCardProps[] = [
  {
    slug: "speed-to-lead",
    eyebrow: "AI Systems · Lead Qualification",
    title: "Speed-to-Lead — inbound qualifier",
    description:
      "Nine-node pipeline: form intake, LLM scoring against a rubric, hot/nurture routing, a personalised reply, an owner alert and a CRM write. 7.4 seconds end to end, verified across four logged executions. Ordering is enforced structurally — the CRM write is a graph dependency of the send steps, so a failed email can never lose the lead.",
    tags: ["n8n", "Claude API", "Telegram", "SMTP", "SQLite"],
    status: "live",
    year: "2026",
    featured: true,
    showcaseLinks: [
      { label: "Live at handlit.app", href: "https://handlit.app" },
      { label: "Case Study", href: "/work/speed-to-lead" },
    ],
  },
  {
    slug: "review-reply-agent",
    eyebrow: "AI Agents · Reputation",
    title: "Review & Reply Agent",
    description:
      "Reads a customer review, escalates anything serious to the owner and drafts the rest for one-tap approval. It never posts on its own. Verified across three live executions averaging 3.48s — a 5-star queued, a food-poisoning-plus-legal-threat escalated, a child-illness complaint escalated.",
    tags: ["n8n", "Claude API", "Escalation Rules"],
    status: "live",
    year: "2026",
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/review-reply-agent" },
      { label: "Case Study", href: "/work/review-reply-agent" },
    ],
  },
  {
    slug: "inbox-triage-agent",
    eyebrow: "AI Agents · Operations",
    title: "Inbox Triage Agent",
    description:
      "Extracts quote details from an inbound email without inventing numbers, and escalates anything touching money or lawyers to a human. 3.19s per run against live executions. The constraint that matters is what it refuses to do unsupervised.",
    tags: ["n8n", "Claude API", "Structured Extraction"],
    status: "live",
    year: "2026",
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/inbox-triage-agent" },
      { label: "Case Study", href: "/work/inbox-triage-agent" },
    ],
  },
  {
    slug: "content-repurposer-agent",
    eyebrow: "AI Agents · Content",
    title: "Content Repurposer Agent",
    description:
      "Turns one piece of long-form work into platform-native posts, and gates its own output against brand-voice rules enforced in code rather than in a prompt. If the draft breaks a rule, it does not ship.",
    tags: ["n8n", "Claude API", "Brand-Voice Linting"],
    status: "live",
    year: "2026",
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/content-repurposer-agent" },
      { label: "Case Study", href: "/work/content-repurposer-agent" },
    ],
  },
  {
    slug: "handlit-agent-architect",
    eyebrow: "AI Agents · Browser",
    title: "handlit Agent Architect",
    description:
      "Chrome side-panel agent that studies a business's site and designs the custom chat agent it actually needs. Bring your own key — runs on Ollama, OpenRouter, or any OpenAI-compatible endpoint, so nothing is locked to a vendor.",
    tags: ["Chrome Extension", "BYOK", "Ollama", "OpenRouter"],
    status: "live",
    year: "2026",
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/handlit-agent-architect" },
      { label: "Case Study", href: "/work/handlit-agent-architect" },
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
              Agents and automation systems built and run against my own operations
              first. Every entry links to live software or public source — the
              numbers come from logged executions, not demos.
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
