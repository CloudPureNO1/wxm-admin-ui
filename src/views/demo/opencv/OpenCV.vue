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
          <el-button type="primary" plain  @click="tkPhoto">拍照</el-button>
          <el-image style="width:150px;height:150px;"  v-for="(item,index) in imgList" :key="index" :src="item"></el-image>
        </el-card>
         <el-card header="操作详情">
            <ul>
                <li v-for="(item,index) in options" :key="index">{{ index+':'+item }}</li>
            </ul>
         </el-card>
    </div>
</template>
<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { ckWsSupported, connect } from '../../../composable/WebSocket'
  import { guid } from '../../../composable/UUID'
  import { isEmpty } from 'lodash'
  type UserType = {
    username: string
  }
  type MsgType={
    msg:string
  }

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
  const uuid = ref<string>(guid())
  const tkPhoto = () => {
    connectWebsocket(1)
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

    // uid 有问题
    const uid = uuid.value + '-' + userData1.username

    const url = 'ws://192.168.179.137:2211/wxmOpencv/socketServer'
    if (ws.value && ws.value.url && ws.value.url === `${url}/${uid}`) {
      if (type !== 1) {
        console.log('已经连接...')
        return false
      }
      // 通过send 发送一个独特的消息Send(SYS_22-TAKE-PICTURE-11_WXM)，触发拍照
      ws.value!.send(`Send(SYS_22-TAKE-PICTURE-11_WXM)::${uid}`)
      return
    } else {
      ws.value = connect(url, uid, callBack)
      wsSet.add(ws.value)
    }
  }

  const callBack = (evt:any, type?:string) => {
    const tempWS = ws.value as WebSocket
    switch (type) {
    case 'message':
      options.value.push(`接收数据：${evt.data}`)
      imgList.value = imgList.value.concat(JSON.parse(evt.data))
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
  onUnmounted(() => {
    if (wsSet.size > 0) {
      wsSet.forEach((item:WebSocket) => {
        // 通过close 断开连接后，ws 已经失效，是不能再调用send方法，需要创建新的连接
        item.close()
      })
    }
  })

  const closeConnect = () => {
    ws.value!.close()
  }
</script>

<style  lang="scss" scoped>
.websocket-client {
    height: 100vh;
}
</style>
