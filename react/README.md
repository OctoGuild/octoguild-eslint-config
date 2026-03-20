## Install

`npm i @octoguild/eslint-config-react -D`

or

`yarn add @octoguild/eslint-config-react --dev`



### Usage (ESLint 9 flat config)

This package is **ESM** (`"type": "module"`). The default export is a flat config array (includes **pragma-auto** rules).

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@octoguild/eslint-config-react'

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default [
  ...react,
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

### Pragma presets

- **Default (`@octoguild/eslint-config-react`)** — pragma-auto: `@emotion/jsx-import` off, `react/no-unknown-property` ignores `css`.
- **`@octoguild/eslint-config-react/pragma-manual`** — ESM module that **default-exports** a `rules` object (`@emotion/jsx-import`: error). Import it and add `{ rules: … }` to your flat config when you want manual pragma instead of the default; you will usually mirror `react/index.js` but swap the pragma-auto import for pragma-manual.
