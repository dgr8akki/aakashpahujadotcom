---
date: '2025-02-01'
title: 'Senior Software Engineer 2'
company: 'Squarespace'
location: 'Dublin, IE'
range: 'February 2025 - Present'
url: 'https://www.squarespace.com'
order: 1
---

- **AI-first site builder (greenfield R&D):** Core contributor to a pre-release website builder where an LLM agent edits the site through typed tools. Worked across a 38-package TypeScript monorepo on Bun (React, Vite, Tailwind v4, Express, tRPC, Drizzle/PostgreSQL, BullMQ), shipping 92 merged PRs and reviewing 70 more in four months
- **Spec-driven development:** Wrote 15 architecture and feature specs before any code (requirements, options with trade-offs, acceptance criteria, risks), then delivered each as a chain of small PRs against tracked issues — now the team's default for anything bigger than a bug fix
- **Accessibility programme:** Specified and shipped WCAG 2.1 AA compliance for the editor in four phases (focus and ARIA contracts, WAI-ARIA keyboard patterns, screen reader announcements), finishing with an axe-core gate in CI that fails the build on any violation
- **LLM agent tooling:** Designed typed tool contracts and input validation at the tool boundary for the site-building agent (Claude and Gemini via Vertex AI), plus an MCP server so a separate host app could drive the same tools
- **AI review pipeline:** Built a multi-persona AI pre-push review gate and a PR review bot wired into GitHub approvals, and adopted stacked PRs and mutation-verified testing as the day-to-day workflow
- **Text Block migration:** Leading the move of the core rich text component from ProseMirror to Tiptap with feature parity across millions of live sites
- **Team leadership:** Onboarded two engineering teams (7+ developers) to set up the Website Group in Dublin and established its code review and release practices
