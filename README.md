<div align="center">
  <img alt="Logo" src="public/images/logo.png" width="100" />
</div>

<h1 align="center">
  aakashpahuja.com v2
</h1>

<p align="center">
  The second iteration of my personal portfolio website built with <a href="https://nextjs.org/" target="_blank">Next.js 15</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>.
</p>

<p align="center">
  <a href="https://www.aakashpahuja.com" target="_blank">
    <strong>🚀 View Live Site</strong>
  </a>
</p>

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Content | Markdown + gray-matter |
| Language | TypeScript |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── blog/             # Blog pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Homepage sections
│   ├── ui/               # UI components
│   └── blog/             # Blog components
├── content/              # Markdown content
│   ├── posts/            # Blog posts
│   ├── jobs/             # Work experience
│   ├── projects/         # Projects
│   └── ...
├── lib/                  # Utilities
│   ├── config.ts         # Site configuration
│   ├── content.ts        # Content fetching
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── fonts/            # Custom fonts
│   └── images/           # Images
└── tailwind.config.ts    # Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/dgr8akki/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be running at `http://localhost:3000`

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## ✍️ Adding Content

### Blog Posts

Create a new folder in `content/posts/` with an `index.md` file:

```markdown
---
title: Your Post Title
description: A brief description
date: '2026-01-11'
draft: false
tags:
  - Tag1
  - Tag2
---

Your content here...
```

---

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.ts` to customize colors, fonts, and other design tokens.

### Site Configuration

Update `lib/config.ts` for site title, description, social links, and navigation.

---

## 📦 Deployment

The site is configured for automatic deployment to Vercel.

```bash
npm run build
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://www.aakashpahuja.com">Aakash Pahuja</a></sub>
</div>
