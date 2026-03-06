// ⚙️ ESLint Rules for Node.js project. <Last updated: 2025-10-06>
// Docs:  https://eslint.org/docs/latest/use/configure/  -- ESLint Configuration
// Docs:  https://typescript-eslint.io/getting-started/  -- TypeScript-ESLint Configuration
// Guide: docs/js-foundation/code-quality-workflow/tools/eslint.md

import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config';

// CORE
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import globals from 'globals';

// PLUGINS
import nodePlugin from 'eslint-plugin-n';

// CONFIGS
import prettierConfig from 'eslint-config-prettier';

/**
 * Rule overrides and adjustments.
 *
 * @type {import('eslint').Linter.Config[]}
 *
 * @see {@link https://eslint.org/docs/latest/rules/ ESLint Rules} for core rules
 * @see {@link https://typescript-eslint.io/rules/ TypeScript ESLint Rules} for `'@typescript-eslint/*'` rules
 * @see {@link https://github.com/eslint-community/eslint-plugin-n?tab=readme-ov-file#-rules Node.js Rules} for `'n/*'` rules
 */
const ruleConfig = [
  {
    rules: {
      // Override: Allow variables beginning with an underscore to be unused
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],

      // Override: Allow numbers and `any` types in template expressions (e.g., `${value}`)
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowAny: true }],

      // Override: Allow other console methods besides console.log
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug', 'trace'] }],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      // Disable: This rule expects runtime `.js` files and causes false positives for valid TypeScript imports
      'n/no-missing-import': 'off',

      // Disable: We prefer to use both `interface` and `type` keywords
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
];

/**
 * Shared ESLint plugins and configurations.
 *
 * @type {import('eslint').Linter.Config[]}
 */
const sharedConfig = [
  // Turning off rules that conflict or ar unnecessary with Prettier (package: `eslint-config-prettier`)
  prettierConfig,

  // Enable Node.js best practices (package: `eslint-plugin-n`)
  nodePlugin.configs['flat/recommended-module'],
];

/**
 * Core ESLint configuration and foundational JavaScript settings.
 *
 * @type {import('eslint').Linter.Config[]}
 * @see {@link https://github.com/sindresorhus/globals/blob/HEAD/globals.json Globals Object}
 */
const coreConfig = [
  // Import ignore patterns from `.gitignore`
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url)), {
    gitignoreResolution: true,
    name: 'Imported .gitignore patterns',
  }),

  // Global ignore settings (default: `node_modules` and `.git`)
  globalIgnores(['*.config.mjs', '*.config.cjs', '.husky'], 'Global Ignores'),

  // ESLint global variables
  {
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
  },

  // Recommended rules for JavaScript (package: `@eslint/js`)
  eslint.configs.recommended,
];

/**
 * Enable TypeScript linting with type-aware rules and project-based parsing.
 *
 * 📕 Note: Choose between `recommendedTypeChecked` and `strictTypeChecked` based on your project's strictness needs:
 *    - `recommendedTypeChecked`:
 *       Enables a balanced set of rules that use type information to catch common bugs and issues
 *       without being overly restrictive. Suitable for most TypeScript projects.
 *    - `strictTypeChecked`:
 *       Builds on `recommendedTypeChecked` by enabling additional rules that enforce stricter
 *       code standards and deeper type safety. Ideal for projects that prefer stricter linting
 *       and have teams highly proficient in TypeScript.
 *
 * @type {import('eslint').Linter.Config[]}
 *
 * @see {@link https://typescript-eslint.io/linting/configs#recommended-configurations Recommended Configs}
 */
const typescriptConfig = [
  // Enabling linting with type-aware rules (package: `typescript-eslint`)
  tseslint.configs.recommendedTypeChecked,

  // Recommended stylistic rules for TypeScript
  tseslint.configs.stylisticTypeChecked,

  // Load `tsconfig.json` setting
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Disable type-aware linting on JS files
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
];

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(
  // Core config for JavaScript linting
  coreConfig,

  // Enable TypeScript linting with type-aware rules and project-based parsing
  typescriptConfig,

  // Node.js environment configuration
  sharedConfig,

  // Rule overrides and adjustments
  ruleConfig
);
