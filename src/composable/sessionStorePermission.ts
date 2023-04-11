import { usePostTo } from './HttpApi'
import type { ResultType } from '../types/type'
import { useAlert } from './commFn'

export const useInitSetPermission = async () => {
  const { res, err } = await usePostTo('/gateway/rbac/51004', { transCode: '51004' }) as ResultType
  if (err) {
    // throw new Error(err||res.message)
    useAlert(err.message || err, 'error')
    // return false
    return { name: 'Login' }
  }
  if (res.code !== '0') {
    useAlert(res.message, 'error')
    // return false
    return { name: 'Login' }
  }
  sessionStorage.setItem('permission', JSON.stringify(res.data.list))
}

export const useResetPermission = async () => {
  const { res, err } = await usePostTo('/gateway/rbac/51004', { transCode: '51004' }) as ResultType
  if (err) {
    useAlert(err.message || err, 'error')
  } else if (res.code !== '0') {
    useAlert(res.message, 'error')
  } else {
    sessionStorage.setItem('permission', JSON.stringify(res.data.list))
  }
}
