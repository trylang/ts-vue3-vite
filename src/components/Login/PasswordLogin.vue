<template>
  <a-form ref="formPwd">
    <a-form-item prop="username" v-bind="validateInfos.username">
      <a-input
        v-model:value="formPwdRef.username"
        placeholder="请输入账号"
        addon-after="@aixuexi.com"
        @keyup.enter="login"
      >
        <template #prefix>
          <user-outlined type="user" style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item prop="password" v-bind="validateInfos.password">
      <a-input
        v-model:value="formPwdRef.password"
        type="password"
        placeholder="请输入密码"
        @keyup.enter="login"
      >
        <template #prefix>
          <lock-outlined type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        class="axxol-passport-login-btn"
        type="primary"
        :disabled="btnDisabled"
        :loading="btnDisabled"
        @click="login"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRaw } from 'vue'
  import { useForm } from '@ant-design-vue/use'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

  // import { checkMobile } from "@packages/utils/validator";
  export default defineComponent({
    name: 'PasswordLogin',
    components: {
      UserOutlined,
      LockOutlined,
    },
    props: {
      btnDisabled: Boolean,
    },
    emits: ['login'],
    setup(props, context) {
      const formPwdRef = reactive({
        username: '',
        password: '',
      })

      const rulesRef = reactive({
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
          // {
          //   validator: (rule, value, callback) => {
          //     let emailreg = /^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          //     if (!emailreg.test(value)) {
          //       callback(new Error("请输入正确的邮箱"));
          //     }
          //     callback();
          //   }
          // }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      })

      const { resetFields, validate, validateInfos } = useForm(
        formPwdRef,
        rulesRef
      )

      const login = () => {
        validate()
          .then(() => {
            console.log(toRaw(formPwdRef))
            context.emit('login', { loginType: 'oa', ...context.formPwdRef })
          })
          .catch((err) => {
            console.log('error', err)
          })
      }

      return {
        formPwdRef,
        rulesRef,
        resetFields,
        validateInfos,
        login,
      }
    },
  })
</script>
