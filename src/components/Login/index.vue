<template>
  <div class="axxol-passport-login">
    <h2 v-if="title" class="passport-login-title">{{ title }}</h2>
    <password-login :btn-disabled="btnDisabled" @login="login"></password-login>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { mapActions } from 'vuex'
  import PasswordLogin from './PasswordLogin.vue'

  export default defineComponent({
    name: 'PassportLogin',
    components: { PasswordLogin },
    props: {
      title: {
        type: String,
        default: '',
      },
    },
    setup() {
      const btnDisabled = false
      return {
        btnDisabled,
      }
    },
    methods: {
      ...mapActions(['Login']),
      async login({ loginType, password, username }) {
        this.btnDisabled = true
        try {
          let reqData = {
            type: loginType,
            username: `${username}@aixuexi.com`,
            password,
          }
          const userData = await this.Login(reqData)

          if (userData.userVo) {
            // 登录成功
            this.$emit('success', userData.userVo)
            return
          }
          // 隐藏登录失败提示语，接口有返回登录失败原因
          // 登录失败
          // this.$emit("fail", "登录失败");
        } catch (e) {
          console.log(e)
          // 登录失败
          // this.$emit("fail", "登录失败");
        } finally {
          this.btnDisabled = false
        }
      },
    },
  })
</script>

<style lang="less">
  .axxol-passport-login {
    width: 376px;
    margin: 0 auto;
    .passport-login-title {
      text-align: center;
      margin: 0 0 69px 0;
      text-align: center;
      color: #ffffff;
      font-size: 36px;
    }
    .ant-form-item-control {
      width: 376px;
    }
    .ant-form-explain {
      text-align: left;
    }
    .ant-tabs-ink-bar {
      display: none !important;
    }
    .ant-tabs-nav-container {
      font-size: 20px;
      color: #ffffff;
    }
    .ant-tabs-bar {
      border-bottom: none;
      margin-bottom: 36px;
    }
    .ant-tabs-nav {
      display: block;
      .ant-tabs-tab {
        padding: 0;
        margin: 0;
      }
      > div {
        display: flex;
        justify-content: space-between;
      }
    }
    .ant-input-affix-wrapper {
      font-size: 16px;
      .ant-input-prefix {
        left: 20px;
      }
      .ant-input {
        height: 56px;
        border-radius: 6px;
        // border: 1px solid #c6c6c6;
        font-size: 16px;
        &:not(:first-child) {
          padding-left: 12px;
          padding-right: 36px;
        }
      }
    }
    .axxol-passport-login-btn {
      width: 376px;
      height: 52px;
      box-shadow: 0px 0px 11px 0px rgba(103, 206, 153, 0.38);
      border-radius: 6px;
      font-size: 20px;
      letter-spacing: 8px;
    }
  }
</style>
