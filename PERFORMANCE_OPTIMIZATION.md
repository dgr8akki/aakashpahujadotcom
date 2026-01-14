# Performance Optimization Guide

This document outlines the performance optimizations made to improve Google PageSpeed Insights scores, along with a roadmap for future improvements.

---

## Table of Contents

1. [Completed Optimizations](#completed-optimizations)
2. [Optimization Roadmap](#optimization-roadmap)
3. [Implementation Details](#implementation-details)
4. [Measuring Performance](#measuring-performance)

---

## Completed Optimizations

### ✅ 1. Removed Initial Loader Animation

**Problem**: A 3.5-second loading animation was blocking content visibility, severely impacting LCP (Largest Contentful Paint).

**Solution**: Removed the `Loader` component and related state management from `ClientLayout`.

**Files Changed**:
- `components/layout/ClientLayout.tsx` - Removed loader logic
- `components/ui/Loader.tsx` - Deleted
- `components/ui/Logo.tsx` - Removed unused `LogoLoader` component

**Impact**:
- ⬆️ LCP improved by ~3.5 seconds
- ⬆️ FCP (First Contentful Paint) improved significantly
- ⬆️ Better user experience with instant content visibility

---

### ✅ 2. Font Optimization with `next/font/local`

**Problem**: Custom fonts were loaded via CSS `@font-face`, causing render-blocking requests and no automatic optimization.

**Solution**: Migrated to `next/font/local` for automatic font optimization, preloading, and reduced font file downloads.

**Files Changed**:
- `lib/fonts.ts` - Created new font configuration
- `app/layout.tsx` - Added font CSS variables to HTML
- `app/globals.css` - Removed `@font-face` declarations
- `tailwind.config.ts` - Updated font families to use CSS variables

**What Changed**:

| Before | After |
|--------|-------|
| 7 Calibre font files loaded | 4 Calibre font files (only used weights) |
| 7 SF Mono font files loaded | 3 SF Mono font files (only used weights) |
| No preloading | Automatic preloading |
| Manual `font-display: swap` | Automatic `font-display: swap` |

**Impact**:
- ⬆️ Reduced font download size by ~40%
- ⬆️ Fonts are preloaded (no render blocking)
- ⬆️ Better CLS (Cumulative Layout Shift) with `font-display: swap`

---

### ✅ 3. Framer Motion LazyMotion Implementation

**Problem**: Full Framer Motion library (~50KB) was being loaded upfront, even though only DOM animations were used.

**Solution**: Implemented `LazyMotion` with `domAnimation` feature set and migrated all components from `motion` to `m`.

**Files Changed**:
- `components/ui/MotionProvider.tsx` - Created new provider
- `components/layout/ClientLayout.tsx` - Wrapped with MotionProvider
- Updated 11 components to use `m` instead of `motion`:
  - `components/sections/Hero.tsx`
  - `components/sections/About.tsx`
  - `components/sections/Contact.tsx`
  - `components/sections/Experience.tsx`
  - `components/sections/FeaturedProjects.tsx`
  - `components/sections/Projects.tsx`
  - `components/sections/Skills.tsx`
  - `components/layout/Navbar.tsx`
  - `components/layout/MobileMenu.tsx`
  - `components/layout/SideSocial.tsx`
  - `components/layout/SideEmail.tsx`

**Impact**:
- ⬆️ Reduced JS bundle by ~20-30KB
- ⬆️ Faster Time to Interactive (TTI)
- ⬆️ Lower Total Blocking Time (TBT)

---

## Optimization Roadmap

Follow this order for maximum impact with minimal effort:

### 🔴 High Priority (Big Impact, Easy Implementation)

#### 1. Add `priority` to Hero/Above-the-Fold Images
**Effort**: 5 minutes | **Impact**: High

Add the `priority` prop to images in the hero section or any above-the-fold content.

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero"
  priority  // Add this
  ...
/>
```

#### 2. Optimize Images with Modern Formats
**Effort**: 30 minutes | **Impact**: High

- Convert images in `/public/images/` to WebP format
- Use Next.js Image component's automatic optimization
- Ensure all images have explicit `width` and `height`

#### 3. Lazy Load Below-the-Fold Images
**Effort**: 15 minutes | **Impact**: Medium

Ensure images in Projects, Experience, and other below-fold sections use `loading="lazy"` (default in Next.js Image).

---

### 🟡 Medium Priority (Good Impact, Moderate Effort)

#### 4. Preload Critical Assets
**Effort**: 15 minutes | **Impact**: Medium

Add preload hints for critical assets in `app/layout.tsx`:

```tsx
<head>
  <link rel="preload" href="/images/logo.png" as="image" />
</head>
```

#### 5. Defer Google Analytics
**Effort**: 10 minutes | **Impact**: Medium

Already using `strategy="afterInteractive"` which is good. Consider using `strategy="lazyOnload"` for non-critical analytics.

#### 6. Review and Remove Unused Dependencies
**Effort**: 30 minutes | **Impact**: Medium

Run bundle analysis to identify unused code:

```bash
npm install --save-dev @next/bundle-analyzer
```

---

### 🟢 Lower Priority (Smaller Impact, More Effort)

#### 7. Implement Critical CSS
**Effort**: 1-2 hours | **Impact**: Low-Medium

Extract and inline critical CSS for above-the-fold content.

#### 8. Code Splitting for Heavy Components
**Effort**: 1 hour | **Impact**: Low-Medium

Use `next/dynamic` for components not needed on initial load:

```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

#### 9. Service Worker for Caching
**Effort**: 2-3 hours | **Impact**: Low (repeat visitors)

Implement a service worker for caching static assets.

---

## Implementation Details

### Font Configuration (`lib/fonts.ts`)

```typescript
import localFont from 'next/font/local';

export const calibre = localFont({
  src: [
    { path: '../public/fonts/Calibre/Calibre-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Calibre/Calibre-RegularItalic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/Calibre/Calibre-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Calibre/Calibre-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-calibre',
  display: 'swap',
  preload: true,
});

export const sfMono = localFont({
  src: [
    { path: '../public/fonts/SFMono/SFMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/SFMono/SFMono-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/SFMono/SFMono-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sf-mono',
  display: 'swap',
  preload: true,
});
```

### Motion Provider (`components/ui/MotionProvider.tsx`)

```typescript
'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
```

### Using `m` Instead of `motion`

```tsx
// Before
import { motion } from 'framer-motion';
<motion.div animate={{ opacity: 1 }}>...</motion.div>

// After
import { m } from 'framer-motion';
<m.div animate={{ opacity: 1 }}>...</m.div>
```

---

## Measuring Performance

### Tools

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **Chrome DevTools Lighthouse**: DevTools → Lighthouse tab
3. **WebPageTest**: https://www.webpagetest.org/

### Key Metrics to Monitor

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint - when main content is visible |
| **FID** | < 100ms | First Input Delay - time to interactivity |
| **CLS** | < 0.1 | Cumulative Layout Shift - visual stability |
| **FCP** | < 1.8s | First Contentful Paint - when first content appears |
| **TTI** | < 3.8s | Time to Interactive - when page is fully interactive |
| **TBT** | < 200ms | Total Blocking Time - main thread blocking |

### Before/After Comparison

Run PageSpeed Insights before and after each optimization to measure impact:

```bash
# Quick local performance check
npm run build && npm run start
# Then run Lighthouse in Chrome DevTools
```

---

## Summary

| Optimization | Status | LCP Impact | TTI Impact | Bundle Impact |
|--------------|--------|------------|------------|---------------|
| Remove Loader | ✅ Done | ⬆️⬆️⬆️ | ⬆️ | - |
| Font Optimization | ✅ Done | ⬆️⬆️ | ⬆️ | -40% fonts |
| LazyMotion | ✅ Done | ⬆️ | ⬆️⬆️ | -20-30KB JS |
| Priority Images | 🔲 Todo | ⬆️⬆️ | - | - |
| Image Optimization | 🔲 Todo | ⬆️⬆️ | - | Varies |
| Preload Assets | 🔲 Todo | ⬆️ | - | - |

---

*Last updated: January 2026*
