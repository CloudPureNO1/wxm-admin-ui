<template>

  <el-menu :default-active="$route.path" :class="{'wxm-menu':layoutStore.isVertical}"
    :collapse="layoutStore.collapse" :mode="layoutStore.mode" @select="handleSelect"
    :background-color="layoutStore.getMenuBgColor" :text-color="layoutStore.getMenuTextColor" :active-text-color="layoutStore.getMenuActiveTextColor">
    <el-menu-item v-if="layoutStore.isVertical&&!layoutStore.isHeaderMain" index="/about" class="title">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <template #title>
        <span>{{$t('SYSTEM_NAME')}}</span>
      </template>
    </el-menu-item>
    <!--采用flex 的样式，是后面的菜单居右 -->
    <div class="flex-grow"></div>
    <!-- 不能采用批量注册组件模式，否则不能动态调用 ,为了实现最外层，也可以动态变动加载，此处不能采用直接递归的方式，在内部使用递归-->
    <!-- <nav-menu-item :menuData="menuObj.menuData" /> -->

    <template v-for="item in menuObj.menuData" :key="item.nodeId">
      <el-menu-item v-if="item.isLeaf" :index="item.url">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <template #title>
          <!---前端国际化，定义时使用，但是正式的时存储在数据库的，不采用这种，采用取数据库中的中文或英文-->
          <!-- <span>{{ $t(item.title) }}</span> -->
          <span>{{ getLocaleTitle(item) }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu :index="'node'+item.nodeId">
        <template #title>
          <!-- sub-menu 的图标一定要在title中，子图标应该放在title外 -->
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
                    <!---前端国际化，定义时使用，但是正式的时存储在数据库的，不采用这种，采用取数据库中的中文或英文-->
          <!-- <span>{{ $t(item.title) }}</span> -->
          <span>{{ getLocaleTitle(item) }}</span>
        </template>
        <!-- 递归调用自身 调用的是组件的 name    -->
        <span v-if="hasChild(item)">
          <wxm-menu-item :menu-data="item.children" />
        </span>
      </el-sub-menu>
    </template>

  </el-menu>
</template>

<script lang="ts" setup>
  import type { ResultType } from '../../types/type'
  import { onMounted, reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { useSystemStore } from '../../stores/system'
  import { useLayoutStore } from '../../stores/layout'
  import { usePostTo } from '../../composable/HttpApi'
  import { useAlert } from '../../composable/commFn'

  interface ItemData {
    nodeId: '';
    title: '';
    titleEn:'';
    isLeaf: '';
    icon: '';
    url: '';
    parentId: '';
    children: [];
  }
  interface Menu {
    [menuData: string]: ItemData[]
  }
  const menuObj: Menu = reactive<Menu>({})

  const route = useRoute()
  const router = useRouter()

  const systemStore = useSystemStore()
  const layoutStore = useLayoutStore()

  const getLocaleTitle = (item:ItemData) => {
    return systemStore.locale === 'zh-cn' ? item.title : item.titleEn
  }

  const loadNavData = async () => {
    const params = { transCode: '41006' }

    const { res, err } = await usePostTo(`/gateway/rbac/${params.transCode}`, params) as ResultType
    if (err || res.code !== '0') {
      useAlert(err ? err.message || err : res.message, 'error')
      return false
    }
    menuObj.menuData = res.data.list
  }

  onMounted(() => {
    loadNavData()
  })

  const src = ref<string>('') // 或者  const srt=ref<string>('')
  const getImageUrl = (path: string) => {
    return new URL(path, import.meta.url).href
  }
  src.value = getImageUrl('../../assets/img/8.gif')

  const handleSelect = (index: string, indexPath: String[]) => {
    handleUrl(index)
    console.log('菜单选择', index, indexPath)
  }
  const handleUrl = (url: string) => {
    if (url === route.path) return false
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank')
    } else {
      router.push(url)
    }
  }

  const hasChild = (item: ItemData) => {
    return item.children && item.children.length !== 0
  }
</script>

<style scoped lang="scss">
.wxm-menu {
  &:not(.el-menu--collapse) {
    width: 250px;
    // min-height: 400px;
  }

  :deep(.el-menu-item.is-disabled) {
    opacity: 1;
  }

  :deep(.el-menu-item ){

    display: flex;
    align-items: center;
    // height: var(--el-menu-item-height);
    // line-height: var(--el-menu-item-height);
    line-height: 1;
    font-size: var(--el-menu-item-font-size);
    color: var(--el-menu-text-color);
    padding: 0 var(--el-menu-base-level-padding);
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color var(--el-transition-duration),background-color var(--el-transition-duration),color var(--el-transition-duration);
    box-sizing: border-box;
    white-space: nowrap;

  }

  :deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
    height: var(--el-menu-item-height);
    //  line-height: var(--el-menu-item-height);
     line-height: 1 !important;
    font-size: var(--el-menu-item-font-size);
    color: var(--el-menu-text-color);
    padding: 0 var(--el-menu-base-level-padding);
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color var(--el-transition-duration),background-color var(--el-transition-duration),color var(--el-transition-duration);
    box-sizing: border-box;
    white-space: nowrap;
    padding-right: calc(var(--el-menu-base-level-padding) + var(--el-menu-icon-width));
}

  .title {
    font-weight: 700;
  }
}

/**菜单居右 */
.flex-grow {
  flex-grow: 1;
}
</style>
