import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import screenfull from 'screenfull'
import { isDark } from '../composable/dark'
import { MenuColors as colors } from '../comm/Data'

export const useLayoutStore = defineStore('layoutStore', () => {
  const collapse = ref<boolean>(false)
  const fullScreen = ref<boolean>(false)
  const showTags = ref<boolean>(true)// 是否显示标签栏
  const mode = ref<any>('vertical') // horizontal / vertical   菜单模式
  const layoutMode = ref<string>('aside-main') // aside-main / header-main   菜单模式  左右  、上下  默认上下
  const keepAliveList = ref<string[]>([])
  const menuBgColor = ref<string>('') // 默认透明与不设置一致  #2c3e50

  // getters
  const isVertical = computed(() => {
    return mode.value === 'vertical'
  })

  const isHeaderMain = computed(() => {
    return layoutMode.value === 'header-main'
  })
  const getMenuBgColor = computed(() => {
    if (isDark.value) {
      menuBgColor.value = ''
    }
    if (mode.value === 'horizontal') {
      menuBgColor.value = ''
    }
    if (!menuBgColor.value || !menuBgColor.value || menuBgColor.value === '' || menuBgColor.value === 'default') {
      menuBgColor.value = ''
    }
    return menuBgColor.value
  })

  const getMenuTextColor = computed(() => {
    if (mode.value === 'horizontal') {
      return ''
    }
    const color = colors.find(color => color.menuBgColor === menuBgColor.value)
    if (color) {
      return color.menuTextColor
    }
    return ''
  })

  const getMenuActiveTextColor = computed(() => {
    if (mode.value === 'horizontal') {
      return ''
    }
    const color = colors.find(color => color.menuBgColor === menuBgColor.value)
    if (color) {
      return color.menuActiveTextColor
    }
    return ''
  })

  // actions

  const toggleCollapse = () => {
    collapse.value = !collapse.value
  }
  const addKeepAliveList = (name:string) => {
    const isExists = keepAliveList.value.some(item => item === name)
    if (!isExists) keepAliveList.value.push(name)
  }
  const changeMode = (md:string) => {
    mode.value = md || 'vertical'
  }
  const toggleShowTags = () => {
    showTags.value = !showTags.value
  }
  const changeLayout = (layoutMd:string) => {
    changeMode('vertical')
    layoutMode.value = layoutMd || 'header-main'
  }

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
      fullScreen.value = !screenfull.isFullscreen
    } else {
      console.log('>>>>>当前浏览器不支持全屏>>>>')
    }
  }
  const changeMenuBgColor = (bgColor:string) => {
    menuBgColor.value = bgColor
  }

  return {
    collapse, fullScreen, showTags, mode, layoutMode, keepAliveList, menuBgColor,
    isVertical, isHeaderMain, getMenuBgColor, getMenuTextColor, getMenuActiveTextColor,
    toggleCollapse, addKeepAliveList, toggleShowTags, changeMode, changeLayout, toggleFullScreen, changeMenuBgColor

  }
})
