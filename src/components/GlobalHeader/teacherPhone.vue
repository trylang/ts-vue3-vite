<template>
  <div class="teacher-phone">
    <span class="label">手机号码</span>
    <div class="phone-con">
      <a-input
        v-if="isEditing"
        size="small"
        v-model="teacherPhone"
        placeholder="请输入手机号"
      ></a-input>
      <span v-else>{{ teacherPhone || '无工作手机号' }}</span>
      <a-button
        v-if="isEditing"
        class="btn"
        size="small"
        type="primary"
        :loading="isSaving"
        @click="onSave"
      >
        保存
      </a-button>
      <a-icon v-else type="edit" class="btn" @click="onEdit" />
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        teacherPhone: this.phone,
        isEditing: false,
        isSaving: false,
      }
    },
    created() {
      this.teacherPhone = this.phone
    },
    methods: {
      onEdit() {
        this.isEditing = true
        this.orinalPhone = this.teacherPhone
      },
      async onSave() {
        this.isSaving = true
        try {
          await this.$store.dispatch('SavePhone', this.teacherPhone)
        } catch (err) {
          this.teacherPhone = ''
          this.teacherPhone = this.orinalPhone
        }
        this.isEditing = false
        this.isSaving = false
      },
    },
    computed: {
      ...mapState({
        phone: (state) => state.user.phone,
      }),
    },
    watch: {
      phone: function (newVal, oldVal) {
        this.teacherPhone = newVal
      },
    },
  }
</script>
<style lang="less" scoped>
  .teacher-phone {
    .label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .phone-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .btn {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
