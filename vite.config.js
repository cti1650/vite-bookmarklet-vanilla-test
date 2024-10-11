import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'Bookmarklet',
      formats: ['iife'],
      fileName: () => 'bookmarklet.js',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
      },
      mangle: true,
    },
  },
  publicDir: 'public',
})