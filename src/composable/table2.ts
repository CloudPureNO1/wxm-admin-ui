import { nextTick, ref } from 'vue'
import type { ColType } from '../types/type'
import { isEmpty } from 'lodash'

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
    if (item.type && (item.type === 'index' || item.type === 'selection' || item.type === 'expand')) {
      const property = item.property && !isEmpty(item.property) ? item.property : item.type
      const label = item.label && !isEmpty(item.label) ? item.label : (item.type === 'index' ? '序号' : (item.type === 'selection' ? '选择框' : '展开/隐藏'))
      cols.value.push({ prop: property, label: label })
    } else {
      cols.value.push({ prop: item.property, label: item.label })
    }
  })
  return cols.value
}

/**
 * 数据表格中用于判断是否显示的方法
 * @param property
 * @returns
 */
export const showCol = (prop?:string, selection?:Array<ColType>, num?:number) => {
  if (!prop) return true
  if ((!selection || selection.length === 0) && (!num || num < 1)) return true
  return selection?.some(item => item.prop === prop)
}

