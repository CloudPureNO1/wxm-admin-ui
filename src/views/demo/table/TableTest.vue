<template>
  <el-table :data="tableData" style="width: 100%" ref="tableTest">
    <el-table-column prop="date" label="时间" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
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
  onMounted(() => {
    const table = tableTest.value
    debugger
    console.log('>>>>>', table)
  })
</script>
