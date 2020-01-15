<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <Banner />
    <Sidebar />
    <Main />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "../Header.vue";
import Alert from "../AlertMessage.vue";
import Banner from "./Banner.vue";
import Sidebar from "./Sidebar.vue";
import Main from "./Main.vue";
export default {
  name: "Product",
  components: { Header, Alert, Banner, Sidebar, Main },
  computed: {
    ...mapGetters(["products", "isLoading"])
  },
  methods: {
    ...mapActions(["getProducts", "getStar", "getCart"])
  },
  created() {
    this.getProducts();
    this.getStar();
    this.getCart();
  }
};
</script>

<style lang="scss" scoped></style>
