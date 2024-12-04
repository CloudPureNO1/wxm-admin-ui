<template>
  <div class="wxm-t-box">
    <RightButton :listColumn="listColumn" @selection-change="handleSelectionChange"/>
    <el-table :data="tableData" style="width: 100%" ref="tableTest" border stripe >
      <el-table-column v-if="showCol('index',selection,num)" type="index" label="序号" width="100"></el-table-column>
      <el-table-column v-if="showCol('selection',selection,num)" type="selection"></el-table-column>
      <el-table-column v-if="showCol('date',selection,num)" prop="date" label="时间" width="180" />
      <el-table-column v-if="showCol('name',selection,num)" prop="name" label="姓名" width="180" />
      <el-table-column v-if="showCol('address',selection,num)" prop="address" label="地址" />
    </el-table>
<el-divider />
    <RightButton :listColumn="listColumn1" @selection-change="handleSelectionChange1"/>
    <el-table :data="tableData1" style="width: 100%" ref="tableTest1" border stripe >
      <el-table-column v-if="showCol('index',selection1,num1)" type="index" label="序号1" width="100"></el-table-column>
      <el-table-column v-if="showCol('selection',selection1,num1)" type="selection"></el-table-column>
      <el-table-column v-if="showCol('date1',selection1,num1)" prop="date1" label="时间1" width="180" />
      <el-table-column v-if="showCol('name1',selection1,num1)" prop="name1" label="姓名1" width="180" />
      <el-table-column v-if="showCol('address1',selection1,num1)" prop="address1" label="地址1" />
    </el-table>
<el-divider />
    <WxmButtonSearch :listColumn="listColumn" @selection-change="handleSelectionChange"/>
    <el-divider />

    <WsmPanel title="人员基本信息" msg="总金额=医保支付金额+医疗机构支付金额" :multi-msg="multiMsg" :multi-msg-width="300">
      <template #btn>
         <WxmButtonSearch permission-prefix="demo" :listColumn="listColumn2"  align-right @toggle-condition="toggleCondition" @selection-change="handleSelectionChange2" @export="callExport"/>
      </template>

      <template v-if="showSearch" #search>
         <el-form :model="searchForm" inline :size="size" ref="searchFormRef">
          <el-form-item label="日期" prop="date">
            <el-input v-model="searchForm.date" placeholder="" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="searchForm.name" placeholder="" />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="searchForm.address" placeholder="" />
          </el-form-item>

          <el-form-item label="" prop="">
            <el-button type="primary" plain :icon="icons.Search" :size="systemStore.size" @click="handleSearch">搜索</el-button>
            <el-button type="warning" plain :icon="icons.RefreshLeft" :size="systemStore.size" @click="useReset(searchFormRef)">重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table :data="tableData2" style="width: 100%" ref="tableTest2" border stripe >
      <el-table-column v-if="showCol('index',selection2,num2)" type="index" label="序号2" width="100"></el-table-column>
      <el-table-column v-if="showCol('selection',selection2,num2)" type="selection"></el-table-column>
      <el-table-column v-if="showCol('date2',selection2,num2)" prop="date2" label="时间2" width="180" />
      <el-table-column v-if="showCol('name2',selection2,num2)" prop="name2" label="姓名2" width="180" />
      <el-table-column v-if="showCol('address2',selection2,num2)" prop="address2" label="地址2" />
    </el-table>

    </WsmPanel>

    <el-divider />

  </div>
</template>

