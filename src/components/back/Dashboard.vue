<template>
  <div class="dashboard">
    <Alert />
    <Header />
    <div class="section">
      <Sidebar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
export default {
  name: "Dashboard",
  components: { Header, Sidebar }
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  font-family: "Noto Serif TC", serif;
}
.dashboard .section {
  display: flex;
}
</style>
