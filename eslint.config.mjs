// Config for ESLint in Node project. <Last updated: 2025-01-14>

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  /**
   * Specify the files to lint
   */
  { files: ['src/**/*.{js,mjs,cjs,ts}', 'scripts/**/*.{js,mjs,cjs,ts}'] },

  /**
   * Global ignore patterns
   *
   * @see https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
   */
  // { ignores: ['node_modules', 'dist', 'public'] },

  /**
   * JavaScript language options
   *
   * @see https://eslint.org/docs/latest/use/configure/language-options
   * @see https://www.npmjs.com/package/globals
   */
  { languageOptions: { globals: globals.nodeBuiltin } },

  /**
   * Predefined configuration which ESLint recommends everyone use configs to avoid potential errors
   *
   * @see https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
   */
  pluginJs.configs.recommended,

  /**
   * typescript-eslint enables ESLint to run on TypeScript code:
   *
   * - allows ESLint to parse TypeScript syntax
   * - creates a set of tools for ESLint rules to be able to use TypeScript's type information
   * - provides a large list of lint rules that are specific to TypeScript and/or use that type information
   */
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  /**
   * Turn off rules that conflict or are unnecessary with Prettier
   *
   * If you want to run Prettier as if it was a linter rule, use 'eslint-plugin-prettier' package
   *
   * @see https://prettier.io/docs/en/integrating-with-linters
   */
  eslintConfigPrettier,

  /**
   * Override existing rules and create custom rules
   *
   * @see https://eslint.org/docs/latest/use/configure/rules
   * @see https://eslint.org/docs/latest/extend/custom-rule-tutorial
   */
  {
    rules: {
      // Allow variables beginning with an underscore to be used
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],

      // Allow @ts-ignore, @ts-nocheck, @ts-expect-error
      '@typescript-eslint/ban-ts-comment': 'off',

      // Allow other console rather than console.log
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'trace'] }],
    },
  }
);
