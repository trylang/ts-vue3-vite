<template>
  <a-layout>
    <a-layout-sider
      v-model="collapsed"
      width="200"
      :trigger="null"
      collapsible
      class="sider"
      :style="{ height: '100vh', backgroundColor: '#fff' }"
    >
      <div
        class="logo"
        style="
          display: flex;
          justify-content: left;
          height: 118px;
          overflow: hidden;
          padding-left: 20px;
        "
      >
        <img src="@/assets/logo.png" />
      </div>
      <side-menu
        :menu="menus"
        mode="inline"
        theme="light"
        :collapsed="collapsed"
        :style="{ borderRight: 0 }"
      ></side-menu>
    </a-layout-sider>

    <div class="content">
      <a-layout class="content-wrapper" :style="{ minHeight: '100vh' }">
        <global-header :collapsed="collapsed" @toggle="toggle"> </global-header>
        <!-- 面包屑导航 -->
        <s-breadcrumb />
        <a-layout style="padding: 24px 24px 0">
          <a-layout-content>
            <transition name="page-transition">
              <router-view :key="contentKey"></router-view>
            </transition>
          </a-layout-content>
        </a-layout>

        <a-layout-footer
          :style="{ textAlign: 'center', margin: '0', padding: '0' }"
        >
          <global-footer />
        </a-layout-footer>
      </a-layout>
    </div>
  </a-layout>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  import SideMenu from '@/components/Menu/menu.tsx'
  import Breadcrumb from '@/components/tools/Breadcrumb.vue'
  // import RouteView from './RouteView'
  import GlobalHeader from '@/components/GlobalHeader/index.vue'
  import GlobalFooter from '@/components/GlobalFooter/GlobalFooter.vue'

  export default {
    name: 'BasicLayout',
    components: {
      // RouteView,
      // SideMenu,
      GlobalHeader,
      GlobalFooter,
      SideMenu,
      's-breadcrumb': Breadcrumb,
    },
    provide() {
      return {
        reload: this.reload,
      }
    },
    data() {
      return {
        collapsed: false,
        menus: [],
        contentKey: '',
      }
    },
    computed: {
      ...mapGetters('permission', ['getter_arrayRouter']),
    },
    watch: {},
    created() {
      const routes = this.getter_arrayRouter.find((item) => item.path === '/')
      this.menus = (routes && routes.children) || []
      //console.log("menu:", this.menus);
    },
    methods: {
      reload() {
        this.contentKey = new Date().getTime()
      },
      toggle() {
        this.collapsed = !this.collapsed
        // this.setSidebar(!this.collapsed)
        // triggerWindowResizeEvent()
      },
    },
  }
</script>

<style lang="less" scoped>
  .content {
    overflow: auto;
    height: 100vh;
    width: 100%;
  }

  .sider {
    min-height: 100vh;
    background: #001529;
    box-shadow: 2px 0 17px 0 rgba(0, 21, 41, 0.07);

    .logo {
      padding: 6px;
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 130px;
      }
    }
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

  .page-transition-enter {
    opacity: 0;
  }

  .page-transition-leave-active {
    opacity: 0;
  }

  .page-transition-enter .page-transition-container,
  .page-transition-leave-active .page-transition-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
