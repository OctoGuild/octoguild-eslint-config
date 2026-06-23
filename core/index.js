import { fixupConfigRules } from '@eslint/compat'
import eslint from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import eslintCommentsPluginImport from 'eslint-plugin-eslint-comments'
import importPlugin from 'eslint-plugin-import'
import sonarjs from 'eslint-plugin-sonarjs'
import typescriptEslint from 'typescript-eslint'
import rules from './src/rules.js'

/** Flat config presets may be one object or an array; spread needs an iterable. */
function asConfigArray(config) {
  if (config == null) return []
  return Array.isArray(config) ? config : [config]
}

const tsEslint = typescriptEslint.default ?? typescriptEslint

const eslintCommentsRecommended = eslintCommentsPluginImport.configs.recommended.default
  ?? eslintCommentsPluginImport.configs.recommended

export default fixupConfigRules([
  eslint.configs.recommended,
  {
    plugins: { 'eslint-comments': eslintCommentsPluginImport },
    rules: eslintCommentsRecommended.rules,
  },
  ...asConfigArray(tsEslint.configs.eslintRecommended),
  ...asConfigArray(tsEslint.configs.recommended),
  ...asConfigArray(tsEslint.configs.recommendedTypeChecked),
  sonarjs.configs.recommended,
  {
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      import: importPlugin,
      '@stylistic': stylisticPlugin,
    },
    rules,
  },
])
