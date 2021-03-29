<template>
  <h1>MENU</h1>
</template>
<script lang="ts">
  // import { mapGetters } from "vuex";

  import { mapState } from 'vuex'
  // import TeacherPhone from './teacherPhone.vue'
  // import DropdownInfo from './dropdownInfo.vue'
  // import { getTeacherPhone } from '@/api/services/student'
  // import searchStudent from './searchStudent'
  // import messageNotification from './messageNotification'
  export default {
    name: 'GlobalHeader',
    components: {
      // TeacherPhone,
      // DropdownInfo,
      // searchStudent,
      // messageNotification,
    },
    props: {
      collapsed: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    setup() {
      return {
        visible: false,
      }
    },
    mounted() {
      // getTeacherPhone().then((respone) => {
      //   this.$store.commit('SET_PHONE', respone?.data?.telephone)
      // })

      this.$store.dispatch('BaseInfo')

      document.addEventListener('click', this.closeDropdown)
    },
    computed: {
      ...mapState({
        teachername: (state) => state.user?.baseInfo?.name || '',
        teacherid: (state) => state.user?.baseInfo?.id || '',
      }),
      nickname() {
        return this.$ls.get('name', '')
      },
      avatar() {
        return this.$ls.get('avatar', '')
      },
    },
    // destroyed() {
    //   document.removeEventListener('click', this.closeDropdown)
    // },
    methods: {
      closeDropdown(e) {
        this.closeMessage()
        this.closeSearch()
      },
      closeMessage() {
        // this.$refs.messageNotification.closeMessage()
      },
      closeSearch() {
        // this.$refs.searchStudent.closeSearch()
      },
      toggle() {
        this.$emit('toggle')
      },
      handleLogout(e) {
        switch (e.key) {
          case 'teacherphone':
            this.visible = true
            break
          case 'logout':
            this.$confirm({
              centered: true,
              title: '提示',
              content: '真的要注销登录吗 ?',
              onOk: () => {
                this.$store.dispatch('Logout')
              },
              onCancel() {},
            })
            this.visible = false
            break
        }
      },
      onVisibleChange(visible) {
        // if (
        //   !visible &&
        //   this.$refs.teacherphone &&
        //   this.$refs.teacherphone.isEditing
        // ) {
        //   this.visible = true
        // }
      },
    },
  }
</script>
<style lang="less" scoped>
  .layout-header {
    // margin-bottom: 2px;
    border-bottom: 1px solid #f4f4f4;
    box-sizing: content-box !important;
    // box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background: #fff;
      padding: 0 24px;

      .logo {
        width: 60px;
      }

      .user-wrapper {
        height: 100%;
        display: flex;

        .options {
          height: 100%;
          display: flex;
        }

        .avatar {
          margin-left: 10px;
          font-size: 14px;
          color: #f4f4f4;
        }
      }
    }
  }
</style>
