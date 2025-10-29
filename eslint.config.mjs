/**
 * ESLint Configuration
 *
 * ESLint configuration for the HaUIDOC project using the new flat config format.
 * This configuration extends recommended rules and includes Next.js, React, and
 * accessibility linting rules for code quality and consistency.
 *
 * Features:
 * - Next.js recommended rules
 * - React hooks and JSX rules
 * - Accessibility (a11y) rules
 * - TypeScript support (when enabled)
 * - Custom rules for project consistency
 *
 * Run with: npm run lint
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
