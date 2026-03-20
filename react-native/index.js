import path from 'node:path'
import { fileURLToPath } from 'node:url'

import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import reactCore from '@octoguild/eslint-config-react-core'
import eslintPluginDetox from 'eslint-plugin-detox'
import eslintPluginReactNative from 'eslint-plugin-react-native'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
})

const detoxSpecFiles = [
  './**/*.spec.ts',
  './**/*.spec.tsx',
  './**/*.spec.js',
  './**/*.spec.jsx',
]

const tail = {
  plugins: {
    'react-native': eslintPluginReactNative,
    detox: eslintPluginDetox,
  },
  languageOptions: {
    globals: {
      __DEV__: 'readonly',
      WebSocket: 'readonly',
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.ios.js',
          '.android.js',
          '.ts',
          '.tsx',
          '.ios.ts',
          '.android.tsx',
          '.d.ts',
        ],
      },
    },
  },
  rules: {
    'global-require': 'off',
    'react-native/no-color-literals': 'off',
  },
}

export default [
  ...reactCore,
  ...compat.extends('plugin:react-native/all'),
  ...compat.config({
    files: detoxSpecFiles,
    env: { 'detox/detox': true },
  }),
  tail,
]
