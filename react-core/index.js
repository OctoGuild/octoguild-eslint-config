module.exports = {
  plugins: ['prettier', 'react', 'react-hooks'],
  extends: ['airbnb', '@reaction-eslint/core', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        eslintIntegration: true,
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
    // "react/jsx-max-props-per-line": "off",
    'react/jsx-wrap-multilines': 'off',
    'react/static-property-placement': 'off',
    'react/state-in-constructor': 'off',

    // disable conflicting default eslint rules
    'arrow-parens': 'off',

    // disable useless
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',

    // problematic
    'default-param-last': 'off',

    // ts support
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
  },
  globals: {},
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  env: {
    jest: true,
  },
}
