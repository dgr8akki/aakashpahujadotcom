# AGENTS.md

Guidance for AI coding agents working on this repo.

## Project

Personal portfolio site for Aakash Pahuja. Next.js 16 (App Router), React 19, Tailwind CSS v4, MDX-based content.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (legacy config via `ESLINT_USE_FLAT_CONFIG=false`)
- `npm run format` — Prettier across js/ts/json/md

## Layout

- `app/` — Next.js App Router routes and layouts
- `components/` — React components
- `content/` — MDX blog posts, projects, featured work
- `lib/` — content loaders, utilities
- `public/` — static assets (including `resume.pdf`)
- `styles/` — global styles

## Conventions

- TypeScript everywhere; prefer server components, opt into client only when needed.
- Tailwind v4 utility classes; theme tokens live in `app/globals.css` / Tailwind config.
- Content is file-based MDX; loaders parse frontmatter with `gray-matter`.
- Keep changes minimal and focused — no speculative refactors.
- Do not add comments unless they explain non-obvious "why".

## Verify before claiming done

Run `npm run build` after non-trivial changes. For UI work, start the dev server and exercise the affected route in a browser.
