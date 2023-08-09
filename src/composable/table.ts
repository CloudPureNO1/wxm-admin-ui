import { nextTick, ref, onMounted } from 'vue'
import type { ColType } from '../types/type'

/**
 * 获取数据表格的列信息{label:'',property:''}
 * @param tableRef
 * @returns
 */
export const useBuildCols = async (tableRef:any) => {
  await nextTick()
  const cols = ref<ColType[]>([])

  const columnRows = tableRef.value.$refs.tableHeaderRef.columnRows[0]
  columnRows.forEach((item:any) => {
    if (item.property && item.label) {
      cols.value.push({ property: item.property, label: item.label })
    }
  })
  return cols.value
}

/** 选择的列 （显示/隐藏的表格，是由数据表中的列组成的数据）*/
export const selectedCols = ref<Array<ColType>>([])

/**
 * 选择发生改变时的触发方法，用于设置选择的列
 * @param selection
 */
export const useSetSelectedCols = (selection:Array<ColType>) => {
  selectedCols.value = selection
}

/**
 * 数据表格中用于判断是否显示的方法
 * @param property
 * @returns
 */
export const showCol = (property?:string) => {
  if (!property) return true
  if (!colsData.value || colsData.value.length === 0) return true
  return selectedCols.value.some(item => item.property === property)
}

/**
 * 列数据
 */
export const colsData = ref<ColType[]>([])
/**
 * 设置列数据，并设置为全部选中
 * @param dataTable
 * @param colTable
 */
export const useSetCols = (dataTable:any, colTable:any) => {
  onMounted(async () => {
    colsData.value = await useBuildCols(dataTable)
    if (colTable.value.length !== 0) {
      colTable.value.toggleAllSelection()
    }
  })
}

