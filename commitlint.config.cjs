/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-env node */

module.exports = {
    extends: [
        '@commitlint/config-conventional'
    ],
    rules: {
        'body-max-line-length': [ 1, 'always', Number.POSITIVE_INFINITY ],
        'footer-max-line-length': [ 1, 'always', Number.POSITIVE_INFINITY ],
        'type-enum': [ 1, 'always', [
            // Changes that affect the build system or external dependencies
            'build',
            // Changes affecting the developer experience of the product
            'dx',
            // Generic changes that don't introduce product changes
            'chore',
            // Changes on the Continuous Integration
            'ci',
            // Changes to the product documentation
            'doc',
            // A new feature
            'feat',
            // A bugfix
            'fix',
            // Changes that improve performance
            'perf',
            // Changes that do not add a feature or a fix
            'refactor',
            // Changes that revert a previous commit
            'revert',
            // Changes to the product CSS styles
            'style',
            // Changes to the product tests
            'test'
        ] ]
    }
};
