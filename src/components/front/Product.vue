<template>
  <div class="product">
    <Header />
    <Banner />
    <Sidebar />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "../Header.vue";
import Banner from "./Banner.vue";
import Sidebar from "./Sidebar.vue";
export default {
  name: "Product",
  components: { Header, Banner, Sidebar },
  computed: {
    ...mapGetters(["products"])
  },
  methods: {
    ...mapActions(["getProducts"])
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped></style>
