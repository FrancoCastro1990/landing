/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0e0e0e',
          dim: '#0e0e0e',
          bright: '#2c2c2c',
          lowest: '#000000',
          low: '#131313',
          container: '#1a1a1a',
          high: '#20201f',
          highest: '#262626',
          variant: '#262626',
        },
        primary: {
          DEFAULT: '#FACC15',
          dim: '#eec200',
          container: '#fbcd16',
        },
        'on-surface': {
          DEFAULT: '#ffffff',
          variant: '#adaaaa',
        },
        'on-primary': '#624e00',
        outline: {
          DEFAULT: '#767575',
          variant: '#484847',
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
