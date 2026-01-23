import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import jestPlugin from "eslint-plugin-jest";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  {
    ...jestPlugin.configs["flat/recommended"],
    files: ["**/tests/**/*.js"],
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
    },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
