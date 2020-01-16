<template>
  <div class="main">
    <div class="container" v-if="pageProducts.length">
      <div class="item" v-for="item in pageProducts" :key="item.id">
        <a
          href="#"
          class="sorttxt"
          @click.prevent="categorySwitch(item.category)"
        >{{ item.category }}</a>
        <a href="#" class="star" @click.prevent="removeStar(item)" v-if="changeStar(item)">
          <i class="fas fa-heart"></i>
        </a>
        <a href="#" class="star" @click.prevent="addStar(item)" v-else>
          <i class="far fa-heart"></i>
        </a>
        <div class="pic">
          <img :src="item.imageUrl" alt />
          <a href="#" class="mask" @click.prevent="seeMore(item.id)">查看更多</a>
        </div>
        <div class="txt">
          <a href="#" class="title" @click.prevent="seeMore(item.id)">{{ item.title }}</a>
          <p v-if="item.price !== item.origin_price">
            <span class="linethrough">原價:{{ item.origin_price | currency }}元</span>
            <span class="special">特價:{{ item.price | currency }}元</span>
          </p>
          <p v-else>
            <span>售價:{{ item.origin_price | currency }}元</span>
          </p>
        </div>
      </div>
    </div>
    <div class="empty" v-else>查無 '{{ search }}' 相關資料</div>
    <Pagination v-if="pageProducts.length" />
    <div class="star" v-clickout="starClose">
      <a href="#" class="block" @click.prevent="starshow">
        <i class="fas fa-heart"></i>
        <span class="num" v-if="star.length > 0">{{ star.length }}</span>
      </a>
      <ul class="list starlist" v-if="starShow">
        <li class="titlelist" v-if="star.length < 1">
          <span>目前觀察清單為空</span>
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
    <div class="cart" v-clickout="cartClose">
      <a href="#" class="block" @click.prevent="cartshow" v-if="cart.carts">
        <i class="fas fa-shopping-cart"></i>
        <span class="num" v-if="cart.carts.length>0">{{ cart.carts.length }}</span>
      </a>
      <ul class="list cartlist" v-if="cartShow">
        <li class="titlelist" v-if="cart.carts.length < 1">
          <span>目前購物車為空</span>
        </li>
        <li class="titlelist" v-else>
          <span>購物車</span>
          <router-link to="/checkout" class="txt">
            <span>前往結帳</span>
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
</template>


