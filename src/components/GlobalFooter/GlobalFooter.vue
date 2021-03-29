<template>
  <div class="footer">
    <div class="links">
      <a href="#">帮助</a>
      <a href="#">
        <a-icon type="github" />
      </a>
      <a href="#">隐私</a>
      <a href="#">条款</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2020 <span>爱学习技术部出品</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GlobalFooter',
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .footer {
    padding: 30px 0 35px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, 0.45);

        &:hover {
          color: rgba(0, 0, 0, 0.65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
</style>
