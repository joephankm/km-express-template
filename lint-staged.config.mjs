// Config for Lint Staged. <Last updated: 2025-01-13>

export default {
  '**/*.{js,ts,tsx}': ['yarn eslint', 'yarn prettier:fix'],
  '**/*.{mjs,json}': ['yarn prettier:fix'],
};
