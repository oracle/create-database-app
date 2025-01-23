import globals from 'globals';
import js from '@eslint/js';
import nodePlugin from 'eslint-plugin-n';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.js','src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslintParser,  
      parserOptions: {
        ecmaFeatures: {
          modules: true
        },
        ecmaVersion: '2022',
        project: './tsconfig.json',  
      },
      globals: {
        ...globals.browser,
      }
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslintPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tseslintPlugin.configs['recommended'].rules,
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
