<template>
  <a-breadcrumb class="breadcrumb" v-show="breadList.length" separator=">">
    <a-breadcrumb-item v-for="item in breadList" :key="item.name">
      <router-link
        v-if="item.name != name"
        :to="{ path: item.path === '' ? '/' : item.path }"
        >{{ item.meta.title }}</router-link
      >
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      breadList: []
    };
  },
  computed: {
    name() {
      return this.$route.name;
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadList = [];
      // this.breadList.push({name: 'index', path: '/dashboard/', meta: {title: '首页'}})
      this.$route.matched.forEach(item => {
        // item.name !== 'index' && this.breadList.push(item)
        if (!this.breadList.some(cur => cur.meta.title === item.meta.title)) {
          this.breadList.push(item);
        }
      });
      if (
        this.breadList.length === 1 &&
        this.breadList[0].meta.title === "首页"
      ) {
        this.breadList = [];
      }
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>
<style lang="less" scoped>
.breadcrumb {
  padding: 12px 20px !important;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
