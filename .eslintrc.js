module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/max-len': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'no-param-reassign': 'off',
    // 'prefer-destructuring': ['error', { object: true, array: false }],
    'no-unused-vars': 'error',
  },
};
