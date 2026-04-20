"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface WorkCardProps {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  tags?: string[];
  status?: "live" | "in-progress" | "concept";
  year?: string;
  featured?: boolean;
  showcaseLinks?: { label: string; href?: string }[];
  thumbnailGradient?: string;
  thumbnailImage?: string;
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
  thumbnailGradient,
  thumbnailImage,
}: WorkCardProps) {
  const statusMap = { live: "Live", "in-progress": "In Progress", concept: "Concept" };
  const hasThumbnail = thumbnailImage || thumbnailGradient;

  return (
    <motion.article
      className="mv-card"
      style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Thumbnail / preview area */}
      {hasThumbnail && (
        <div style={{ position: "relative", flexShrink: 0 }}>
          {/* Browser chrome strip */}
          <div
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderBottom: "1px solid var(--border-subtle)",
              padding: "0.5rem 0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            {["var(--accent-terra)", "var(--accent-sand)", "var(--accent-sage)"].map((c, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: c,
                  opacity: 0.6,
                }}
              />
            ))}
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.6rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.06em",
                marginLeft: "0.5rem",
                opacity: 0.6,
              }}
            >
              {slug}.vercel.app
            </span>
          </div>

          {/* Preview image or gradient */}
          <div
            style={{
              aspectRatio: "16/9",
              background: thumbnailImage
                ? `url(${thumbnailImage}) center/cover no-repeat`
                : (thumbnailGradient ?? "var(--bg-surface)"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Noise overlay for texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
                backgroundSize: "200px",
                opacity: 0.3,
              }}
            />
            {!thumbnailImage && (
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  zIndex: 1,
                }}
              >
                Preview coming soon
              </span>
            )}
          </div>
        </div>
      )}

      {/* Card content */}
      <div
        style={{
          padding: featured ? "2rem" : "1.5rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Top meta row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <span className="eyebrow">{eyebrow}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                  backgroundColor: status === "live" ? "var(--accent-sage)" : "var(--ink-muted)",
                }}
              />
              {statusMap[status]}
            </span>
            {year && (
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.65rem", color: "var(--ink-muted)", letterSpacing: "0.05em" }}>
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
            fontSize: featured ? "1.75rem" : "1.375rem",
            lineHeight: 1.15,
            color: "var(--ink-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          <Link href={`/work/${slug}`} style={{ textDecoration: "none" }}>
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink-secondary)", flex: 1 }}>
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
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

        {/* Showcase links */}
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
              )
            )}
          </div>
        )}

        {/* CTA */}
        <motion.div whileHover={{ x: 3, transition: { duration: 0.15 } }} style={{ width: "fit-content" }}>
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
            }}
          >
            <span>View case study</span>
            <span style={{ fontSize: "0.85rem" }}>→</span>
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
