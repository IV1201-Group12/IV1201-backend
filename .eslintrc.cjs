module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:node/recommended',
    'eslint-config-prettier',
    'eslint:recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {},
};
