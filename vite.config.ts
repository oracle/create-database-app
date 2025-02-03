import {
    defaultExclude,
    defineConfig
} from 'vitest/config';

export default defineConfig( {
    test: {
        exclude: [ ...defaultExclude, 'templates' ],
        testTimeout: 20_000
    }
} );
