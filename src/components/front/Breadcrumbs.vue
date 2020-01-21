<template>
  <div class="breadcrumbs">
    <div class="container">
      <!-- ---在產品分類頁面 --- -->
      <div v-if="page">
        <i class="fas fa-home"></i>
        <a href="#" @click.prevent="toPage('/product')" class="home">產品介紹</a>
        <span>{{ categorySwitch }}</span>
      </div>
      <!-- ---在產品詳情頁面 --- -->
      <div v-if="$route.name==='productId'">
        <i class="fas fa-home"></i>
        <a href="#" @click.prevent="toPage('/product')" class="home">產品介紹</a>
        <a href="#" @click.prevent="toPage(`/product/${sort}`)">{{ product.category }}</a>
        <span>{{ product.title }}</span>
      </div>
      <!-- ---在結帳頁面 --- -->
      <div v-if="$route.name==='checkout'">
        <i class="fas fa-home"></i>
        <a href="#" @click.prevent="toPage('/product')" class="home">產品介紹</a>
        <span>結帳</span>
      </div>
      <!-- ---在搜尋頁面 --- -->
      <div v-if="$route.name==='search'">
        <i class="fas fa-home"></i>
        <a href="#" @click.prevent="toPage('/product')" class="home">產品介紹</a>
        <span>商品搜尋</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["product"]),
    sort() {
      return this.$store.state.sort;
    },
    categorySwitch() {
      return this.$store.state.categorySwitch;
    },
    page() {
      let now = this.$route.name;
      if (
        now === "equipment" ||
        now === "clothes" ||
        now === "course" ||
        now === "accessory" ||
        now === "gear" ||
        now === "boxing" ||
        now === "nutrition" ||
        now === "sales"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions(["toProducts"]),
    toPage(page) {
      this.$store.dispatch("toPage", page);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";

.breadcrumbs {
  font-family: "Noto Serif TC", serif;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  > .container {
    > div {
      > i {
        color: $red;
      }
      > a {
        @extend %abutton;
        color: $red;
        margin: line(1) 0 line(1) line(1.5);
        position: relative;
        ~ a:before {
          content: ">";
          position: absolute;
          left: -10px;
        }
        ~ span:before {
          content: ">";
          position: absolute;
          left: -10px;
        }
      }
      > a.home {
        margin: line(1) 0 line(1) line(1);
      }
      > a:hover {
        text-decoration: underline;
      }
      > span {
        color: black;
        display: inline-block;
        margin: line(1) 0 line(1) line(1.5);
        position: relative;
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .breadcrumbs {
    width: 1160px;
    max-width: 1160px;
    > .container {
      > div {
        > a {
          margin: line(1) 0 line(1) line(3);
          ~ a:before {
            left: -16px;
          }
          ~ span:before {
            left: -16px;
          }
        }
        > span {
          margin: line(1) 0 line(1) line(3);
        }
      }
    }
  }
}
</style>