import eslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import astroPlugin from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": eslint,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  ...astroPlugin.configs.recommended,
];
