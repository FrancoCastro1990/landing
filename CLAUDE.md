# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Franco Castro (fcastro.dev). Built with Astro 6, React 18, TypeScript, and Tailwind CSS 3 (via PostCSS). Dark brutalist aesthetic — sharp 0px corners, italic serif headlines, yellow accent on pure black. Deployed to Vercel as static output.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (static output to `dist/`)
- `npm run preview` — preview production build
- No test runner is configured
- Requires Node.js 22+ (managed via mise, see `mise.toml`)

## Architecture

**Screaming Architecture** — code is organized by business feature, not technical layer.

```
src/
├── app/               # App-level data layer (above features and shared)
│   ├── types.ts       # TypeScript interfaces for all portfolio data
│   ├── data.ts        # Single source of truth — all personal/content data
│   └── index.ts       # Barrel: re-exports data and types
├── features/          # Feature modules, each with ui/, index.ts
│   ├── hero/          # Hero section (italic serif headline)
│   ├── navigation/    # Header with glassmorphism nav, yellow brand
│   │   └── hooks/     # useHeaderVisibility, useMobileMenu, useNavigation
│   ├── about/         # Bio, animated stats (countUp), skill chips
│   ├── experience/    # Tonal-layered timeline with year decorative
│   ├── projects/      # Alternating grid with ProjectCard components
│   ├── contact/       # Centered italic serif CTA, email + social links
│   ├── layout/        # Footer
│   ├── background/    # NodeNetwork — canvas particle animation
│   └── theme-customizer/ # Runtime color customizer with presets + localStorage
├── shared/            # Cross-feature code
│   ├── ui/            # Reusable components (Card, Button, Badge, Reveal, SectionTitle, Link, ActionButton)
│   ├── hooks/         # useScrollProgress, useScrollReveal, useCountUp
│   └── styles/        # global.css (Tailwind directives)
└── pages/
    └── index.astro    # Single page — imports data, passes props to all islands
```

**Key patterns:**
- **Centralized data layer:** All personal/content data lives in `src/app/data.ts` (typed via `src/app/types.ts`). `index.astro` imports `portfolioData`, destructures it, and passes props to each island. Components are pure rendering — no hardcoded data. To update content (name, email, experience, projects, skills), edit only `src/app/data.ts`.
- **Structured text with `HeadlinePart[]`:** Titles with accent-colored words are modeled as arrays of `{ text, accent? }`. Each component decides how to render accent (Hero uses `text-primary`, Contact uses underline + muted). Line breaks vs inline spacing is a component decision.
- Each feature exports through a barrel file (`index.ts`). Import from `@features/hero`, not from deep paths.
- Path aliases: `@features/*`, `@shared/*`, `@app/*` (configured in both `tsconfig.json` and `astro.config.mjs`).
- React components hydrate as Astro islands: `client:load` for Header, `client:idle` for NodeNetwork and ThemeCustomizer, `client:visible` for content sections, none for Footer.
- Animations use `@react-spring/web`.
- Tailwind 3 runs via `postcss.config.cjs` (not `@astrojs/tailwind`, which is incompatible with Astro 6).
- Fonts loaded via `<link>` in `index.astro` head (not CSS `@import`).

## Design System

- **Dark mode only** — pure black `#000000` background, no light theme.
- **0px border radius** everywhere (brutalist). Only `rounded-full` for pills/dots.
- **No divider lines** — structural boundaries use background color shifts (tonal layering).
- Color tokens as CSS custom properties in `global.css`, mapped in `tailwind.config.cjs`: `surface.*` (blacks/grays), `primary` (yellow `#FACC15`), `on-surface` (white), `on-surface-variant` (muted), `outline.*`.
- Typography: `font-headline` (Newsreader italic, serif) for titles, `font-body`/`font-label` (Manrope) for body and labels.
- Labels: always uppercase with wide tracking (`tracking-widest` or `tracking-[0.3rem]`).
- Use `text-on-surface` for primary text, `text-on-surface-variant` for secondary, `text-primary` for accent highlights.
- Section dividers use `border-white/5` (ghost borders).
- Glassmorphism for nav: `bg-surface-low/80 backdrop-blur-xl`.
- Hover transitions: use `duration-300` to `duration-700`.
- Theme Customizer allows runtime color changes with 5 presets and custom pickers. Persisted to localStorage.

## Accessibility

- All interactive elements must have visible focus indicators (`focus:ring-2 focus:ring-primary`).
- Menus and modals must close with Escape key.
- Animated stats use `aria-live="polite"`.
- Decorative elements use `aria-hidden="true"` or `role="presentation"`.
- `prefers-reduced-motion` is respected in `global.css`.

## Code Style

- Prettier: single quotes, trailing commas (es5), semicolons, 100 char width, 2-space indent.
- ESLint: TypeScript strict, React hooks rules. `react-in-jsx-scope` is off (React 17+ JSX transform).
- Strict TypeScript: `noImplicitAny`, `strictNullChecks`, `noImplicitReturns` enabled.
- Language: site content is in Spanish.
