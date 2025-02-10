/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-env node */

/** @type { import( './eslintrc' ).JSONSchemaForESLintConfigurationFiles } */
const gEslintConfig = {
    env: {
        "es6": true,
        "node": true,
        "mocha": true
    },
    parserOptions: {
        "ecmaVersion": "latest"
    },
    extends: [
        'oclif',
        'oclif-typescript',
        'prettier',
    ],
    plugins: [
        'import'
    ],
    rules: {
        // IMPORTANT: Do not use styling rules as they may conflict with the
        //            formatting. if in doubt, run the following command to make
        //            sure your current config is not using any conflicting
        //            rules `npx eslint-config-prettier <MAIN_JS_FILE>`

        'array-bracket-spacing': [
            'error',
            'always',
            {
                arraysInArrays: false,
                objectsInArrays: false
            }
        ],
        'class-methods-use-this': 'off',
        'comma-dangle': [ 
            'error', 
            'never' 
        ],
        'computed-property-spacing': [
            'error',
            'always'
        ],
        'eqeqeq': [
            'error',
            'smart'
        ],
        'func-names': [
            'warn',
            'never'
        ],
        'function-paren-newline': [ 
            'error', 
            'consistent' 
        ],
        'import/extensions': [
            'error',
            {
                js: 'always',
                json: 'always'
            }
        ],
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'no-alert': 'error',
        'no-console': [
            'error',
            {
                allow: [
                    'table'
                ]
            }
        ],
        'no-debugger': 'error',
        'no-var': 'error',
        'no-param-reassign': 'error',
        'no-plusplus': [
            'warn',
            {
                'allowForLoopAfterthoughts': true
            }
        ],
        'no-underscore-dangle': 'off',
        'no-unused-vars': 'warn',
        'no-use-before-define': [
            'error',
            {
                'functions': false,
                'classes': false,
                'variables': true
            }
        ],
        'no-useless-concat': 'off',
        'no-magic-numbers': [
            'error',
            {
                'ignoreArrayIndexes': true,
                'ignore': [ -1, 0, 1 ]
            }
        ],
        'object-curly-spacing': [
            'warn',
            'always'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'warn',
            'always'
        ],
        'space-in-parens': [
            'warn',
            'always'
        ],
        'vars-on-top': 'error',
        'camelcase': 'error',
        'brace-style': [ 'error', '1tbs' ],
        'curly': 'error',
        'func-call-spacing': [ 'error', 'never' ],
        'block-spacing': 'error',
        'no-multi-spaces': 'error',
        'comma-spacing': [
            'error', {
                'before': false,
                'after': true
            }
        ],
        'comma-style': [ 'error', 'last' ],
        'key-spacing': 'error',
        'keyword-spacing': [ 'error', {
            'overrides': {
                'function': { 'after': false },
                'typeof': { 'after': false },
                'instanceof': { 'after': false },
                'yield': { 'after': false },
                'throw': { 'after': false },
                'super': { 'after': false }
            }
        }],
        'no-trailing-spaces': 'error',
        'no-shadow': 'error',
        'no-else-return': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'padded-blocks': [
            'error',
            { 'blocks': 'never' }
        ],
        'quote-props': [ 'error', 'consistent' ],
        'space-before-function-paren': [
            'error', 'never'
        ],
        'space-in-parens': [
            'error',
            'always',
            { 'exceptions': [ 'empty' ] }
        ],
        'space-infix-ops': 'error',
        'quotes': [
            'error',
            'single',
            { 'allowTemplateLiterals': true }
        ],
        'prefer-template': 'off',
        'prefer-const': 'error',
        'complexity': [
            'warn',
            { 'max': 10 }
        ],
        'max-depth': [
            'error',
            { 'max': 4 }
        ],
        'max-len': [
            'warn',
            {
                'code': 150,
                'ignoreComments': false,
                'ignorePattern': '^.*getTranslatedString.*'
            }
        ],
        'max-lines': [
            'warn',
            { 'max': 500 }
        ],
        'max-lines-per-function': 'off',
        'max-nested-callbacks': [
            'error',
            { 'max': 4 }
        ],
        'max-params': 'off',
        'no-ternary': 'off',
        'multiline-ternary': [ 'error', 'always-multiline' ],
        'no-nested-ternary': 'error',
        'unicorn/prefer-ternary': 'off',
        'no-multiple-empty-lines': [
            'error',
            { 'max': 2 }
        ],
        'prefer-promise-reject-errors': 'error',
        'prefer-arrow-callback': 'off',
        'arrow-body-style': [ 'error', 'always' ],
        'arrow-parens': [ 'error' ],
        'require-jsdoc': [
            'warn',
            {
                'require': {
                    'FunctionDeclaration': true,
                    'MethodDefinition': true,
                    'ClassDeclaration': true,
                    'ArrowFunctionExpression': false,
                    'FunctionExpression': false
                }
            }
        ],
        'eol-last': [ 'error', 'always' ],
        'object-curly-newline': [
            'error',
            {
                'consistent': true,
                'minProperties': 2,
                'multiline': true
            }
        ],
        'object-property-newline': 'error',
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'one-var-declaration-per-line': [
            'error',
            'always'
        ],
        'semi-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        'arrow-spacing': [
            'error',
            {
                'before': true,
                'after': true
            }
        ],
        'no-confusing-arrow': [
            'error',
            { 'allowParens': false }
        ],
        'no-const-assign': 'error',
        'object-shorthand': [
            'error',
            'consistent'
        ],
        'template-curly-spacing': [
            'error',
            'always'
        ],
        'valid-jsdoc': [
            'warn',
            {
                'requireReturn': false,
                'requireReturnDescription': false
            }
        ],

        'import/no-amd': 'off',
        'import/no-dynamic-require': 'off'
    }
};

module.exports = gEslintConfig;

