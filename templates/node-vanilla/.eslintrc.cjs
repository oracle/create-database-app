/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-env node */

module.exports = {
    root: true,
    env: { 
        browser: true,
        es2020: true
    },
    extends: [
        'eslint:recommended',
    ],
    rules: {
        'semi': [
            'warn',
            'always'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'array-bracket-spacing': [
            'warn',
            'always',
            {
                singleValue: true,
                objectsInArrays: true,
                arraysInArrays: true
            }
        ],
        'space-in-parens': [
            'warn',
            'always'
        ],
        'computed-property-spacing': [
            'warn',
            'always'
        ],
        'object-curly-spacing': [
            'warn',
            'always'
        ],

        'no-console': [
            'error',
            {
                allow: [
                    'error',
                    'warn',
                ]
            }
        ],
    },
    ignorePatterns: [
        'dist/**/*',
        'node_modules/**/*',
    ]
};
