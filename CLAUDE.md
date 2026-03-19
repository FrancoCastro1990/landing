# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Franco Castro (fcastro.dev). Built with Astro 4, React 18, TypeScript, and Tailwind CSS 3. Dark brutalist aesthetic inspired by "The Editorial Architect" — sharp 0px corners, italic serif headlines, yellow accent on pure black.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (static output to `dist/`)
- `npm run preview` — preview production build
- No test runner is configured

## Architecture

**Screaming Architecture** — code is organized by business feature, not technical layer.

```
src/
├── features/          # Feature modules, each with ui/, index.ts
│   ├── hero/          # Hero section (italic serif headline, availability badge)
│   ├── navigation/    # Header with glassmorphism nav, yellow brand
│   ├── about/         # Bio, animated stats, skill chips with left-border accent
│   ├── experience/    # Tonal-layered rows with year decorative
│   ├── projects/      # Alternating 12-col grid, hover opacity transitions
│   ├── contact/       # Centered italic serif CTA, expanding underline
│   └── layout/        # Minimal footer
├── shared/            # Cross-feature code
│   ├── ui/            # Reusable components (Card, Button, Badge, Reveal, etc.)
│   ├── hooks/         # useScrollProgress, useScrollReveal, useCountUp
│   └── styles/        # global.css (Tailwind directives, fonts)
└── pages/
    └── index.astro    # Single page — composes all features as Astro islands
```

**Key patterns:**
- Each feature exports through a barrel file (`index.ts`). Import from `@features/hero`, not from deep paths.
- Path aliases: `@features/*`, `@shared/*`, `@app/*` (configured in both `tsconfig.json` and `astro.config.mjs`).
- React components hydrate as Astro islands: `client:load` for always-interactive (Header), `client:visible` for lazy (Hero, About, etc.), none for static (Footer).
- Animations use `@react-spring/web`.

## Design System

- **Dark mode only** — pure black `#000000` background, no light theme.
- **0px border radius** everywhere (brutalist). Only `rounded-full` for pills/dots.
- **No divider lines** — structural boundaries use background color shifts (tonal layering).
- Color tokens in `tailwind.config.cjs`: `surface.*` (blacks/grays), `primary` (yellow `#FACC15`), `on-surface` (white), `on-surface-variant` (muted), `outline.*`.
- Typography: `font-headline` (Newsreader italic, serif) for titles, `font-body`/`font-label` (Manrope) for body and labels.
- Labels: always uppercase with wide tracking (`tracking-widest` or `tracking-[0.3rem]`).
- Use `text-on-surface` for primary text, `text-on-surface-variant` for secondary, `text-primary` for accent highlights.
- Section dividers use `border-white/5` (ghost borders).
- Glassmorphism for nav: `bg-surface-low/80 backdrop-blur-xl`.
- Hover transitions: `cubic-bezier(0.16, 1, 0.3, 1)` feel — use `duration-300` to `duration-700`.

## Code Style

- Prettier: single quotes, trailing commas (es5), no semicolons omission, 100 char width, 2-space indent.
- ESLint: TypeScript strict, React hooks rules. `react-in-jsx-scope` is off (React 17+ JSX transform).
- Strict TypeScript: `noImplicitAny`, `strictNullChecks`, `noImplicitReturns` enabled.
- Language: site content is in Spanish.
