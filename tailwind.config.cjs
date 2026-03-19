/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          dim: 'rgb(var(--color-surface-dim) / <alpha-value>)',
          bright: 'rgb(var(--color-surface-bright) / <alpha-value>)',
          lowest: 'rgb(var(--color-surface-lowest) / <alpha-value>)',
          low: 'rgb(var(--color-surface-low) / <alpha-value>)',
          container: 'rgb(var(--color-surface-container) / <alpha-value>)',
          high: 'rgb(var(--color-surface-high) / <alpha-value>)',
          highest: 'rgb(var(--color-surface-highest) / <alpha-value>)',
          variant: 'rgb(var(--color-surface-variant) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dim: 'rgb(var(--color-primary-dim) / <alpha-value>)',
          container: 'rgb(var(--color-primary-container) / <alpha-value>)',
        },
        'on-surface': {
          DEFAULT: 'rgb(var(--color-on-surface) / <alpha-value>)',
          variant: 'rgb(var(--color-on-surface-variant) / <alpha-value>)',
        },
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        outline: {
          DEFAULT: 'rgb(var(--color-outline) / <alpha-value>)',
          variant: 'rgb(var(--color-outline-variant) / <alpha-value>)',
        },
      },
      fontFamily: {
        headline: ['Newsreader', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        label: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
