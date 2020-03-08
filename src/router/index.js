import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { // 登录
    name: 'login',
    path: '/login',
    meta: 'login',
    keepalive: true,
    component: () => import('@/views/login')
  },
  { // 底部标签栏
    path: '/',
    component: () => import('@/views/tab-bar'),
    children: [
      { // 首页
        name: 'search',
        path: '', //
        component: () => import('@/views/search'),
        meta: 'search',
        keepalive: true
      },
      { // 我的
        name: 'my',
        path: '/my',
        component: () => import('@/views/my'),
        meta: 'my',
        keepalive: true
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
