# AGENT HANDOFF — mid·voyage Portfolio Build
## Target: Claude Code / Antigravity
**Handoff ID:** 2026-03-29-MISHAEL-midvoyage-portfolio  
**Created:** 2026-03-29T16:00:00+08:00 (PHT)  
**Source Agent:** Claude Sonnet 4.6 (claude.ai)  
**Target Agent:** Claude Code (terminal) OR Antigravity  
**Primary Goal Track:** G1-BUILD + G2-SHIP  
**Project Phase:** Active build — pre-deployment  

---

## AGENT PRIMER — READ THIS FIRST

You are continuing work for **Mishael Vallar**, solo founder of handl'it AI Consultancy (Philippines, pre-revenue). This handoff is specifically scoped to the **mid·voyage personal portfolio** at `mvallarautomations.cc`.

Mishael operates on a **night owl schedule (2PM–2AM PHT)**, ADHD-optimized Pomodoro workflows, and a strict free/OSS-only stack. She is the sole developer. Her partner (14+ yrs design exp) handles design direction.

**The mid·voyage portfolio is her primary client-facing proof-of-work.** It must be polished, deployed, and live before she can land paying clients.

---

## CRITICAL CONSTRAINTS — NEVER OVERRIDE

```
[OK] FREE tools only — no paid APIs, no paid services (except Claude API per active client)
[OK] Windows 11 + WSL2 + Docker — never macOS/Linux-only tooling
[OK] ALL project files: D:\AI_Dev\WorkspaceOS\Projects\midvoyage-portfolio\
[OK] Git identity: user.name = mvallautomations | user.email = mvallarautomates@gmail.com
[OK] SCAFFOLD-FIRST: CLI scaffold -> verify localhost -> then customize
[OK] Inline comments required on ALL non-trivial logic
[OK] Windows scripts: ASCII only — use === not ===, use [OK] not checkmark emoji
[OK] If first fix fails twice — STOP. Nuke and use official scaffold tools.
[OK] Never pure white (#FFFFFF/#FAFAFA) — warm off-whites only
[OK] NEVER use turquoise #4ECDC4 on mid·voyage — that belongs to handl'it only
[OK] Obsidian for session archiving (not Notion)
[OK] Deployment target: Vercel Singapore region
[OK] Cloudflare domain: mvallarautomations.cc
```

---

## PROJECT OVERVIEW

| Field | Value |
|-------|-------|
| **Project Name** | mid·voyage portfolio |
| **Brand** | Mishael Vallar personal brand (mid·voyage sub-brand) |
| **URL** | mvallarautomations.cc |
| **Local Path** | D:\AI_Dev\WorkspaceOS\Projects\midvoyage-portfolio\ |
| **Stack** | Next.js 15 + MDX + Tailwind CSS |
| **Deploy** | Vercel Singapore |
| **Status** | Scaffolded — styling + content + deploy pending |

### Demo Client Case Studies (in-portfolio)
| Client | Route | Status | Notes |
|--------|-------|--------|-------|
| Kuya Kok's Griddle & Grill | /work/kuya-koks | Scaffolded | Filipino restaurant, Indang Cavite |
| R.A. Bautista | /work/ra-bautista | Scaffolded | Senior Graphic Designer (female) — dark theme, yellow accents, Geist + Inter — NOT a law office |
| Graceland Farm | /work/graceland-farm | Scaffolded | Agritourism, modern rustic, charcoal/raw linen/gold wheat palette |

---

## SKILL ACTIVATION — ALL OF THESE APPLY TO THIS PROJECT

The following skill contexts must be active for this build. Excerpts embedded below.

### SKILL 1: mish-core-context (Identity + Brand Tokens)
**Activation condition:** Always active for any mid·voyage build.

### SKILL 2: frontend-design (Production-Grade UI)
**Activation condition:** Any component, page, layout, or UI build.
**Key directive:** Avoid generic AI aesthetics. Execute the editorial/parchment aesthetic with precision. Intentional design, not templates.

### SKILL 3: mish-build-deploy (Deploy Protocol)
**Activation condition:** Any scaffold, CI/CD, or Vercel deploy task.
**Key directive:** Use official tools. SCAFFOLD-FIRST. If it breaks twice, nuke and restart with CLI defaults.

### SKILL 4: mish-brand-voice (Copy + Microcopy)
**Activation condition:** Any text, label, headline, or UI copy on mid·voyage surfaces.
**Key directive:** mid·voyage voice = quiet authority, specific, earned. No hustle framing. No emojis in long-form.

---

