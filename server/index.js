import path from 'node:path'
import { fileURLToPath } from 'node:url'

import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import core from '@octoguild/eslint-config-core'
import eslintPluginChaiExpect from 'eslint-plugin-chai-expect'
import eslintPluginChaiFriendly from 'eslint-plugin-chai-friendly'
import eslintPluginFilenames from 'eslint-plugin-filenames'
import eslintPluginMocha from 'eslint-plugin-mocha'
import globals from 'globals'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
})

const baseRules = {
  'mocha/no-mocha-arrows': 'off',
  'mocha/no-setup-in-describe': 0,
  'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/tests/**'] }],

  'filenames/match-regex': [
    'error',
    '^(@|[\\w-]+)(\\.(post|get|delete|development|production|local))?(\\.test|\\.d)?$',
  ],

  'import/no-relative-packages': 'off',
  'import/no-import-module-exports': 'off',

  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
}

const tail = {
  plugins: {
    mocha: eslintPluginMocha,
    'chai-expect': eslintPluginChaiExpect,
    'chai-friendly': eslintPluginChaiFriendly,
    filenames: eslintPluginFilenames,
  },
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.mocha,
      __DEV__: 'readonly',
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.ts', '.d.ts', '.html'],
      },
    },
  },
  rules: baseRules,
}

export default [
  ...core,
  ...compat.extends(
    'plugin:mocha/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:chai-expect/recommended',
  ),
  tail,
  {
    files: ['**/tests/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    files: ['**/*.get.ts', '**/*.post.ts', '**/*.delete.ts'],
    rules: {
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            '{}': false,
            'express.Request': {
              message: "Don't override existing type. ",
            },
            'express.Response': {
              message: "Don't override existing type. ",
              fixWith: '',
            },
          },
        },
      ],
      'filenames/match-regex': ['error', '^(@|[\\a-z-]+)(\\.(post|get|delete))$', false],
    },
  },
]
