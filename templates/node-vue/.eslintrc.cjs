module.exports = {
    root: true,
    env: { 
        browser: true,
        es2020: true,
        worker: true,
        node: true
    },
    extends: [
      'eslint:recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true
        }
    },
    overrides: [
        {
            files: 'src/',
            extends: [
                'plugin:vue/vue3-recommended',
            ],
            plugins: [
                'vue'
            ]
        },
        {
            files: 'server/',
            extends: [
                'plugin:node/recommended',
            ],
    
        }
      ]
  }