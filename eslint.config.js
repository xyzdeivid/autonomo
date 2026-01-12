const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      // Força o uso de aspas simples
      'quotes': ['error', 'single'],
      // Desativa a obrigatoriedade do ponto e vírgula
      'semi': ['error', 'never'],
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off'
    },
  },
  {
    ignores: ['dist/*', '.expo/*'],
  }
])