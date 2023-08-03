<template>
    <div class="notice-index">
        <el-card>
             <!-- html 识别\n 换行，推荐使用css white-space:pre-wrap; -->
            <div  v-html="serverMsg" style="white-space:pre-wrap;"></div>
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
  import { isEmpty } from 'lodash'
  import { ElMessage } from 'element-plus'
  import { serverWSKey, serverMsgKey } from '../../../symbol/Symbol'
  import { inject, reactive } from 'vue'
  // 默认使用的全局地址时/api 代理到系统http://localhost:9701/wxmApi  ,如果不单独指定其他的接口地址，可以使用默认的
  // import AxiosUtil from '../../../../util/axios/axios-util'
  import axios from 'axios'

  const serverWS = inject(serverWSKey)
  const serverMsg = inject(serverMsgKey)
  console.log('***************', serverMsg, serverWS)

  type MsgType = {
    listUid: Array<string>, // 也可以时username
    msg: string
  }
  const msgData = reactive<MsgType>({
    listUid: [],
    msg: ''
  })

  const send = () => {
    if (isEmpty(msgData.msg)) {
      ElMessage({
        type: 'error',
        message: '请先输入要发送的内容'
      })
      return false
    }
    if (!serverWS || !serverWS.value || serverWS.value.readyState !== 1) {
      ElMessage({
        type: 'error',
        message: '清先连接websocket'
      })
      return false
    }
    serverWS.value.send(JSON.stringify(msgData))
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
