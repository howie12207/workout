<template>
  <div id="app">
    <router-view />
    <Totop />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Totop from "./components/Totop.vue";
export default {
  components: { Footer, Totop }
};
</script>
<style lang="scss">
@import "./assets/all.scss";
* {
  font-family: "Noto Serif TC", serif;
}
</style>
