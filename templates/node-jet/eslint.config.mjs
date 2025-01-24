/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/

import globals from "globals";
import js from "@eslint/js";
import nodePlugin from "eslint-plugin-n";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: {
          modules: true
        },
        ecmaVersion: "2022",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
      }
    },
    plugins: {
      "@typescript-eslint": tseslintPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslintPlugin.configs["eslint-recommended"].overrides[0].rules,
      ...tseslintPlugin.configs["recommended"].rules,
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-const": "warn",
    }
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.amd
      }
    },
    rules: {
        ...js.configs.recommended.rules,
        "no-undef": "warn"
    }
  },
  {
    files: ["server/**/*.js", "server/**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
      }
    },
    plugins: {
      n: nodePlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nodePlugin.configs["flat/recommended-script"].rules
    }
  }
];