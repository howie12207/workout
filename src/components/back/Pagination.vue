<template>
  <div class="pagination">
    <nav>
      <a
        href="#"
        :class="{ 'disabled': !(pagination.has_pre) }"
        @click.prevent="End_changePage('pre')"
        :disabled="true"
      >
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </a>
      <a
        href="#"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ 'active': page == pagination.current_page }"
        @click.prevent="End_changePage(page)"
      >{{ page }}</a>
      <a
        href="#"
        :class="{ 'disabled': !(pagination.has_next) }"
        @click.prevent="End_changePage('next')"
      >
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Pagination",
  computed: {
    ...mapGetters(["pagination", "products"])
  },
  methods: {
    End_changePage(page) {
      this.$store.dispatch("End_changePage", page);
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
  height: 29px;
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
  font-size: 16px;
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