## MID·VOYAGE BRAND SYSTEM — FULL DESIGN TOKENS

### Identity
- **Brand name:** Mishael Vallar
- **Sub-brand:** mid·voyage
- **Tagline (LOCKED):** "Dispatches from the middle of figuring it out"
- **Positioning:** Solo founder-creator building AI systems in public
- **Audience:** Creators, indie builders, freelancers, solo founders

### Color Palette (Light Mode — DEFAULT)
```css
/* BACKGROUNDS — never pure white */
--bg-base:     #EDEAE3;   /* parchment canvas — page background */
--bg-surface:  #F5F2EB;   /* cards, panels */
--bg-elevated: #FAF8F4;   /* nested cards, tooltips */
--bg-invert:   #18171A;   /* code blocks, dark chips */

/* INK / TEXT */
--ink-primary:   #18171A;
--ink-secondary: #5A5855;
--ink-muted:     #9B978F;
--ink-ghost:     #C4BFB7;   /* ghost italic word — SIGNATURE ELEMENT */
--ink-invert:    #F5F2EB;

/* ACCENT */
--accent-terra:       #C85A3C;   /* terracotta — labels/eyebrows ONLY, NEVER button fills */
--accent-terra-light: #E89880;
--accent-terra-dark:  #9E3F28;
--accent-sage:        #6B8A72;
--accent-sand:        #B8A88A;

/* BORDERS */
--border-subtle: rgba(24,23,26,0.10);
--border-light:  rgba(24,23,26,0.18);
--border-medium: rgba(24,23,26,0.28);
```

### Dark Mode Overrides
```css
[data-theme="dark"] {
  --bg-base:       #18171A;
  --bg-surface:    #201F22;
  --bg-elevated:   #2A292D;
  --ink-primary:   #F0EDE7;
  --ink-secondary: #A8A49C;
  --ink-muted:     #6B6760;
  --ink-ghost:     #3D3C3F;
  --accent-terra:  #E07A61;   /* warmer in dark mode */
  --accent-sage:   #8AAF91;
  --border-subtle: rgba(240,237,231,0.08);
  --border-light:  rgba(240,237,231,0.14);
  --border-medium: rgba(240,237,231,0.24);
}
```

### Typography (LOCKED — FK Grotesk DNA, free-tier stack)
```
Display/Brand:  Plus Jakarta Sans 800        (FK Grotesk proxy)
Body/Reading:   DM Sans 400
Serif Ghost:    DM Serif Display italic 400  (ghost word only — one per headline)
Utility/Code:   JetBrains Mono 400-500       (nav, labels, badges, captions)
```

### Google Fonts Import (copy-paste ready)
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Typography Scale
```css
--text-hero: clamp(3rem, 8vw, 5.5rem);
--text-2xl:  2.25rem;
--text-xl:   1.75rem;
--text-lg:   1.375rem;
--text-md:   1.125rem;
--text-base: 1rem;
--text-sm:   0.875rem;
--text-xs:   0.875rem;
--text-2xs:  0.75rem;
```

### Spacing & Radius
```css
/* 4px base spacing scale */
--sp-1:0.25rem; --sp-2:0.5rem;  --sp-3:0.75rem; --sp-4:1rem;
--sp-5:1.25rem; --sp-6:1.5rem;  --sp-8:2rem;    --sp-10:2.5rem;
--sp-12:3rem;   --sp-16:4rem;   --sp-20:5rem;

/* Border radius — near-square, editorial */
--r-sm:3px; --r-md:6px; --r-lg:10px; --r-xl:16px; --r-full:9999px;

/* Motion */
--ease-out: cubic-bezier(0.16,1,0.3,1);
--dur-fast: 120ms;
--dur-base: 220ms;
--dur-slow: 400ms;
```

### Ghost Italic Signature (REQUIRED on every hero/headline)
```html
<!-- One ghost italic serif word per headline — this is the brand signature -->
<h1>
  Dispatches from the middle of
  <span style="font-family:'DM Serif Display'; font-style:italic; font-weight:400; color:var(--ink-ghost);">
    figuring
  </span>
  it out.
</h1>
```

### Design Rules — What ALWAYS applies
- `#EDEAE3` light / `#18171A` dark backgrounds — never pure white or pure black
- Terracotta for category labels/eyebrows ONLY — never fills, never buttons
- One ghost italic serif word per headline — mandatory brand signature
- JetBrains Mono for ALL UI utility text (nav items, labels, badges, captions, timestamps)
- Generous whitespace — parchment must breathe
- Near-square corners: 3px on buttons, 10px on cards

