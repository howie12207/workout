<template>
  <div class="about">
    <Header />
    <div class="section"></div>
  </div>
</template>

<script>
import Header from "../Header.vue";
export default {
  name: "About",
  components: { Header }
};
</script>

<style lang="scss" scoped>
.about {
  font-family: "Noto Serif TC", serif;
}
</style>