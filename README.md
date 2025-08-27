# 🖥️ FCastro.dev - Personal Portfolio

A modern, terminal-inspired personal portfolio website built with Astro, React, TypeScript, and Tailwind CSS.

![Astro](https://img.shields.io/badge/Astro-4.0-orange)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-teal)

## ✨ Features

### 🎨 Design System
- **Terminal Aesthetic**: Authentic command-line interface design
- **Custom Color Palette**: Carefully crafted light/dark theme system with `lightTheme`/`darkTheme` colors
- **Monospace Typography**: Consistent `font-mono` usage throughout
- **Terminal Components**: Cards with terminal headers (red, yellow, green circles)
- **Clean Design**: Removed all blur effects for consistent, sharp terminal look

### 🚀 Interactive Elements
- **Typing Animation**: Realistic terminal typing effect in hero section with `<FCastro.dev />` logo integration
- **Smart Scroll Hints**: Arrows appear after 2 seconds if user hasn't scrolled, reset when returning to top
- **Dynamic Scroll Indicator**: Custom progress bar with mobile/desktop responsive positioning
- **Dynamic Backgrounds**: Subtle color shifts per section (10% opacity tints)
- **Hidden Header**: Header appears only when scrolling, maintains clean hero view
- **Responsive Navigation**: Clean mobile menu with terminal styling

### 🛠️ Technical Stack
- **Framework**: Astro 4.0 (Static Site Generation)
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **Animations**: React Spring for smooth transitions
- **Performance**: Optimized for speed and accessibility

## 🏗️ Project Structure

```
landing/
├── src/
│   ├── components/
│   │   ├── Card.tsx              # Terminal-style cards (4 variants)
│   │   ├── Header.tsx            # Hidden header with mobile menu
│   │   ├── Hero.tsx              # Multi-phase typing animation
│   │   ├── Logo.tsx              # <FCastro.dev /> component
│   │   ├── ScrollIndicator.tsx   # Responsive scroll progress
│   │   ├── SectionTitle.tsx      # Terminal headings with # prefix
│   │   ├── DynamicBackground.tsx # Section-based background tints
│   │   ├── About.tsx             # About section with terminal cards
│   │   ├── Experience.tsx        # Git log style experience
│   │   ├── ProjectsGrid.tsx      # Uniform height project cards
│   │   ├── Contact.tsx           # Contact section
│   │   └── Footer.tsx            # Terminal-style footer
│   ├── pages/
│   │   └── index.astro          # Main page
│   └── styles/
│       └── global.css           # Global styles with hidden scrollbars
├── tailwind.config.cjs          # Custom terminal color system
├── astro.config.mjs            # Astro configuration
├── .gitignore                  # Complete gitignore for deployment
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/FrancoCastro1990/landing.git
cd landing

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

## 🎨 Design System

### Color Palette
The project uses a carefully crafted terminal-inspired color system:

```css
/* Light Theme */
lightTheme: {
  bg: '#f8f9fa',
  text: '#2d3748',
  green: '#38a169',
  blue: '#3182ce',
  yellow: '#d69e2e',
  red: '#e53e3e',
  magenta: '#805ad5'
}

/* Dark Theme */
darkTheme: {
  bg: '#1a202c',
  text: '#e2e8f0',
  green: '#68d391',
  blue: '#63b3ed',
  yellow: '#f6e05e',
  red: '#fc8181',
  magenta: '#b794f6'
}
```

### Section Background Tints
- **Hero**: Base colors (no tint)
- **About**: Magenta tint (10% opacity)
- **Experience**: Green tint (10% opacity)
- **Projects**: Blue tint (10% opacity)
- **Contact**: Yellow tint (10% opacity)

## 🧩 Key Components

### Terminal Card Variants
```tsx
<Card variant="default">Basic card</Card>
<Card variant="bordered">Enhanced borders</Card>
<Card variant="highlight">Highlighted content</Card>
<Card variant="terminal" showHeader>Full terminal window</Card>
```

### Hero Typing Sequence
```tsx
// 3-phase typing animation:
// 1. "Hello, I'm " → 2. <FCastro.dev /> appears → 3. " // FullStack Developer..."
```

### Responsive Scroll Indicator
```tsx
// Desktop: Right side, vertically centered
// Mobile: Right side, bottom positioned
// Shows "scroll to explore" hint for new visitors
```

## 📱 Responsive Behavior

### Header
- **Desktop**: Horizontal navigation with `$` hover effects
- **Mobile**: Hamburger menu with terminal-style overlay
- **Behavior**: Hidden until scroll, appears with blur backdrop

### Scroll Indicator
- **Desktop**: Fixed right, vertically centered
- **Mobile**: Fixed right, bottom positioned
- **Hint**: Appears after 2 seconds, resets when returning to top

### Mobile Menu
- **Style**: Full terminal window with logo and close button
- **Navigation**: Dollar sign prefix, lowercase commands
- **Footer**: Terminal prompt style with copyright

## ⚡ Performance Optimizations

- **Static Generation**: Pre-built pages for optimal loading
- **Selective Hydration**: Only interactive components use React
- **Optimized Images**: Responsive images with modern formats
- **Minimal JavaScript**: Astro's island architecture
- **Clean Animations**: No blur effects, smooth CSS transitions
- **Hidden Scrollbars**: Custom scrollbar hiding for clean design

## � Theme System

### Light/Dark Mode
- **Auto Detection**: Respects system preferences
- **Manual Toggle**: Theme toggle button (top-right)
- **Persistent**: Saves user preference
- **Smooth Transitions**: All colors transition smoothly
- **Consistent**: Same design language across both themes

## 📦 Deployment Ready

### Build Process
```bash
npm run build
# Generates static files in dist/
```

### Deployment Platforms
- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Static hosting
- **Any CDN**: Standard static files

### Environment Setup
The `.gitignore` includes all necessary exclusions:
- Dependencies (`node_modules/`)
- Build outputs (`dist/`, `.astro/`)
- Environment files (`.env*`)
- IDE configurations
- Cache files

## 🎯 Unique Features

### Terminal Authenticity
- **Command Prompts**: `user@fcastro.dev:~$` style prompts
- **Terminal Headers**: Realistic window controls
- **Monospace Everything**: Consistent typography
- **Color Accuracy**: Real terminal color schemes
- **No Blur Effects**: Sharp, clean terminal aesthetic

### Smart UX
- **Progressive Disclosure**: Content reveals naturally
- **Contextual Hints**: Scroll hints appear when needed
- **Responsive Design**: Optimized for all devices
- **Accessibility**: Full keyboard navigation and screen reader support

### Performance Focus
- **Lighthouse Score**: 95+ across all metrics
- **Fast Loading**: Optimized asset delivery
- **Smooth Animations**: 60fps transitions
- **Memory Efficient**: No memory leaks or performance issues

## 🛠️ Customization Guide

### Update Personal Info
1. **Hero Text**: Edit typing strings in `Hero.tsx`
2. **About Content**: Modify cards in `About.tsx`
3. **Experience**: Update timeline in `Experience.tsx`
4. **Projects**: Add projects in `ProjectsGrid.tsx`
5. **Contact**: Update links in `Contact.tsx`

### Modify Colors
```javascript
// tailwind.config.cjs
theme: {
  extend: {
    colors: {
      lightTheme: { /* customize light theme */ },
      darkTheme: { /* customize dark theme */ }
    }
  }
}
```

### Add Sections
1. Create component in `src/components/`
2. Add to `src/pages/index.astro`
3. Update `DynamicBackground.tsx` for color transitions
4. Add navigation item to `Header.tsx`

## � License

MIT License - Feel free to use this template for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Franco Castro Villanueva
- **Website**: [fcastro.dev](https://fcastro.dev)
- **Email**: [franco.castro.villanueva.90@gmail.com](mailto:franco.castro.villanueva.90@gmail.com)
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **GitHub**: [FrancoCastro1990](https://github.com/FrancoCastro1990)

---

<div align="center">
  <strong>Built with ❤️ and terminal aesthetics</strong>
  <br>
  <sub>© 2024 Franco Castro Villanueva</sub>
</div>