import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: '/lib/prismaMock.ts',
    environment: 'jsdom',
    coverage: {
      include: ['src/**'],
    },
    alias: {
      '@lib/': new URL('./lib/', import.meta.url).pathname,
      '@src/': new URL('./src/', import.meta.url).pathname,
      '@app/': new URL('./src/app/', import.meta.url).pathname,
    },
  },
});
