module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    semi: ['error', 'never'],
    'no-else-return': [0],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'brace-style': ['error', 'stroustrup'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'react/prop-types': [2, { ignore: ['classes', 'sheet'] }],
    'react/jsx-curly-spacing': [2, 'always', { spacing: { objectLiterals: 'never' }}],
    'react/forbid-prop-types': [2, { forbid: ['any'] }],
    'import/prefer-default-export': [0],
    'react/require-default-props': [0],
    'react/no-array-index-key': [0],
    'import/no-mutable-exports': [0]
  }
}
