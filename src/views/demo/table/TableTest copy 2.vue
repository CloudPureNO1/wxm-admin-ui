<template>
  <div class="wxm-t-box">
    <el-table :data="tableData" style="width: 100%" ref="tableTest" border stripe >
      <el-table-column v-if="showCol()" type="index" label="序号" width="100"></el-table-column>
      <el-table-column v-if="showCol()" type="selection"></el-table-column>
      <el-table-column v-if="showCol('date')" prop="date" label="时间" width="180" />
      <el-table-column v-if="showCol('name')" prop="name" label="姓名" width="180" />
      <el-table-column v-if="showCol('address')" prop="address" label="地址" />
    </el-table>

    <div class="fn-btn__right">
      <el-button type="primary" plain :icon="icons.Search"  size="default" @click="callToggleShowCondition" class="right-btn" />
      <el-button  type="primary" plain :icon="icons.Refresh" size="default" @click="callReLoad" class="right-btn" />
      <el-popover placement="bottom-start" trigger="hover" width="300">
        <el-table :data="colsData" style="width: 100%" @selection-change="useSetSelectedCols" ref="colsTable">
          <el-table-column type="selection" width="80" />
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="label" label="列名" width="180" />
        </el-table>
        <template #reference>
          <el-button  type="primary" plain :icon="icons.Menu" size="default" class="right-btn" />
        </template>
      </el-popover>
      <!-- <el-button-group>
                    <el-button v-if="props.showSearch" :type="props.typeRight" :plain="props.plain" :icon="Search" @click="toggleSearch"/>
                    <el-button v-if="props.showRefresh" :type="props.typeRight" :plain="props.plain" :icon="Refresh" @click="callReLoad"/>
                    <el-button v-if="props.showGrid" :type="props.typeRight" :plain="props.plain" :icon="Grid" @click="handleGrid"/>
                </el-button-group> -->

    </div>

  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useSetSelectedCols, showCol, colsData, useSetCols } from '../../../composable/table'
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

  const tableTest = ref()
  const colsTable = ref()

  useSetCols(tableTest, colsTable)

  const icons = {
    Search: 'Search',
    Refresh: 'Refresh',
    Grid: 'Grid',
    Menu: 'Menu'
  }

  const callToggleShowCondition = () => {}
  const callReLoad = () => {}
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
