module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': [0, { 'properties': 'never' }],
    'no-var': 0, // 禁用var，用let和const代替
    'indent': [2, 4], // 缩进风格
    'no-mixed-spaces-and-tabs': [2, false], // 禁止混用tab和空格,
    'no-tabs': 'off',
    'vue/no-v-html': 'off',
    'vue/html-indent': 'off',
    'standard/no-callback-literal': 0
  },
  globals: {
    'Stackedit': true,
    'Swal': true,
    'Quill': true,
    'markdownit': true,
    'tui': true
  }
}