### Design Rules — What NEVER applies
- Turquoise `#4ECDC4` — belongs to handl'it ONLY, never mid·voyage
- Bold weight (600+) on the ghost italic word
- More than 2 font families per component
- Decorative gradients, glow, neon, drop shadows on text
- Pure white `#FFFFFF` or `#FAFAFA` anywhere

---

## DARK THEME TOGGLE — IMPLEMENTATION SPEC

The portfolio REQUIRES a functional light/dark toggle. Here is the full implementation spec.

### Behavior
- Default mode: **Light** (parchment #EDEAE3)
- Toggle switches between `[data-theme="light"]` and `[data-theme="dark"]`
- Persist preference: `localStorage.setItem('theme', 'dark')`
- On load: read localStorage, apply before first paint to avoid flash
- Respect system preference as fallback: `prefers-color-scheme: dark`

### Next.js Implementation Pattern
```tsx
// components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Initialize from localStorage or system preference
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Read saved preference or fallback to system
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const initial = saved ?? system;
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    // Touch target min 44px — mobile-first
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        minWidth: '44px',
        minHeight: '44px',
        background: 'transparent',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--r-sm)',       /* 3px — near-square */
        cursor: 'pointer',
        color: 'var(--ink-secondary)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 'var(--text-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '0 12px',
        transition: 'border-color var(--dur-base) var(--ease-out)',
      }}
    >
      {/* Simple text label — no emoji, on-brand */}
      {theme === 'light' ? 'dark' : 'light'}
    </button>
  );
}
```

### Anti-Flash Script (inject in `<head>` BEFORE any CSS)
```html   
<!-- In app/layout.tsx, inside <head> — prevents white flash on dark reload -->
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        var saved = localStorage.getItem('theme');
        var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', saved || system);
      })();
    `,
  }}
/>
```

### CSS Variable Hook (globals.css or tailwind base layer)
```css
/* globals.css — root is always light vars, data-theme="dark" overrides */
:root {
  --bg-base:       #EDEAE3;
  --bg-surface:    #F5F2EB;
  --bg-elevated:   #FAF8F4;
  --bg-invert:     #18171A;
  --ink-primary:   #18171A;
  --ink-secondary: #5A5855;
  --ink-muted:     #9B978F;
  --ink-ghost:     #C4BFB7;
  --ink-invert:    #F5F2EB;
  --accent-terra:       #C85A3C;
  --accent-terra-light: #E89880;
  --accent-terra-dark:  #9E3F28;
  --accent-sage:        #6B8A72;
  --accent-sand:        #B8A88A;
  --border-subtle: rgba(24,23,26,0.10);
  --border-light:  rgba(24,23,26,0.18);
  --border-medium: rgba(24,23,26,0.28);
  --r-sm:3px; --r-md:6px; --r-lg:10px; --r-xl:16px; --r-full:9999px;
  --ease-out: cubic-bezier(0.16,1,0.3,1);
  --dur-fast:120ms; --dur-base:220ms; --dur-slow:400ms;
}

[data-theme="dark"] {
  --bg-base:       #18171A;
  --bg-surface:    #201F22;
  --bg-elevated:   #2A292D;
  --ink-primary:   #F0EDE7;
  --ink-secondary: #A8A49C;
  --ink-muted:     #6B6760;
  --ink-ghost:     #3D3C3F;
  --accent-terra:  #E07A61;
  --accent-sage:   #8AAF91;
  --border-subtle: rgba(240,237,231,0.08);
  --border-light:  rgba(240,237,231,0.14);
  --border-medium: rgba(240,237,231,0.24);
}

