// ⚙️ Prettier Formatting Rules. <Last updated: 2025-07-04>

/**
 * @see {@link https://prettier.io/docs/options Prettier Options docs}
 * @type {import('prettier').Config}
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
