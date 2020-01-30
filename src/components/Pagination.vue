<template>
  <div class="pagination" v-if="pageTotal>1">
    <nav>
      <a
        href="#"
        :class="{ disabled: pageNow == 1 }"
        @click.prevent="changePage('pre')"
        :disabled="true"
      >
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </a>
      <a
        href="#"
        v-for="page in $store.state.page.pageTotal"
        :key="page"
        :class="{ active: page == $store.state.page.pageNow }"
        @click.prevent="changePage(page)"
      >{{ page }}</a>
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
      padding: line(1);
      border-top: 1px solid $red;
      border-right: 1px solid $red;
      border-bottom: 1px solid $red;
      color: $red;
      transition: 0.8s;
      font-size: 1rem;
    }
    > a:first-child {
      border-left: 1px solid $red;
      border-radius: 8px 0 0 8px;
    }
    > a:last-child {
      border-radius: 0 8px 8px 0;
    }
    > a:hover,
    > .active {
      background-color: $red;
      color: white;
    }
    > a.disabled {
      background-color: #fff;
      color: #ddd;
      pointer-events: none;
    }
  }
}
</style>
