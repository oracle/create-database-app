import globals from "globals";
import js from "@eslint/js";
import nodePlugin from "eslint-plugin-n";
import vuePlugin from "eslint-plugin-vue"

export default [
  js.configs.recommended,
  ...vuePlugin.configs["flat/recommended"],
  {
    files: ["src/**/*.[js,cjs]","src/**/*.vue"]
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