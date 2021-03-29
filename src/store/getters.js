const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  nickname: (state) => state.user.name,
  welcome: (state) => state.user.welcome,
  roles: (state) => state.user.roles,
  userInfo: (state) => state.user.info,
  baseInfo: (state) => state.user.baseInfo,
  isRouterLoad: (state) => state.permission.isRouterLoad,
}

export default getters
