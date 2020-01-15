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
          <input type="text" placeholder="輸入關鍵字" v-model="search" />
          <a href="#" @click.prevent="clearSearch">
            <i class="fas fa-times"></i>
          </a>
        </div>
      </transition>
      <transition name="fade">
        <nav class="category" v-if="menuShow">
          <a
            href="#"
            @click.prevent="categorySwitch('全部')"
            :class="{'active':$store.state.categorySwitch==='全部'}"
          >
            <img src="../../assets/All.jpg" alt="全部" />
            <p>全部</p>
          </a>
          <a
            href="#"
            @click.prevent="categorySwitch('亞洲')"
            :class="{'active':$store.state.categorySwitch==='亞洲'}"
          >
            <img src="../../assets/Asia.jpg" alt="亞洲" />
            <p>亞洲</p>
          </a>
          <a
            href="#"
            @click.prevent="categorySwitch('歐洲')"
            :class="{'active':$store.state.categorySwitch==='歐洲'}"
          >
            <img src="../../assets/Europe.jpg" alt="歐洲" />
            <p>歐洲</p>
          </a>
          <a
            href="#"
            @click.prevent="categorySwitch('美洲')"
            :class="{'active':$store.state.categorySwitch==='美洲'}"
          >
            <img src="../../assets/America.jpg" alt="美洲" />
            <p>美洲</p>
          </a>
          <a
            href="#"
            @click.prevent="categorySwitch('非洲')"
            :class="{'active':$store.state.categorySwitch==='非洲'}"
          >
            <img src="../../assets/Africa.jpg" alt="非洲" />
            <p>非洲</p>
          </a>
          <a
            href="#"
            @click.prevent="categorySwitch('大洋洲')"
            :class="{'active':$store.state.categorySwitch==='大洋洲'}"
          >
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
    },
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit("SEARCH", value);
      }
    }
  },
  methods: {
    menushow() {
      this.$store.commit("MENUSHOW", !this.menuShow);
    },
    categorySwitch(category) {
      this.$store.dispatch("categorySwitch", category);
    },
    clearSearch() {
      this.$store.commit("SEARCH", "");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.sidebar {
  width: 80%;
  padding: 0 0 line(2) 0;
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
        padding: line(1);
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
      max-width: 400px;
      font-size: 1.5rem;
      border: 1px solid $red;
      margin: line(2) auto;
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
      justify-content: space-around;
      > a {
        position: relative;
        margin: line(1);
        box-shadow: 0 0 5px $red;
        transform: scale(1);
        transition: 0.6s;
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
        }
      }
      > a:hover {
        transform: scale(0.9);
      }
      > a:hover img {
        opacity: 0.5;
      }
      > a:hover p {
        color: black;
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
.active {
  outline: 3px solid red;
}
</style>