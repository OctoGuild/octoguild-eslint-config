import * as emotionPlugin from '@emotion/eslint-plugin'
import reactCore from '@octoguild/eslint-config-react-core'
import eslintPluginJest from 'eslint-plugin-jest'
import globals from 'globals'
import pragmaAutoRules from './pragma-auto.js'

const jestRecommended = eslintPluginJest.configs['flat/recommended']

export default [
  ...reactCore,
  { rules: pragmaAutoRules },
  {
    plugins: {
      '@emotion': emotionPlugin,
    },
    languageOptions: {
      globals: globals.jest,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.json', '.ts', '.tsx', '.d.ts'],
        },
      },
    },
    rules: {
      '@emotion/no-vanilla': 'error',
      '@emotion/import-from-emotion': 'error',
      '@emotion/styled-import': 'error',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      globals: jestRecommended.languageOptions.globals,
    },
    rules: jestRecommended.rules,
  },
]
