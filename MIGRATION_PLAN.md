# 🚀 Portfolio Migration Plan: Gatsby → Next.js 15

## Overview

This document outlines the complete migration plan from the current Gatsby-based portfolio to a modern Next.js 15 + Tailwind CSS stack.

**Branch:** `nextjs-migration`
**Estimated Time:** 2-3 focused sessions
**Goal:** Same look, feel, and functionality — but faster, simpler, and more maintainable.

---

## 📋 Migration Phases

### Phase 1: Project Setup
- [ ] Create new branch `nextjs-migration`
- [ ] Initialize Next.js 15 with App Router
- [ ] Configure Tailwind CSS with custom theme (matching current colors)
- [ ] Set up custom fonts (Calibre, SF Mono)
- [ ] Configure path aliases (@/components, @/lib, etc.)
- [ ] Set up MDX for blog posts
- [ ] Configure Contentlayer for type-safe content

### Phase 2: Core Layout & Components
- [ ] Create root layout with metadata
- [ ] Build Navbar (desktop + mobile hamburger menu)
- [ ] Build Footer component
- [ ] Build Side elements (social links, email)
- [ ] Create Logo SVG component
- [ ] Build animated Loader component (using Framer Motion)
- [ ] Set up smooth scrolling (CSS + Framer Motion)

### Phase 3: Homepage Sections
- [ ] Hero section (with staggered animations)
- [ ] About section (with image)
- [ ] Skills section
- [ ] Experience/Jobs section (tabbed interface)
- [ ] Featured Projects section
- [ ] Other Projects grid
- [ ] Contact section

### Phase 4: Blog System
- [ ] Blog listing page (`/blog`)
- [ ] Individual blog post pages (`/blog/[slug]`)
- [ ] Tags listing page (`/blog/tags`)
- [ ] Individual tag pages (`/blog/tags/[tag]`)
- [ ] MDX components (code highlighting, etc.)
- [ ] Reading time calculation

### Phase 5: Additional Pages
- [ ] Archive page
- [ ] 404 page

### Phase 6: SEO & Performance
- [ ] Metadata API for all pages
- [ ] Open Graph images
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Vercel Analytics integration

### Phase 7: Final Polish
- [ ] Scroll reveal animations
- [ ] Page transitions
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing

---

## 🎨 Design System (Tailwind Config)

### Colors (from current theme)

```js
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#000000',
          light: '#1f1611',
          dark: '#000000',
          darkest: '#01050b',
        },
        slate: {
          DEFAULT: '#8892b0',
          light: '#a8b2d1',
          lightest: '#ccd6f6',
        },
        grey: {
          DEFAULT: '#4c5772',
          light: '#606a86',
          medium: '#2d3952',
          dark: '#333f58',
        },
        accent: {
          DEFAULT: '#FF9E64',  // Orange (green in code but actually orange)
          pink: '#FF647F',
          yellow: '#FFC464',
          blue: '#71AFFF',
        },
        white: '#e6f1ff',
        offWhite: '#dce7ff',
      },
      fontFamily: {
        calibre: ['Calibre', 'San Francisco', 'SF Pro Text', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '22px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '50px',
        '6xl': '60px',
        '7xl': '70px',
        '8xl': '80px',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
        'loader': 'loader 2s ease-in-out',
      },
    },
  },
};
```

---

