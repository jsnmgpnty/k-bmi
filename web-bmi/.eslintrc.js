module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  ignorePatterns: ['**/*.test.js'],
  plugins: ['react'],
  rules: {
    'no-unused-vars': [
      1,
      { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'import/no-unresolved': [2, { ignore: ['^(all|part):'] }],
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'prefer-arrow-callback': 'off',
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/setupTests.js',
          '**/testing.js',
          '**/*jest*',
        ],
      },
    ],
  },
};
