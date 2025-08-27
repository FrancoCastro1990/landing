import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'path';

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
    resolve: {
      alias: {
        '@app': path.resolve('./src/app'),
        '@features': path.resolve('./src/features'),
        '@shared': path.resolve('./src/shared'),
      }
    }
  },
});