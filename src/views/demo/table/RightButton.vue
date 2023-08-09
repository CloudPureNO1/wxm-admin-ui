<template>
  <div class="wxm-right-button">
    <div class="fn-btn__right">
      <el-button type="primary" plain :icon="icons.Search" size="default" @click="toggleCondition" class="right-btn" />
      <el-button type="primary" plain :icon="icons.Refresh" size="default" @click="refresh" class="right-btn" />
      <el-popover placement="bottom-start" trigger="hover" width="300">
        <el-table :data="props.listColumn" style="width: 100%" @selection-change="handleSelectionChange" ref="tableColRef">
          <el-table-column type="selection" width="80" />
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="label" label="列名" width="180" />
        </el-table>
        <template #reference>
          <el-button type="primary" plain :icon="icons.Menu" size="default" class="right-btn" />
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'

  const icons = {
    Search: 'Search',
    Refresh: 'Refresh',
    Grid: 'Grid',
    Menu: 'Menu'
  }
  type ColType = {
    property: string;
    label: string;
  };
  const props = defineProps<{
    listColumn: ColType[];
  }>()

  const emit = defineEmits(['selectionChange', 'toggleCondition', 'refresh'])

  const handleSelectionChange = (selection:ColType[]) => {
    emit('selectionChange', selection)
  }
  const toggleCondition = () => {
    emit('toggleCondition')
  }
  const refresh = () => {
    emit('refresh')
  }

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
</script>

<style scoped lang="scss">
.wxm-right-button {
  padding: 0 0 10px 0;

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
