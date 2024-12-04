<template>
    <div class="wxm-button-search">
        <div v-if="showSearchBox" class="search-box">
            <slot name="search"></slot>
        </div>
        <div class="button-box" :class="[props.alignRight?'flex-end':'space-between']">
            <div class="button__left">
                <el-button v-permission="buildPermission('add')" v-click-interval type="primary" :plain="plain" :icon="Plus" :size="systemStore.size" @click="callAdd" >新增</el-button>
                <el-button v-permission="buildPermission('delete','deleteBatch')" v-click-interval type="danger" :plain="props.plain" :icon="Delete" :size="size" @click="callDelete">删除</el-button>
                <el-button v-permission="buildPermission('export','exportAll')" v-click-interval type="success" :plain="props.plain" :icon="Download" :size="size" @click="callExport">导出</el-button>
                <el-button v-permission="buildPermission('exportAll')" v-click-interval type="success" :plain="props.plain" :icon="Download" :size="size" @click="callExportAll">导出全部</el-button>
                <el-button v-permission="buildPermission('print')" v-click-interval type="success" :plain="props.plain" :icon="Printer" :size="size" @click="callPrint">打印</el-button>
                <slot name="btn"></slot>
            </div>
            <div class="button__right">
                <el-button v-if="props.showSearch" :type="props.typeRight" :plain="props.plain" :icon="Search" :size="size" @click="callToggleCondition" class="right-btn" />
                <el-button v-if="props.showRefresh" :type="props.typeRight" :plain="props.plain" :icon="Refresh" :size="size" @click="callRefresh" class="right-btn" />
                <el-popover placement="bottom-start" trigger="hover" width="300">
                    <el-table :data="props.listColumn" style="width: 100%" @selection-change="callSelectionChange" ref="tableColRef">
                        <el-table-column type="selection" width="80" />
                        <el-table-column type="index" label="序号" width="80" />
                        <el-table-column prop="label" label="列名" width="180" />
                    </el-table>
                    <template #reference>
                    <el-button v-if="props.showGrid" :type="props.typeRight" :plain="props.plain" :icon="Menu" :size="size" class="right-btn" />
                    </template>
                </el-popover>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, watch } from 'vue'
  import { isEmpty } from 'lodash'
  import { useSystemStore } from '../../../stores/system'

  import { Plus, Delete, Download, Printer, Refresh, Search, Menu } from '@element-plus/icons-vue'

  type ColType = {
    prop: string;
    label: string;
  };

  /** 基本按钮的入参类型 */
  type BaseBtnType = {
    permissionPrefix?: string;
    plain?: boolean;
    typeRight?: any;

    // 左边的功能按钮，是否居右
    alignRight: boolean,

    showSearch?: boolean;
    showRefresh?: boolean;
    showGrid?: boolean;
    elementId?: any; // 打印的内容的根元素
    targetId?: any; // 打印的内容显示在哪里
    listColumn?: ColType[];
  };
  // vue 单文件，不支持从其他文件中引入type 等
  const props = withDefaults(defineProps<BaseBtnType>(), {
    permissionPrefix: undefined,
    plain: true,
    typeRight: 'primary',

    // 左边的功能按钮，是否居右
    alignRight: false,

    showSearch: true,
    showRefresh: true,
    showGrid: true,
    elementId: undefined,
    targetId: undefined,
    listColumn: () => []
  })

  const emits = defineEmits(['add', 'edit', 'delete', 'print', 'export', 'exportAll', 'selectionChange', 'toggleCondition', 'refresh'])

  const showSearchBox = ref<boolean>(false)
  const systemStore = useSystemStore()

  const size = computed(() => {
    return systemStore.size
  })

  const tableColRef = ref()
  onMounted(() => {
    tableColRef.value.toggleAllSelection()
  })
  watch(
    () => props.listColumn,
    (newVal) => {
      console.log('>>>>>>>>>>>old,new', props.listColumn, newVal)
      tableColRef.value.toggleAllSelection()
    })

  // 方法 ===================start=====================
  const buildPermission = (...types:string[]) => {
    if (!props.permissionPrefix) {
      return ['ALL']
    }
    if (isEmpty(props.permissionPrefix)) {
      return types
    }
    const permissions:Array<string> = []
    types.forEach((type:string) => {
      permissions.push(`${props.permissionPrefix}:${type}`)
    })
    return permissions
  }

  const callAdd = () => {
    emits('add')
  }
  const callDelete = () => {
    emits('delete')
  }
  const callExport = () => {
    emits('export')
  }
  const callExportAll = () => {
    emits('exportAll')
  }
  const callPrint = () => {
    emits('print')
  }
  const callSelectionChange = (selection:ColType[]) => {
    emits('selectionChange', selection)
  }
  const callToggleCondition = () => {
    emits('toggleCondition')
  }
  const callRefresh = () => {
    emits('refresh')
  }
</script>

<style scoped lang="scss">
@import './WxmButtonSearch.scss';
</style>
