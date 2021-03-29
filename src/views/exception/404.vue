<template>
  <div class="exception-box">
    <div class="abs">
      <img src="../../assets/Artwork@2x.png" width="344" />
      <a-button type="primary" @click="back()" class="back">返回首页</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'exception404',
    methods: {
      back() {
        const redirect = decodeURIComponent(this.$route.path)
        if (redirect != this.$route.matched[0].redirect) {
          this.$router.replace('/')
        }
      },
    },
  })
</script>
<style lang="less" scoped>
  .exception-box {
    position: relative;
    width: 100%;
    min-height: 100vh;
    .abs {
      position: absolute;
      width: 344px;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      .back {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate3d(-50%, 0%, 0);
      }
    }
  }
</style>
