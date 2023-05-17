module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'semi': [1, 'always'],
    'comma-dangle': [0, 'never'],
    'quote-props': [0, 'as-needed'],
    'space-before-function-paren': [0, 'always'],
  },
};
