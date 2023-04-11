<template>
    <div class="websocket-main">
        <div class="websocket-client"></div>
        <div class="websocket-server">
            <el-card title="服务端">
                <el-form :model="serverData">
                    <el-form-item label="在线人数">
                        <span>{{ serverData.onlineNum }}</span>
                    </el-form-item>
                    <el-form-item label="在线人员">
                        <el-checkbox-group v-model="serverData.userList">
                            <el-checkbox v-for="(item, index) in serverData.onLineUserList" :key="index" :label="item" />
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="信息内容">
                        <el-input type="textarea" :rows="5" v-model="serverData.msg" placeholder="请输入要发送的内容"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" plain @click="loadOnlineUserList">获取在线用户</el-button>
                <el-button type="primary" plain @click="sendMsg">发送</el-button>
                <el-button type="primary" plain @click="sendAll">全部发送</el-button>
            </el-card>

            <el-card title="操作详情">
                <div v-for="(item,index) in serverData.optionList" :key="index">{{ item }}</div>
            </el-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
  import { init } from './ts/WebsocketServer'
  const {
    serverData,
    sendMsg,
    sendAll, loadOnlineUserList
  } = init()
</script>
<style scoped lang="scss">
@import url(./css/WebsocketServer.scss);
</style>
