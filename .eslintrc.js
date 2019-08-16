module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-debugger': 0,
    'no-alert': 0,
    'prefer-arrow-callback': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'arrow-parens': ['error', 'as-needed'],
    'no-unused-vars': [
      1,
      {
        argsIgnorePattern: 'res|next|^err',
      },
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-param-reassign': 2,
    'no-console': 1,
    'import/prefer-default-export': 0,
    import: 0,
    radix: 0,
    indent: ['error', 2],
    'func-names': 0,
    'import/no-extraneous-dependencies': 0,
    'space-before-function-paren': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': 0,
    'no-confusing-arrow': 0,
    'import/no-unresolved': 2,
    'import/extensions': 0,
    'consistent-return': 0,
    'operator-linebreak': 0,
    'no-shadow': [
      2,
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 0,
  },
};
