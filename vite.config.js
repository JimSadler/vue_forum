import { defineConfig } from 'vite'
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import vue from '@vitejs/plugin-vue'
const path = require('path')
export default defineConfig({
  plugins: [vue(), ViteRequireContext()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
  }
})
