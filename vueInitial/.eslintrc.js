module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ["prettier", "plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-new": "off",
    "no-tabs": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
