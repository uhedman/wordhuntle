import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores(["**/node_modules/**", "**/dist/**", "**/build/**"]),
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		plugins: { js },
		extends: ["js/recommended"],
	},
	tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx,mts,cts}"],
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ["apps/client/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: ["apps/server/**/*.{js,mjs,cjs,ts}"],
		languageOptions: {
			globals: globals.node,
		},
	},
	{
		files: ["apps/client/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		...pluginReact.configs.flat.recommended,
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			"react/react-in-jsx-scope": "off",
		},
	},
]);
