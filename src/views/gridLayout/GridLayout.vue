<template>
  <div class="test">

    <el-table :data="tableData" style="width: 100%" class="test-color">
      <el-table-column prop="date" label="Date" width="180"/>
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>

    <el-button type="primary" plain class="test-btn">primary</el-button>
  </div>
</template>

<script lang="ts" setup>
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
</script>
<style scoped lang="scss">
.test-color {
  color: red;
}

// 同时添加 ！important 或者都不添加的时候，下面的两个，谁在下面，谁的被认为有效，否则以有！important为准，两个都能改变element的样式（使用的时vue中组件的class添加到组件中的根元素）
.test-btn {
  color: red;
  border-color: green !important;
}

:deep(.el-button--primary) {
  border-right-color: var(--el-color-primary-light-5) !important;
}
.test-col-color{
  color:yellow;
}
</style>