/* Apply base tokens globally */
html {
  background-color: var(--bg-base);
  color: var(--ink-primary);
  transition: background-color var(--dur-base) var(--ease-out),
              color var(--dur-base) var(--ease-out);
}
```

---

## ACTIVE TASK LIST — mid·voyage Portfolio

### G1-BUILD — Build Tasks
- [ ] Finalize `globals.css` — all CSS vars wired from above spec
- [ ] Build `ThemeToggle` component — spec above, place in Navbar
- [ ] Anti-flash script injected in `app/layout.tsx`
- [ ] Build `Navbar` — JetBrains Mono labels, terracotta nav indicator, toggle
- [ ] Build `HeroSection` — ghost italic word in headline, tagline locked
- [ ] Build `WorkGrid` — case study cards linking to /work/[slug]
- [ ] Build `CaseStudyLayout` — shared template for all 3 client demos
- [ ] Wire `/work/kuya-koks` case study
- [ ] Wire `/work/ra-bautista` case study (dark theme, yellow, Geist+Inter)
- [ ] Wire `/work/graceland-farm` case study (charcoal/linen/gold)
- [ ] Build `Footer` — JetBrains Mono, minimal, parchment-appropriate
- [ ] Mobile-first responsive pass — test 320px, 768px, 1024px
- [ ] Touch targets audit — all interactive elements min 44px

### G2-SHIP — Deploy Tasks
- [ ] Set `NEXT_PUBLIC_SITE_URL` env var in Vercel dashboard
- [ ] Link GitHub repo to Vercel project
- [ ] Configure Vercel Singapore region (nearest to PH)
- [ ] Set custom domain: mvallarautomations.cc via Cloudflare
- [ ] Verify all 3 client demo routes live in production
- [ ] OG image / meta tags per page
- [ ] Update WORKSPACE-INDEX.json with deployed_url

---

## PAGES & ROUTING

```
/ (index)            — Hero + bio + case study grid + footer
/work/[slug]         — Case study detail (MDX or static)
/work/kuya-koks      — Filipino restaurant demo
/work/ra-bautista    — Graphic designer demo (NOT a law office)
/work/graceland-farm — Agritourism demo
/about               — Mishael bio, mid·voyage story, tools I use
```

---

## STACK SPEC

```
Framework:    Next.js 15 (App Router)
Content:      MDX (for case studies)
Styling:      Tailwind CSS + CSS custom properties
Fonts:        Google Fonts (Plus Jakarta Sans, DM Sans, DM Serif Display, JetBrains Mono)
Deploy:       Vercel (free tier)
Domain:       mvallarautomations.cc (Cloudflare DNS)
Runtime:      Node.js (no edge runtime required for MVP)
Auth:         None (public portfolio)
DB:           None (static content via MDX)
```

---

## BRAND VOICE — COPY RULES FOR ALL TEXT

**Voice profile:** Quiet authority. Specific. Earned. No hustle framing.

**Apply to:** page titles, hero copy, case study summaries, nav labels, button text, bio, footer.

**DO:**
- First person active voice: "I build" not "I have been building"
- Specific constraints: tools, costs, timelines, actual numbers
- One idea per paragraph
- End on a statement, not a question
- JetBrains Mono for all UI utility labels (nav, badges, timestamps)

**NEVER:**
- "I'm passionate about..." — banned phrase
- Hustle vocab: grind, crush it, beast mode
- Emojis in any long-form or UI text
- Manufactured urgency
- "Distilled Synthesis" — permanently retired brand name, never use
- "debugmylife" — permanently retired, never use

**Hero tagline (LOCKED, do not modify):**
> "Dispatches from the middle of figuring it out."

**Bio voice sample:**
> "Solo founder building AI systems out of necessity. Every constraint becomes a design brief. Philippines · Building in public."

---

## R.A. BAUTISTA CASE STUDY — SPECIAL NOTES

> ⚠️ IMPORTANT CORRECTION: R.A. Bautista is a Senior Graphic Designer and brand growth strategist (female). NOT a law office. Previous hallucination — permanently corrected.

Design spec for /work/ra-bautista:
- Dark themed (deviation from mid·voyage light default — this is a CASE STUDY page showing the client's brand, not mid·voyage's)
- Yellow accent color (client brand)
- Geist + Inter typography (client brand)
- Tailwind CSS implementation
- The mid·voyage wrapper (nav, footer, toggle) stays consistent

---

## AGENTS.md TEMPLATE FOR THIS REPO

Create `D:\AI_Dev\WorkspaceOS\Projects\midvoyage-portfolio\AGENTS.md` with:

```markdown
# Agent Instructions — mid·voyage Portfolio

## Project: Mishael Vallar Personal Portfolio
## Stack: Next.js 15, Tailwind CSS, MDX, Vercel
## Brand: mid·voyage (personal brand — NOT handl'it)

