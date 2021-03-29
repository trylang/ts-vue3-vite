import { userRouter } from './userRouter'
import { BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}
const dashboard = {
  path: '/dashboard',
  name: 'Dashboard[待开发]',
  component: RouteView,
  meta: {
    keepAlive: true,
    // icon: dashboardIcon,
    title: 'Dashboard[待开发]',
  },
}

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap = [
  {
    path: '/user',
    component: RouteView,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Login.index.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
  },
]

const routerMap = [
  {
    path: '/',
    name: 'index',
    component: BlankLayout,
    meta: { title: '首页' },
    redirect: '/user/userManager',
    children: [userRouter],
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
]

export { RouteView, constantRouterMap, routerMap }
