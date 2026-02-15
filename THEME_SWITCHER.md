# Theme Switcher Feature

The portfolio now includes a beautiful, smooth theme switcher that allows users to toggle between dark and light modes.

## 🎨 Features

### Visual Design
- **Animated Toggle**: Spring physics animation with smooth slider movement
- **Dynamic Icons**: Moon icon for dark mode, sun icon for light mode
- **Icon Animations**: Rotation and scale effects during transition
- **Glow Effect**: Subtle pulsing glow for visual interest
- **Glassmorphic Design**: Frosted glass background with backdrop blur

### User Experience
- **System Preference Detection**: Automatically detects user's OS theme preference
- **Persistent Choice**: Remembers theme selection in localStorage
- **No Flash**: Script prevents flash of wrong theme on page load
- **Smooth Transitions**: All colors and backgrounds transition smoothly (300ms)
- **Accessible**: Proper ARIA labels and keyboard support

## 🛠 Implementation

### New Files
```
lib/contexts/
  ThemeContext.tsx           # React context for theme management

components/ui/
  ThemeToggle.tsx           # Animated toggle component
```

### Modified Files
- `tailwind.config.ts` - Added `darkMode: 'class'` and light mode colors
- `app/globals.css` - Light mode CSS overrides
- `app/layout.tsx` - Theme initialization script
- `components/layout/ClientLayout.tsx` - ThemeProvider wrapper
- `components/layout/Navbar.tsx` - Theme toggle integration

## 🎯 How It Works

### 1. Theme Context
The `ThemeContext` provides:
- Current theme state (`dark` | `light`)
- `toggleTheme()` function to switch themes
- Auto-detection of system preference
- localStorage persistence

### 2. Theme Toggle Component
Features smooth animations using Framer Motion:
- Spring-based slider with `stiffness: 500, damping: 30`
- Icon rotation (0° → 180°) with spring easing
- Scale animation for icon (1 → 0.8)
- Position animation (x: 0 → 28px)

### 3. Theme Application
Themes are applied via class on `<html>`:
```jsx
// Dark mode
<html class="dark">

// Light mode  
<html class="light">
```

CSS uses `.light` prefix for overrides:
```css
.light body {
  @apply bg-light-bg text-light-text;
}

.light .glass-card {
  @apply bg-white/50 border-light-border;
}
```

## 🎨 Color Palette

### Dark Mode (Default)
- **Background**: `#000000` (navy)
- **Text**: `#ccd6f6` (slate-lightest)
- **Secondary Text**: `#a8b2d1` (slate-light)
- **Muted Text**: `#8892b0` (slate)
- **Accent**: `#FF9E64`

### Light Mode
- **Background**: `#ffffff` (light-bg)
- **Secondary BG**: `#f8f9fa` (light-bg-secondary)
- **Text**: `#1a202c` (light-text)
- **Secondary Text**: `#4a5568` (light-text-secondary)
- **Muted Text**: `#718096` (light-text-muted)
- **Border**: `#e2e8f0` (light-border)
- **Accent**: `#FF9E64` (same)

## 🚀 Usage

### Accessing Theme
```tsx
import { useTheme } from '@/lib/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Theme-Aware Styling
Use Tailwind's dark mode variant:
```tsx
<div className="bg-navy dark:bg-navy light:bg-light-bg">
  Content
</div>
```

Or use the CSS classes:
```tsx
<div className="glass-card">
  {/* Automatically adapts to theme */}
</div>
```

## ⚡ Performance

- **No Flash**: Theme applied before React hydration
- **Smooth Transitions**: GPU-accelerated animations
- **Efficient Re-renders**: Context only updates when theme changes
- **Local Storage**: Instant theme restoration on page load

## 📱 Responsive Behavior

The theme toggle:
- Shows in desktop navigation (md and up)
- Positioned between nav links and Resume button
- Maintains proper spacing with gap-4
- Touch-friendly tap target (w-14 h-7)

## 🔮 Future Enhancements

Potential improvements:
- Add keyboard shortcut (e.g., Cmd/Ctrl + Shift + L)
- System preference change listener
- More granular theme options (e.g., auto/dark/light)
- Custom color theme builder
- Transition animations for page elements

## 🎬 Animation Details

### Toggle Slider
- **Type**: Spring physics
- **Stiffness**: 500 (snappy response)
- **Damping**: 30 (minimal bounce)
- **Travel**: 28px (from left to right)

### Icon Transition
- **Rotation**: 0° → 180° (full rotation)
- **Scale**: 1 → 0.8 (slight shrink)
- **Duration**: 300ms
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring)

### Background Glow
- **Animation**: Pulsing opacity (0 → 0.3 → 0)
- **Duration**: 2s infinite
- **Effect**: Radial gradient with accent color

---

Built with ❤️ using React Context, Framer Motion, and Tailwind CSS
