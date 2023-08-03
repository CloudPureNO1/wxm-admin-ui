<template>
  <div class="websocket-client">
    <el-card>
      <el-form :model="userData1">
        <el-form-item label="昵称" prop="username">
          <el-input v-model="userData1.username" placeholder="请输入昵称"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" plain @click="connectWebsocket(0)">连接</el-button>
      <el-button type="primary" plain @click="closeConnect">断开连接</el-button>
      <el-card>
        <el-form :model="msgData1">
          <el-form-item label="发送内容" prop="msg">
            <el-input v-model="msgData1.msg" type="textarea" :rows="5" placeholder="请输入发送内容"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="sendMsg">发送</el-button>
      </el-card>
    </el-card>
    <el-card>
      <el-button type="primary" plain @click="tkPhoto">拍照</el-button>
      <el-image style="width:150px;height:150px;" v-for="(item, index) in imgList" :key="index" :src="item"></el-image>
    </el-card>
    <el-card header="操作详情">
      <ul>
        <li v-for="(item, index) in options" :key="index">{{ index + ':' + item }}</li>
      </ul>
    </el-card>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { ckWsSupported, connect } from '../../../composable/WebSocket'
  import { guid } from '../../../composable/UUID'
  import { isEmpty } from 'lodash'
  type UserType = {
    username: string
  }
  type MsgType = {
    msg: string
  }

  // 采用区局一个WebSocket 连接，调用拍照的时传入自己的uuid
  const url = 'ws://192.168.1.124:2211/wxmOpencv/socketServer'
  const uid = guid()  // websocket 连接的唯一id
  const wsSet = new Set<WebSocket>()
  const ws = ref<WebSocket>()
  const imgList = ref<string[]>([])
  const options = ref<string[]>([])
  const msgData1 = reactive<MsgType>({
    msg: ''
  })
  const userData1 = reactive<UserType>({
    username: ''
  })

  const tkPhoto = () => {
    if (ws.value && ws.value.url && ws.value.url === `${url}/${uid}`) {
      // 通过send 发送一个独特的消息Send(SYS_22-TAKE-PICTURE-11_WXM)，触发拍照
      ws.value!.send(`Send(SYS_22-TAKE-PICTURE-11_WXM)::${guid()}`) // guid拍照的唯一id
      return false
    }
    ws.value = connect(url, uid, callBack)
    // 通过send 发送一个独特的消息Send(SYS_22-TAKE-PICTURE-11_WXM::guid)，触发拍照
    // 0        CONNECTING        连接尚未建立
    // 1        OPEN            WebSocket的链接已经建立
    // 2        CLOSING            连接正在关闭
    // 3        CLOSED            连接已经关闭或不可用
    if (ws.value && ws.value.readyState === 1) {
      ws.value!.send(`Send(SYS_22-TAKE-PICTURE-11_WXM)::${guid()}`)
    }
  }
  const sendMsg = () => {
    ws.value!.send(msgData1.msg)
    options.value.push(`发送信息：${msgData1.msg}`)
  }
  const connectWebsocket = (type:number) => {
    if (isEmpty(userData1.username)) {
      ElMessage({
        type: 'error',
        message: '请输入昵称'
      })
      return false
    }

    if (ws.value && ws.value.url && ws.value.url === `${url}/${uid}`) {
      if (type === 0) console.log('已经连接...')
      return false
    }
    ws.value = connect(url, uid, callBack)
  }

  const callBack = (evt:any, type?:string) => {
    const tempWS = ws.value as WebSocket
    const data = ref<any>({})
    switch (type) {
    case 'message':
      options.value.push(`接收数据：${evt.data}`)
      data!.value = JSON.parse(evt.data)
      if (data.value && data.value.data) {
        imgList.value = imgList.value.concat(JSON.parse(data.value.data))
      }

      break
    case 'open':
      console.log('>>>>>>>>>>>连接成功！')
      options.value.push('连接成功！')
      break
    case 'close':
      wsSet.delete(tempWS)
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

  onMounted(() => {
    if (!ckWsSupported()) {
      ElMessage({
        type: 'error',
        message: '浏览器不支持WebSocket'
      })
      return false
    }
  })

  const closeConnect = () => {
    if (ws.value) ws.value.close()
  }
</script>

<style  lang="scss" scoped>
.websocket-client {
  height: 100vh;
}
</style>
