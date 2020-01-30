<template>
  <div class="breadcrumb">
    <ul v-if="$route.name!='productId'">
      <i class="fas fa-home"></i>
      <li
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
        @click="routeTo(index)"
      >{{ breadcrumb.name }}</li>
    </ul>
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
  margin: line(1) 0;
  > ul {
    display: flex;
    > i {
      margin: 0 line(1) 0 0;
    }
    > li {
      cursor: pointer;
      color: $red;
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