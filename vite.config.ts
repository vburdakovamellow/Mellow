import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";
import { join, resolve } from "path";

const githubPages404Plugin = () => {
  return {
    name: 'github-pages-404',
    closeBundle() {
      if (process.env.NODE_ENV === 'production') {
        const distPath = join(process.cwd(), 'dist');
        const indexPath = join(distPath, 'index.html');
        const notFoundPath = join(distPath, '404.html');
        
        try {
          copyFileSync(indexPath, notFoundPath);
          console.log('Created 404.html for GitHub Pages SPA routing');
        } catch (error) {
          console.error('Error creating 404.html:', error);
        }
      }
    }
  };
};

const isDemo = process.env.DEMO === '1';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Mellow/' : '/',
  plugins: [react(), githubPages404Plugin()],
  build: isDemo
    ? {
        outDir: 'dist-demo',
        rollupOptions: {
          input: resolve(__dirname, 'demo.html'),
        },
      }
    : undefined,
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      overlay: true,
      clientPort: 5173
    },
    watch: {
      usePolling: false,
      interval: 100
    }
  }
});
