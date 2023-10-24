## Install

`npm i @octoguild/eslint-config-react -D`

or

`yarn add @octoguild/eslint-config-react --dev`



### Usage

```json
{
  "extends": [
    "@octoguild/react"
  ],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```


### Configs

- `@octoguild/react/pragma-auto` - (default) adds rules related to pragma auto
- `@octoguild/react/pragma-manual` - adds rules to handle manual pragma
