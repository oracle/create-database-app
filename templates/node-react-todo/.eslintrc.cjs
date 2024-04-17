/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
module.exports = {
  root: true,
  env: { 
    browser: true,
    es2020: true,
    worker: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  overrides: [
    {
        files: 'src/',
        extends: [
            'plugin:react/recommended',
            'plugin:react/jsx-runtime',
            'plugin:react-hooks/recommended',
        ],
        settings: { react: { version: 'detect' } },
        plugins: ['react-refresh'],
    },
    {
        files: 'server/',
        extends: [
            'plugin:node/recommended',
        ],

    }
  ]
}
