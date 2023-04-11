import { isEmpty } from 'lodash'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// 默认使用的全局地址时/api 代理到系统http://localhost:9701/wxmApi
// import AxiosUtil from '../../../../util/axios/axios-util'
import axios from 'axios'
// import qs from 'qs'
interface ServerType {
    onlineNum:number,
    onLineUserList:string[],
    userList:string[],
    msg:string,
    optionList:string []
}

export const init = () => {
  // vuejs 官网：不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。
//   const serverData = reactive<ServerType>({
//     onlineNum: 0
//   })
  const serverData:ServerType = reactive({
    onlineNum: 0,
    onLineUserList: [],
    userList: [],
    msg: '',
    optionList: []
  })

  const sendMsg = () => {
    if (serverData.userList.length === 0) {
      serverData.optionList.push('系统提示:请在多选框中选择要发送的用户')
      ElMessage({
        type: 'error',
        message: '请先选择人员'
      })
      return false
    }
    if (isEmpty(serverData.msg)) {
      serverData.optionList.push('系统提示:请先输入要发送的内容')
      ElMessage({
        type: 'error',
        message: '请先输入要发送的内容'
      })
      return false
    }

    const config = {
      baseURL: '/socket',
      headers: {
        'Content-type': 'application/json' // 传入的时base64编码串 多 双引号，表格模式多等号
      }
    }

    const params = {
      msg: serverData.msg,
      userList: serverData.userList
    }
    // /websocket/api 代理到http://localhost:9701/wxmPush
    axios.post('/sendMsg', JSON.stringify(params), config).then((resp:any) => {
      console.log('send', resp)
      serverData.optionList.push(`服务器推送信息【${serverData.msg}】给所有用户【${serverData.userList.join(',')}】`)
    }).catch((err:any) => {
      console.error(err)
      ElMessage({
        type: 'error',
        message: `信息发送失败:${err.ElMessage | err}`
      })
    })
  }
  const sendAll = () => {
    if (isEmpty(serverData.msg)) {
      serverData.optionList.push('系统提示:请先输入要发送的内容')
      ElMessage({
        type: 'error',
        message: '请先输入要发送的内容'
      })
      return false
    }
    const config = {
      baseURL: '/socket',
      headers: {
        // 'Content-type': 'application/json' 传入的时base64编码串 多 双引号，表格模式多等号
        'Content-type': 'text/plain'
      }
    }

    const formData = new FormData()
    formData.set('msg', serverData.msg)
    // /websocket/api 代理到http://localhost:9701/wxmPush
    axios.post('/sendAll', formData, config).then((resp:any) => {
      console.log('sendAll', resp)
      serverData.optionList.push(`服务器推送信息【${serverData.msg}】给所有用户`)
    }).catch((err:any) => {
      console.error(err)
      ElMessage({
        type: 'error',
        message: `信息发送失败:${err.ElMessage | err}`
      })
    })
  }
  const ws = ref<any>(null)
  const connect = () => {
    if ('WebSocket' in window) {
      ws.value = new WebSocket(`ws://192.168.179.137:1322/wxmPush/socketServer/wxm`)
    } else if ('MozWebSocket' in window) {
      // ws.value = new MozWebSocket(`ws://192.168.179.137:1322/wxmPush/socketServer/${userData1.username}`)
      ws.value = new WebSocket(`ws://192.168.179.137:1322/wxmPush/socketServer/wxm`)
    } else {
      ElMessage({
        type: 'error',
        message: '该浏览器不支持websocket'
      })
      return false
    }
    ws.value.onmessage = (evt:any) => {
      serverData.optionList.push(evt.data)
    }

    ws.value.onopen = (evt:any) => {
      console.log('>>>>服务器初始化成功...', evt)
      serverData.optionList.push('服务器初始化成功...')
      loadOnlineUserList()
    }

    ws.value.onclose = (evt:any) => {
      console.log('>>>>服务端：关闭连接成功', evt)
      serverData.optionList.push(`服务端：关闭连接成功`)
    }
  }

  const loadOnlineUserList = () => {
    const config = {
      baseURL: '/socket',
      url: '/admin',
      method: 'post'
    }
    // /websocket/api 代理到http://localhost:9701/wxmPush
    axios(config).then((resp:any) => {
      console.log(resp)
      serverData.onlineNum = resp.data.onlineNum
      serverData.onLineUserList = resp.data.onLineUserList
    }).catch((err:any) => {
      console.error(err)
      ElMessage({
        type: 'error',
        message: `信息发送失败:${err.ElMessage | err}`
      })
    })
  }

  onMounted(() => {
    connect()
    // loadOnlineUserList()
  })

  return { serverData, sendMsg, sendAll, loadOnlineUserList }
}
