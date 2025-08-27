# 🖥️ FCastro.dev - Personal Portfolio

A modern, terminal-inspired personal portfolio website built with **Screaming Architecture**, Astro, React, TypeScript, and Tailwind CSS. Features a feature-first codebase structure that emphasizes maintainability and scalability.

![Astro](https://img.shields.io/badge/Astro-4.0-orange)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-teal)
![Screaming Architecture](https://img.shields.io/badge/Architecture-Screaming-green)

## ✨ Features

### 🏗️ Screaming Architecture
- **Feature-First Structure**: Organized around business features instead of technical layers
- **Custom Hooks**: Logic extracted into reusable, testable hooks
- **Barrel Files**: Clean imports with `index.ts` exports
- **Path Aliases**: Clean imports using `@features/*`, `@shared/*`, `@app/*`
- **Island Architecture**: Optimized Astro islands with selective hydration

### 🎨 Design System
- **Terminal Aesthetic**: Authentic command-line interface design
- **Custom Color Palette**: Carefully crafted light/dark theme system with `lightTheme`/`darkTheme` colors
- **Monospace Typography**: Consistent `font-mono` usage throughout
- **Terminal Components**: Cards with terminal headers (red, yellow, green circles)
- **Clean Design**: Sharp terminal look with smooth transitions

### 🚀 Interactive Elements
- **Typing Animation**: Realistic terminal typing effect with custom `useTypingAnimation` hook
- **Smart Scroll Hints**: Managed by `useScrollHint` hook with automatic show/hide logic
- **Dynamic Scroll Indicator**: Custom progress bar using `useScrollProgress` hook
- **Dynamic Backgrounds**: Section-based color tinting with `useSectionTint` hook
- **Responsive Header**: Smart visibility with `useHeaderVisibility` and `useMobileMenu` hooks
- **Theme Toggle**: Persistent theme switching with `useTheme` hook

### 🛠️ Technical Stack
- **Framework**: Astro 4.0 with Static Site Generation
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **Animations**: React Spring for smooth transitions
- **Architecture**: Screaming Architecture (feature-first)
- **State Management**: Custom hooks for logic separation

## 🏗️ Screaming Architecture Structure

```
src/
├── app/                          # Application-level concerns
│   └── providers/                # Context providers, theming
├── features/                     # Feature modules (business logic)
│   ├── hero/                     # Hero section feature
│   │   ├── ui/                   # Components
│   │   │   ├── Hero.tsx
│   │   │   ├── ScrollIndicator.tsx
│   │   │   └── DynamicBackground.tsx
│   │   ├── hooks/                # Feature-specific hooks
│   │   │   ├── useTypingAnimation.ts
│   │   │   ├── useSectionTint.ts
│   │   │   └── useScrollHint.ts
│   │   ├── model/                # Types and interfaces
│   │   ├── lib/                  # Pure utilities
│   │   └── index.ts              # Barrel file
│   ├── navigation/               # Navigation feature
│   │   ├── ui/
│   │   │   └── Header.tsx
│   │   ├── hooks/
│   │   │   ├── useHeaderVisibility.ts
│   │   │   ├── useMobileMenu.ts
│   │   │   └── useNavigation.ts
│   │   └── index.ts
│   ├── about/                    # About section
│   ├── experience/               # Experience section
│   ├── projects/                 # Projects section
│   ├── contact/                  # Contact section
│   └── layout/                   # Layout components
├── shared/                       # Shared resources
│   ├── ui/                       # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Logo.tsx
│   │   ├── SectionTitle.tsx
│   │   └── index.ts
│   ├── hooks/                    # Cross-feature hooks
│   │   ├── useTheme.ts
│   │   ├── useScrollProgress.ts
│   │   └── index.ts
│   ├── lib/                      # Pure utility functions
│   ├── styles/                   # Global styles
│   ├── types/                    # Shared TypeScript types
│   ├── config/                   # Constants and configuration
│   └── index.ts
└── pages/
    └── index.astro               # Main page with optimized islands
```

## 🪝 Custom Hooks Architecture

### Hero Feature Hooks
```typescript
// Typing animation with cursor blinking
useTypingAnimation({
  fullText: "Hello, I'm ",
  afterText: " // FullStack Developer...",
  typingSpeed: 100,
  cursorBlinkSpeed: 500
})

// Dynamic section-based background tinting
useSectionTint() // Returns currentSection, currentBgClass

// Smart scroll hint management
useScrollHint(typingComplete, scrollThreshold, showDelay)
```

### Navigation Hooks
```typescript
// Header visibility based on scroll
useHeaderVisibility(threshold) // Returns isScrolled boolean

// Mobile menu state management
useMobileMenu() // Returns { isOpen, toggleMenu, closeMenu, openMenu }

// Navigation actions (scroll to sections)
useNavigation() // Returns { scrollToSection, scrollToTop }
```

### Shared Hooks
```typescript
// Theme management with persistence
useTheme() // Returns { theme, toggleTheme, isDark }

// Scroll progress tracking
useScrollProgress(threshold) // Returns { scrollProgress, showIndicator }
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

## 📦 Path Aliases Configuration

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}
```

### Astro Configuration
```javascript
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@app': path.resolve('./src/app'),
        '@features': path.resolve('./src/features'),
        '@shared': path.resolve('./src/shared'),
      }
    }
  }
});
```

## 🏝️ Astro Islands Optimization

### Client Directives Usage
```astro
<!-- Interactive components -->
<Header client:load />                    <!-- Always available -->
<ThemeToggle client:load />              <!-- Immediate interactivity -->

<!-- Lazy loaded components -->
<Hero client:visible />                   <!-- Load when visible -->
<About client:visible />                  <!-- Animations on scroll -->
<Experience client:visible />             <!-- Dynamic content -->
<ProjectsGrid client:visible />           <!-- Interactive cards -->
<Contact client:visible />                <!-- Social links -->

<!-- Static components -->
<Footer />                               <!-- No JavaScript needed -->
```

## 🎨 Design System

### Color Palette
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

## 🧩 Component Import Examples

### Feature-based Imports
```typescript
// Hero feature components and hooks
import { Hero, ScrollIndicator, DynamicBackground } from '@features/hero';
import { useTypingAnimation, useSectionTint } from '@features/hero';

// Navigation components and hooks
import { Header } from '@features/navigation';
import { useHeaderVisibility, useMobileMenu } from '@features/navigation';

// Shared UI components
import { Card, Button, Badge, Logo } from '@shared/ui';
import { useTheme, useScrollProgress } from '@shared/hooks';
```

### Clean Barrel File Exports
```typescript
// features/hero/index.ts
export { default as Hero } from './ui/Hero';
export { default as ScrollIndicator } from './ui/ScrollIndicator';
export { default as DynamicBackground } from './ui/DynamicBackground';
export * from './hooks/useTypingAnimation';
export * from './hooks/useSectionTint';
export * from './hooks/useScrollHint';
```

## ⚡ Performance Optimizations

### Astro Islands Benefits
- **Selective Hydration**: Only interactive components load JavaScript
- **Lazy Loading**: Components hydrate when visible (`client:visible`)
- **Zero JavaScript**: Static sections render as pure HTML
- **Bundle Splitting**: Each island loads independently

### Build Output Analysis
```bash
# Optimized chunks generated:
# - hero.Ceevjijs.js (6.99 kB) - Hero functionality
# - navigation.j1sindAr.js (6.97 kB) - Header navigation
# - react-spring_web.modern.js (39.67 kB) - Animations
# - index.AFt7omGr.js (133.91 kB) - React runtime
```

## 🛠️ Development Guidelines

### Adding New Features
```bash
# 1. Create feature directory
mkdir -p src/features/new-feature/{ui,hooks,lib,model}

# 2. Create components in ui/
# 3. Extract logic into hooks/
# 4. Add types in model/
# 5. Create barrel file (index.ts)
# 6. Import in pages/index.astro
```

### Hook Development Patterns
```typescript
/**
 * Custom hook template
 * @param param - Description of parameter
 * @returns Object with hook state and functions
 */
export const useCustomHook = (param: Type) => {
  const [state, setState] = useState<Type>(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  const action = useCallback(() => {
    // Actions
  }, []);

  return {
    state,
    action,
  };
};
```

## 📱 Responsive Design

### Breakpoint System
- **Mobile First**: Base styles for mobile devices
- **Tablet**: `md:` prefix for 768px+ screens
- **Desktop**: `lg:` prefix for 1024+ screens
- **Large Desktop**: `xl:` prefix for 1280+ screens

### Component Responsiveness
- **Header**: Horizontal nav (desktop) → Hamburger menu (mobile)
- **Scroll Indicator**: Centered right (desktop) → Bottom right (mobile)  
- **Cards**: Full width (mobile) → Grid layouts (desktop)
- **Typography**: Responsive font sizes with `text-lg md:text-xl lg:text-2xl`

## 🧪 Testing Strategy

### Hook Testing
```typescript
// Example test for custom hook
import { renderHook, act } from '@testing-library/react';
import { useTypingAnimation } from '@features/hero/hooks/useTypingAnimation';

test('useTypingAnimation should complete typing sequence', () => {
  const { result } = renderHook(() => useTypingAnimation({
    fullText: "Hello",
    afterText: " World",
  }));

  expect(result.current.displayedText).toBe('');
  
  // Test typing progression...
});
```

## 📦 Deployment Ready

### Build Process
```bash
npm run build
# Generates optimized static files in dist/
# - HTML pre-rendered for SEO
# - JavaScript chunks optimized
# - CSS purged and minimized
# - Images optimized
```

### Deployment Platforms
- **Vercel**: Zero-config deployment with edge functions
- **Netlify**: Drag-and-drop with automatic builds
- **GitHub Pages**: Static hosting with GitHub Actions
- **Cloudflare Pages**: Global CDN deployment

## 🎯 Architecture Benefits

### Screaming Architecture Advantages
- **Feature Discoverability**: Business features are immediately visible
- **Scalability**: Easy to add new features without architectural debt
- **Maintainability**: Related code is co-located
- **Testability**: Hooks are pure functions, easy to test
- **Team Collaboration**: Clear boundaries for team members

### Traditional vs Screaming Architecture
```
Traditional (Technical Layers)    Screaming (Features)
├── components/                   ├── features/
├── hooks/                        │   ├── hero/
├── utils/                        │   ├── about/
├── styles/                       │   └── navigation/
└── pages/                        ├── shared/
                                  └── app/
```

## 🔧 Customization Guide

### Update Personal Info
1. **Hero Text**: Edit strings in `features/hero/hooks/useTypingAnimation.ts`
2. **About Content**: Modify `features/about/ui/About.tsx`
3. **Experience**: Update timeline in `features/experience/ui/Experience.tsx`
4. **Projects**: Add projects in `features/projects/ui/ProjectsGrid.tsx`
5. **Contact**: Update links in `features/contact/ui/Contact.tsx`

### Modify Theme Colors
```javascript
// tailwind.config.cjs
theme: {
  extend: {
    colors: {
      lightTheme: { 
        green: '#your-color', // Customize accent colors
        blue: '#your-color',
        // ... 
      },
      darkTheme: { 
        green: '#your-color',
        blue: '#your-color',
        // ...
      }
    }
  }
}
```

### Add New Sections
1. Create feature in `src/features/new-section/`
2. Add UI components in `ui/` directory
3. Extract logic into `hooks/` 
4. Create barrel file `index.ts`
5. Import in `src/pages/index.astro`
6. Update `useSectionTint` for background colors
7. Add navigation item to Header

## 📄 License

MIT License - Feel free to use this template for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the Screaming Architecture patterns
4. Extract logic into custom hooks
5. Add proper TypeScript types
6. Test your changes
7. Commit changes (`git commit -m 'Add amazing feature'`)
8. Push to branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## 📞 Contact

Franco Castro Villanueva
- **Website**: [fcastro.dev](https://fcastro.dev)
- **Email**: [franco.castro.villanueva.90@gmail.com](mailto:franco.castro.villanueva.90@gmail.com)
- **LinkedIn**: [Franco Castro Villanueva](https://www.linkedin.com/in/franco-castro-villanueva-035905174/)
- **GitHub**: [FrancoCastro1990](https://github.com/FrancoCastro1990)

---

<div align="center">
  <strong>Built with ❤️ using Screaming Architecture + Astro</strong>
  <br>
  <sub>© 2025 Franco Castro Villanueva</sub>
</div>