const baseConfig = require('../../../eslint.config.cjs');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': ['error'],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
];
