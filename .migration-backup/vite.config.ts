import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import { join } from "path";

// Plugin to create 404.html for GitHub Pages SPA routing
const githubPages404Plugin = () => {
  return {
    name: 'github-pages-404',
    closeBundle() {
      if (process.env.NODE_ENV === 'production') {
        const distPath = join(process.cwd(), 'dist');
        const indexPath = join(distPath, 'index.html');
        const notFoundPath = join(distPath, '404.html');
        
        try {
          // Copy index.html to 404.html
          copyFileSync(indexPath, notFoundPath);
          console.log('Created 404.html for GitHub Pages SPA routing');
        } catch (error) {
          console.error('Error creating 404.html:', error);
        }
      }
    }
  };
};

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Mellow/' : '/',
  plugins: [react(), githubPages404Plugin()],
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
