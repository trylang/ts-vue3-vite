const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}

import { BlankLayout } from '@/layouts'

// 16. 用户管理
export const userRouter = {
  path: '/user',
  name: 'user',
  component: BlankLayout,
  meta: {
    title: '用户管理',
    keepAlive: true,
    // icon: yonghu,
  },
  children: [
    {
      path: '/user/userManager',
      name: 'userManager',
      component: () => import('@/views/user/userManager'),
      meta: {
        title: '用户管理',
        keepAlive: true,
      },
      // beforeEnter: async (to, from, next) => {
      //   store.dispatch("select/getRoleList");
      //   next();
      // },
    },
  ],
}
