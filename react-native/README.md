## Install

`npm i @octoguild/eslint-config-react-native -D`

or

`yarn add @octoguild/eslint-config-react-native --dev`



### Usage (ESLint 9 flat config)

This package is **ESM** (`"type": "module"`). It default-exports a flat config array (React core + React Native + Detox env for `*.spec.*`).

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import reactNative from '@octoguild/eslint-config-react-native'

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default [
  ...reactNative,
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

### Detox

Spec globs: `*.spec.ts`, `*.spec.tsx`, `*.spec.js`, `*.spec.jsx` (paths prefixed with `./**/` as in the legacy config).
