# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Mishael Vallar. Brand: **mid·voyage** (the content arm; handlit is the
separate delivery company — everything that sells signs off handlit, this site documents).
Live at `https://mvallarautomations.cc`.

Real path: `/home/vall/m-2nd-brain/code/midvoyage-portfolio` (own git repo,
remote `github.com/mvallautomations/midvoyage-portfolio`).

## Deploy — Cloudflare Pages, NOT git-connected

Pushing to GitHub does **not** deploy. Deploys are manual (corrected 2026-08-06; the old
Vercel claim in this file was stale — `vercel.json` is a leftover):

```bash
npx next build && npx wrangler pages deploy out --project-name=midvoyage-portfolio --branch=main
```

`next.config.ts` sets `output: "export"` — the site is a static export in `out/`.
No server components at runtime, no API routes, no async request APIs beyond `await params`.

## Commands

```bash
npm run dev      # Start dev server (next dev)
npm run build    # Production build (static export to out/)
npm run lint     # ESLint (eslint .)
```

No test framework is configured in-repo; e2e checks are run ad hoc with Playwright MCP.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4), static export
- **React 19**
- Path alias: `@/*` → `src/*`
- Turbopack is intentionally disabled — do not enable it

## Architecture

```
src/
  app/              # Next.js App Router pages
    globals.css     # Design tokens + all global styles
    layout.tsx      # Root layout — fonts, metadata, theme attr
    page.tsx        # Homepage: Hero, Bio, Work index
    about/          # /about
    blog/[slug]/    # Blog posts
    work/[slug]/    # Case study pages (see Content below)
  components/
    Nav.tsx         # Sticky nav with theme toggle
    Footer.tsx
    WorkCard.tsx    # Reusable case study card
    RunReplay.tsx   # Animated replay of logged n8n executions
  data/demo-runs/   # Verbatim copies of agent repos' evidence/runs.json (see its README)
  lib/
    blog.ts         # Blog post utilities
    demo-adapters.ts # runs.json → normalized ReplayRun shape
```

## Design System — DO NOT MODIFY TOKENS

All design tokens live in `src/app/globals.css`. The design system is strict:

| Rule | Value |
|------|-------|
| Background base | `#EDEAE3` parchment — **never pure white** |
| Accent (terracotta) | `#C85A3C` — **labels/eyebrows ONLY, never a fill** |
| Ghost italic word | DM Serif Display italic, color `--ink-ghost` — **one word per headline max** |
| Headings | Plus Jakarta Sans 800 |
| Body | DM Sans 300–500 |
| Labels / mono | JetBrains Mono |
| Radius | near-square, 3–16px — no pill cards |

**Four fonts** are loaded via `next/font/google` in `layout.tsx` as CSS variables:
`--font-jakarta`, `--font-dm-sans`, `--font-dm-serif`, `--font-jetbrains`

Dark mode is toggled via `data-theme="dark"` on `<html>`. Default is light. Verify both themes.

## Content — hard rules

Current case studies (all own-operations work, rewritten 2026-08-06): `speed-to-lead`,
`review-reply-agent`, `inbox-triage-agent`, `content-repurposer-agent`,
`handlit-agent-architect`. Defined in `src/app/work/[slug]/page.tsx`.

- **Never re-add** `kuya-koks`, `ra-bautista`, or `graceland-farm` — unpaid engagements,
  not client work, not permission-cleared.
- **Never invent numbers.** Latencies and outcomes shown on `/work/*` come verbatim from
  `src/data/demo-runs/*.json` (copied from each agent repo's `evidence/runs.json`).
  Speed-to-Lead's end-to-end figure is **7.4s** — not 6.75, not 7.8.
