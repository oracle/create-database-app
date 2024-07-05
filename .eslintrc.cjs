/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-env node */

/** @type { import( './eslintrc' ).JSONSchemaForESLintConfigurationFiles } */
const gEslintConfig = {
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
            'warn',
            'always',
            {
                arraysInArrays: true,
                objectsInArrays: true,
                singleValue: true,
            }
        ],
        'computed-property-spacing': [
            'warn',
            'always'
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
            4
        ],
        'no-console': [
            'error',
            {
                allow: [
                    'table'
                ]
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
        ]
    }
};

module.exports = gEslintConfig;

