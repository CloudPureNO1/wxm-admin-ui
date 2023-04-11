import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DictType } from '../types/type'

export const useBizStore = defineStore('bizStore', () => {
  const statusDicts = ref<DictType[]>([])
  const changeStatusDicts = (statusDts: DictType[]) => {
    statusDicts.value = statusDts
  }
  return {
    statusDicts, changeStatusDicts
  }
})
