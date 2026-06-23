import { fixupConfigRules } from '@eslint/compat'
import core from '@octoguild/eslint-config-core'
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat'
import eslintConfigPrettierPlugin from 'eslint-config-prettier/prettier'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import rules from './rules/rules.js'

const prettierFlat = eslintConfigPrettierFlat.default ?? eslintConfigPrettierFlat
const prettierPluginPreset = eslintConfigPrettierPlugin.default ?? eslintConfigPrettierPlugin

export default fixupConfigRules([
  ...core,
  prettierFlat,
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
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
    rules: {
      ...eslintPluginReact.configs.flat.recommended.rules,
      ...eslintPluginReact.configs.flat['jsx-runtime'].rules,
      ...eslintPluginReactHooks.configs.flat.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...(prettierPluginPreset.rules ?? prettierPluginPreset),
      ...rules,
    },
  },
])
