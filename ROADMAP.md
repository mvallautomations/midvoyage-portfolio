# mid·voyage — Implementation Roadmap
**Owner:** Mishael Vallar / handl'it AI Consultancy  
**Domain:** `mvallarautomations.cc`  
**Repo:** `mvallautomations/super-duper-potato`  
**Updated:** 2026-04-19

---

## Status Snapshot

| Area | State |
|------|-------|
| Next.js scaffold + design system | ✅ Done |
| Homepage, Nav, Footer, WorkCard | ✅ Done |
| `/about` page (basic) | ✅ Done — profile card missing |
| `/work/[slug]` routes (3 slugs) | ✅ Scaffolded — placeholder content |
| `/blog` index + `[slug]` routes | ✅ Scaffolded — no MDX content yet |
| Vercel project linked | ❌ Not connected |
| Custom domain configured | ❌ Pending deploy |
| Profile image in About | ❌ Not added |
| Case study real content | ❌ Placeholder only |
| Blog MDX content wired | ❌ Not wired |

---

## Part 1 — Deploy to Vercel + Custom Domain

### Prerequisites
```bash
npm i -g vercel          # Install Vercel CLI (not currently installed)
vercel login             # Opens browser — log in with mvallarautomates@gmail.com
```

### Step 1 — First deploy & project creation
```bash
cd /path/to/super-duper-potato
vercel                   # Interactive first-time setup

# Answer the prompts:
# Set up and deploy? → Yes
# Which scope? → 2026handlitprojects  (mishael vallar's projects)
# Link to existing project? → No
# Project name: → midvoyage-portfolio
# Directory: → ./
# Override settings? → No
```

This creates `.vercel/project.json` locally (gitignored) and deploys a preview URL.

### Step 2 — Production deploy
```bash
vercel --prod            # Deploy to production
```

### Step 3 — Add custom domain in Vercel dashboard
1. Go to Vercel → Project → Settings → Domains
2. Add `mvallarautomations.cc`
3. Add `www.mvallarautomations.cc`

### Step 4 — DNS records at your registrar
Set these A/CNAME records (Namecheap or wherever `mvallarautomations.cc` is registered):

```
Type: A     | Name: @   | Value: 76.76.21.21
Type: CNAME | Name: www | Value: cname.vercel-dns.com
```

DNS propagates in 15 min – 24 hrs. Vercel auto-provisions SSL via Let's Encrypt.

### Step 5 — Verify
- [ ] `https://mvallarautomations.cc` loads the site
- [ ] `https://www.mvallarautomations.cc` redirects correctly
- [ ] HTTPS padlock shows valid certificate
- [ ] Dark mode toggle works
- [ ] All nav links resolve

### Step 6 — Ongoing deploys (CI via GitHub)
After first deploy, push to `main` triggers automatic Vercel production deploys.
Feature branches get preview URLs automatically.

```bash
git push origin main     # → triggers production deploy
git push origin feature  # → triggers preview deploy
```

### Optional — Switch vercel.json → vercel.ts
`vercel.ts` is now the recommended config format with TypeScript support:
```bash
npm i @vercel/config
```
Then convert `vercel.json` to `vercel.ts` (non-blocking — `vercel.json` works fine).

---

## Part 2 — Profile Image Card (About Page)

**Goal:** Add a personal photo card to `/about` alongside the existing 3-column grid.

### Step 1 — Add your photo
Place a square or portrait photo in:
```
public/
  profile.jpg      ← recommended: 600×600px or 600×800px, JPG or WebP
```

Compress to under 150KB for fast load (use squoosh.app).

### Step 2 — Update `src/app/about/page.tsx`

Add a profile card section **above or beside the existing 3-column grid**.
The card should use existing design tokens — no new CSS needed.

Example structure to add (insert before the card grid):

