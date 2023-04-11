<template>
    <!--     <div v-if="layoutStore.layoutMode==='header-main'" class="wxm-container header-main">
        <BaseHeader />
        <div class="wxm-main">
            <NavMenu v-if="layoutStore.isVertical" class="wxm-aside" />
            <div class="wxm-content">
                <BaseTags v-if="layoutStore.showTags" />
                <div class="content">
                    <router-view v-slot="{ Component }">
                        <transition name="slide-fade" mode="out-in">
                            <keep-alive :include="layoutStore.keepAliveList">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>

    <div v-if="layoutStore.layoutMode==='aside-main'" class="wxm-container aside-main">
        <div class="wxm-main">
            <NavMenu v-if="layoutStore.isVertical" class="wxm-aside" />
            <div class="wxm-content">
                <BaseHeader />
                <BaseTags v-if="layoutStore.showTags" />
                <div class="content">
                    <router-view v-slot="{ Component }">
                        <transition name="slide-fade" mode="out-in">
                            <keep-alive :include="layoutStore.keepAliveList">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div> -->
    <!-- 合并成一个 -->

      <div class="wxm-container" :class="'wxm-' + layoutStore.layoutMode">
        <wxm-header v-if="layoutStore.layoutMode === 'header-main'" />
        <div class="wxm-main">
            <wxm-menu v-if="layoutStore.isVertical" class="wxm-menu" />
            <div class="wxm-content">
                <wxm-header v-if="layoutStore.layoutMode === 'aside-main'" />
                <wxm-tags v-if="layoutStore.showTags" />
                <div class="wxm-content__main ">
                    <router-view v-slot="{ Component }">

                        <transition name="slide-fade" mode="out-in">
                            <keep-alive :include="layoutStore.keepAliveList">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
  import { useLayoutStore } from '../../stores/layout'
  import { ref, provide, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { ckWsSupported, connect } from '../../composable/WebSocket'
  import { guid } from '../../composable/UUID'
  import { isEmpty } from 'lodash'
  import { serverWSKey, serverMsgKey } from '../../symbol/Symbol'
  const layoutStore = useLayoutStore()

  const router = useRouter()
  // 消息推送等采用websocket
  // 全局一个websocket，需要区分不同地方调用的传入一个新的guid参数，比如多个地方拍照
  // 但是，消息推送的websoket 和 本体拍照的websoket的基本不可能是同一个，
  // 因为消息推送的websoket 服务是在服务端，而拍照的的websoket的服务是在本地（比如ext,rpm,deb等）
  // 所以一个全局如果有拍照要求的话，应该是两个websoket
  // 一个 消息，一个拍照

  // 消息（可用于休息推送、统计实时在线人数、即时聊天）
  const url = 'ws://192.168.179.137:9701/wxmApi/ws-push-socket'
  const uid = guid()  // websocket 连接的唯一id
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
    // 正式的有token校验
    const accessToken = localStorage.getItem('accessToken')
    if (isEmpty(accessToken)) {
      ElMessage({
        type: 'error',
        message: '请重新登录'
      })
      router.push('/login')
      return false
    }

    // websocket 连接不应该带有任何身份验证等信息
    if (ws.value && ws.value.url && ws.value.url === `${url}/${uid}`) {
      if (type === 0) console.log('已经连接...')
      return false
    }
    ws.value = connect(url, uid, callBack)
    // if (ws.value.readyState === 1) {
    //   provide(serverWSKey, ws)
    // }
  }

  const callBack = (evt:any, type?:string) => {
    switch (type) {
    case 'message':
      options.value.push(`接收数据：${evt.data}`)
      // provide 和 inject 只能在setup 中，不能在这里
      // provide(serverMsgKey, JSON.parse(evt.data))
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

  provide(serverWSKey, ws)
  provide(serverMsgKey, data)

</script>

