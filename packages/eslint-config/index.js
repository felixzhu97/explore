/**
 * Shared ESLint baseline for Explore workspace packages.
 * Projects should extend this config instead of re-declaring core rules.
 */
export default [
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/.next/**'],
  },
];
