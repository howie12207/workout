<template>
  <div class="sidebar" :class="{ show: show }">
    <nav>
      <a href="#" class="toggle" @click.prevent="toggleSwitch" v-if="show">
        <i class="fas fa-angle-double-left"></i>
      </a>
      <a href="#" class="toggle" @click.prevent="toggleSwitch" v-else>
        <i class="fas fa-angle-double-right"></i>
      </a>
      <h3>管理員</h3>
      <router-link
        to="/admin/productslist"
        :class="{ active: $route.path == '/admin/productslist' }"
        >產品列表</router-link
      >
      <router-link
        to="/admin/orderslist"
        :class="{ active: $route.path == '/admin/orderslist' }"
        >訂單列表</router-link
      >
      <router-link
        to="/admin/couponslist"
        :class="{ active: $route.path == '/admin/couponslist' }"
        >優惠券</router-link
      >
    </nav>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      show: false
    };
  },
  methods: {
    toggleSwitch() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 30px 0 0 0;
  width: 150px;
  font-family: "Noto Serif TC", serif;
  font-size: 1.25rem;
  box-sizing: border-box;
  position: relative;
  transition: 0.6s;
}
.sidebar nav {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.sidebar nav .toggle {
  display: none;
  position: absolute;
  top: 50%;
  right: -28px;
  color: red;
}
.sidebar nav h3 {
  margin: 10px;
}
.sidebar nav a {
  text-decoration: none;
  margin: 0 10px;
  padding: 10px;
  color: #8d2f23;
  border-radius: 10px;
  transition: 0.6s;
}
.sidebar nav a:hover {
  background-color: #8d2f23;
  color: white;
}
.sidebar nav a.active {
  background-color: #8d2f23;
  color: white;
}

@media screen and (max-width: 800px) {
  .sidebar {
    margin-left: -150px;
    position: absolute;
    border-radius: 0 10px 10px 0;
  }
  .show {
    margin-left: 0;
    background-color: rgba(43, 43, 43, 0.9);
    z-index: 5;
    height: calc(100vh - 60px);
  }
  .sidebar nav .toggle {
    display: block;
    border-radius: 50%;
    background-color: rgba(43, 43, 43, 0.9);
  }
}
</style>
