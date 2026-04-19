# Portfolio Redesign — Implementation Progress

Source: Claude Design handoff bundle (`Portfolio.html`) — aubergine/amber direction with Instrument Serif + Geist type, 3D hero, OSS strip.
Target: existing Next.js 16 + Tailwind v4 + Framer Motion repo. Preserve content from `/content`, restyle components only.

## Design direction captured

- **Palette**: aubergine base (`#0F0A14`/`#160E1C`), ink `#F4ECE1`, amber accent `#F4A552`; alternates iris/sage/rose retained as swatches.
- **Type**: Instrument Serif (display + italic) + Geist (sans) + Geist Mono (labels/code).
- **Layout**: fixed nav w/ hex brand mark; fixed side rails for socials + email (desktop); mobile sheet.
- **Hero**: 3D hex-card monogram with floating skill tiles, dashed aura rings, mouse-parallax.
- **About**: narrative + stats row + tiltable portrait card.
- **Skills**: 4-col grid with category, name, 5-dot proficiency bar, cursor-follow glow.
- **Experience**: vertical tabs (left) + fade-in role panel.
- **Work**: alternating image/content projects with amber gradient-mock visuals.
- **OSS**: `119+ repos` strip w/ rotating conic-gradient backdrop + repo cards.
- **Blog**: minimal list with arrow-slide hover.
- **Contact**: centered serif headline + dual orbs + amber CTA.

## Stages

- [x] Stage 0 — Branch checked out (`claude/implement-portfolio-design-kdept`), design bundle inspected.
- [ ] Stage 1 — Design tokens (globals.css), fonts (Instrument Serif/Geist via next/font/google).
- [ ] Stage 2 — Navbar + mobile sheet + side rails (aubergine + amber).
- [ ] Stage 3 — Hero 3D stage.
- [ ] Stage 4 — About + stats + portrait card.
- [ ] Stage 5 — Skills grid with proficiency bars.
- [ ] Stage 6 — Experience tabs (serif titles).
- [ ] Stage 7 — Featured work (alternating layout, amber mocks).
- [ ] Stage 8 — OSS showcase strip (replaces "Other Projects").
- [ ] Stage 9 — Contact + Footer.
- [ ] Stage 10 — Build verify + in-browser smoke test.

Each stage = one commit + push to `origin/claude/implement-portfolio-design-kdept`.
