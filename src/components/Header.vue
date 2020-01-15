<template>
  <div class="header">
    <header class="container">
      <router-link to class="logo">
        <div class="pic">
          <img src="../assets/logo.png" alt="Logo" />
        </div>
        <div class="txt">
          <h1>BestTrip</h1>
        </div>
      </router-link>
      <div class="menu" v-clickout="navClose">
        <div class="menuIcon">
          <a href="#" class="menu" @click.prevent="navshow">
            <i class="fas fa-bars" v-if="!navShow"></i>
            <i class="fas fa-times" v-else></i>
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
  },
  methods: {
    navshow() {
      this.$store.commit("NAVSHOW", !this.navShow);
    },
    navClose() {
      this.$store.commit("NAVSHOW", false);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/variable.scss";
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.8);
  font-family: "Noto Serif TC", serif;
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
        > a {
          @extend %abutton;
          color: white;
        }
      }
      > .nav {
        display: none;
        z-index: 10;
        > a {
          @extend %abutton;
          color: white;
          position: relative;
          text-align: center;
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
          @extend %abutton;
          width: 250px;
          padding: line(2);
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
      @extend %abutton;
      height: 100%;
      display: flex;
      align-items: center;
      > .txt {
        > h1 {
          font-size: 1.5rem;
          color: $red;
          font-weight: 900;
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
            display: inline-block !important;
            margin: 0 line(1) !important;
            border: none !important;
            width: 80px !important;
            padding: 0 !important;
          }
          > a:after {
            content: "";
            position: absolute;
            left: 50%;
            right: 50%;
            top: 0;
            bottom: -5px;
            border-bottom: 2px solid $yellow;
            transition: 0.7s;
          }
          > a:hover:after {
            left: 0;
            right: 0;
          }
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
