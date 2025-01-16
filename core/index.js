module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    "plugin:eslint-comments/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    indent: [2, 2, { SwitchCase: 1 }],

    // camelCase doesn't make sense when server send data in different formats.
    camelcase: 'off',
    'max-len': [2, 150],
    'no-use-before-define': 'off',
    'dot-notation': 'off',

    // Buggy. conflicts with arrow-only rule. Some functions don't have to return value. forEach function as an example
    'consistent-return': 'off',
    'no-alert': 'off',
    'key-spacing': [2, { mode: 'minimum' }],
    'new-cap': 'off',
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'linebreak-style': 'off',
    'jsx-no-bind': 'off',
    'class-methods-use-this': 'off',
    eqeqeq: 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'import/default': 'off',
    'no-invalid-this': 'off',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'prefer-const': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'space-before-blocks': 'error',
    'brace-style': 'error',
    'arrow-spacing': 'error',
    'keyword-spacing': 'error',
    'space-infix-ops': ['error', { int32Hint: true }],
    'rest-spread-spacing': 'error',
    'no-multi-spaces': 'error',
    'computed-property-spacing': 'error',
    'import/no-unresolved': 'off', // use ts version rule
    'import/extensions': 'off',
    'no-param-reassign': 'off',

    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
    '@typescript-eslint/no-object-literal-type-assertion': 'off',

    // decrease level
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn', // sometimes buggy for modules
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn', // means any value at jsx
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',

    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration:not([const=true])',
        message: "Don't declare non-const enums",
      },
    ],

    "jsx-a11y/no-autofocus": [2, {
      "ignoreNonDOM": true
    }],

    // useless eslint rules
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    radix: 'off',
    'no-continue': 'off',
    'arrow-parens': ['error', 'as-needed'],

    // ts conflict rules
    'max-classes-per-file': 'off',

    // buggy rules (or not working)
    '@typescript-eslint/await-thenable': 'off',
  },
}