<script lang="ts" setup>
  import WsmPanel from './WsmPanel.vue'
  import WxmButtonSearch from './WxmButtonSearch.vue'
  import RightButton from './RightButton.vue'
  import { ref, onMounted, computed } from 'vue'
  import { showCol, useBuildCols } from '../../../composable/table2'
  import type { ColType } from '../../../types/type'
  import { useReset } from '../../../composable/baseOperator'
  import { useSystemStore } from '../../../stores/system'
  import { useExportExcel } from '../../../composable/excel'
  import { useBuildExportData } from '../../../composable/baseOperator'
  type SearchType={
    date?:string,
    name?:string,
    address?:string
  }
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
  ]

  const tableData1 = [
    {
      date1: '2016-05-03',
      name1: 'Tom',
      address1: 'No. 189, Grove St, Los Angeles'
    },
    {
      date1: '2016-05-02',
      name1: 'Tom',
      address1: 'No. 189, Grove St, Los Angeles'
    },
    {
      date1: '2016-05-04',
      name1: 'Tom',
      address1: 'No. 189, Grove St, Los Angeles'
    },
    {
      date1: '2016-05-01',
      name1: 'Tom',
      address1: 'No. 189, Grove St, Los Angeles'
    }
  ]

  const tableData2 = [
    {
      date2: '2016-05-03',
      name2: 'Tom',
      address2: 'No. 189, Grove St, Los Angeles'
    },
    {
      date2: '2016-05-02',
      name2: 'Tom',
      address2: 'No. 189, Grove St, Los Angeles'
    },
    {
      date2: '2016-05-04',
      name2: 'Tom',
      address2: 'No. 189, Grove St, Los Angeles'
    },
    {
      date2: '2016-05-01',
      name2: 'Tom',
      address2: 'No. 189, Grove St, Los Angeles'
    }
  ]

  const callExport = () => {
    const exportData = useBuildExportData(listColumn2.value, tableData2, '测试用户信息', '用户数据')
    useExportExcel(exportData)
  }

  const icons = {
    Search: 'Search',
    RefreshLeft: 'RefreshLeft'
  }
  const handleSearch = () => {}
  const searchFormRef = ref()
  const searchForm = ref<SearchType>({})
  const systemStore = useSystemStore()
  const size = computed(() => {
    return systemStore.size
  })
  const multiMsg = `<div style="color:#4093ff;">
      <p>提示：</p>
      <p>支付方式：分为医保基金支付和医院支付</p>
      <p>总金额=医保基金支付金额+医院支付金额</p>
    </div>`

  const showSearch = ref<boolean>(false)
  const toggleCondition = () => {
    showSearch.value = !showSearch.value
  }

  const tableTest = ref()
  const tableTest1 = ref()
  const tableTest2 = ref()

  const listColumn = ref<ColType[]>([])
  const listColumn1 = ref<ColType[]>([])
  const listColumn2 = ref<ColType[]>([])
  onMounted(async () => {
    listColumn.value = await useBuildCols(tableTest)
    listColumn1.value = await useBuildCols(tableTest1)
    listColumn2.value = await useBuildCols(tableTest2)
  })

  const num = ref<number>(0)
  const num1 = ref<number>(0)
  const num2 = ref<number>(0)

  const selection = ref<ColType[]>([])
  const selection1 = ref<ColType[]>([])
  const selection2 = ref<ColType[]>([])
  const handleSelectionChange = (selectionCol:ColType[]) => {
    selection.value = selectionCol
    num.value += 1
    console.log('>>>>>>>>>>selection.value', selection.value)
  }
  const handleSelectionChange1 = (selectionCol:ColType[]) => {
    selection1.value = selectionCol
    num1.value += 1
    console.log('>>>>>>>>>>selection1.value', selection1.value)
  }
  const handleSelectionChange2 = (selectionCol:ColType[]) => {
    selection2.value = selectionCol
    num2.value += 1
    console.log('>>>>>>>>>>selection1.value', selection2.value)
  }
</script>

<style scoped lang="scss">
.wxm-t-box {
  padding: 0 0 10px 0;

  .search-box {
    padding: 0 0 0 8px;
    border-bottom: 1px dashed var(--el-border-color) ;
    margin-bottom: 1.5rem;
  }

  .fn-btn {
    flex: 1;
    width: 100%;

    display: flex;
    flex-direction: row;

    justify-content: space-between;

    :deep(.el-button-group .el-button--primary:first-child) {
      border-right-color: var(--el-color-primary-light-5);
    }

    :deep(.el-button-group
        .el-button--primary:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-primary-light-5);
      border-right-color: var(--el-color-primary-light-5);
    }

    :deep(.el-button-group .el-button--primary:last-child) {
      border-left-color: var(--el-color-primary-light-5);
    }

    :deep(.el-button-group .el-button--warning:first-child) {
      border-right-color: var(--el-color-warning-light-5);
    }

    :deep(.el-button-group
        .el-button--warning:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-warning-light-5);
      border-right-color: var(--el-color-warning-light-5);
    }

    :deep(.el-button-group .el-button--warning:last-child) {
      border-left-color: var(--el-color-warning-light-5);
    }

    :deep(.el-button-group .el-button--danger:first-child) {
      border-right-color: var(--el-color-danger-light-5);
    }

    :deep(.el-button-group
        .el-button--danger:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-danger-light-5);
      border-right-color: var(--el-color-danger-light-5);
    }

    :deep(.el-button-group .el-button--danger:last-child) {
      border-left-color: var(--el-color-danger-light-5);
    }

    :deep(.el-button-group .el-button--success:first-child) {
      border-right-color: var(--el-color-success-light-5);
    }

    :deep(.el-button-group
        .el-button--success:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-success-light-5);
      border-right-color: var(--el-color-success-light-5);
    }

    :deep(.el-button-group .el-button--success:last-child) {
      border-left-color: var(--el-color-success-light-5);
    }

    :deep(.el-button-group .el-button--info:first-child) {
      border-right-color: var(--el-color-info-light-5);
    }

    :deep(.el-button-group
        .el-button--info:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-info-light-5);
      border-right-color: var(--el-color-info-light-5);
    }

    :deep(.el-button-group .el-button--info:last-child) {
      border-left-color: var(--el-color-info-light-5);
    }
  }

  .right-btn {
    margin-left: 0 !important;
    border-radius: 0 !important;

    // &:first-of-type{
    //     border-right:0 !important;
    // }
    &:first-of-type {
      border-right: 1px solid var(--el-color-primary-light-5) !important;
    }

    &:not(:first-of-type) {
      //color:red !important;
      border-left: 0 !important;
    }
  }
}
</style>