## 📁 New Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── loading.tsx                # Loading UI
│   ├── not-found.tsx              # 404 page
│   ├── archive/
│   │   └── page.tsx               # Archive page
│   ├── blog/
│   │   ├── page.tsx               # Blog listing
│   │   ├── [slug]/
│   │   │   └── page.tsx           # Individual post
│   │   └── tags/
│   │       ├── page.tsx           # All tags
│   │       └── [tag]/
│   │           └── page.tsx       # Posts by tag
│   └── globals.css                # Global styles + Tailwind
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── SideEmail.tsx
│   │   └── SideSocial.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Logo.tsx
│   │   ├── Loader.tsx
│   │   └── Icons.tsx
│   └── blog/
│       ├── PostCard.tsx
│       ├── TagList.tsx
│       └── MDXComponents.tsx
│
├── content/                        # (Reuse existing content)
│   ├── posts/                      # Blog posts (MDX)
│   ├── jobs/                       # Work experience
│   ├── projects/                   # Projects
│   ├── featured/                   # Featured projects
│   ├── about/                      # About content
│   ├── hero/                       # Hero content
│   ├── skills/                     # Skills content
│   └── contact/                    # Contact content
│
├── lib/
│   ├── config.ts                   # Site configuration
│   ├── content.ts                  # Content fetching utilities
│   └── utils.ts                    # Utility functions
│
├── public/
│   ├── fonts/                      # Custom fonts
│   ├── images/                     # Static images
│   └── resume.pdf
│
├── contentlayer.config.ts          # Content schema
├── tailwind.config.ts              # Tailwind configuration
├── next.config.ts                  # Next.js configuration
└── package.json
```

---

## 📦 Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "contentlayer2": "^0.5.0",
    "next-contentlayer2": "^0.5.0",
    "next-mdx-remote": "^5.0.0",
    "rehype-prism-plus": "^2.0.0",
    "rehype-slug": "^6.0.0",
    "reading-time": "^1.5.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

### Dev Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

---

## 🔄 Content Migration

### Blog Posts

**Current format:**
```markdown
---
title: Post Title
description: Description
date: '2026-01-09'
draft: false
slug: '/pensieve/post-slug'
tags:
  - Tag1
  - Tag2
---
```

**New format (minimal changes):**
```mdx
---
title: Post Title
description: Description
date: 2026-01-09
published: true
tags:
  - Tag1
  - Tag2
---
```

- Remove `slug` (auto-generated from filename)
- Rename `draft` to `published` (inverted logic)
- Remove quotes from date

### Jobs

No changes needed — same frontmatter structure.

### Projects

No changes needed — same frontmatter structure.

---

## 🔗 URL Structure

| Current | New | Notes |
|---------|-----|-------|
| `/` | `/` | Same |
| `/pensieve` | `/blog` | Renamed for clarity |
| `/pensieve/post-slug` | `/blog/post-slug` | Simplified |
| `/pensieve/tags` | `/blog/tags` | Under blog |
| `/pensieve/tags/ai` | `/blog/tags/ai` | Same pattern |
| `/archive` | `/archive` | Same |
| `/#about` | `/#about` | Same (anchor links) |

---

## ⚡ Key Improvements

| Feature | Current (Gatsby) | New (Next.js) |
|---------|------------------|---------------|
| CSS | Styled Components (runtime) | Tailwind (build-time) |
| Animations | anime.js + CSS transitions | Framer Motion |
| Smooth Scroll | smooth-scroll library | CSS `scroll-behavior` |
| Content | gatsby-transformer-remark | Contentlayer + MDX |
| Build Time | ~30-60 seconds | ~10-20 seconds |
| Bundle Size | Larger (CSS-in-JS runtime) | Smaller |
| SSR Issues | CSS hydration problems | None |
| Service Worker | gatsby-plugin-offline (buggy) | Optional, simpler |

---

## 🚀 Deployment

### Vercel Configuration

```json
// vercel.json (optional, usually auto-detected)
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Environment Variables (if needed)

```env
NEXT_PUBLIC_GA_ID=UA-155755445-1
NEXT_PUBLIC_SITE_URL=https://www.aakashpahuja.com
```

---

## ✅ Checklist Before Merging

- [ ] All pages render correctly
- [ ] All animations work smoothly
- [ ] Blog posts display correctly
- [ ] Tags work correctly
- [ ] SEO meta tags present on all pages
- [ ] Sitemap generated
- [ ] Mobile responsive on all breakpoints
- [ ] Lighthouse score ≥ 90 on all metrics
- [ ] No console errors
- [ ] All links work (internal + external)
- [ ] Resume PDF accessible
- [ ] Contact form/email link works
- [ ] Social links work
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

---

## 🎯 Success Criteria

1. **Visual Parity:** Site looks identical to current version
2. **Performance:** Faster load times, better Lighthouse scores
3. **No Bugs:** CSS flash, hydration issues all resolved
4. **Better DX:** Easier to add content and make changes
5. **Future-Proof:** Modern stack with active maintenance

---

## 📝 Notes

- Keep the same custom fonts (Calibre, SF Mono)
- Maintain the same color scheme (black + orange accent)
- Preserve all animations and transitions
- Keep the hexagon logo SVG
- Maintain the same content structure where possible

---

*Created: January 11, 2026*
*Last Updated: January 11, 2026*
