import store from '@/store'
import Vue from 'vue'
import { getmenuTree } from '@/api/services/login.ts'
import { routerConfig, constantRouterComponents } from './configMap'

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true,
}
// 根级菜单
let rootRouter = {}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = async () => {
  try {
    const tree = await Vue.$http(
      getmenuTree({
        systemId: '1',
      })
    )
    const { data } = tree
    const menuNav = []
    if (!Array.isArray(data)) {
      return
    }
    rootRouter = {
      ...data[0],
      name: '首页',
      path: '/',
      // redirect: "/student",
      key: data[0].name,
      component: constantRouterComponents['BasicLayout'],
      meta: {
        title: '首页',
      },
    }
    for (let i = 0; i < data[0].children.length; i++) {
      if (data[0].children[i].type == 1) {
        rootRouter.redirect =
          routerConfig[data[0].children[i].name] &&
          routerConfig[data[0].children[i].name].path
            ? routerConfig[data[0].children[i].name].path
            : `/${data[0].children[i].name}`
        // rootRouter.meta = { title: `${data[0].children[i].title}` };
        break
      }
    }
    //临时
    const store_router = {
      ...rootRouter,
      component: '',
    }
    console.log(formatList(rootRouter.children))
    rootRouter.children = generator(formatList(rootRouter.children), 0, false)

    menuNav.push(rootRouter)
    // console.log("menuNav", menuNav);
    store_router.children = generator(
      formatList(store_router.children),
      0,
      true
    )
    menuNav.push(notFoundRouter)
    const store_router_json = JSON.stringify(store_router)
    store.commit('permission/SET_arrayRouter', [
      store_router_json,
      notFoundRouter,
    ])
    return menuNav
  } catch (error) {
    console.log(error)
  }
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent, isstore = false) => {
  return routerMap.map((item) => {
    const {
      title,
      show,
      hideChildren,
      hiddenHeaderContent,
      target,
      icon,
      permission,
    } = item.meta || {}

    // 定义路由组件component和路由参数query
    let component = '',
      query = {},
      tempComponent
    if (!isstore) {
      if (item.component == 'Layout') {
        component = constantRouterComponents[item.component]
      } else {
        tempComponent = constantRouterComponents[item.name]
        if (typeof tempComponent == 'object') {
          component = tempComponent.component
          query = tempComponent.query || {}
        } else {
          component = tempComponent
        }
      }
    } else {
      if (item.component != 'Layout') {
        tempComponent = constantRouterComponents[item.name]
        if (typeof tempComponent == 'object') {
          query = tempComponent.query || {}
        }
      }
    }

    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.name}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      query,
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载),
      component,

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        // permission: item.name
        permission: permission,
        actionList: item.actionList,
      },
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
      currentRouter.meta.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    // item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      item.children.some((it) => {
        if (it.meta.show) {
          currentRouter.redirect =
            routerConfig[it.name] && routerConfig[it.name].path
              ? routerConfig[it.name].path
              : `${currentRouter.path}/${it.name}`
          return true
        }
      })
      if (item.children.every((it) => it.meta.show == false)) {
        if (item.component == 'Layout') {
          currentRouter.redirect =
            routerConfig[item.children[0].name] &&
            routerConfig[item.children[0].name].path
              ? routerConfig[item.children[0].name].path
              : `${currentRouter.path}/${item.children[0].name}`
        }
      }
      // Recursion
      currentRouter.children = generator(item.children, currentRouter, isstore)
    }

    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param arr 源数组
 * @param init 树
 * @param parentId 父ID
 */
//类型 （1内部菜单,2路由，0外部链接）
const formatList = (arr) => {
  const newarr = arr.map((item) => {
    // item.meta = {};
    let hideChildren = false
    if (routerConfig[item.name]) {
      item.path = routerConfig[item.name].path
    }
    if (item.children && item.children.length > 0) {
      hideChildren = item.children.every((it) => it.type == 2)
      item.children = formatList(item.children)
    }
    return {
      ...item,
      meta: {
        hideChildren: hideChildren,
        title: item.title,
        show: item.type != 2 ? true : false,
        hiddenHeaderContent: false,
        target: null,
        icon: (routerConfig[item.name] && routerConfig[item.name].icon) || null,
        permission: [],
      },
    }
  })
  return newarr
}
