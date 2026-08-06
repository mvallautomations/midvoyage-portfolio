import Link from "next/link";

/* ============================================================
   mid·voyage — WorkCard Component
   Reusable card for case study previews.
   - Near-square corners (10px)
   - Terracotta eyebrow label (mono)
   - No hover fills — border + translate only
   - Used on homepage + /work index
   ============================================================ */

export interface WorkCardProps {
  slug: string;             // URL slug: /work/speed-to-lead
  eyebrow: string;          // Category label (terracotta mono)
  title: string;            // Project name
  description: string;      // 1–2 sentence summary
  tags?: string[];          // Tech/skill tags
  status?: "live" | "in-progress" | "concept"; // Project status
  year?: string;            // e.g. "2024"
  featured?: boolean;       // Larger card treatment
  showcaseLinks?: {
    label: string;
    href?: string;
  }[];
}

export default function WorkCard({
  slug,
  eyebrow,
  title,
  description,
  tags = [],
  status = "in-progress",
  year,
  featured = false,
  showcaseLinks = [],
}: WorkCardProps) {
  // Status label text map
  const statusMap = {
    live: "Live",
    "in-progress": "In Progress",
    concept: "Concept",
  };

  return (
    <article
      className="mv-card"
      style={{
        padding: featured ? "2rem" : "1.5rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
        {/* Top meta row: eyebrow + status + year */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span className="eyebrow">{eyebrow}</span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            {/* Status dot + label */}
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: status === "live" ? "var(--accent-sage)" : "var(--ink-muted)",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor:
                    status === "live"
                      ? "var(--accent-sage)"
                      : "var(--ink-muted)",
                }}
              />
              {statusMap[status]}
            </span>

            {year && (
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.65rem",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                {year}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-jakarta)",
          fontWeight: 800,
          fontSize: "1.75rem",
          lineHeight: 1.15,
          color: "var(--ink-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        <Link href={`/work/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          {title}
        </Link>
      </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.9375rem",
            lineHeight: 1.65,
            color: "var(--ink-secondary)",
            flex: 1, /* push tags to bottom */
          }}
        >
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.2rem 0.5rem",
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
        )}

        {showcaseLinks.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {showcaseLinks.map((item) =>
              item.href ? (
                <a
                  key={`${slug}-${item.label}`}
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "3px",
                    border: "1px solid var(--border-light)",
                    color: "var(--ink-muted)",
                    backgroundColor: "var(--bg-elevated)",
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  key={`${slug}-${item.label}`}
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.5rem",
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
        )}

        {/* Arrow — no-text CTA */}
      <Link
        href={`/work/${slug}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          marginTop: "0.25rem",
          width: "fit-content",
        }}
      >
        <span>View case study</span>
        <span style={{ fontSize: "0.85rem" }}>→</span>
      </Link>
    </article>
  );
}
