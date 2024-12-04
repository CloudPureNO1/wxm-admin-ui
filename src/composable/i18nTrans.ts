/**
 * 单独js/ts使用
 *
 * Tips:
 * setup 中使用(main.ts 中已经全局引入)
 * import { useI18n } from 'vue-i18n'
 * const i18n = useI18n()
 * const {t}=useI18n()
 *
 * 标签 ： $t('键')
 */
import i18n from '../i18n/index'
import { isComposer, setLocale, getLocale } from './i18n'

import { firstLetter2lowercase } from './stringConversion'

export const useLocaleMsg = (key:string) => {
  /**
     * This expression is not callable.
  Each member of the union type 'ComposerTranslation<{}, string, RemoveIndexSignature<{ [x: string]: LocaleMessageValue<VueMessageType>; }>, never, never, never> | VueI18nTranslation<...>' has signatures, but none of those signatures are compatible with each other.ts(2349)
     */
  // i18n.global.t(key)
  if (isComposer(i18n.global, i18n.mode)) {
    return i18n.global.t(key)
  } else {
    return i18n.global.t(key)
  }
}

export const useSetLocale = (locale:string) => {
  setLocale(i18n, locale)
}

export const useGetLocale = () => {
  return getLocale(i18n)
}
/**
   * i18n翻译,
   * html 中直接可以使用：$t(),js 中使用 t()
   * @param msg
   * @returns
   */
export const useLocaleNotEmpty = (msg:string) => {
  return `${useLocaleMsg(msg)} ${useLocaleMsg('Common.cannotBeEmpty')}`
}
/**
   * i18n翻译,
   * html 中直接可以使用：$t(),js 中使用 t()
   * @param msg
   * @returns
   */
export const useLocalePleaseEnter = (msg:string) => {
  return `${useLocaleMsg('Common.pleaseEnter')} ${firstLetter2lowercase(useLocaleMsg(msg))}`
}
/**
   * i18n翻译,
   * html 中直接可以使用：$t(),js 中使用 t()
   * @param msg
   * @returns
   */
export const useLocalePleaseSelect = (msg:string) => {
  return `${useLocaleMsg('Common.pleaseSelect')} ${firstLetter2lowercase(useLocaleMsg(msg))}`
}
