/**
 * 一次性加载
 */

import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import zhCN from './locales/zh-cn.json'

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof zhCN

//   You must call useI18n at top of the setup.
// To compose with useI18n in setup of Vue 3, there is one thing you need to do,
// you need set the legacy option of the createI18n function to false.
// The following is an example of adding the legacy option to createI18n:
// 2. Create i18n instance with options
const i18n = createI18n<[MessageSchema], 'en' | 'zh-CN'>({
  // Another way to refer a global scope Composer instance is through properties and functions implicitly injected into the component.
//    You need to specify globalInjection: true together with legacy: false as an option for createI18n, because disabled by default.
  globalInjection: true,
  legacy: false, // you must set `false`, to use Composition API
  locale: 'zh-CN', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    'en': en,
    'zh-CN': zhCN
  } // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})
export default i18n
