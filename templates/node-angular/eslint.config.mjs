import eslint from '@eslint/js';
import tseslint from "typescript-eslint";

export default tseslint.config( 
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: [
            '**/*.js',
            '**/*.jsx',
            "**/*.ts",
        ],
        linterOptions: {
            reportUnusedDisableDirectives: "warn"
        },
        ignores: [
            'dist/**/*',
            'node_modules/**/*',
        ]
    }
);
