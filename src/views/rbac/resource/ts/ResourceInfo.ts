import { useLocaleMsg } from '../../../../composable/i18nTrans'

import { onMounted, ref, inject } from 'vue'
import { isEmpty } from 'lodash'
import type { FormInstance } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { ApiResultType, BaseType, ResourceType } from '../../../../types/type'
import { initDicResource } from '../../../../composable/InitDictionary'
import { useSystemStore } from '../../../../stores/system'
import { useRbacStore } from '../../../../stores/rbac'
import { usePostApi } from '../../../../composable/ApiBaseCall'
import { useAlert } from '../../../../composable/commFn'
export const systemStore = useSystemStore()
export const rbacStore = useRbacStore()

// methods start

export const init = () => {
  const resourceId = ref<string>()
  const resourceFromRef = ref<any>()
  const { loadSourceTree } = inject('SourceTreeKey') as any
  // 响应式变量
  const resourceForm = ref<ResourceType>({ resourceIcon: 'Grid' })
  // methods======
  const doEdit = async () => {
    const params = {
      transCode: '43001',
      ...resourceForm.value
    }
    const { code, data } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
    if (code !== '0') return
    resourceForm.value.resourceId = data.resourceId
    useAlert(useLocaleMsg('Common.editCompleted'))
    loadSourceTree()
  }
  const doAdd = async () => {
    const params = {
      transCode: '42001',
      ...resourceForm.value
    }
    const { code, data } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
    if (code !== '0') return
    resourceForm.value.resourceId = data.resourceId
    useAlert(useLocaleMsg('Common.addCompleted'))
    loadSourceTree()
  }
  const doDelete = async () => {
    const params = {
      transCode: '44001',
      resourceId: resourceForm.value.resourceId
    }
    const { code, data } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
    if (code !== '0') return
    resourceForm.value.resourceId = data.resourceId
    resourceFromRef.value.resetFields()
    useAlert(useLocaleMsg('Common.deleteCompleted'))
    loadSourceTree()
  }
  const handleSave = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (!valid) {
        let msg: string = useLocaleMsg('Common.formVerificationInfo')
        if (fields) {
          msg += Object.values(fields).map(item => `【${item[0].message}】`).join(',')
        }
        useAlert(msg, 'error')
        return
      }

      if (isEmpty(resourceForm.value.resourceId)) {
        doAdd()
      } else {
        doEdit()
      }
    })
  }
  const handleAdd = async (type: number) => {
    if (type === 0) {
      resourceForm.value = {
        parentId: '0',
        parentName: '根目录', // 父资源名称
        resourceId: '',
        resourceCode: '',
        resourceType: '', // 资源类型
        resourceName: '',
        resourceUrl: '',
        resourceStatus: '',
        resourceNum: 1,
        orderNum: 1,
        resourceIcon: 'Grid',
        resourceDesc: ''
      }
    }
    if (type === 1) {
      if (!resourceId.value || isEmpty(resourceId.value)) {
        useAlert(useLocaleMsg('Rbac.Resource.selectResourceFirst'), 'error')
        return
      }
      resourceForm.value.parentId = resourceForm.value.resourceId
      resourceForm.value.parentName = resourceForm.value.resourceName
      resourceForm.value.resourceId = ''
      resourceForm.value.resourceCode = ''
      resourceForm.value.resourceType = ''
      resourceForm.value.resourceName = ''
      resourceForm.value.resourceUrl = ''
      resourceForm.value.resourceStatus = ''
      resourceForm.value.resourceNum = 1
      resourceForm.value.orderNum = 1
      resourceForm.value.resourceIcon = ''
      resourceForm.value.resourceDesc = ''
    }
  }
  const handleDelete = () => {
    if (!resourceId.value || isEmpty(resourceId.value)) {
      useAlert(useLocaleMsg('Rbac.Resource.selectResourceFirst'), 'error')
      return
    }
    ElMessageBox.confirm(useLocaleMsg('Rbac.Resource.confirmDeleteResource'), useLocaleMsg('Common.tip'), {
      type: 'warning',
      confirmButtonText: useLocaleMsg('Common.ok'),
      cancelButtonText: useLocaleMsg('Common.cancel')
    }).then(() => {
      doDelete()
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: useLocaleMsg('Common.deleteCanceled')
      })
    })
  }
  const setIcon = (icon: string) => {
    resourceForm.value.resourceIcon = icon
  }
  const handleSearch = async (id: string) => {
    resourceId.value = id
    const params: BaseType<string> = {
      transCode: '41004',
      resourceId: resourceId.value
    }
    const { code, data } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
    if (code !== '0') return
    resourceForm.value = data as ResourceType
  }

  onMounted(() => {
    initDicResource()
  })

  return { resourceForm, resourceFromRef, handleAdd, handleDelete, handleSave, setIcon, handleSearch }
}
// methods end

