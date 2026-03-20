import path from 'node:path'
import { fileURLToPath } from 'node:url'
import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import airbnb from 'eslint-config-airbnb'
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat'
import eslintConfigPrettierPlugin from 'eslint-config-prettier/prettier'
import core from '@octoguild/eslint-config-core'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import rules from './rules/rules.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
})

const tail = {
  plugins: {
    prettier: eslintPluginPrettier,
    react: eslintPluginReact,
    'react-hooks': eslintPluginReactHooks,
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
    react: {
      version: 'detect',
    },
  },
  rules,
}

const airbnbLegacy = airbnb.default ?? airbnb
const prettierFlat = eslintConfigPrettierFlat.default ?? eslintConfigPrettierFlat
const prettierPluginPreset = eslintConfigPrettierPlugin.default ?? eslintConfigPrettierPlugin

export default [
  ...compat.config(airbnbLegacy),
  ...core,
  prettierFlat,
  {
    rules: prettierPluginPreset.rules ?? prettierPluginPreset,
  },
  tail,
]
