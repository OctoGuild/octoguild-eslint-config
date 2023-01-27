## Description

Set of rules for typescript + mocha tests project


## Install

`npm i @octoguild/eslint-config-server -D`

or

`yarn add @octoguild/eslint-config-server --dev`



### Usage

```json
{
  "env": {
    "es2017": true,
    "node": true,
    "mocha": true
  },
  "extends": [
    "@octoguild/server"
  ],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```