```tsx
import Image from "next/image";

// Inside the page component, before the cards section:
<section className="mv-container" style={{ paddingTop: "var(--space-12)" }}>
  <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "var(--space-8)", alignItems: "start" }}>
    <div className="mv-card" style={{ padding: 0, overflow: "hidden", borderRadius: "var(--radius-lg)" }}>
      <Image
        src="/profile.jpg"
        alt="Mishael Vallar"
        width={200}
        height={240}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority
      />
    </div>
    <div>
      <p className="eyebrow">Mishael Vallar</p>
      <h2 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "1.5rem" }}>
        AI Consultant · Builder · <span className="ghost-word">explorer</span>
      </h2>
      <p style={{ color: "var(--ink-secondary)", marginTop: "var(--space-3)" }}>
        {/* 2–3 sentence personal bio here */}
      </p>
    </div>
  </div>
</section>
```

### Step 3 — Make it responsive
Add a media query in `globals.css` or use inline style `gridTemplateColumns: "1fr"` at mobile.
Alternatively, wrap in a `.mv-profile-card` class and add responsive CSS.

### Step 4 — Test
```bash
npm run dev
```
Check at `http://localhost:3000/about` — both light and dark mode.

### Checklist
- [ ] Photo added to `public/profile.jpg`
- [ ] Image card renders above the 3-column grid
- [ ] Layout collapses to single column on mobile
- [ ] Both light + dark mode look correct
- [ ] Alt text is descriptive

---

## Part 3 — Case Study Content (Work Pages)

**Goal:** Replace the "Case study in progress." placeholder in `/work/[slug]` with real content.

### Approach — MDX files (recommended)

#### Step 1 — Install MDX support
```bash
npm i next-mdx-remote     # App Router compatible MDX loader
npm i gray-matter         # Parses frontmatter from MDX files
```

#### Step 2 — Create content directory
```
src/
  content/
    work/
      kuya-koks.mdx
      ra-bautista.mdx
      graceland-farm.mdx
```

#### Step 3 — MDX file format
Each file starts with frontmatter + then MDX body:

```mdx
---
title: "Kuya Kok's Griddle & Grill"
eyebrow: "Restaurant · Web"
description: "Full web presence for a Filipino restaurant in..."
status: "in-progress"
year: "2026"
tags: ["Next.js", "Tailwind", "Vercel"]
showcaseUrl: "https://kuya-koks.vercel.app"
---

## The brief

Short paragraph about what the client needed.

## What I built

Description of the solution.

## Results

- Metric or outcome 1
- Metric or outcome 2

## Demo

{/* Add screenshots, embed, or link here */}
```

#### Step 4 — Update `src/app/work/[slug]/page.tsx`
Replace the placeholder div with MDX rendering:

```tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// In the page component:
const contentPath = path.join(process.cwd(), "src/content/work", `${slug}.mdx`);
const fileContent = fs.readFileSync(contentPath, "utf-8");
const { content } = matter(fileContent);

// Replace placeholder with:
<article className="mv-prose">
  <MDXRemote source={content} />
</article>
```

#### Step 5 — Add showcase demo links to WorkCard
The `WorkCard` component already supports `showcaseLinks` prop. Update the static data
in `page.tsx` files to pass real URLs once sites are live.

### Checklist — per case study
**kuya-koks**
- [ ] Write `src/content/work/kuya-koks.mdx`
- [ ] Add screenshots to `public/work/kuya-koks/`
- [ ] Add live demo URL to showcaseLinks

**ra-bautista**
- [ ] Write `src/content/work/ra-bautista.mdx`
- [ ] Add screenshots to `public/work/ra-bautista/`
- [ ] Add live demo URL to showcaseLinks

**graceland-farm**
- [ ] Write `src/content/work/graceland-farm.mdx`
- [ ] Add screenshots to `public/work/graceland-farm/`
- [ ] Add live demo URL when ready

**Shared**
- [ ] `next-mdx-remote` + `gray-matter` installed
- [ ] `src/app/work/[slug]/page.tsx` updated to render MDX
- [ ] Add `.mv-prose` prose styles to `globals.css`
- [ ] Test all 3 slugs build without errors (`npm run build`)

---

## Part 4 — Blog Posts & Articles

**Goal:** Wire up real MDX content for blog posts and establish a repeatable workflow.

