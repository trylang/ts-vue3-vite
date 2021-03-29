<script lang="jsx">
  export default {
    name: 'RouteView',
    props: {
      keepAlive: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      return {}
    },
    render() {
      const {
        $route: { meta },
        $store: { getters },
      } = this
      const inKeep = (
        <keep-alive>
          <router-view />
        </keep-alive>
      )
      const notKeep = <router-view />
      return this.keepAlive || getters.multiTab || meta.keepAlive
        ? inKeep
        : notKeep
    },
  }
</script>
