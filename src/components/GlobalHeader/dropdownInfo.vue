<template>
  <div class="info">
    <span class="label">{{ label }}</span>
    <div class="value">
      {{ value }}
    </div>
  </div>
</template>
<script>
  export default {
    props: ['label', 'value'],
  }
</script>
<style lang="less" scoped>
  .info {
    .label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
  }
</style>
