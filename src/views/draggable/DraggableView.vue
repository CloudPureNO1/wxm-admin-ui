<template>
  <div class="draggable-index">
    <el-row>
      <el-col :span="3">
        <div class="left-board">
          <draggable class="list-group" :list="listBtn" :group="{ name: 'main', pull: 'clone', put: false }" itemKey="name">
            <template #item="{ element, index }">
              <div class="list-group-item"><button-drag /></div>
            </template>
          </draggable>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="main-board">
           <draggable class="list-group" :list="listBtn2" group="main" itemKey="name" :sort="false">
            <template #item="{ element, index }">
              <span>{{index}}-<button-drag/></span>
            </template>
          </draggable>
          <hr/>
          <p>{{ listBtn }}</p>
          <p>{{ listBtn2 }}</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="right-board">

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import draggable from 'vuedraggable'
  type ButtonDrag = {
    name?: string,
    type?: string,
    plain?: boolean
    icon?: string
  }
  const listBtn = ref<ButtonDrag[]>([{
    name: '按钮',
    type: 'primary',
    plain: true
  }])
  const listBtn2 = ref<ButtonDrag[]>([])
</script>

<style scoped lang="scss">
// 嵌套的样式不生效
// @import url(./css/DraggableView.scss);
@import './css/DraggableView.scss';
</style>
