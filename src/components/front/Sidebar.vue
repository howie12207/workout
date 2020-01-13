<template>
  <div class="sidebar">
    <div class="container">
      <div class="menu">
        <a href="#" @click.prevent="menushow">
          <span>選單</span>
          <span class="toggle" v-if="!menuShow">
            <i class="fas fa-angle-double-down"></i>
          </span>
          <span class="toggle" v-else>
            <i class="fas fa-angle-double-up"></i>
          </span>
        </a>
      </div>
      <transition name="fade">
        <div class="search" v-if="menuShow">
          <input type="text" placeholder="輸入關鍵字" />
          <a href>
            <i class="fas fa-times"></i>
          </a>
        </div>
      </transition>
      <transition name="fade">
        <nav class="category" v-if="menuShow">
          <a href="#">
            <img src="../../assets/All.jpg" alt="全部" />
            <p>全部</p>
          </a>
          <a href="#">
            <img src="../../assets/Asia.jpg" alt="亞洲" />
            <p>亞洲</p>
          </a>
          <a href="#">
            <img src="../../assets/Europe.jpg" alt="歐洲" />
            <p>歐洲</p>
          </a>
          <a href="#">
            <img src="../../assets/America.jpg" alt="美洲" />
            <p>美洲</p>
          </a>
          <a href="#">
            <img src="../../assets/Africa.jpg" alt="非洲" />
            <p>非洲</p>
          </a>
          <a href="#">
            <img src="../../assets/Oceania.png" alt="大洋洲" />
            <p>大洋洲</p>
          </a>
        </nav>
      </transition>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    // ...mapGetters(["menuShow"]),
    menuShow() {
      return this.$store.state.menuShow;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    menushow() {
      this.$store.commit("MENUSHOW", !this.menuShow);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.sidebar {
  width: 80%;
  padding: 0 0 20px 0;
  margin: 10px auto;
  text-align: center;
  font-family: "Noto Serif TC", serif;
  border-bottom: 1px solid $red;
  > .container {
    > .menu {
      > a {
        @extend %abutton;
        color: white;
        background-color: $red;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        position: relative;
        > .toggle {
          position: absolute;
          right: 20px;
        }
      }
    }
    > .search {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      border: 1px solid $red;
      margin: 20px auto;
      border-radius: 5px;
      > input {
        border: none;
        background-color: white;
        color: $red;
        height: 60px;
        width: 80%;
        font-size: 1.5rem;
        margin: 0 auto;
      }
      > a {
        @extend %abutton;
        text-align: center;
        width: 10%;
        margin: 0 auto;
        color: $red;
      }
    }
    > .category {
      display: flex;
      flex-wrap: wrap;
      //   flex-direction: column;
      justify-content: space-around;
      > a {
        position: relative;
        margin: 10px;
        > img {
          width: 150px;
          height: 100px;
          vertical-align: top;
          opacity: 1;
          transition: 0.6s;
        }
        > p {
          position: absolute;
          height: 2rem;
          font-size: 2rem;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          color: white;
          transition: 0.6s;
          transform: translateY(0px);
        }
      }
      > a:hover img {
        opacity: 0.7;
      }
      > a:hover p {
        color: black;
        transform: translateY(10px);
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>