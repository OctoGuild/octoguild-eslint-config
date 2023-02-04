module.exports = {
  plugins: ['@emotion'],
  extends: ['@octoguild/react-core'],
  rules: {
    '@emotion/jsx-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
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
