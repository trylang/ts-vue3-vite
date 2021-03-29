<template>
  <div class="login-wrap">
    <i class="logo"></i>
    <passport-login
      title="教务平台"
      @success="success"
      @fail="fail"
    ></passport-login>
    <footer>
      <p><span></span></p>
    </footer>
  </div>
</template>
<script>
  import PassportLogin from '@/components/Login/index.vue'
  export default {
    name: 'Login',
    components: { PassportLogin },
    methods: {
      success(data) {
        this.$router.push({ path: '/' }).catch((err) => {
          console.log(err)
        })
      },
      fail(msg) {
        // this.$message.error(msg);
      },
    },
  }
</script>
<style lang="less" scoped>
  .login-wrap {
    height: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: url('./img/bg.jpg') center no-repeat;
    background-size: cover;
    .axxol-passport-login {
      margin: 0 auto;
    }
    .logo {
      position: absolute;
      width: 202px;
      height: 78px;
      background: url('./img/logo.png');
      left: 36px;
      top: 36px;
    }
  }
</style>
