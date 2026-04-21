import eslintPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";

export default defineConfig(
  {
    ignores: [
      "**/node_modules/**",
      "**/build/**",
      "**/.react-router/**",
      "**/dist/**",
      "**/coverage/**",
      "eslint.config.js",
      "commitlint.config.js",
    ],
  },
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs["recommended-typescript"],
  eslintReactHooks.configs.flat["recommended-latest"],
  eslintPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // All console statements must be removed before commit changes
      "no-console": "error",
      // Enforces curly brackets for all control statements.
      curly: ["error"],
      // Never allow multiple separate imports or exports from the same file
      "no-duplicate-imports": ["error", { allowSeparateTypeImports: true, includeExports: true }],
      // Promises should not have a return statement - use reject/resolve
      "no-promise-executor-return": "error",
      // Disallow assignments that can cause race conditions using await or yield
      "require-atomic-updates": "error",
      // Ensure manageable complexity of a function i.e. avoid many conditions with complex logic
      complexity: ["error", { variant: "modified" }],
      // Do not allow for more than 4 nested block levels
      "max-depth": "error",
      // Warn if a file has too many lines - becomes hard to read and maintain
      "max-lines": ["warn", 350],
      // Enforce max function params to 3 - use object if more are needed
      "max-params": "error",
      // Ensure switch statements have a default case
      "default-case": "error",
      // Requires proper use of "===" and "!==" and "==" and "!=".
      eqeqeq: ["error", "smart"],
      // Disallow else blocks after return statements in if statements
      "no-else-return": ["error", { allowElseIf: true }],
      // Doesn't allow empty functions.
      "no-empty-function": "error",
      // Disallow nested ternary expressions
      "no-nested-ternary": "error",
      // Doesn't allow reassigning function parameters.
      "no-param-reassign": "error",
      // Require object prop shorthand
      "object-shorthand": ["error", "properties"],

      // Always destructure component props
      "@eslint-react/prefer-destructuring-assignment": "error",
      // An empty array, object or function must not be directly set as a default prop value - assign to external variable first
      "@eslint-react/no-unstable-default-props": "error",
      // Always memoize context API value
      "@eslint-react/no-unstable-context-value": "error",
      // Prevents rendering unwanted values eg: if count = 0 then count && <div /> would render 0
      "@eslint-react/no-leaked-conditional-rendering": "error",
      // Prevent wrapping single child with fragment
      "@eslint-react/jsx-no-useless-fragment": "error",

      // Unused vars must start with _
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Always import types separately using the "type" identifier
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
    },
  },
);
