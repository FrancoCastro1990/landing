import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://fcastro.dev',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom', '@react-spring/web'],
    },
    ssr: {
      noExternal: ['@react-spring/web'],
    },
  },
});