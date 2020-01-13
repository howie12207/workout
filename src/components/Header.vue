<template>
  <div class="header">
    <header class="container">
      <router-link to="" class="logo">
        <div class="pic">
          <img src="../assets/logo.png" alt="Logo" />
        </div>
        <div class="txt">
          <h1>BestTrip</h1>
        </div>
      </router-link>
      <div class="menu">
        <div class="menuIcon">
          <a
            href="#"
            class="menu"
            @click.prevent="$store.commit('NAVSHOW', !navShow)"
          >
            <i class="fas fa-bars"></i>
          </a>
        </div>
        <nav class="nav" :class="{ navShow: navShow }">
          <router-link to="/">首頁</router-link>
          <router-link to="/about">關於我們</router-link>
          <router-link to="/product">旅遊景點</router-link>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["navShow"])
  }
};
</script>
<style lang="scss" scoped>
$red: #842b00;
$yellow: #ffd306;

.header {
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.8);
  font-family: "Noto Serif TC", serif;
  position: relative;
  > .container {
    height: 100%;
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .menu {
      > .menuIcon {
        font-size: 2rem;
      }
      > .nav {
        display: none;
        > a {
          display: block;
          color: white;
        }
        > a:hover {
          color: $yellow;
        }
      }
      > .nav.navShow {
        display: block;
        position: absolute;
        right: 0px;
        top: 60px;
        background-color: rgba(0, 0, 0, 0.8);
        > a {
          width: 250px;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
          border-bottom: 1px solid white;
        }
        > a:first-child {
          border-top: 1px solid white;
        }
      }
    }
    > .logo {
      height: 100%;
      display: flex;
      align-items: center;
      > .txt {
        > h1 {
          font-size: 1.5rem;
          color: $yellow;
        }
      }
      > .pic {
        height: 100%;
        width: 60px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

@media screen and (min-width: 960px) {
  .header {
    > .container {
      > .menu {
        > .menuIcon {
          display: none;
        }
        > .nav {
          display: block !important;
          position: relative !important;
          top: 0 !important;
          right: 0 !important;
          background-color: transparent !important;
          > a {
            display: inline-block;
            padding: 0 10px;
            border: none !important;
            width: 150px !important;
          }
        }
      }
    }
  }
}
</style>
