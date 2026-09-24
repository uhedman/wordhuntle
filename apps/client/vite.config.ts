import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
		},
	},
});
