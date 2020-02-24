<template>
  <div class="dashboard">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Alert from "../AlertMessage.vue";
import Header from "../Header.vue";

export default {
  name: "Dashboard",
  components: { Header, Alert },
  computed: {
    ...mapGetters(["isLoading"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  font-family: "Noto Serif TC", serif;
}
</style>
