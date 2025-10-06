// ⚙️ ESLint Rules for Node.js project. <Last updated: 2025-10-06>
// Docs: https://eslint.org/docs/latest/use/configure/
// Docs: https://typescript-eslint.io/getting-started/

import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

// PLUGINS
import nodePlugin from 'eslint-plugin-n';

// CONFIGS
import prettierConfig from 'eslint-config-prettier';

/**
 * Rules setting
 *
 * @type {import('eslint').Linter.Config}
 *
 * @see {@link https://eslint.org/docs/latest/rules/ ESLint Rules} for core rules
 * @see {@link https://typescript-eslint.io/rules/ TypeScript ESLint Rules} for `'@typescript-eslint/*'` rules
 * @see {@link https://github.com/eslint-community/eslint-plugin-n?tab=readme-ov-file#-rules Node.js Rules} for `'n/*'` rules
 */
const ruleConfig = {
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
};

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(
  /**
   * Global ignore settings (default: `node_modules` and `.git`)
   */
  globalIgnores(['**/build/**', '**/dist/**', 'public', '*.config.mjs'], 'Global Ignores'),

  {
    languageOptions: {
      /**
       * ESLint global variables (see {@link https://github.com/sindresorhus/globals/blob/HEAD/globals.json Global Object}
       */
      globals: globals.nodeBuiltin,
    },
  },

  /**
   * Recommended rules for JavaScript (package: `@eslint/js`)
   */
  eslint.configs.recommended,

  /**
   * Enabling linting with type-aware rules (package: `typescript-eslint`)
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
   * @see https://typescript-eslint.io/linting/configs#recommended-configurations
   */
  tseslint.configs.recommendedTypeChecked,
  /** Recommended stylistic rules for TS */
  tseslint.configs.stylisticTypeChecked,
  /** Load `tsconfig.json` setting */
  {
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  /** Disable type-aware linting on JS files */
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  /**
   * Turning off rules that conflict or ar unnecessary with Prettier (package: `eslint-config-prettier`)
   */
  prettierConfig,

  /**
   * Enable Node.js best practices (package: `eslint-plugin-n`)
   */
  nodePlugin.configs['flat/recommended-module'],

  /**
   * Override existing rules
   */
  ruleConfig
);
