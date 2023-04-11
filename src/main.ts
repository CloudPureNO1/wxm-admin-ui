import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 其他基本样式
import './assets/css/main.scss'

// 切换暗夜模式
import './theme/index.scss'
// 国际化引入
import i18n from './i18n/index'

// Element plus 全局引入图标。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// vite svg
import 'virtual:svg-icons-register'
import SvgIcon from './components/icons/SvgIcon.vue'

// 自定义指令
import type { Directive } from 'vue'
import * as directive from './directives'

// 系统活动检测
import CheckOperateTime from './util/CheckOperateTime'

// 避免main.ts 臃肿，把第三方的组件统一放入plugins中
import plugins from './plugins'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(CheckOperateTime)
app.use(plugins)
app.component('svg-icon', SvgIcon)

// Element plus 图标注册。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

Object.keys(directive).forEach(key => {  // Object.keys() 返回一个数组，值是所有可遍历属性的key名
  const directiveKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()  // 驼峰转中划线
  app.directive(directiveKey, (directive as { [key: string]: Directive })[key])  // key是自定义指令名字；后面应该是自定义指令的值，值类型是string
})

app.mount('#app')
