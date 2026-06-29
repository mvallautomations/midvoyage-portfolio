import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            paddingTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingBottom: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          <div className="mv-container" style={{ maxWidth: "74ch" }}>
            <Link
              href="/blog"
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
              ← Blog
            </Link>
            <p className="eyebrow" style={{ marginTop: "1.5rem", marginBottom: "0.75rem", color: "var(--accent-terra)" }}>
              {post.date}
            </p>
            <h1 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.25rem)", marginBottom: "1.25rem", lineHeight: 1.1, color: "var(--ink-primary)" }}>
              {post.title}
            </h1>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.15rem", color: "var(--ink-secondary)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              {post.excerpt}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}>
              {post.tags.map((tag) => (
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

            {slug === "kuya-koks-brand-audit-first" ? (
              <article style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "var(--ink-primary)", fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                
                {/* Embedded Transparent Portrait Hero */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2.5rem 1rem", backgroundColor: "var(--bg-elevated)", borderRadius: "12px", border: "1px solid var(--border-light)", marginBottom: "1.5rem" }}>
                  <div style={{ position: "relative", width: "260px", height: "260px", marginBottom: "1.25rem" }}>
                    <Image
                      src="/author-laptop.png"
                      alt="Mishael Vallar working on laptop"
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-serif)", fontStyle: "italic", fontWeight: 700, fontSize: "1.25rem", color: "var(--ink-primary)", textAlign: "center", margin: 0 }}>
                    "Dispatches from the middle of figuring it out."
                  </p>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", color: "var(--ink-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.5rem" }}>
                    Mishael Vallar — Quiet Observer & Systems Cartographer
                  </span>
                </div>

                <p>
                  When SMB owners hear "AI Agents" or "Automations," their instinct is almost always to rush into building pipelines. At Kuya Kok's Griddle and Grill, we faced the exact same temptation: why not immediately deploy n8n workflows to scrape orders, track supply replenishment, and automate payroll calculations?
                </p>

                <p>
                  Because automating operational friction only scales chaos.
                </p>

                <h2 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.5rem", fontWeight: 700, marginTop: "1rem", color: "var(--ink-primary)" }}>
                  Why Identity Alignment Precedes Automation
                </h2>

                <p>
                  Before we wrote a single line of integration code or configured our first webhook, we instituted a strict **Brand Audit First** protocol. During our diagnostic interviews, we discovered that the bottleneck wasn't just manual data entry—it was structural ambiguity in customer ordering habits and menu presentation.
                </p>

                <div style={{ padding: "1.5rem", borderLeft: "3px solid var(--accent-terra)", backgroundColor: "var(--bg-surface)", marginBlock: "1rem" }}>
                  <p style={{ margin: 0, fontWeight: 500, fontStyle: "italic" }}>
                    "If your customer touchpoints are fragmented, no backend workflow will fix your unit economics. System architecture begins at the menu surface."
                  </p>
                </div>

                <p>
                  By standardizing the visual architecture, digital footprint, and core menu hierarchy first, we established clean, predictable data structures. Only then did it make sense to transition into Phase 2: deploying Tier 1 n8n automations for inventory and shift scheduling, setting the stage for Tier 2 conversational AI ordering assistants.
                </p>

                <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                  <Link href="/work/kuya-koks" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.8rem", fontWeight: 500, color: "var(--accent-terra)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Read Full Case Study →
                  </Link>
                  <Link href="/blog" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.8rem", fontWeight: 500, color: "var(--ink-secondary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    ← All Articles
                  </Link>
                </div>

              </article>
            ) : (
              <article
                className="mv-card"
                style={{
                  padding: "clamp(1.25rem, 4vw, 2rem)",
                  lineHeight: 1.8,
                  color: "var(--ink-secondary)",
                }}
              >
                <p style={{ marginBottom: "1rem" }}>
                  This is a scaffolded article page. Replace this block with MDX-backed content when you are ready.
                </p>
                <p>
                  For now, this route confirms the full blog structure is working: list page, dynamic slug pages, metadata per post, and static params generation for deployment.
                </p>
              </article>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
