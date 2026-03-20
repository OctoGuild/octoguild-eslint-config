## Install

`npm i @octoguild/eslint-config-react -D`

or

`yarn add @octoguild/eslint-config-react --dev`



### Usage (ESLint 9 flat config)

This package is **ESM** (`"type": "module"`). It default-exports a flat config array.

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import reactCore from '@octoguild/eslint-config-react-core'

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default [
  ...reactCore,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir,
      },
    },
  },
]
```

If tooling wraps the default export, use `...(reactCore.default ?? reactCore)`.

Legacy `.eslintrc` + `extends: ["@octoguild/react"]` is not supported by this flat export—use a root `eslint.config.js` / `eslint.config.mjs` instead.
