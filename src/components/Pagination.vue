<template>
  <div class="pagination" v-if="pageTotal > 1">
    <nav>
      <!-- 前一頁 -->
      <a
        href="#"
        :class="{ disabled: pageNow == 1 }"
        @click.prevent="changePage('pre')"
        :disabled="true"
      >
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </a>
      <!-- 頁數 -->
      <a
        href="#"
        v-for="page in $store.state.page.pageTotal"
        :key="page"
        :class="{ active: page == $store.state.page.pageNow }"
        @click.prevent="changePage(page)"
      >{{ page }}</a>
      <!-- 下一頁 -->
      <a href="#" :class="{ disabled: pageNow == pageTotal }" @click.prevent="changePage('next')">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  computed: {
    pageNow() {
      return this.$store.state.page.pageNow;
    },
    pageTotal() {
      return this.$store.state.page.pageTotal;
    }
  },
  methods: {
    changePage(num) {
      this.$store.dispatch("changePage", num);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/variable.scss";
.pagination {
  margin: line(2) 0;
  > nav {
    display: flex;
    justify-content: center;
    font-size: 0;
    > a {
      @extend %abutton;
      padding: line(1) line(1.5);
      border-top: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      transition: 0.8s;
      font-size: 13px;
      color: #555;
    }
    // 前一頁
    > a:first-child {
      border-left: 1px solid #e5e5e5;
    }
    > a:hover {
      background-color: #efefef;
    }
    > .active {
      background-color: #ebf6fe;
    }
    // 禁止狀態
    > a.disabled {
      background-color: #fff;
      color: #ddd;
      pointer-events: none;
    }
  }
}
</style>
