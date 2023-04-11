import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSetLocale, useGetLocale } from '../composable/i18nTrans'

export const useSystemStore = defineStore('system', () => {
  // 国际化设置
  const localeI18n = useGetLocale()
  const localeSession = sessionStorage.getItem('wxm-lang') ? (sessionStorage.getItem('wxm-lang') as string) : localeI18n
  const sLang = localeSession
  const locale = ref<string>(sLang)
  const changeLocale = (language:string) => {
    locale.value = language || 'zh-cn'
    useSetLocale(locale.value)
    sessionStorage.setItem('wxm-lang', locale.value)
  }

  // Element plus 全局zIndex
  const zIndex = ref<number>(3000)
  const changeZIndex = (num:number) => {
    zIndex.value = num || 3000
  }

  // Element plus 全局size  large|default|small
  const size = ref<any>('default')
  const changeSize = (sz:any) => {
    size.value = sz || 'default'
  }

  return { size, zIndex, locale, changeLocale, changeZIndex, changeSize }
})
