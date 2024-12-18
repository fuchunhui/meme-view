import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ['error', 'always'],
    'indent': 'off',
    'no-empty-function': 'off',
    'no-useless-escape': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': ['error', 'before'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'no-template-curly-in-string': 'error',
    // require space before blocks
    'space-before-blocks': ['error', 'always'],
    // enforce consistent spacing before and after keywords
    'keyword-spacing': 'error',
    // enforce consistent spacing between keys and values in object literal properties
    'key-spacing': 'error',
    // require or disallow spacing between function identifiers and their invocations
    'func-call-spacing': ['error', 'never'],
    // enforce consistent spacing before and after commas
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    // disallow or enforce spaces inside of parentheses
    'space-in-parens': ['error', 'never'],
    // enforce consistent spacing inside braces
    'object-curly-spacing': ['error', 'never'],
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 10,
      'multiline': 5
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'never'
    }],
    'vue/multi-word-component-names': ['off'],

    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/indent': ['error', 2, {
      'SwitchCase': 1
    }],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': [
      'off',
      'ignore-params',
      'ignore-properties'
    ]
  }
]
