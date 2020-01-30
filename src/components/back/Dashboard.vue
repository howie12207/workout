<template>
  <div class="dashboard">
    <Alert />
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../Header.vue";
export default {
  name: "Dashboard",
  components: { Header }
};
</script>

<style lang="scss" scoped>
.dashboard {
  font-family: "Noto Serif TC", serif;
}
</style>
