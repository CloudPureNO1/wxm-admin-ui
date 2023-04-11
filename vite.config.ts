import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// vite  svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // vite svg
    createSvgIconsPlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), 'src/components/icons/svg')],
      // svgoOptions: isBuild,
      // default
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    host: '192.168.179.137',
    port: 8888,
    // 跨域配置
    // 默认地址  axios.defaults.baseURL = config.BASE_URL
    proxy: {
      '/api': {
        target: 'http://localhost:9701/wxmApi', // 接口域名
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket': {
        target: 'http://localhost:1322/wxmPush', // 接口域名
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/socket/, '')
      }
    }
  }
})
