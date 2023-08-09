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

    <RightButton :listColumn="listColumn1" @selection-change="handleSelectionChange1"/>
    <el-table :data="tableData1" style="width: 100%" ref="tableTest1" border stripe >
      <el-table-column v-if="showCol('index',selection1,num1)" type="index" label="序号1" width="100"></el-table-column>
      <el-table-column v-if="showCol('selection',selection1,num1)" type="selection"></el-table-column>
      <el-table-column v-if="showCol('date1',selection1,num1)" prop="date1" label="时间1" width="180" />
      <el-table-column v-if="showCol('name1',selection1,num1)" prop="name1" label="姓名1" width="180" />
      <el-table-column v-if="showCol('address1',selection1,num1)" prop="address1" label="地址1" />
    </el-table>

    <WxmButtonSearch :listColumn="listColumn" @selection-change="handleSelectionChange"/>
  </div>
</template>

<script lang="ts" setup>
  import WxmButtonSearch from './WxmButtonSearch.vue'
  import RightButton from './RightButton.vue'
  import { ref, onMounted } from 'vue'
  import { showCol, useBuildCols } from '../../../composable/table2'
  import type { ColType } from '../../../types/type'
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

  const tableTest = ref()
  const tableTest1 = ref()

  const listColumn = ref<ColType[]>([])
  const listColumn1 = ref<ColType[]>([])
  onMounted(async () => {
    listColumn.value = await useBuildCols(tableTest)
    listColumn1.value = await useBuildCols(tableTest1)
  })

  const num = ref<number>(0)
  const num1 = ref<number>(0)

  const selection = ref<ColType[]>([])
  const selection1 = ref<ColType[]>([])
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
