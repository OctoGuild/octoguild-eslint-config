# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@octoguild/eslint-config` — a Lerna/npm-workspaces monorepo publishing five shared ESLint **flat configs** to npm. There is no application code, no build step, and no test suite; every package is plain ESM JavaScript published as-is.

Note: this directory sits inside a `tasker-server` checkout but is its **own git repo**, unrelated to the surrounding Express/Kafka project. The parent `tasker-server/CLAUDE.md` does not apply here.

## Package graph

```
core          →  base TS/JS rules (eslint recommended, typescript-eslint incl. type-checked,
                 sonarjs, import, @stylistic, eslint-comments)
 ├─ react-core →  core + prettier + react + react-hooks + jsx-a11y
 │   ├─ react       →  react-core + @emotion + jest (jest rules scoped to *.test/*.spec files)
 │   └─ react-native →  react-core + react-native/all (via FlatCompat) + detox globals for *.spec.*
 └─ server     →  core + n + security + mocha + chai-expect/chai-friendly + check-file
```

Each package's `index.js` default-exports a **flat config array**; consumers spread it (`...core`). Cross-package deps are real npm semver deps (`^3.0.0`), resolved locally through workspaces — a change in `core` immediately affects the other four in this checkout.

Rule overrides live in separate modules, not inline: `core/src/rules.js` and `react-core/rules/rules.js`. `react/pragma-auto.js` and `react/pragma-manual.js` are two-line rules fragments exported as subpath entry points (`@octoguild/eslint-config-react/pragma-manual`).

### Conventions baked into the configs

The house style these configs enforce is also the style to write repo code in: no semicolons, single quotes, 2-space indent, trailing commas, `printWidth` 120 (prettier, in `react-core`) / `max-len` 150 (core). Type-unsafe `@typescript-eslint` rules are deliberately downgraded to `warn` in `core` and further to `off` in test-file overrides.

### Interop patterns to preserve

Plugins are inconsistent about CJS/ESM and flat-config shape, so the configs defend against it. Keep these patterns when adding plugins:

- `x.configs.foo.default ?? x.configs.foo` for dual-export presets.
- `asConfigArray()` in `core/index.js` — a preset may be one object or an array.
- `fixupConfigRules([...])` wraps the exported array in every package that pulls in eslintrc-era plugins.
- `FlatCompat` (`react-native/index.js`) is the only way `plugin:react-native/all` is consumed; it needs `recommendedConfig`/`allConfig` passed explicitly.
- `core` sets `parserOptions.project: './tsconfig.json'` with `tsconfigRootDir: process.cwd()`. Every README tells consumers to re-specify `project`/`tsconfigRootDir` from their own `eslint.config.js` — keep that guidance in sync when touching parser options.

## Verifying a change

There are no `test` or `lint` scripts. Two checks worth running after editing any `index.js` or rules module:

```bash
# 1. every config still loads (catches bad imports / interop shape changes)
node --input-type=module -e "for (const p of ['core','react-core','react','react-native','server']) { const c = (await import('./'+p+'/index.js')).default; console.log(p, c.length) }"

# 2. lint a throwaway file with the config, from a scratch dir containing a
#    tsconfig.json and an eslint.config.mjs that spreads the package
./node_modules/.bin/eslint sample.ts
```

Check 2 matters because a config can import cleanly and still fail at rule-resolution time (missing plugin key, stale rule name).

## Releasing

Lerna drives versions; all five packages are version-locked (currently `3.0.0`).

```bash
npm run version:lerna    # lerna version — bumps + tags, push disabled in lerna.json
npm run lerna:publish    # lerna publish from-package
npm run ncu              # ncu --deep -u across workspaces
```

Never add a `version` script to the root `package.json` — it conflicts with lerna (see `version:note`). The `gitHead` fields in each package's `package.json` are lerna publish artifacts; commits touching only those are the "ci: hash" commits.

`.npmrc` sets `legacy-peer-deps=true`, needed because plugins lag behind the `eslint ^10` peer range.

## Known cruft

The root `index.js` is CommonJS (`require('./core')`) and cannot load the ESM packages. The root package is `private: true` and never published, so nothing consumes it — don't build on it, and prefer deleting over fixing if it comes up. Both `package-lock.json` and `yarn.lock` are tracked at the root despite `yarn.lock` being listed in `.gitignore`; `lerna.json` declares `npmClient: "npm"`.
