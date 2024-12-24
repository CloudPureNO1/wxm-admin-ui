
<template>
  <!-- electrong-titlebar 实现 放入app中，便于全局使用和控制 -->
  <!-- <div v-show="!layoutStore.fullScreen" class="custom-titlebar"> 管理系统 </div> -->
  <el-config-provider :size="systemStore.size" :z-index="systemStore.zIndex" :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { computed ,inject} from 'vue'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'

  import { useSystemStore } from './stores/system'
  import { useLayoutStore } from './stores/layout'

 
  const locales:any = {
    'zh-cn': zhCn,
    'en': en
  }
  const layoutStore = useLayoutStore()
  const systemStore = useSystemStore()
  const locale = computed(() => {
    return locales[systemStore.locale]
  })

 
 


</script>

<!-- electrong-titlebar 实现 放入app中，便于全局使用和控制 -->
<style lang="css">

  html,
  body {
    margin: 0;
    /* 禁止 html,body 滚动，避免滚动条出现在标题栏右边 */
    overflow: hidden;
    height: 100%;
  }

  .root {
    /* 使用 flex 来实现 */
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: black;
    color: white;
  }

  .custom-titlebar {
    display: flex;
    align-items: center;
    /* 避免被收缩 */
    flex-shrink: 0;
    /* 高度与 main.js 中 titleBarOverlay.height 一致  */
    height: 30px;
    width: 100%;
    /* 标题栏始终在最顶层（避免后续被 Modal 之类的覆盖） */
    z-index: 9999;
    background-color: #2f3241;
    /* color:#fff; */
    padding-left: 12px;
    font-size: 14px;
    color: #fff;
  }

  .content {
    /* 内容区需要设置可滚动 */
    overflow: auto;
  }

  .custom-titlebar {
    /* ... 省略其他样式 */
    /* 避免选中窗口标题 */
    user-select: none;
    -webkit-user-select: none;
    /* 设置该属性表明这是可拖拽区域，用来移动窗口 */
    -webkit-app-region: drag;
  }
</style>
