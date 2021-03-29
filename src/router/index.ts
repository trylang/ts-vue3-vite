import { createRouter, createWebHashHistory } from 'vue-router'
import { routerMap } from '@/router/routerConfig/index'
// const path = process.env.BASE_URL
const routerHistory = createWebHashHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    ...routerMap,
    {
      path: '/home',
      name: 'home',
      hidden: true,
      component: () => import('../views/Home/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/404',
      name: '404',
      hidden: true,
      component: () => import('@/views/exception/404.vue'),
    },
  ],
})

export default router
