
<template>
   <el-config-provider :size="systemStore.size" :z-index="systemStore.zIndex" :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { computed } from 'vue'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'

  import { useSystemStore } from './stores/system'

  const locales:any = {
    'zh-cn': zhCn,
    'en': en
  }
  const systemStore = useSystemStore()
  const locale = computed(() => {
    return locales[systemStore.locale]
  })
</script>
