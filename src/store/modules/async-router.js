/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { constantRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
  namespaced: true,
  state: {
    isRouterLoad: false,
    arrayRouter: [],
    // actionList: []
  },
  mutations: {
    SET_ROUTER_LOAD: (state, isRouterLoad) => {
      state.isRouterLoad = isRouterLoad
    },
    SET_arrayRouter: (state, arrayRouter) => {
      state.arrayRouter = arrayRouter
    },
    // SET_actionList: (state, actionList) => {
    //   state.actionList = actionList;
    // }
  },
  actions: {
    async GenerateRoutes({ commit }) {
      let routers = await generatorDynamicRouter()
      commit('SET_ROUTER_LOAD', true)
      return routers
    },
  },
  getters: {
    getter_arrayRouter(state, getters, rootState) {
      let temp_arrayRouter = state.arrayRouter
      return temp_arrayRouter.map((item) => {
        if (Object.prototype.toString.call(item) != '[object Object]') {
          let menuobj = JSON.parse(item)
          return menuobj
        } else {
          return item
        }
      })
    },
  },
}

export default permission
