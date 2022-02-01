module.exports = {
  root: true,

  env: {
    es2021: true
  },

  extends: ['plugin:vue/vue3-essential', '@vue/standard'],

  rules: {
    // 'no-unused-vars': import.meta.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/setup-compiler-macros': true.valueOf,
    'vue/no-unused-vars': 'warn',
    'vue/script-setup-uses-vars': 'warn',
    'vue/multi-word-component-names': 'off'
  }
}
