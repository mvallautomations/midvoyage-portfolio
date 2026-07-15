# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Mishael Vallar. Brand: **mid·voyage** (this file lives in the `handlit-os/`
folder for path stability only — that folder name is a legacy holdover, not a brand reference).
handl'it is a separate, ACTIVE sibling business brand (not retired — see root `CLAUDE.md`
Section 2 and `brands/handlit/handlit.md`); it has no relationship to this site or this folder.
See `handlit-os/CLAUDE.md` for the folder-level note and root `CLAUDE.md` for the full MOC.
Deploy target: Vercel free tier at `mvallarautomations.cc`.
Workspace root: `/home/vall/m-2nd-brain` (WSL2) / `\\wsl.localhost\Ubuntu\home\vall\m-2nd-brain` (UNC).
This project's real path: `/home/vall/m-2nd-brain/handlit-os/super-duper-potato`.

## Commands

```bash
npm run dev      # Start dev server (next dev)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (eslint .)
```

No test framework is configured.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
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
    blog/[slug]/    # MDX blog posts (not yet wired)
    work/[slug]/    # Case study pages
  components/
    Nav.tsx         # Sticky nav with theme toggle
    Footer.tsx
    WorkCard.tsx    # Reusable case study card
  lib/
    blog.ts         # Blog post utilities
```

All request APIs are async (Next.js 16): `await cookies()`, `await headers()`, `await params`.

## Design System — DO NOT MODIFY TOKENS

All design tokens live in `src/app/globals.css`. The design system is strict:

| Rule | Value |
|------|-------|
| Background base | `#EDEAE3` parchment — **never pure white** |
| Accent (terracotta) | `#C85A3C` — **labels/eyebrows ONLY** |
| Ghost italic word | DM Serif Display italic, color `--ink-ghost` — **one word per headline max** |
| Headings | Plus Jakarta Sans 800 |
| Body | DM Sans 300–500 |
| Labels / mono | JetBrains Mono |

**Four fonts** are loaded via `next/font/google` in `layout.tsx` as CSS variables:
`--font-jakarta`, `--font-dm-sans`, `--font-dm-serif`, `--font-mono`

Dark mode is toggled via `data-theme="dark"` on `<html>`. Default is light.

## Content

The three featured work case studies are: `kuya-koks` (Filipino restaurant), `ra-bautista` (law firm), and a third placeholder. Static params are generated in `src/app/work/[slug]/page.tsx`.
