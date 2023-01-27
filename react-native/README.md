## Install

`npm i @octoguild/eslint-config-react-native -D`

or

`yarn add @octoguild/eslint-config-react-native --dev`



### Usage

```json
{
  "env": {
    "jest": true
  },
  "extends": [
    "@octoguild/react-native"
  ],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```

### Work

Detox file format: 
`*.spec.ts`, 
`*.spec.tsx`,
`*.spec.js`, 
`*.spec.jsx`,
