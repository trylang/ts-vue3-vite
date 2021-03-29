const permission = {
  namespaced: true,
  state: {
    scopes: [
      {
        type: 1,
        name: '共享资料',
        active: true,
        selectFolderId: -1,
      },
      { type: 2, name: '我的资料', active: false, selectFolderId: -1 },
    ],
    isEdit: true,
  },
  mutations: {
    SET_ACTIVE_SCOPE: (state, scopeType) => {
      console.log('设置私人或共享:', scopeType)
      state.scopes.forEach((item) => {
        item.active = item.type == scopeType
      })
    },
    SET_SELECT_FOLDER: (state, id) => {
      console.log('设置文件夹id:', id, state.scopes)
      state.scopes.find((item) => item.active).selectFolderId = id
    },
    SET_EDIT_STATUS: (state, status) => {
      console.log('设置编辑状态', status)
      state.isEdit = status
    },
  },
  getters: {
    curScopeType: (state) => {
      return state.scopes.find((item) => item.active).type
    },
    curSelectFolderId: (state) => {
      return state.scopes.find((item) => item.active).selectFolderId
    },
  },
}

export default permission
