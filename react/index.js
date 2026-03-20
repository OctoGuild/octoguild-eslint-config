import emotion from '@emotion/eslint-plugin'
import reactCore from '@octoguild/eslint-config-react-core'
import globals from 'globals'

import pragmaAutoRules from './pragma-auto.js'

export default [
  ...reactCore,
  { rules: pragmaAutoRules },
  {
    plugins: {
      '@emotion': emotion,
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
]
