import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DictType } from '../types/type'

export const useOthersStore = defineStore('otherStore', () => {
  const statusDicts = ref<DictType[]>([])
  const changeStatusDicts = (statusDts: DictType[]) => {
    statusDicts.value = statusDts
  }
  return {
    statusDicts, changeStatusDicts
  }
})
