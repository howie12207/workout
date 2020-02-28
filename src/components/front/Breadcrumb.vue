<template>
  <div class="breadcrumb">
    <!-- 非單一產品介紹頁 -->
    <ul v-if="$route.name!='productId'">
      <i class="fas fa-home"></i>
      <li
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
        @click="routeTo(index)"
      >{{ breadcrumb.name }}</li>
    </ul>
    <!-- 單一產品介紹頁 -->
    <ul v-else>
      <i class="fas fa-home"></i>
      <li @click="routeTo(0)">產品介紹</li>
      <li @click="routeTo('sort')">{{ product.category }}</li>
      <li>{{ product.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: []
    };
  },
  computed: {
    ...mapGetters(["product"])
  },
  created() {},
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    }
  },
  methods: {
    routeTo(pRouteTo) {
      // if (this.breadcrumbList[pRouteTo].link)
      if (pRouteTo != "sort") {
        this.$router.push(this.breadcrumbList[pRouteTo].link);
      } else {
        this.$router.push(`/product/${this.$store.state.sort}`);
      }
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable";
.breadcrumb {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: line(2) 0 line(4);
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid $light;
  > ul {
    display: flex;
    align-items: center;
    > i {
      margin: 0 line(2) 0 0;
      color: #ccc;
    }
    > li {
      cursor: pointer;
      color: #666;
      position: relative;
      height: 16px;
      line-height: 16px;
    }
    > li:not(:last-child):hover {
      color: $active;
    }
    > li:last-child {
      cursor: default;
    }
    > li:not(:last-child):after {
      content: "/";
      margin: line(1);
    }
  }
}
</style>