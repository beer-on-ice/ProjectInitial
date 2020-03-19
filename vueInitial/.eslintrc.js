module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': ['production', 'prod'].includes(process.env.NODE_ENV) ? 'error' : 'off',
    'no-debugger': ['production', 'prod'].includes(process.env.NODE_ENV) ? 'error' : 'off',
    'no-explicit-any': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
