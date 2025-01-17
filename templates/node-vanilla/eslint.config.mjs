/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import globals from "globals";
import js from "@eslint/js";
import nodePlugin from "eslint-plugin-n";

export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      }
    },
    rules: js.configs.recommended.rules
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