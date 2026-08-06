import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RunReplay from "@/components/RunReplay";
import { demoRunsBySlug } from "@/lib/demo-adapters";

// Rewritten 2026-08-06 (M's call): kuya-koks, ra-bautista and graceland-farm
// were unpaid engagements not to be presented as client work; ra-bautista was
// never permission-cleared. Do not re-add them. Every entry is own-operations
// work with a verifiable public link.
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
  "speed-to-lead": {
    title: "Speed-to-Lead — inbound qualifier",
    eyebrow: "AI Systems · Lead Qualification",
    description:
      "A nine-node pipeline that takes an inbound enquiry from form submission to scored, routed, replied-to and logged in 7.4 seconds — verified across four logged executions, not a demo run. Ordering is enforced structurally rather than by convention: the CRM write is a graph dependency of the send steps, so a failed email can never lose the lead. Node references are explicit rather than positional, so rewiring cannot silently change behaviour. Hardened against malformed submissions after a blank POST was found to break the send stage.",
    status: "Live",
    year: "2026",
    tags: ["n8n", "Claude API", "Telegram", "SMTP", "SQLite"],
  },
  "review-reply-agent": {
    title: "Review & Reply Agent",
    eyebrow: "AI Agents · Reputation",
    description:
      "Reads a customer review, escalates anything serious to the owner, and drafts the rest for one-tap approval. It never posts on its own — that constraint is the product, not a limitation. Verified across three live executions averaging 3.48 seconds: a five-star queued for approval, a two-star combining food poisoning with a legal threat escalated, a one-star about a child's illness escalated.",
    status: "Live",
    year: "2026",
    tags: ["n8n", "Claude API", "Escalation Rules"],
  },
  "inbox-triage-agent": {
    title: "Inbox Triage Agent",
    eyebrow: "AI Agents · Operations",
    description:
      "Extracts quote details from an inbound email without inventing numbers, and escalates anything touching money or lawyers to a human. 3.19 seconds per run against live executions. What it refuses to do unsupervised is the part that makes it safe to run unsupervised.",
    status: "Live",
    year: "2026",
    tags: ["n8n", "Claude API", "Structured Extraction"],
  },
  "content-repurposer-agent": {
    title: "Content Repurposer Agent",
    eyebrow: "AI Agents · Content",
    description:
      "Turns one piece of long-form work into platform-native posts, and gates its own output against brand-voice rules enforced in code rather than asked for in a prompt. If a draft breaks a rule, it does not ship. Prompts drift; a linter does not.",
    status: "Live",
    year: "2026",
    tags: ["n8n", "Claude API", "Brand-Voice Linting"],
  },
  "handlit-agent-architect": {
    title: "handlit Agent Architect",
    eyebrow: "AI Agents · Browser",
    description:
      "A Chrome side-panel agent that studies a business's website and designs the custom chat agent it actually needs. Bring your own key — it runs on Ollama, OpenRouter, or any OpenAI-compatible endpoint, so nothing is locked to a single vendor and nothing is billed per seat.",
    status: "Live",
    year: "2026",
    tags: ["Chrome Extension", "BYOK", "Ollama", "OpenRouter"],
  },
};

const projectShowcaseLinks: Record<
  string,
  { label: string; href?: string }[]
> = {
  "speed-to-lead": [
    { label: "Live at handlit.app", href: "https://handlit.app" },
    { label: "Interactive Demo", href: "https://handlit.app/demo/" },
    { label: "Case Study", href: "https://handlit.app/case-study-speed-to-lead" },
  ],
  "review-reply-agent": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/review-reply-agent" },
  ],
  "inbox-triage-agent": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/inbox-triage-agent" },
  ],
  "content-repurposer-agent": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/content-repurposer-agent" },
  ],
  "handlit-agent-architect": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/handlit-agent-architect" },
  ],
};

export const dynamicParams = false;

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
            {demoRunsBySlug[slug] ? (
              <div style={{ display: "grid", gap: "2rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                    color: "var(--ink-secondary)",
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>

                <div>
                  <p
                    className="eyebrow"
                    style={{
                      marginBottom: "0.5rem",
                      color: "var(--accent-terra)",
                    }}
                  >
                    Logged runs
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--ink-secondary)",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    Each replay below animates a logged n8n execution at the
                    speed it actually ran — the decision path, the output, and
                    the latency come straight from the execution log. Nothing
                    staged.
                  </p>
                  <RunReplay runs={demoRunsBySlug[slug]} />
                </div>
              </div>
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
