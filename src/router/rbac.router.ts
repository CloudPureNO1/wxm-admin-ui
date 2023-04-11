import type { RouteRecordRaw } from 'vue-router'
const RbacRouter:RouteRecordRaw[] = [
/*

这种方式，在路由中，不会有其父目录 系统管理，在做面包屑的时候，找不到这一级
{
    path:'/userIndex',
    name:'UserIndex',
    component:() => import (  "../views/rbac/UserIndex.vue"), // webpackChunkName: "UserIndex"
    meta:{title:'用户信息'}
  } */

  {
    path: 'rbac',
    name: 'Rbac',
    meta: { title: 'Menu.Rbac.title', type: 'node' }, // 通过node 再面包屑中判断
    children: [
      {
        path: 'userIndex',
        name: 'UserIndex',
        component: () => import (/* webpackChunkName: "UserIndex" */ '../views/rbac/user/UserIndex.vue'),
        meta: { title: 'Menu.Rbac.children.UserIndex.title' }
      },
      {
        path: 'groupIndex',
        name: 'GroupIndex',
        component: () => import (/* webpackChunkName: "Group" */ '../views/rbac/group/GroupIndex.vue'),
        meta: { title: 'Menu.Rbac.children.GroupIndex.title' }
      },

      {
        path: 'roleIndex',
        name: 'RoleIndex',
        component: () => import (/* webpackChunkName: "Role" */ '../views/rbac/role/RoleIndex.vue'),
        meta: { title: 'Menu.Rbac.children.RoleIndex.title' }
      },
      {
        path: 'resourceIndex',
        name: 'ResourceIndex',
        component: () => import (/* webpackChunkName: "Resource" */ '../views/rbac/resource/ResourceIndex.vue'),
        meta: { title: 'Menu.Rbac.children.ResourceIndex.title' }
      },
      {
        path: 'permissionIndex',
        name: 'PermissionIndex',
        component: () => import (/* webpackChunkName: "Permission" */ '../views/rbac/permission/PermissionIndex.vue'),
        meta: { title: 'Menu.Rbac.children.PermissionIndex.title' }
      },

      {
        path: 'apiIndex',
        name: 'ApiIndex',
        component: () => import (/* webpackChunkName: "Api" */ '../views/rbac/api/ApiIndex.vue'),
        meta: { title: 'Menu.Rbac.children.ApiIndex.title' }
      },
      {
        path: 'dictionaryIndex',
        name: 'DictionaryIndex',
        component: () => import (/* webpackChunkName: "Api" */ '../views/rbac/dictionary/DictionaryIndex.vue'),
        meta: { title: 'Menu.Rbac.children.DictionaryIndex.title' }
      },
      {
        path: 'noteIndex',
        name: 'NoteIndex',
        component: () => import (/* webpackChunkName: "Api" */ '../views/rbac/notice/NoticeIndex.vue'),
        meta: { title: 'Menu.Rbac.children.NoticeIndex.title' }
      },
      {
        path: 'noticeWxm',
        name: 'NoticeWxm',
        component: () => import (/* webpackChunkName: "Api" */ '../views/rbac/notice/NoticeWxm.vue'),
        meta: { title: 'Menu.Rbac.children.NoticeWxm.title' }
      }
    ]
  }
]

export default RbacRouter
