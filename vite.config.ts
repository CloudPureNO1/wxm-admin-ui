
/**
 * 在Vite构建Vue项目时，
如果你希望在部署后访问时带有项目名（例如：https://example.com/your_project_name/），
可以通过以下步骤设置：
1. 修改Vite的公共路径（publicPath）：
在Vite的配置文件vite.config.js中设置base属性，
它定义了生成的静态资源的基础路径。
export default defineConfig({
  base: '/your_project_name/', // 设置基础路径
  // 其他配置...
});
这样设置后，Vite在构建时会将所有静态资源的URL前缀加上/your_project_name/。
2. 部署到服务器： 将构建生成的dist目录上传到服务器，并确保服务器的web服务器（如Nginx或Apache）配置正确，能够将请求映射到包含项目名的目录。
对于Nginx，配置示例如下：
server {
    listen 80;
    server_name example.com;

    location /your_project_name/ {
        root /var/www/html;  # 你的实际部署目录
        index index.html;
        try_files $uri $uri/ /your_project_name/index.html;  # 如果不是静态资源，则返回index.html（Vue的SPA路由依赖这一点）
    }
}
请根据实际情况调整配置。通过上述步骤，当用户访问https://example.com/your_project_name/时，服务器将能够正确地找到并返回Vite构建后的Vue项目资源。
 */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// vite  svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// import { basePath } from './src/SysConfig'

 

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/wxm-admin-ui/',
  // base: basePath,
  base: './',
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
    }),

 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },

  // 本地开发和 前后段部署到同一服务器
  server: {
    host: 'localhost',
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
  },

  // 云服务器上的接口
  // server: {
  //   host: 'localhost',
  //   port: 8888,
  //   // 跨域配置
  //   // 默认地址  axios.defaults.baseURL = config.BASE_URL
  //   proxy: {
  //     '/api': {
  //       target: 'http://106.54.34.92:80/api', // 接口域名
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     },
  //     '/socket': {
  //       target: 'http://106.54.34.92:1322/wxmPush', // 接口域名
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/socket/, '')
  //     }
  //   }
  // },

  build: {
    // outDir: BUILD_DIR,
    // sourcemap: false,
    // minify: 'terser',
    chunkSizeWarningLimit: 1500,
    // emptyOutDir: true,
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // },
    rollupOptions: {
      output: {
        manualChunks (id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
        // chunkFileNames: (chunkInfo) => {
        //   const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
        //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
        //   return `js/${fileName}/[name].[hash].js`
        // }
      }
    }
  }
})
