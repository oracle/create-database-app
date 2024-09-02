module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb-base',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:jsdoc/recommended',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:tailwindcss/recommended',
        'plugin:jsdoc/recommended-typescript',
      ],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'import/prefer-default-export': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        'no-magic-numbers': [
          'error',
          {
            ignoreArrayIndexes: true,
            ignore: [-1, 0, 1],
          },
        ],
        'react/require-default-props': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'eslint-plugin-tsdoc',
    'tailwindcss',
    'jsdoc',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-throw-literal': 'off',
    'require-jsdoc': [
      'warn',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: false,
          FunctionExpression: false,
        },
      },
    ],
    'no-magic-numbers': [
      'error',
      {
        ignoreArrayIndexes: true,
        ignore: [-1, 0, 1],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
