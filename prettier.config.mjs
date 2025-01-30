// Config for Prettier. <Last updated: 2025-01-13>

/**
 * @see https://prettier.io/docs/en/options
 * @type {import("prettier").Config}
 */
const config = {
  /** ════════ Common ════════ **/
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  arrowParens: 'avoid',
  endOfLine: 'auto',

  /** ════════ FrontEnd ════════ **/
  jsxSingleQuote: true,
  bracketSameLine: false,
};

export default config;
