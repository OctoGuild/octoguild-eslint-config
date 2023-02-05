module.exports = {
  plugins: ['mocha', 'chai-expect', 'chai-friendly', 'filenames'],
  extends: [
    '@octoguild/core',
    'plugin:mocha/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:chai-expect/recommended',
  ],
  rules: {
    'mocha/no-mocha-arrows': 'off',
    'mocha/no-setup-in-describe': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/tests/**'] }],

    'filenames/match-regex': [
      'error',
      '^(@|[\\w-]+)(\\.(post|get|delete|development|production|local))?(\\.test|\\.d)?$',
    ],

    // modules only
    'import/no-relative-packages': 'off',
    'import/no-import-module-exports': 'off',

    // decrease level
    '@typescript-eslint/no-unsafe-argument': 'warn',

    // server is not ready for these:
    '@typescript-eslint/no-unsafe-assignment': 'off',

    // buggy rule. Not working properly. Enable later.
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  },
  // overrides not working here
  overrides: [
    {
      files: ['**/tests/*.test.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
    {
      files: ['**/*.get.ts', '**/*.post.ts', '**/*.delete.ts'],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              '{}': false,
              'express.Request': {
                message: "Don't override existing type. ",
              },
              'express.Response': {
                message: "Don't override existing type. ",
                fixWith: '',
              },
            },
          },
        ],
        'filenames/match-regex': ['error', '^(@|[\\a-z-]+)(\\.(post|get|delete))$', false],
      },
    },
  ],
  globals: {
    __DEV__: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.ts', '.d.ts', '.html'],
      },
    },
  },
}
