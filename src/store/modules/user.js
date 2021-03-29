import Vue from 'vue'
import { login, authkey, logout } from '@/api/services/login'
// import { savePhone } from '@/api/services/student'
// import { getTeacherInfo } from '@/api/services/teacherMstudentanage'
import { JSEncrypt } from 'jsencrypt'
import lsConfig from '@/config/config'
import bridge from '@aixuexi/cef-bridge'
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    roleId: '',
    phone: '',
    // 老师基础信息
    baseInfo: null,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_BASEINFO: (state, baseInfo) => {
      state.baseInfo = baseInfo
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // Vue.$http(login(userInfo))
        //   .then(response => {
        //     const data = response.data;
        //     console.log(response);
        //     // Vue.ls.set("Access-Token", data.token, 7 * 24 * 60 * 60 * 1000);
        //     // Vue.ls.set("name", data.name, 7 * 24 * 60 * 60 * 1000);
        //     // Vue.ls.set("avatar", data.avatar, 7 * 24 * 60 * 60 * 1000);
        //     set("token", data.result.token);
        //     set("name", data.result.name);
        //     // commit("SET_TOKEN", result.token);
        //     // commit("SET_NAME", { name: result.name });
        //     // commit("SET_AVATAR", result.avatar);
        //     // commit("SET_INFO", result);
        //     // commit('SET_ROLEID', result.roleId)
        //     resolve();
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
        console.log(authkey())
        return Vue.$http(authkey()).then((res) => {
          const key = res.data
          if (key) {
            let encrypt = new JSEncrypt()
            encrypt.setPublicKey(key)
            let us = encrypt.encrypt(userInfo.username)
            let ps = encrypt.encrypt(userInfo.password)
            // console.log(us, ps);
            return Vue.$http(
              login({
                password: ps,
                rememberMe: false,
                type: userInfo.type,
                username: us,
              })
            )
              .then((respone) => {
                // todo: 需要对登陆失败进行处理
                const { data, code } = respone
                if (code.toUpperCase() == 'SUCCESS') {
                  const loginSuccessData = {
                    lol: data.sessionId,
                    oaEmail: data.userVo.oaEmail,
                    Authorization: data.token,
                  }
                  console.log('success', loginSuccessData)
                  bridge.send('loginSuccess', loginSuccessData)
                  Vue.ls.set(
                    lsConfig.lsKeys.token,
                    data.token,
                    7 * 24 * 60 * 60 * 1000
                  )
                  Vue.ls.set(
                    lsConfig.lsKeys.sessionId,
                    data.sessionId,
                    7 * 24 * 60 * 60 * 1000
                  )
                  Vue.ls.set(
                    lsConfig.lsKeys.userName,
                    data.username,
                    7 * 24 * 60 * 60 * 1000
                  )
                  Vue.ls.set(
                    lsConfig.lsKeys.oaEmail,
                    data.userVo.oaEmail,
                    7 * 24 * 60 * 60 * 1000
                  )
                  resolve(data)
                } else {
                  reject(respone)
                }
              })
              .catch((error) => {
                reject(error)
              })
          }
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        Vue.$http(logout())
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
          .finally(() => {
            bridge.send('loginOut', { login: 'login' })
            //console.log("loginOutloginOutloginOut----------------");
            Vue.ls.remove('token')
            Vue.ls.remove('sessionId')
            Vue.ls.remove('name')
            window.location.reload()
          })
      })
    },

    // 保存手机号
    SavePhone({ commit }, teacherPhone) {
      // return savePhone({ telephone: teacherPhone }).then((respone) => {
      //   commit('SET_PHONE', teacherPhone)
      // })
    },

    BaseInfo({ commit, state }) {
      // return new Promise((resolve, reject) => {
      //   if (!state.baseInfo) {
      //     Vue.$http(getTeacherInfo())
      //       .then((res) => {
      //         commit('SET_BASEINFO', res.data)
      //         resolve()
      //       })
      //       .catch(() => {
      //         reject()
      //       })
      //   } else {
      //     resolve()
      //   }
      // })
    },
  },
}

export default user
