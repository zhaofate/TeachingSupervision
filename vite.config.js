import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: { transformAssetUrls }
  }),

  // @quasar/plugin-vite options list:
  // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
  quasar({
    sassVariables: 'src/quasar-variables.sass'
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),//配置 @ 符号作为别名，指向 src 目录路径
    },
  },
  optimizeDeps: {
    include: ['*.js'], //Vite 将只对 JavaScript 文件进行优化和处理，而忽略 TypeScript 文件
  },
})
