import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { useInitSetPermission } from '../composable/sessionStorePermission'
import IndexView from '../views/IndexView.vue'
// 系统管理路由
import RbacRouter from './rbac.router'
// 定时任务路由
import QuartzRouter from './quartz.route'
// Demo
import DemoRouter from './demo.route'

// 所有内容路由
let ContentRouter : RouteRecordRaw [] = [
  {
    path: 'home',
    name: 'Home',
    meta: { title: 'Home.title' },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/home/HomeView.vue')
  },
  {
    path: 'about',
    name: 'About',
    meta: { title: 'About.title' },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/home/AboutView.vue')
  },
  {
    path: '404',
    name: '404',
    component: () => import('../views/404View.vue'),
    meta: { title: 'Menu.NotFound.title' }
  }
]

ContentRouter = ContentRouter.concat(RbacRouter).concat(QuartzRouter).concat(DemoRouter)

// 基本路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: { title: 'Home.title' },
      component: IndexView,
      redirect: to => {
        return 'home'
      },
      children: ContentRouter
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import ('../views/LoginView.vue')
    },
    {
      path: '/draggable',
      name: 'Draggable',
      component: () => import (/* webpackChunkName: "Api" */ '../views/draggable/DraggableView.vue'),
      meta: { title: 'Draggable.title', needLogon: 0 }// 0 不需要登录，其他 需要登录
    },
    {
      path: '/gridLayout',
      name: 'GridLayout',
      component: () => import (/* webpackChunkName: "Api" */ '../views/gridLayout/GridLayout.vue'),
      meta: { title: 'GridLayout.title', needLogon: 0 }// 0 不需要登录，其他 需要登录
    },
    {
      path: '/noticeWxmTest',
      name: 'NoticeWxmTest',
      component: () => import (/* webpackChunkName: "Api" */ '../views/rbac/notice/NoticeWxmTest.vue'),
      meta: { title: 'Menu.Rbac.children.NoticeWxm.title' }
    },
    {
      path: '/webSocketClient',
      name: 'webSocketClient',
      component: () => import (/* webpackChunkName: "demo" */ '../views/demo/websocket/WebsocketClient.vue'),
      meta: { title: 'Menu.Demo.children.WebsocketClient.title' }
    },
    {
      path: '/websocketServer',
      name: 'WebsocketServer',
      component: () => import (/* webpackChunkName: "demo" */ '../views/demo/websocket/WebsocketServer.vue'),
      meta: { title: 'Menu.Demo.children.WebsocketServer.title' }
    },
    { path: '/:pathMatch(.*)', redirect: '/404' }
  ]
})

router.beforeEach(async (to, from) => {
  // console.log('>>>>from,to：', from, to)
  // console.log('to.meta && to.meta.needLogon && to.meta.needLogon === 0:', to.meta && to.meta.needLogon && to.meta.needLogon === 0)
  // to.meta && to.meta.needLogon && to.meta.needLogon === 0 返回 的值为0
  // to.meta && to.meta.needLogon === 0 返回 的值为 true
  if (to.meta && to.meta.needLogon === 0) {
    // console.log('***************', 1)
    return true
  }
  // const accessToken = sessionStorage.getItem('accessToken')
  const accessToken = localStorage.getItem('accessToken')
  let isAuthenticated = false
  if (accessToken) isAuthenticated = true
  // 检查用户是否已登录 ,// 避免无限重定向
  if (!isAuthenticated && to.name !== 'Login') {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }

  // 已经登录的情况下获取用户权限,没有用户权限，则获取用户权限
  // 登录后，跳转的地址为：'/',这时候如果没有权限属性，则获取权限列表
  // {
  //   path: '/',
  //   redirect: '/home',
  // },
  // 因为 path '/' 转发到 '/home'
  if (to.path === '/home' && !Object.prototype.hasOwnProperty.call(sessionStorage, 'permission')) {
    // const{res,err} = await usePostTo('/gateway/rbac/51004',{transCode:'51004'}) as ResultType;
    // if(err){
    //   // throw new Error(err||res.message)
    //   wxmAlert(err.message||err,'error')
    //   // return false
    //   return { name: 'Login' }
    // }
    // if(res.code!=='0'){
    //   wxmAlert(res.message,'error')
    //   // return false
    //   return { name: 'Login' }
    // }

    // sessionStorage.setItem('permission',JSON.stringify(res.data.list))
    return useInitSetPermission()
  }
})

export default router
