import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/wordhuntle/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "https://wordhuntle.vercel.app",
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "~": "/..",
    },
  },
});
