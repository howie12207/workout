<template>
  <header class="header">
    <div class="container">
      <a href="#" class="logo">
        <img src="../../assets/logo.png" alt="logo" />
        <h2>BestTrip</h2>
      </a>
      <nav class="nav">
        <button @click="logout">登出</button>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: #2b2b2b;
  height: 60px;
  font-family: "Noto Serif TC", serif;
}
.header .container {
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header .logo {
  margin: 0 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #8d2f23;
  font-weight: 900;
}
.header .logo h2 {
  text-shadow: 0 0 3px white;
}
.header .logo img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.header button {
  font-size: 20px;
}
@media screen and (max-width: 800px) {
  .header .container {
    width: 100%;
  }
  .header .container .logo {
    font-size: 1.5rem;
  }
}
</style>
