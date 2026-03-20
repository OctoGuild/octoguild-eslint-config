const rules = {
  'prettier/prettier': [
    'error',
    {
      trailingComma: 'all',
      tabWidth: 2,
      semi: false,
      singleQuote: true,
      bracketSpacing: true,
      printWidth: 120,
    },
  ],

  // react rules
  'react/sort-comp': [
    'error',
    {
      order: [
        'type-annotations',
        'statics',
        'static-variables',
        'static-methods',
        'instance-variables',
        'getters',
        'setters',

        'variablesGroup',
        'state', // regex
        'constructor', // regex
        'renderGroup',
        'handlerGroup',

        // 'instance-methods',
        'everything-else',
        '/fetch*/',
        'lifecycle',
      ],
      groups: {
        renderGroup: ['render', '/^render.+/', '/^wrap.+/'],
        handlerGroup: ['/^save.+Ref$/', '/^createHandler.+/', '/^handle.+/'],
        variablesGroup: ['/.+Value$/', '/^animated.+/', '/.+Ref/'],
      },
    },
  ],
  'react/forbid-prop-types': 'off',
  'react/destructuring-assignment': 'off',
  'react/jsx-curly-brace-presence': 'off',
  'react/jsx-one-expression-per-line': 'off',
  'react/require-default-props': 'off',
  'react/jsx-wrap-multilines': 'off',
  'react/static-property-placement': 'off',
  'react/state-in-constructor': 'off',

  /** @see https://eslint.org/docs/latest/rules/arrow-parens */
  'arrow-parens': 'off',

  'react/jsx-props-no-spreading': 'off',
  'react/prop-types': 'off',

  'default-param-last': 'off',

  'react/jsx-filename-extension': ['error', { allow: 'as-needed', extensions: ['.tsx'] }],

  'import/extensions': [
    'error',
    {
      jsx: 'never',
      js: 'never',
      tsx: 'never',
      ts: 'never',
    },
  ],
  'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] }],

  'import/prefer-default-export': 'off',

  'react/jsx-no-bind': 'off',
}

export default rules
