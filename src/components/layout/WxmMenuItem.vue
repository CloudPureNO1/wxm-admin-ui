<template>
  <template v-for="item in menuData" :key="item.nodeId">
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
    <el-sub-menu v-else :index="'node'+item.nodeId">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <template #title>
          <!---前端国际化，定义时使用，但是正式的时存储在数据库的，不采用这种，采用取数据库中的中文或英文-->
          <!-- <span>{{ $t(item.title) }}</span> -->
          <span>{{ getLocaleTitle(item) }}</span>
      </template>
      <!--递归调用自身 调用的是组件的 name  -->
      <span v-if="hasChild(item)">
        <wxm-menu-item :menuData="item.children" />
      </span>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts" name="WxmMenuItem">
  import { useSystemStore } from '../../stores/system'
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
  interface Props {
    menuData: ItemData[];
  }
  defineProps<Props>()

  // 是否有子菜单
  const hasChild = (item: ItemData) => {
    return item.children && item.children.length !== 0
  }

  const systemStore = useSystemStore()
  const getLocaleTitle = (item:ItemData) => {
    return systemStore.locale === 'zh-cn' ? item.title : item.titleEn
  }
</script>
