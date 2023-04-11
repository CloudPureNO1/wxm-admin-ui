import { nextTick, isRef } from 'vue'
import { createI18n } from 'vue-i18n'

import type {
  I18n,
  I18nOptions,
  Locale,
  VueI18n,
  Composer,
  I18nMode
} from 'vue-i18n'

type MessagesType={
    [key:string]:any
}

// export const SUPPORT_LOCALES = ['en', 'zhCN']

export function isComposer (
  instance: VueI18n | Composer,
  mode: I18nMode
): instance is Composer {
  return mode === 'composition' && isRef(instance.locale)
}

export function getLocale (i18n: I18n): string {
  if (isComposer(i18n.global, i18n.mode)) {
    return i18n.global.locale.value
  } else {
    return i18n.global.locale
  }
}

export function setLocale (i18n: I18n, locale: Locale): void {
  if (isComposer(i18n.global, i18n.mode)) {
    i18n.global.locale.value = locale
  } else {
    i18n.global.locale = locale
  }
}

export function setupI18n (options: I18nOptions = { locale: 'en' }): I18n {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale!)
  return i18n
}

export function setI18nLanguage (i18n: I18n, locale: Locale): void {
  setLocale(i18n, locale)
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')!.setAttribute('lang', locale)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getResourceMessages = (r: any) => r.default || r

export async function loadLocaleMessages (i18n: I18n, locale: Locale) {
  // load locale messages
  const messages = await import(
    /* @vite-ignore */ `./locales/${locale}.json`
  ).then(getResourceMessages)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages)

  return nextTick()
}

export const getCurrentLanguage = () => {
  return sessionStorage.getItem('wxm-lang') || navigator.language.toLowerCase()
}
export const getLocaleLanguage = (SUPPORT_LOCALES:MessagesType) => {
  const language = getCurrentLanguage()
  // messages.hasOwnProperty(language) 不适用
  if (Object.prototype.hasOwnProperty.call(SUPPORT_LOCALES, language)) {
    // console.log('language', language)
    return language
  }
  // 默认中文
  return 'zh-cn'
}