<script>
import { mapGetters } from "vuex";
import Pagination from "./Pagination.vue";
export default {
  components: { Pagination },
  computed: {
    ...mapGetters(["products", "cart"]),
    starShow() {
      return this.$store.state.starShow;
    },
    cartShow() {
      return this.$store.state.cartShow;
    },
    star() {
      return this.$store.state.star;
    },
    search() {
      return this.$store.state.search;
    },
    pageProducts() {
      let vm = this;
      const nowPage = this.$store.state.page.pageNow;
      const str = nowPage * 9 - 9;
      const end = nowPage * 9;
      let tmpProduct = this.$store.state.products;
      if (vm.$store.state.categorySwitch !== "全部") {
        tmpProduct = tmpProduct.filter(function(item) {
          return item.category.match(vm.$store.state.categorySwitch);
        });
      }
      tmpProduct = tmpProduct.filter(function(item) {
        return item.title.match(vm.$store.state.search);
      });
      this.$store.commit("PAGETOTAL", Math.ceil(tmpProduct.length / 10));
      tmpProduct = tmpProduct.slice(str, end);
      return tmpProduct;
    }
  },
  methods: {
    starClose() {
      this.$store.commit("STARSHOW", false);
      // console.log("1");
    },
    starshow() {
      this.$store.commit("STARSHOW", !this.starShow);
    },
    cartClose() {
      this.$store.commit("CARTSHOW", false);
      // console.log("1");
    },
    cartshow() {
      this.$store.commit("CARTSHOW", !this.cartShow);
    },
    categorySwitch(category) {
      this.$store.dispatch("categorySwitch", category);
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
    addStar(item) {
      this.$store.dispatch("addStar", item);
    },
    removeStar(item) {
      this.$store.dispatch("removeStar", item);
    },
    addCart(id, qty = 1) {
      this.$store.dispatch("addCart", { id, qty });
    },
    removeCart(item) {
      this.$store.dispatch("removeCart", item);
    }
  },
  created() {
    this.$store.commit("CARTSHOW", false);
    this.$store.commit("STARSHOW", false);
    this.$store.commit("NAVSHOW", false);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.main {
  width: 100%;
  > .container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > .item {
      width: 300px;
      height: 325px;
      border: 1px solid #eee;
      margin: line(1) line(2);
      border-radius: 5px;
      color: $red;
      box-shadow: 0 0 10px black;
      transform: translateY(0);
      transition: 0.6s;
      position: relative;
      > .sorttxt {
        @extend %abutton;
        position: absolute;
        writing-mode: vertical-lr;
        top: 5px;
        right: -26px;
        color: $red;
        background-color: orange;
        padding: line(0.5);
        border-radius: 5px;
        display: inline-block;
        align-self: flex-end;
        transform: translateY(0);
        transition: 0.6s;
        z-index: 2;
      }
      > .sorttxt:hover {
        transform: translateY(5px);
      }
      > .star {
        text-decoration: none;
        color: red;
        position: absolute;
        font-size: 2rem;
        top: 10px;
        right: 10px;
        z-index: 3;
      }
      > .pic {
        width: 100%;
        position: relative;
        > img {
          width: 100%;
          height: 250px;
          vertical-align: top;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        > .mask {
          @extend %abutton;
          display: none;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.6);
          width: 100%;
          height: 250px;
          top: 0;
          font-size: 2rem;
          line-height: 250px;
          text-align: center;
          font-weight: 900;
          color: white;
          z-index: 2;
        }
      }
      > .pic:hover > .mask {
        display: block;
      }
      > .txt {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 line(0.5);
        height: 75px;
        > .title {
          @extend %abutton;
          align-self: flex-start;
          font-size: 1.25rem;
          position: relative;
          margin: line(0.5) 0;
          color: $red;
          font-weight: 900;
        }
        > .title:after {
          content: "";
          position: absolute;
          left: 50%;
          right: 50%;
          top: 0;
          bottom: -5px;
          border-bottom: 2px solid $red;
          transition: 0.7s;
        }
        > .title:hover:after {
          left: 0;
          right: 0;
        }
        > p {
          display: flex;
          font-size: 1.25rem;
          line-height: 2rem;
          justify-content: space-around;
          > .linethrough {
            position: relative;
            transform: scale(1);
            transition: 0.7s;
          }
          > .linethrough:after {
            content: "";
            position: absolute;
            left: 0;
            right: 100%;
            top: 50%;
            bottom: 50%;
            border-bottom: 2px solid $red;
            transition: 0.7s;
          }
          > .special {
            // display: none;
            opacity: 0;
            color: red;
            font-weight: 700;
            transition: 0.7s;
          }
        }
      }
    }
    > .item:hover {
      transform: translateY(3px);
    }
    > .item:hover .linethrough:after {
      right: 0 !important;
    }
    > .item:hover .linethrough {
      transform: scale(0.9) !important;
    }
    > .item:hover .special {
      opacity: 1 !important;
    }
  }
  > .empty {
    max-width: 1200px;
    width: 90%;
    margin: 30px auto;
    display: flex;
    justify-content: center;
    font-size: 2rem;
  }
  > .star {
    position: fixed;
    bottom: 210px;
    left: 10px;
    display: flex;
    z-index: 10;
    > .block {
      @extend %abutton;
      color: white;
      width: 50px;
      height: 50px;
      background-color: #666;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;
      transform: translateY(0);
      transition: 0.6s;
      > i {
        font-size: 1.5rem;
      }
      > .num {
        position: absolute;
        top: 0;
        right: 0;
        background-color: red;
        padding: 3px line(0.5);
        border-radius: 50%;
        color: white;
      }
    }
    > .block:focus,
    .block:hover {
      transform: translateY(3px);
      color: $red;
      i {
        animation: spin 0.5s infinite alternate;
      }
    }
    > .list {
      background-color: white;
      position: absolute;
      bottom: 60px;
      left: 0px;
      width: 300px;
      max-height: 250px;
      overflow: auto;
      box-shadow: 0 0 10px black;
      border-radius: 5px;
      > li {
        color: $yellow;
        display: flex;
        align-items: center;
        > a {
          @extend %abutton;
          color: $red;
          display: flex;
          justify-content: space-between;
          padding: line(1);
          width: calc(100% - 40px);
          transform: scale(1);
          transition: 1s;
          > .price {
            color: red;
            margin: 0 0 0 line(1);
          }
        }
        > .delBtn {
          width: 40px;
          box-sizing: border-box;
        }
        > a:hover {
          transform: scale(0.9);
        }
      }
      > li:not(.titlelist) {
        border-top: 1px solid $red;
      }
      > .titlelist {
        > span {
          font-size: 1.5rem;
          padding: line(1);
        }
      }
    }
  }
  > .cart {
    position: fixed;
    bottom: 110px;
    left: 10px;
    display: flex;
    z-index: 10;

    > .block {
      @extend %abutton;
      color: white;
      width: 50px;
      height: 50px;
      background-color: #666;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;
      transform: translateY(0);
      transition: 0.6s;
      > i {
        font-size: 1.5rem;
      }
      > .num {
        position: absolute;
        top: 0;
        right: 0;
        background-color: red;
        padding: 3px line(0.5);
        border-radius: 50%;
        color: white;
      }
    }
    > .block:focus,
    .block:hover {
      transform: translateY(3px);
      color: $red;
      i {
        animation: spin 0.5s infinite alternate;
      }
    }
    > .list {
      background-color: white;
      position: absolute;
      bottom: 60px;
      left: 0px;
      width: 300px;
      max-height: 250px;
      overflow: auto;
      width: 300px;
      box-shadow: 0 0 10px black;
      border-radius: 5px;
      > li {
        color: $yellow;
        display: flex;
        align-items: center;
        > a {
          @extend %abutton;
          color: $red;
          display: flex;
          justify-content: space-between;
          padding: line(1);
          width: calc(100% - 40px);
          transform: scale(1);
          transition: 1s;
          > .price {
            color: red;
            margin: 0 0 0 line(1);
          }
        }
        > .delBtn {
          width: 36px;
          box-sizing: border-box;
        }
        > a:hover {
          transform: scale(0.9);
        }
      }
      > li:not(.titlelist) {
        border-top: 1px solid $red;
      }
      > .titlelist {
        display: flex;
        justify-content: space-between;
        > span {
          font-size: 1.5rem;
          padding: line(1);
        }
        > a {
          width: 70px;
          display: block;
          text-align: center;
          background-color: $red;
          color: white;
          border-radius: 5px;
          margin: 0 line(1) 0 0;
          > i {
            display: none;
          }
        }
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
}
@media screen and (min-width: 960px) {
  .main {
    .cart {
      .list {
        max-height: 500px !important;
      }
    }
    .star {
      .list {
        max-height: 500px !important;
      }
    }
  }
}
</style>