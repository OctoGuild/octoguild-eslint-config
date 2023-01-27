module.exports = {
  plugins: ['react-native', 'detox'],
  extends: ['@reaction-eslint/react-core', 'plugin:react-native/all'],
  rules: {
    'global-require': 'off',

    // react-native plugin
    'react-native/no-color-literals': 'off',
  },
  globals: {
    __DEV__: true,
    WebSocket: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ios.js', '.android.js', '.ts', '.tsx', '.ios.ts', '.android.tsx', '.d.ts'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['./**/*.spec.ts', './**/*.spec.tsx', './**/*.spec.js', './**/*.spec.jsx'],
      env: {
        'detox/detox': true,
      },
    },
  ],
}
