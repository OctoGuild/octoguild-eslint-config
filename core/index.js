import path from 'node:path'
import { fileURLToPath } from 'node:url'

import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import airbnbBase from 'eslint-config-airbnb-base'
import importPlugin from 'eslint-plugin-import'
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments'
import stylisticPlugin from '@stylistic/eslint-plugin'
import typescriptEslint from 'typescript-eslint'

import rules from './src/rules.js'

/** Flat config presets may be one object or an array; spread needs an iterable. */
function asConfigArray(config) {
  if (config == null) return []
  return Array.isArray(config) ? config : [config]
}

const tsEslint = typescriptEslint.default ?? typescriptEslint

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
})

const airbnbLegacy = airbnbBase.default ?? airbnbBase
const eslintCommentsRecommended =
  eslintCommentsPlugin.configs.recommended.default ?? eslintCommentsPlugin.configs.recommended

const tail = {
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': tsEslint.plugin,
    import: importPlugin,
    'eslint-comments': eslintCommentsPlugin,
    '@stylistic': stylisticPlugin,
  },
  rules,
}

export default [
  ...compat.config(airbnbLegacy),
  ...compat.config(eslintCommentsRecommended),
  ...asConfigArray(tsEslint.configs.eslintRecommended),
  ...asConfigArray(tsEslint.configs.recommended),
  ...asConfigArray(tsEslint.configs.recommendedTypeChecked),
  tail,
]
