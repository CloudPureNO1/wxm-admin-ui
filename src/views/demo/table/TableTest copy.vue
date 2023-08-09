<template>
  <div>
    <el-table :data="tableData" style="width: 100%" ref="tableTest">
      <el-table-column v-if="showCol()" type="index" label="序号"></el-table-column>
      <el-table-column v-if="showCol()" type="selection"></el-table-column>
      <el-table-column v-if="showCol('date')" prop="date" label="时间" width="180" />
      <el-table-column v-if="showCol('name')" prop="name" label="姓名" width="180" />
      <el-table-column v-if="showCol('address')" prop="address" label="地址" />
    </el-table>
    <el-button @click="handleClick">test</el-button>

    <el-table :data="colsData" style="width: 100%" @selection-change="handleSelectionChange" ref="colsTable">
      <el-table-column type="selection" width="80" />
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="label" label="列名" width="180" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'
  import type { ColType } from '../../../types/type'
  import { useBuildCols } from './table'
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

  const handleClick = () => {
    const table = tableTest.value
    console.log('>>>>>', table)

    // const label = table.$refs.tableHeaderRef.columnRows[0][0].label
    // const property = table.$refs.tableHeaderRef.columnRows[0][0].property

    // console.log(label, property)

    const cols = ref<ColType[]>([])

    const columnRows = table.$refs.tableHeaderRef.columnRows[0]
    columnRows.forEach((item: any) => {
      console.log(`${item.property}:${item.label}`)
      const d = { property: item.property, label: item.label, show: true }
      cols.value.push(d)
    })

    console.log('>>>>>>>>>>>>>', cols)
  }

  const colsData = ref<ColType[]>([])

  onMounted(async () => {
    colsData.value = await useBuildCols(tableTest)
    if (colsData.value.length !== 0) {
      colsTable.value.toggleAllSelection()
    }
  })

  const selectedCos = ref<Array<ColType>>([])
  const handleSelectionChange = (selection:Array<ColType>) => {
    selectedCos.value = selection
  }
  const showCol = (property?:string) => {
    if (!property) return true
    if (!colsData.value || colsData.value.length === 0) return true
    return selectedCos.value.some(item => item.property === property)
  }
</script>
