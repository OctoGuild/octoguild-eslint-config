## Description

Set of rules for typescript + mocha tests project


## Install

`npm i @octoguild/eslint-config-server -D`

or

`yarn add @octoguild/eslint-config-server --dev`



### Usage (ESLint 9 flat config)

This package is **ESM** (`"type": "module"`). It default-exports a flat config array.

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import server from '@octoguild/eslint-config-server'

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default [
  ...server,
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

Node + Mocha globals are included via the `globals` package (`globals.node`, `globals.mocha`).
