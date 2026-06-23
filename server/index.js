import { fixupConfigRules } from '@eslint/compat'
import core from '@octoguild/eslint-config-core'
import eslintPluginChaiExpect from 'eslint-plugin-chai-expect'
import eslintPluginChaiFriendly from 'eslint-plugin-chai-friendly'
import eslintPluginCheckFile from 'eslint-plugin-check-file'
import eslintPluginMocha from 'eslint-plugin-mocha'
import eslintPluginN from 'eslint-plugin-n'
import eslintPluginSecurity from 'eslint-plugin-security'
import globals from 'globals'

const chaiExpectRecommended = eslintPluginChaiExpect.configs['recommended-flat']
  ?? eslintPluginChaiExpect.configs.recommended

const nRecommended = eslintPluginN.configs['flat/recommended-module']
const securityRecommended = eslintPluginSecurity.configs.recommended

const checkFileNamingConvention = [
  'error',
  {
    '**/*.{ts,js}': '@(@)|+([a-zA-Z0-9_-])@(+([.]@(+([a-zA-Z0-9_-]))@(+([.]@(+([get|post|delete|development|production|local|test|d]))?)?)?)?',
  },
  { ignoreMiddleExtensions: true },
]

const baseRules = {
  'mocha/no-mocha-arrows': 'off',
  'mocha/no-setup-in-describe': 0,
  'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/tests/**'] }],

  'check-file/filename-naming-convention': checkFileNamingConvention,

  'import/no-relative-packages': 'off',
  'import/no-import-module-exports': 'off',

  'n/no-extraneous-import': 'off',
  'n/no-extraneous-require': 'off',
  'n/no-missing-import': 'off',
  'n/no-missing-require': 'off',

  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
}

export default fixupConfigRules([
  ...core,
  {
    ...nRecommended,
    ...securityRecommended,
    plugins: {
      ...nRecommended.plugins,
      ...securityRecommended.plugins,
      mocha: eslintPluginMocha,
      'chai-expect': eslintPluginChaiExpect,
      'chai-friendly': eslintPluginChaiFriendly,
      'check-file': eslintPluginCheckFile,
    },
    languageOptions: {
      ...nRecommended.languageOptions,
      globals: {
        ...nRecommended.languageOptions?.globals,
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
    rules: {
      ...nRecommended.rules,
      ...securityRecommended.rules,
      ...eslintPluginMocha.configs.recommended.rules,
      ...eslintPluginChaiFriendly.configs.recommendedFlat.rules,
      ...chaiExpectRecommended.rules,
      ...baseRules,
    },
  },
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
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
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
    },
  },
])
