import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Build notes, case study breakdowns, and practical lessons from a solo founder workflow.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featuredPost, ...remainingPosts] = posts;

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" }).format(
      new Date(date),
    );

  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: "clamp(3.5rem, 8vw, 6rem)", paddingBottom: "clamp(2rem, 5vw, 4rem)" }}>
          <div className="mv-container">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Blog</p>
            <h1 style={{ fontSize: "clamp(2.1rem, 6vw, 3.6rem)", marginBottom: "1rem" }}>
              Build notes from the{" "}<span className="ghost-word" style={{ fontSize: "inherit" }}>middle.</span>
            </h1>
            <p style={{ color: "var(--ink-secondary)", maxWidth: "55ch" }}>
              Simple dispatches on what I am shipping, what failed, and what I changed next.
            </p>
          </div>
        </section>

        <div className="mv-container"><hr className="mv-rule" /></div>

        {featuredPost ? (
          <section className={styles.featuredSection}>
            <div className="mv-container">
              <p className={`eyebrow ${styles.sectionLabel}`}>Latest dispatch</p>
              <article className={`mv-card ${styles.featuredCard}`}>
                <div className={styles.featuredMedia}>
                  {featuredPost.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.coverAlt}
                      className={styles.featuredImage}
                    />
                  ) : (
                    <div className={styles.featuredPlaceholder} aria-hidden="true">
                      <span>mid·voyage</span>
                    </div>
                  )}
                </div>
                <div className={styles.featuredCopy}>
                  <p className="eyebrow">
                    {featuredPost.publishedAt ? formatDate(featuredPost.publishedAt) : "Unpublished"}
                  </p>
                  <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                  <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                  <div className={styles.tags}>
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`} className="mv-btn">
                    Read latest article
                  </Link>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        {remainingPosts.length ? (
          <section className={styles.archiveSection}>
            <div className="mv-container">
              <div className={styles.archiveHeading}>
                <p className="eyebrow">Earlier notes</p>
                <p>{remainingPosts.length} {remainingPosts.length === 1 ? "dispatch" : "dispatches"}</p>
              </div>
              <div className={styles.archiveList}>
                {remainingPosts.map((post, index) => (
                  <article key={post.slug} className={styles.archiveItem}>
                    <p className={styles.archiveNumber}>{String(index + 1).padStart(2, "0")}</p>
                    <div className={styles.archiveCopy}>
                      <p className="eyebrow">
                        {post.publishedAt ? formatDate(post.publishedAt) : "Unpublished"}
                      </p>
                      <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                      <p>{post.excerpt}</p>
                    </div>
                    <Link href={`/blog/${post.slug}`} className={styles.archiveLink} aria-label={`Read ${post.title}`}>
                      Read <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
