# mid·voyage Portfolio — Agent Handoff
**Project:** midvoyage-portfolio
**Owner:** Mishael Vallar 
**Local path:** midvoyage-portfolio

**Target domain:** `mvallarautomations.cc`
**Deploy target:** Vercel free tier
**Git user:** `mvallautomations` | `mvallarautomates@gmail.com`

---

## Current Status
- [x] Next.js 15 scaffold (App Router, TypeScript, Tailwind CSS)
- [x] mid-voyage design system applied (tokens, CSS vars, dark mode)
- [x] Homepage (/) — Hero, Bio, Work index
- [x] /work page — case study card grid
- [x] /work/[slug] — placeholder for 3 projects
- [x] Components: Nav, Footer, WorkCard
- [x] vercel.json configured
- [ ] Git init + push to GitHub
- [ ] Vercel project connected
- [ ] Custom domain DNS configured

---

## Deploy Instructions

### 1. Git Setup
```powershell
cd ~/m-aios/projects/super-duper-potato
git init
git config user.name "mvallautomations"
git config user.email "mvallarautomates@gmail.com"
git add .
git commit -m "feat: initial mid-voyage portfolio scaffold"
git branch -M main
git remote add origin https://github.com/mvallautomations/midvoyage-portfolio.git
git push -u origin main
```

### 2. Vercel Deploy (first time)
```powershell
# Install Vercel CLI if not present
npm install -g vercel

# Login (opens browser)
vercel login

# Deploy from project root
cd ~/m-aios/projects/super-duper-potato
vercel

# Prompts:
# Set up and deploy? Yes
# Which scope? mvallautomations
# Link to existing project? No
# Project name: midvoyage-portfolio
# Directory: ./
# Override settings? No
```

### 3. Custom Domain
In Vercel dashboard → Project → Settings → Domains:
- Add: `mvallarautomations.cc`
- Add: `www.mvallarautomations.cc`

At your domain registrar (Namecheap/etc), set:
```
Type: A     | Name: @   | Value: 76.76.21.21
Type: CNAME | Name: www | Value: cname.vercel-dns.com
```

DNS propagation: 15 min – 24 hrs.

---

## File Structure
```
src/
  app/
    layout.tsx          -- Root layout, fonts, metadata
    page.tsx            -- Homepage: Hero, Bio, Work index
    globals.css         -- CSS vars, design tokens, animations
    work/
      page.tsx          -- /work index grid
      [slug]/
        page.tsx        -- Case study placeholder + static params
  components/
    Nav.tsx             -- Sticky nav, theme toggle, mobile menu
    Footer.tsx          -- Minimal footer
    WorkCard.tsx        -- Reusable case study card
```

---

## Design System — DO NOT MODIFY
- Background: `#EDEAE3` (parchment) — NEVER pure white
- Accent: `#C85A3C` (terracotta) — labels/eyebrows ONLY
- Ghost word: `DM Serif Display italic`, color `#C4BFB7`
- Headings: `Plus Jakarta Sans 800`
- Body: `DM Sans`
- Labels/mono: `JetBrains Mono`

---

## Next Steps (after deploy)
1. Write real MDX case studies for each /work/[slug]
2. Add `@next/mdx` + `next-mdx-remote` for MDX support
3. OG image generation via `next/og`
4. Analytics: Vercel Analytics (free tier)
5. Add `/about` page with fuller bio

---

## Contacts
- GitHub: `mvallautomations`
- Email: `mvallarautomates@gmail.com`
- Brand: mid·voyage (Solo Systems Builder & Value Creator)
