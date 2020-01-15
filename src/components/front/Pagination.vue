<template>
  <div class="pagination">
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
.pagination {
  text-align: center;
  margin: 20px 0;
  font-size: 0;
}
.pagination a {
  box-sizing: border-box;
  display: inline-block;
  background-color: #fff;
  padding: 5px 8px;
  border-top: 1px solid #8d2f23;
  border-right: 1px solid #8d2f23;
  border-bottom: 1px solid #8d2f23;
  text-decoration: none;
  color: #8d2f23;
  transition: 0.5s;
  font-size: 1.25rem;
}
.pagination a:hover,
.pagination .active {
  background-color: #8d2f23;
  color: white;
}
.pagination a:first-child {
  border-left: 1px solid #8d2f23;
  border-radius: 5px 0 0 5px;
}
.pagination a:last-child {
  border-radius: 0 5px 5px 0;
}
.pagination a.disabled {
  background-color: #fff;
  color: #ddd;
  pointer-events: none;
  //   border-color: #ddd;
}
</style>
