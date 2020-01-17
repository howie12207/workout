<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "../Header.vue";
import Alert from "../AlertMessage.vue";
export default {
  name: "Product",
  components: { Header, Alert },
  computed: {
    ...mapGetters(["products", "isLoading"])
  },
  methods: {
    ...mapActions(["getProducts", "getStar", "getCart"])
  },
  created() {
    this.getProducts();
    // this.getStar();
    // this.getCart();
    // scroll(0, 0);
  }
};
</script>

<style lang="scss" scoped></style>
