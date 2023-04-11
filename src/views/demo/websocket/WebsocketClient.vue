<template>
    <div class="websocket-client">
        <el-card>
            <el-form :model="userData1">
                <el-form-item label="昵称" prop="username">
                    <el-input v-model="userData1.username" placeholder="请输入昵称"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" plain @click="connectWebsocket">连接</el-button>
            <el-card>
                <el-form :model="msgData1">
                    <el-form-item label="发送内容" prop="msg">
                        <el-input v-model="msgData1.msg" type="textarea" :rows="5" placeholder="请输入发送内容"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" plain @click="sendMsg">发送</el-button>
            </el-card>
        </el-card>

         <el-card header="操作详情">
            <ul>
                <li v-for="(item,index) in options" :key="index">{{ index+':'+item }}</li>
            </ul>
         </el-card>
    </div>
</template>
<script setup lang="ts">
  import { isEmpty } from 'lodash'
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  type UserType = {
    username: string
  }
  type MsgType={
    msg:string
  }
  const userData1 = reactive<UserType>({
    username: ''
  })

  const msgData1 = reactive<MsgType>({
    msg: ''
  })
  const options = ref<String[]>([])
  const ws = ref<any>(null)
  const connectWebsocket = () => {
    if (isEmpty(userData1.username)) {
      ElMessage({
        type: 'error',
        message: '清先输入昵称'
      })
      return false
    }
    if ('WebSocket' in window) {
      ws.value = new WebSocket(`ws://192.168.179.137:1322/wxmPush/socketServer/${userData1.username}`)
    } else if ('MozWebSocket' in window) {
      // ws.value = new MozWebSocket(`ws://192.168.179.137:1322/wxmPush/socketServer/${userData1.username}`)
      ws.value = new WebSocket(`ws://192.168.179.137:1322/wxmPush/socketServer/${userData1.username}`)
    } else {
      ElMessage({
        type: 'error',
        message: '该浏览器不支持websocket'
      })
      return false
    }

    ws.value.onopen = (evt:any) => {
      console.log('>>>>客户端连接：', evt)
      options.value.push('客户端：连接成功')
    }

    ws.value.onclose = (evt:any) => {
      console.log('>>>>客户端关闭连接：', evt)
      options.value.push(`客户端：关闭连接成功`)
    }
    ws.value.onmessage = (evt:any) => {
      console.log('>>>>服务端：', evt)
      options.value.push(`服务端：${evt.data}`)
    }
  }
  const sendMsg = () => {
    ws.value.send(`${msgData1.msg}`)
    options.value.push(`客户端：${msgData1.msg}`)
  }
</script>

<style  lang="scss" scoped>
.websocket-client {
    height: 100vh;
}
</style>
