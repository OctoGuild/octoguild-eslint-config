## Install

`npm i @octoguild/eslint-config-core -D`

or

`yarn add @octoguild/eslint-config-core --dev`



### Usage (ESLint 9 flat config)

The package is **ESM** (`"type": "module"`). `index.js` default-exports a **flat config array** (parser and plugins are loaded via `import`).

Use it from your project’s `eslint.config.js` / `eslint.config.mjs`:

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import core from '@octoguild/eslint-config-core'

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default [
  ...core,
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

If tooling returns an interop wrapper, use `...(core.default ?? core)`.

Legacy `.eslintrc` + `extends: ["@octoguild/core"]` is not supported by this flat export—migrate the consuming app to flat config.