### Step 1 — Install (same packages as case studies)
```bash
npm i next-mdx-remote gray-matter   # skip if already installed for work pages
```

### Step 2 — Create blog content directory
```
src/
  content/
    blog/
      zero-budget-build-stack.mdx
      why-mid-voyage-exists.mdx
```

### Step 3 — MDX blog post format
```mdx
---
title: "My Zero-Budget Build Stack in 2026"
date: "2026-03-27"
excerpt: "The exact free tools and constraints I use to ship websites and AI workflows..."
tags: ["stack", "solo-founder", "workflow"]
relatedWork: "kuya-koks"
---

Opening paragraph — your hook.

## Section heading

Body content...

## Another section

More content...
```

### Step 4 — Update `src/lib/blog.ts`
Switch from the hardcoded array to reading from the filesystem:

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));
  return files
    .map(file => {
      const slug = file.replace(".mdx", "");
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
      return { slug, ...data } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);
  return { slug, ...data, content } as BlogPost & { content: string };
}
```

### Step 5 — Update `src/app/blog/[slug]/page.tsx`
```tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/blog";

// Replace placeholder with:
const post = getPostBySlug(params.slug);
// ...
<article className="mv-prose">
  <MDXRemote source={post.content} />
</article>
```

### Step 6 — Add prose styles to `globals.css`
Add a `.mv-prose` class that styles MDX-rendered HTML (h2, h3, p, ul, ol, code, blockquote):

```css
/* In @layer components: */
.mv-prose {
  max-width: 68ch;
  color: var(--ink-primary);

  h2 { font-family: var(--font-jakarta); font-weight: 800; margin-top: 2.5rem; }
  h3 { font-family: var(--font-jakarta); font-weight: 700; margin-top: 2rem; }
  p  { color: var(--ink-secondary); line-height: 1.7; margin-top: 1rem; }
  ul, ol { color: var(--ink-secondary); padding-left: 1.5rem; margin-top: 1rem; }
  code { font-family: var(--font-mono); font-size: 0.875em; background: var(--bg-surface); padding: 0.15em 0.35em; border-radius: 3px; }
  blockquote { border-left: 3px solid var(--accent-terra); padding-left: 1rem; color: var(--ink-secondary); }
}
```

### Repeatable workflow — adding a new blog post
Once the system is wired, every new post is just:

1. **Create the file:**
   ```bash
   touch src/content/blog/your-post-slug.mdx
   ```
2. **Write frontmatter + content** (use existing posts as template)
3. **Preview locally:**
   ```bash
   npm run dev
   # visit http://localhost:3000/blog/your-post-slug
   ```
4. **Commit & push:**
   ```bash
   git add src/content/blog/your-post-slug.mdx
   git commit -m "content: add blog post — your-post-slug"
   git push origin main
   ```
   Vercel auto-deploys on push to `main`.

### Blog checklist
- [ ] `next-mdx-remote` + `gray-matter` installed
- [ ] `src/content/blog/` directory created
- [ ] `src/lib/blog.ts` reads from filesystem
- [ ] `src/app/blog/[slug]/page.tsx` renders MDX
- [ ] `.mv-prose` styles added to `globals.css`
- [ ] `zero-budget-build-stack.mdx` written
- [ ] `why-mid-voyage-exists.mdx` written
- [ ] Both posts visible at `/blog`
- [ ] `generateStaticParams` returns slugs from filesystem
- [ ] `npm run build` passes with no errors

---

## Suggested Sequencing

```
Week 1  Deploy + domain     → Part 1 (get it live first)
Week 2  Blog content        → Part 4 (MDX infra benefits both blog + work)
Week 3  Case studies        → Part 3 (reuse MDX infra from Part 4)
Week 4  About profile card  → Part 2 (quick win, needs photo ready)
```

---

## Quick Reference — Commands

```bash
npm run dev          # Local dev server
npm run build        # Production build (run before each push)
npm run lint         # ESLint check
vercel               # Deploy preview
vercel --prod        # Deploy to production
vercel env pull      # Sync Vercel env vars to .env.local
```
