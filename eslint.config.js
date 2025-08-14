import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    braceStyle: '1tbs',
  },

  // TypeScript and Vue are autodetected, you can also explicitly enable them:
  typescript: true,
  vue: false,
  react: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
  ignores: [
    '**/fixtures',
    '**/dist',
    '**/node_modules',
    '**/coverage',
    '**/build',
    '**/public',
  ],
  rules: {
    'react-refresh/only-export-components': 'off',
    'style/jsx-one-expression-per-line': 'off',
    'style/jsx-curly-spacing': 'off',
    'style/jsx-child-element-spacing': 'off',

    'brace-style': ['error', '1tbs'],
    'style/brace-style': ['error', '1tbs'],
    'no-console': 'warn',
    'no-nested-ternary': 'error',
    'antfu/if-newline': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'perfectionist/sort-imports': ['error', {
      customGroups: [
        {
          groupName: 'react',
          elementNamePattern: '^react$',
        },
        {
          groupName: 'react-related',
          elementNamePattern: '^react-',
        },
        {
          groupName: 'tanstack-react',
          elementNamePattern: '^@tanstack/react-',
        },
      ],
      groups: [
        // 將 React 相關模組作為單獨的群組放在最前面，react 優先
        'react',
        ['react-related', 'tanstack-react'],
        'external',
        'builtin',
        'internal',
        ['parent', 'sibling', 'index'],
        'type',
        'side-effect',
        'unknown',
      ],
      newlinesBetween: 'always',
      order: 'asc',
      type: 'natural',
    }],
  },
}, {
  // 針對生成的檔案禁用特定規則
  files: ['**/*.gen.ts', '**/*.gen.tsx'],
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
    'eslint-comments/no-unused-disable': 'off',
  },
})
