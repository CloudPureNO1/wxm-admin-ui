<template>
    <div class="notice-recive-test">
        <el-card>
             <!-- html 识别\n 换行，推荐使用css white-space:pre-wrap; -->
            <div  v-html="data" style="white-space:pre-wrap;"></div>
        </el-card>
        <el-card>
            <el-form :model="msgData">
                <el-form-item label="发送内容" prop="msg">
                    <el-input v-model="msgData.msg" type="textarea" :rows="5" placeholder="请输入发送内容"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" plain @click="send">发送</el-button>
            <el-button type="primary" plain @click="sendAll">全部发送</el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { isEmpty } from 'lodash'
  import { ElMessage } from 'element-plus'
  import { ckWsSupported, connect } from '../../../composable/WebSocket'
  // import { guid } from '../../../composable/UUID'
  // 默认使用的全局地址时/api 代理到系统http://localhost:9701/wxmApi  ,如果不单独指定其他的接口地址，可以使用默认的
  // import AxiosUtil from '../../../../util/axios/axios-util'
  import axios from 'axios'

  type MsgType = {
    msg: string
  }
  const msgData = reactive<MsgType>({
    msg: ''
  })

  // 消息推送等采用websocket
  // 全局一个websocket，需要区分不同地方调用的传入一个新的guid参数，比如多个地方拍照
  // 但是，消息推送的websoket 和 本体拍照的websoket的基本不可能是同一个，
  // 因为消息推送的websoket 服务是在服务端，而拍照的的websoket的服务是在本地（比如ext,rpm,deb等）
  // 所以一个全局如果有拍照要求的话，应该是两个websoket
  // 一个 消息，一个拍照

  // 消息（可用于休息推送、统计实时在线人数、即时聊天）
  const url = 'ws://192.168.179.137:9701/wxmApi/ws-push-socket'
  const uid = 'wxm'  // websocket 连接的唯一id
  const ws = ref<WebSocket>()
  const options = ref<string[]>([])
  const data = ref<any>()

  onMounted(() => {
    if (!ckWsSupported()) {
      ElMessage({
        type: 'error',
        message: '浏览器不支持WebSocket'
      })
      return false
    }

    connectWebsocket(0)
  })

  const connectWebsocket = (type:number) => {
    // websocket 连接不应该带有任何身份验证等信息
    if (ws.value && ws.value.url && ws.value.url === `${url}/${uid}`) {
      if (type === 0) console.log('已经连接...')
      return false
    }
    ws.value = connect(url, uid, callBack)
  }

  const callBack = (evt:any, type?:string) => {
    switch (type) {
    case 'message':
      options.value.push(`接收数据：${evt.data}`)
      data.value = evt.data
      break
    case 'open':
      console.log('>>>>>>>>>>>连接成功！')
      options.value.push('连接成功！')
      break
    case 'close':
      ws.value = undefined
      console.log('>>>>>>>>>>>连接关闭')
      options.value.push('连接关闭')
      break
    case 'error':
      options.value.push('连接异常')
      console.error('连接异常：', evt)
      break
    default:
      options.value.push('未明确的操作')
      console.log('>>>>未明确的操作')
      break
    }
  }

  const send = () => {
    if (isEmpty(msgData.msg)) {
      ElMessage({
        type: 'error',
        message: '请先输入要发送的内容'
      })
      return false
    }

    ws.value!.send(msgData.msg)
  }

  const sendAll = () => {
    if (isEmpty(msgData.msg)) {
      ElMessage({
        type: 'error',
        message: '请先输入要发送的内容'
      })
      return false
    }
    const config = {
      baseURL: '/api',
      headers: {
        // 'Content-type': 'application/json' 传入的时base64编码串 多 双引号，表格模式多等号
        'Content-type': 'text/plain'
      }
    }

    const formData = new FormData()
    formData.set('msg', msgData.msg)

    axios.post('/push/sendAll', formData, config).then((resp: any) => {
      console.log('sendAll', resp)
    }).catch((err: any) => {
      console.error(err)
      ElMessage({
        type: 'error',
        message: `信息发送失败:${err.ElMessage | err}`
      })
    })
  }
</script>
