import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import ts from "typescript-eslint";

/* eslint-disable perfectionist/sort-objects */
/** @type {import("eslint").Linter.Config[]} */
export default ts.config(
	prettierConfig,
	perfectionist.configs["recommended-natural"],
	comments.recommended,
	js.configs.recommended,
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	importX.flatConfigs.react,
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
	},
	{
		files: ["**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}"],
		languageOptions: {
			parser: ts.parser,
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.serviceworker,
				...globals.browser,
				...globals.node,
				...globals.builtin,
				...globals.es2021,
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: {
			"react-hooks": fixupPluginRules(reactHooks),
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"import-x/no-cycle": "error",
			"import-x/no-extraneous-dependencies": "error",
			"perfectionist/sort-module": "off",
			"perfectionist/sort-modules": "off",
			"react/function-component-definition": [
				"error",
				{ namedComponents: "function-declaration" },
			],
		},
	},
	{
		files: ["**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}"],
		...react.configs.flat.recommended,
		...react.configs.flat["jsx-runtime"],
	},
	{
		files: ["**/*.{ts,tsx,cts,mts}"],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.app.json", "./tsconfig.node.json"],
			},
		},
		extends: [
			...ts.configs.strictTypeChecked,
			...ts.configs.stylisticTypeChecked,
		],
		rules: {
			"@typescript-eslint/array-type": ["error", { default: "generic" }],
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{
					ignorePrimitives: {
						bigint: false,
						boolean: false,
						number: false,
						string: true,
					},
				},
			],
			"@typescript-eslint/switch-exhaustiveness-check": "error",
		},
	},
	{
		ignores: [".turbo", "node_modules", "dist"],
	},
);
/* eslint-enable perfectionist/sort-objects */
