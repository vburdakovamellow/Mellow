import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({
    fastRefresh: true
  })],
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
