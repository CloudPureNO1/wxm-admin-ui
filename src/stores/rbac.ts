import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DictType } from '../types/type'

export const useRbacStore = defineStore('rbac', () => {
  // 国际化设置
  // state
  const userTypeDicts = ref<Array<DictType>>([])
  const userRateDicts = ref<Array<DictType>>([])
  const userStatusDicts = ref<Array<DictType>>([])

  /** 用户组 */
  const groupTypeDicts = ref<Array<DictType>>([])
  const groupStatusDicts = ref<Array<DictType>>([])
  /** 角色 */
  const roleTypeDicts = ref<Array<DictType>>([])
  const roleStatusDicts = ref<Array<DictType>>([])
  /** 资源 */
  const resourceTypeDicts = ref<Array<DictType>>([])
  const resourceStatusDicts = ref<Array<DictType>>([])
  /** 权限 */
  const permissionTypeDicts = ref<Array<DictType>>([])
  const permissionStatusDicts = ref<Array<DictType>>([])
  /** 接口 */
  const apiStatusDicts = ref<Array<DictType>>([])
  /** 定时任务 */
  const triggerStateDicts = ref<Array<DictType>>([])

  // actions
  const changeUserTypeDicts = (userTypes: DictType[]) => {
    userTypeDicts.value = userTypes
  }
  const changeUserRateDicts = (userRates: DictType[]) => {
    userRateDicts.value = userRates
  }
  const changeUserStatusDicts = (userStatus: DictType[]) => {
    userStatusDicts.value = userStatus
  }

  /** 用户组 */
  const changeGroupTypeDicts = (groupTypes: Array<DictType>) => {
    groupTypeDicts.value = groupTypes
  }
  const changeGroupStatusDicts = (groupStatus: Array<DictType>) => {
    groupStatusDicts.value = groupStatus
  }
  /** 角色 */
  const changeRoleTypeDicts = (roleTypes: Array<DictType>) => {
    roleTypeDicts.value = roleTypes
  }
  const changeRoleStatusDicts = (roleStatus: Array<DictType>) => {
    roleStatusDicts.value = roleStatus
  }
  /** 资源 */
  const changeResourceTypeDicts = (resourceTypes: Array<DictType>) => {
    resourceTypeDicts.value = resourceTypes
  }
  const changeResourceStatusDicts = (resourceStatus: Array<DictType>) => {
    resourceStatusDicts.value = resourceStatus
  }
  /** 权限 */
  const changePermissionTypeDicts = (permissionTyps: Array<DictType>) => {
    permissionTypeDicts.value = permissionTyps
  }
  const changePermissionStatusDicts = (permissionStatus: Array<DictType>) => {
    permissionStatusDicts.value = permissionStatus
  }
  /** 接口 */
  const changeApiStatusDicts = (apiStatus: Array<DictType>) => {
    apiStatusDicts.value = apiStatus
  }
  /** 定时任务 */
  const changeTriggerStateDicts = (triggerStates: Array<DictType>) => {
    triggerStateDicts.value = triggerStates
  }

  return {
    userTypeDicts, userRateDicts, userStatusDicts,
    groupTypeDicts, groupStatusDicts,
    roleTypeDicts, roleStatusDicts,
    resourceTypeDicts, resourceStatusDicts,
    permissionTypeDicts, permissionStatusDicts,
    apiStatusDicts, triggerStateDicts,
    changeUserTypeDicts, changeUserRateDicts, changeUserStatusDicts,
    changeGroupTypeDicts, changeGroupStatusDicts,
    changeRoleTypeDicts, changeRoleStatusDicts,
    changeResourceTypeDicts, changeResourceStatusDicts,
    changePermissionTypeDicts, changePermissionStatusDicts,
    changeApiStatusDicts, changeTriggerStateDicts
  }
})
