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
        es2020: true,
        worker: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended'
    ],
    ignorePatterns: [
        'dist/**/*',
        'node_modules/**/*',
    ]
};
