import type { I18nOptions } from 'vue-i18n'
// import type { MessagesType } from '../types/I18nTypes'
import { setupI18n, getLocaleLanguage } from '../composable/i18n'

import en from './locales/en.json'
import zhCN from './locales/zh-cn.json'

type MessagesType={
  [key: string]: any
}

const messages:MessagesType = {
  'en': en,
  'zh-cn': zhCN
}

const i18nOptions:I18nOptions = {
  // Another way to refer a global scope Composer instance is through properties and functions implicitly injected into the component.
//    You need to specify globalInjection: true together with legacy: false as an option for createI18n, because disabled by default.
  globalInjection: true,
  legacy: false, // you must set `false`, to use Composition API
  // locale: 'zh-CN', // set locale
  locale: getLocaleLanguage(messages), // set locale
  fallbackLocale: 'zh-cn', // set fallback locale 默认中文
  messages: messages
  // messages: {
  //   'en': en,
  //   'zh-CN': zhCN
  // } // set locale messages
  // If you need to specify other options, you can set other options
  // ...
}

const i18n = setupI18n(i18nOptions)
export default i18n

