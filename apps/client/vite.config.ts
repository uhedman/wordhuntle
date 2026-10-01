import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const proxyTarget =
		mode === "online"
			? "https://wordhuntle.vercel.app"
			: "http://localhost:5000";

	return {
		base: "/wordhuntle/",
		plugins: [react()],
		server: {
			proxy: {
				"/api": {
					target: proxyTarget,
					changeOrigin: true,
				},
			},
		},
		resolve: {
			alias: {
				"@": "/src",
			},
		},
		test: {
			environment: "jsdom",
			fsModuleCache: true,
		},
	};
});
