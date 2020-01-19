<template>
  <div class="header">
    <router-link to="/product" class="logo">
      <img src="../assets/logo.png" alt="logo" />
      <h2>健身趣</h2>
    </router-link>
    <nav class="sort">
      <a href="#" @click.prevent="categorySwitch('equipment')">
        <img src="../assets/dumbell.png" alt="equipment" />
        <h3>健身器材</h3>
      </a>
      <a href="#" @click.prevent="categorySwitch('clothes')">
        <img src="../assets/clothes.png" alt="clothes" />
        <h3>運動服飾</h3>
      </a>
      <a href="#" @click.prevent="categorySwitch('course')">
        <img src="../assets/coach.png" alt="course" />
        <h3>專業課程</h3>
      </a>
      <a href="#" @click.prevent="categorySwitch('accessory')">
        <img src="../assets/bag.png" alt="accessory" />
        <h3>運動配件</h3>
      </a>
      <a href="#" @click.prevent="categorySwitch('gear')">
        <img src="../assets/gloves.png" alt="gear" />
        <h3>健身護具</h3>
      </a>
      <a href="#" @click.prevent="categorySwitch('boxing')">
        <img src="../assets/boxing.png" alt="boxing" />
        <h3>拳擊用品</h3>
      </a>
      <a href="#" @click.prevent="categorySwitch('nutrition')">
        <img src="../assets/food.png" alt="nutrition" />
        <h3>營養補充</h3>
      </a>
    </nav>
    <div class="icon">
      <a href="#">
        <i class="fas fa-search"></i>
      </a>
      <div class="star">
        <i class="fas fa-heart"></i>
        <span class="num" v-if="star.length">{{ star.length }}</span>
        <ul class="list starlist">
          <li class="titlelist" v-if="star.length < 1">
            <span>目前沒有觀察名單</span>
          </li>
          <li class="titlelist" v-else>
            <span>觀察清單</span>
          </li>
          <li v-for="(item, index) in star" :key="index">
            <a href="#" class="delBtn" @click.prevent="removeStar(item)">
              <i class="fas fa-heart"></i>
            </a>
            <a href="#" @click.prevent="seeMore(item.id)">
              <span class="title">{{ item.title }}</span>
              <span class="price">{{ item.price | currency }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="cart" v-if="cart.carts">
        <a href="#" @click.prevent="toCheckout">
          <i class="fas fa-shopping-cart"></i>
        </a>
        <span class="num" v-if="cart.carts.length">{{ cart.carts.length }}</span>
        <ul class="list cartlist" v-if="cart.carts">
          <li class="titlelist" v-if="cart.carts.length < 1">
            <span>目前購物車為空</span>
          </li>
          <li class="titlelist" v-else>
            <span>購物車</span>
            <router-link to="/checkout" class="txt">
              <span>結帳</span>
            </router-link>
          </li>
          <li v-for="(item, index) in cart.carts" :key="index">
            <a href="#" class="delBtn" @click.prevent="removeCart(item.id)">
              <i class="far fa-trash-alt"></i>
            </a>
            <a href="#" @click.prevent="seeMore(item.product.id)">
              <span class="title">{{ item.product.title }}</span>
              <span class="qty">{{ item.qty }}{{ item.product.unit }}</span>
              <span class="price">{{ item.final_total | currency }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["cart", "star"])
    // ...mapGetters(["navShow"])
  },
  methods: {
    categorySwitch(category) {
      this.$store.dispatch("categorySwitch", category);
    },
    clearSearch() {
      this.$store.commit("SEARCH", "");
    },
    removeStar(item) {
      this.$store.dispatch("removeStar", item);
    },
    removeCart(item) {
      this.$store.dispatch("removeCart", item);
    },
    seeMore(page) {
      this.$store.dispatch("seeMore", page);
    },
    changeStar(item) {
      const vm = this;
      return vm.$store.state.star.some(el => {
        const result = item.id === el.id;
        return result;
      });
    },
    toCheckout() {
      this.$store.dispatch("toPage", "/checkout");
    }
    // navshow() {
    //   this.$store.commit("NAVSHOW", !this.navShow);
    // },
    // navClose() {
    //   this.$store.commit("NAVSHOW", false);
    // }
  },
  created() {
    this.$store.dispatch("getCart");
    this.$store.dispatch("getStar");
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/variable.scss";
a {
  @extend %abutton;
}
.header {
  position: sticky;
  // width: 100%;
  // max-width: 1200px;
  width: 1200px;
  margin: 0 auto line(1);
  padding: 0 line(1);
  height: 120px;
  box-sizing: border-box;
  font-family: "Noto Serif TC", serif;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  z-index: 2;
  > .logo {
    // --- logo ---
    @extend %abutton;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    margin: 0 line(3) 0 0;
    > img {
      width: 80px;
      height: 80px;
    }
    > h2 {
      width: 80px;
      text-align: center;
      padding: line(0.5) 0;
      color: $red;
    }
  }
  > .sort {
    // --- 分類 ---
    display: flex;
    align-items: center;
    height: 100%;
    > a {
      @extend %abutton;
      color: $red;
      padding: 0 line(2);
      margin: line(2) 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      > img {
        width: 40px;
        height: 40px;
        margin: 0 0 line(2);
      }
    }
    > a:hover:after {
      content: "";
      position: absolute;
      bottom: -16px;
      width: 100%;
      height: 3px;
      background-color: $red;
    }
  }
  > .icon {
    // --- icon ---
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 100%;
    margin: 0 0 0 line(16);
    > a,
    div {
      @extend %abutton;
      color: $red;
      font-size: 1.75rem;
      margin: 0 line(2);
      position: relative;
      > i {
        height: 40px;
        padding: line(1);
      }
      > a {
        > i {
          color: $red;
          height: 40px;
          padding: line(1);
        }
      }
      > span {
        position: absolute;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        top: -0px;
        right: -4px;
        background-color: #92a6b5;
        border-radius: 50%;
        font-size: 1rem;
        color: white;
      }
      > .cartlist {
        display: none;
      }
      > .starlist {
        width: 260px !important;
      }
      > .list {
        border-top: 1px solid #ccc;
        display: none;
        position: absolute;
        width: 300px;
        font-size: 1rem;
        right: -32px;
        top: 56px;
        background-color: #fff;
        padding: line(1) line(1);
        box-sizing: border-box;
        > .titlelist {
          display: flex;
          justify-content: space-between;
          > span {
            line-height: 1.5rem;
          }
          > a {
            background-color: $red;
            padding: line(1);
            box-sizing: border-box;
            border-radius: 8px;
            color: white;
          }
        }
        li {
          display: flex;
          align-items: center;
          margin: line(1) 0 0;
          .delBtn {
            display: inline-block;
            color: red;
            width: 24px;
          }
          a {
            display: flex;
            align-items: center;
            transform: scale(1);
            transition: 0.7s;
            .title {
              display: inline-block;
              color: black;
              width: 160px;
            }
            .qty {
              display: inline-block;
              width: 40px;
              color: black;
            }
            .price {
              display: inline-block;
              color: red;
              text-align: right;
              width: 56px;
            }
          }
          a:hover {
            transform: scale(0.95);
          }
        }
      }
    }
    > a:hover,
    div:hover {
      > .list {
        display: block;
      }
    }
  }
}
</style>
