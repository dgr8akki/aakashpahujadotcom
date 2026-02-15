# Apple-Inspired Portfolio Redesign

This branch contains a complete redesign of the portfolio website with a premium, Apple-inspired aesthetic featuring liquid-smooth animations and immersive user experiences.

## 🎨 Design Philosophy

The redesign follows Apple's design principles:
- **Minimalism**: Clean, focused interfaces with purposeful whitespace
- **Smooth Animations**: Buttery 60fps animations using Framer Motion
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Depth & Layering**: Subtle shadows, glows, and parallax effects
- **Premium Feel**: Attention to micro-interactions and polish

## ✨ Key Features

### 1. **Immersive Hero Section**
- Full-viewport experience with animated gradient background
- Floating orbs with parallax effects
- Scroll-triggered fade and scale animations
- Large gradient text with glow effects
- Smooth scroll indicator

### 2. **Glassmorphism UI**
- Frosted glass navigation bar with backdrop blur
- Translucent cards with soft borders
- Layered depth with shadows and highlights
- Smooth hover states with glow effects

### 3. **Fluid Animations**
- Spring physics using custom easing curves
- Staggered entrance animations
- Scroll-based parallax effects
- Smooth page transitions
- Micro-interactions on all interactive elements

### 4. **Enhanced Sections**

#### About
- Glassmorphic content card
- Parallax image with hover effects
- Animated skill badges with checkmarks
- Smooth reveal animations

#### Skills
- Grid of glassmorphic skill cards
- Hover effects with shimmer and glow
- Staggered entrance animations
- Accent corner indicators

#### Experience
- Glassmorphic tab pills with smooth transitions
- Animated active indicator using `layoutId`
- Beautiful timeline design
- Smooth content transitions

#### Projects
- **Featured**: Horizontal scroll carousel (Apple-style)
- Large glassmorphic cards with image zoom effects
- Tech stack badges with rounded pills
- Smooth card lift animations
- **Other Projects**: Grid of animated cards
- Hover effects with rotation and scale

#### Contact
- Centered minimalist design
- Large gradient heading
- Animated social links with lift effects
- Premium CTA button with gradient overlay

### 5. **Performance Optimizations**
- GPU-accelerated transforms
- Efficient scroll listeners with passive events
- Optimized Framer Motion with proper variants
- Lazy animations triggered by viewport intersection

## 🛠 Technical Implementation

### New Files
```
lib/
  animations.ts              # Reusable Framer Motion variants
  hooks/
    useScrollAnimation.ts    # Custom hooks for scroll effects
```

### Modified Files
- `tailwind.config.ts` - Enhanced with Apple-style utilities
- `app/globals.css` - Added glassmorphism and smooth transitions
- All section components - Completely redesigned
- `components/layout/Navbar.tsx` - Glassmorphic navigation

### New Tailwind Utilities
- **Easings**: `apple-smooth`, `apple-spring`
- **Animations**: `float`, `glow`, `shimmer`, `pulse-slow`, `scale-in`
- **Shadows**: `glass`, `glow`, `glow-lg`, `soft`, `soft-lg`
- **Classes**: `.glass`, `.glass-card`, `.transition-apple`, `.text-gradient`, `.gradient-bg`

### Animation Variants
- `fadeInUp` - Smooth fade with upward motion
- `fadeIn` - Simple opacity fade
- `scaleIn` - Scale with spring physics
- `slideInLeft/Right` - Directional slides
- `staggerContainer` - Container with staggered children
- `cardHover` - Lift effect for cards
- `buttonHover` - Button press effects
- `floatingVariants` - Continuous floating motion

## 🎯 Color Palette

The existing color scheme is preserved:
- **Background**: Black (`#000000`)
- **Accent**: Orange (`#FF9E64`)
- **Accent Pink**: `#FF647F`
- **Accent Yellow**: `#FFC464`
- **Accent Blue**: `#71AFFF`

## 📱 Responsive Design

All sections are fully responsive:
- Mobile-first approach
- Touch-friendly interactions
- Optimized animations for mobile devices
- Horizontal scroll works on touch devices

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 📝 Notes

- All animations use smooth Apple-style easing curves
- Glassmorphism requires modern browsers with backdrop-filter support
- Horizontal scroll in Featured Projects works best on desktop
- Performance tested for 60fps animations
- All interactions have proper hover, focus, and active states

## 🎬 Animation Performance

- **Smooth scrolling**: CSS scroll-behavior + Framer Motion
- **Parallax effects**: useTransform with scroll progress
- **Entrance animations**: Intersection Observer with Framer Motion
- **Micro-interactions**: Spring physics for natural feel

## 🔮 Future Enhancements

Potential improvements:
- Add magnetic cursor effect (desktop only)
- Implement page transitions
- Add scroll-triggered video/lottie animations
- Create loading skeleton screens
- Add theme toggle (light/dark mode)

---

Built with ❤️ using Next.js 15, Tailwind CSS, and Framer Motion
