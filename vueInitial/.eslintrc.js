module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-new': 0,
    'no-tabs': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