## Constraints (non-negotiable)
- FREE tools only — no paid APIs or services
- Windows-compatible scripts (ASCII only — no Unicode box chars)
- All env vars in .env.example (never commit .env)
- SCAFFOLD-FIRST: never customize before localhost verified
- Inline comments required on all non-trivial logic
- Mobile-first: test 320px, 768px, 1024px viewports
- Touch targets: minimum 44px for all interactive elements
- NEVER pure white (#FFFFFF/#FAFAFA) — use CSS var(--bg-base) = #EDEAE3
- NEVER turquoise #4ECDC4 — belongs to handl'it brand only
- Terracotta #C85A3C for labels/eyebrows ONLY — never button fills

## Brand Tokens
- bg-base: #EDEAE3 (light) / #18171A (dark)
- accent-terra: #C85A3C (light) / #E07A61 (dark)
- Fonts: Plus Jakarta Sans 800 / DM Sans 400 / DM Serif Display italic / JetBrains Mono

## Git Identity
- user.name = mvallautomations
- user.email = mvallarautomates@gmail.com

## Architecture
Static portfolio built in Next.js 15 App Router. Case studies as MDX files.
Theme toggle via data-theme attribute on <html>. No auth. No DB.
Deploy to Vercel Singapore. Custom domain via Cloudflare.

## Agent Rules
- Read this file before starting any task
- One focused task per agent session — no multi-domain work
- Verify localhost before adding features
- Commit with descriptive messages (feat:, fix:, style:, chore:)
```

---

## DEPLOYMENT CHECKLIST

```
[ ] GitHub repo linked to Vercel project
[ ] Vercel region: Singapore (sin1)
[ ] Environment variables set:
    NEXT_PUBLIC_SITE_URL=https://mvallarautomations.cc
[ ] Custom domain added in Vercel dashboard
[ ] Cloudflare DNS: CNAME mvallarautomations.cc -> cname.vercel-dns.com
[ ] All 3 /work/* routes verified in production
[ ] OG image + meta description per page
[ ] Lighthouse score: performance > 90
[ ] Mobile pass: 320px + 768px + 1024px
[ ] Theme toggle tested: light -> dark -> persist on reload
[ ] Anti-flash script working (no white flash on dark mode reload)
```

---

## CONTINUATION PROMPTS FOR CLAUDE CODE

### Start session — full context load:
```
Read AGENTS.md in the project root. This is the mid·voyage personal portfolio for Mishael Vallar (solo founder, Philippines). Stack: Next.js 15, Tailwind CSS, MDX, Vercel. Brand: parchment editorial (light #EDEAE3, dark #18171A, terracotta accent #C85A3C). NEVER use turquoise — that belongs to the handl'it brand. Fonts: Plus Jakarta Sans 800 / DM Sans 400 / DM Serif Display italic / JetBrains Mono. Start with: [SPECIFIC TASK].
```

### Theme toggle task:
```
Build a ThemeToggle component in Next.js 15 App Router. Toggle between data-theme="light" and data-theme="dark" on <html>. Persist to localStorage. Anti-flash script in layout.tsx head. CSS vars defined in globals.css. Button style: JetBrains Mono, near-square 3px border-radius, min 44px touch target, border-light color, text label "dark" or "light" (no emoji, no icons). Mobile-first.
```

### Navbar task:
```
Build a Navbar component for mid·voyage portfolio. Items: Work, About, [ThemeToggle]. Use JetBrains Mono for all nav labels. Terracotta #C85A3C underline for active state only — never fill. Transparent background on scroll, bg-surface on stuck. Mobile: hamburger menu with same token system. Import ThemeToggle component.
```

### Hero section task:
```
Build HeroSection for mid·voyage. Headline: "Dispatches from the middle of figuring it out." — ghost italic serif on the word "figuring" using DM Serif Display italic, color var(--ink-ghost). Display size: clamp(3rem, 8vw, 5.5rem). Plus Jakarta Sans 800 for the rest. Subtext: "Solo founder building AI systems out of necessity." Body copy in DM Sans. Parchment bg-base background. Generous whitespace — this is editorial, not a sales page.
```

---

## FILE: SAVE THIS HANDOFF

Save to: `D:\AI_Dev\WorkspaceOS\.meta\handoffs\2026-03-29-claude-to-claudecode-midvoyage.md`

---

## SESSION CONTEXT KEYWORDS (for next Claude.ai session pickup)

```
mid·voyage portfolio, mvallarautomations.cc, parchment editorial theme,
ThemeToggle component, anti-flash script, ghost italic serif, Plus Jakarta Sans 800,
DM Serif Display italic, JetBrains Mono utility, terracotta eyebrow label,
Next.js 15 App Router, Vercel Singapore, Cloudflare DNS,
kuya-koks case study, ra-bautista case study, graceland-farm case study,
data-theme attribute, localStorage persist, CSS custom properties,
G1-BUILD G2-SHIP, handl'it vs mid·voyage brand separation
```

---

*Handoff generated by Claude Sonnet 4.6 | Source: claude.ai | Target: Claude Code / Antigravity*  
*mid·voyage brand system governed by: D:\AI_Dev\WorkspaceOS\MID-VOYAGE-BRAND-SYSTEM.md*  
*"Distilled Synthesis" and "debugmylife" permanently retired — never use.*
