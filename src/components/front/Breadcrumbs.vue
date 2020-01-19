<template>
  <div class="breadcrumbs">
    <div class="container">
      <!-- ---在產品分類頁面 --- -->
      <div v-if="page">
        <i class="fas fa-home"></i>
        <a href="#" @click.prevent="toPage('/product')">產品介紹</a>
        <span>{{ categorySwitch }}</span>
      </div>
      <!-- ---在產品詳情頁面 --- -->
      <div v-if="$route.name==='productId'">
        <i class="fas fa-home"></i>
        <a href="#" @click.prevent="toPage('/product')">產品介紹</a>
        <a href="#" @click.prevent="toPage(`/product/${sort}`)">{{ product.category }}</a>
        <span>{{ product.title }}</span>
      </div>
      <!-- ---在結帳頁面 --- -->
      <div v-if="$route.name==='checkout'">
        <i class="fas fa-home"></i>
        <a href="#" @click.prevent="toPage('/product')">產品介紹</a>
        <span>結帳</span>
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
  created() {
    console.log(this.$route);
    console.log(this.$router);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";

.breadcrumbs {
  font-family: "Noto Serif TC", serif;
  > .container {
    > div {
      > i {
        color: $red;
      }
      > a {
        @extend %abutton;
        color: $red;
        margin: line(2);
        position: relative;
        ~ a:before {
          content: "/";
          position: absolute;
          left: -16px;
        }
        ~ span:before {
          content: "/";
          position: absolute;
          left: -16px;
        }
      }
      > a:hover {
        text-decoration: underline;
      }
      > span {
        color: black;
        display: inline-block;
        margin: line(2);
        position: relative;
      }
    }
  }
}
</style>