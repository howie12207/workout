<template>
  <div class="productId" :key="$route.path">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <div class="container">
      <Breadcrumb />
      <div class="section">
        <div class="pic">
          <img :src="product.imageUrl" alt />
        </div>
        <div class="txt">
          <h2 class="title">
            『 {{ product.title }} 』
            <a
              href="#"
              class="star"
              @click.prevent="removeStar(product)"
              v-if="changeStar(product)"
            >
              <i class="fas fa-heart"></i>
            </a>
            <a href="#" class="star" @click.prevent="addStar(product)" v-else>
              <i class="far fa-heart"></i>
            </a>
          </h2>
          <h3 class="description">{{ product.description }}</h3>
          <h3 class="intro">【 介紹 】</h3>
          <h3 class="content" v-html="product.content"></h3>
          <div v-if="product.price !== product.origin_price">
            <p class="linethrough">原價:{{ product.origin_price | currency }}</p>
            <p class="price">現在只要:{{ product.price | currency }}</p>
          </div>
          <div v-else>
            <p class="price">售價:{{ product.origin_price | currency }}</p>
          </div>
          <div class="qty">
            <p>數量</p>
            <button @click="changeQty(-1)" :class="{ disabled: qty <= 1 }">-</button>
            <input
              type="text"
              v-model="qty"
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              maxlength="2"
            />
            <button @click="changeQty(1)" :class="{ disabled: qty >= 99 }">+</button>
            <span>{{ product.unit }}</span>
          </div>
          <p class="total">小計:{{ (product.price * qty) | currency }}</p>
          <a href="#" class="addBtn" @click.prevent="addCart(product.id, qty)">加入購物車</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import Alert from "../AlertMessage.vue";
import Breadcrumb from "./Breadcrumb.vue";
import { mapGetters } from "vuex";
export default {
  name: "ProductId",
  components: { Header, Alert, Breadcrumb },
  computed: {
    ...mapGetters(["isLoading", "product"]),
    qty: {
      get() {
        return this.$store.state.qty;
      },
      set(value) {
        value = value.replace(/\D/g, "");
        this.$store.commit("QTY", value);
      }
    }
  },
  methods: {
    getProduct() {
      this.$store.dispatch("getProduct", this.$store.state.productId);
    },
    getCategory() {
      this.$store.dispatch("getCategory", this.$store.state.product.category);
    },
    changeQty(num) {
      this.$store.dispatch("changeQty", num);
    },
    addCart(id, qty = 1) {
      this.$store.dispatch("addCart", { id, qty });
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
    }
  },
  created() {
    this.$store.commit("PRODUCTID", this.$route.params.productId);
    this.getProduct();
    scroll(0, 0);
  },
  updated() {
    this.getCategory();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";

.productId {
  min-height: calc(100vh - 110px);
  margin: 0 auto line(1);
  width: 100%;
  max-width: 600px;
  > .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > .back {
      display: flex;
      > a {
        @extend %abutton;
        padding: line(0.5) line(1.5);
        margin: line(1) 0;
        border-radius: 5px;
        color: $red;
        border: 1px solid $red;
        > i {
          transition: 0.6s;
          transform: translateX(0);
        }
      }
      > a:hover {
        background-color: $red;
        color: white;
        > i {
          transform: translateX(-10px);
        }
      }
    }
    > .section {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      > .pic {
        > img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          vertical-align: top;
        }
      }
      > .txt {
        display: flex;
        flex-direction: column;
        line-height: 1.5rem;
        > .title {
          font-size: 1.5rem;
          line-height: 3rem;
          color: $red;
          font-weight: 900;
          > a {
            @extend %abutton;
            display: inline-block;
            color: red;
          }
        }
        > .description {
          font-size: 1.25rem;
          line-height: 2rem;
          color: $yellow;
        }
        > .intro {
          color: $red;
          font-size: 1.25rem;
          line-height: 2;
        }
        .linethrough {
          text-decoration: line-through;
          font-size: 1.25rem;
        }
        .price {
          color: red;
          line-height: 2rem;
        }
        > .qty {
          > button {
            border: 1px solid $red;
            background-color: #fff;
            font-size: 1.5rem;
            width: 50px;
            height: 50px;
            box-sizing: border-box;
            font-weight: 800;
          }
          > input {
            color: $red;
            width: 160px;
            height: 50px;
            box-sizing: border-box;
            border: 1px solid $red;
            font-size: 1.5rem;
            text-align: center;
          }
        }
        > .total {
          align-self: flex-end;
          color: red;
          font-size: 1.5rem;
          line-height: 2rem;
        }
        > .addBtn {
          @extend %abutton;
          align-self: flex-end;
          padding: line(0.5) line(1);
          margin: line(0.5) 0;
          border-radius: 5px;
          background-color: #fff;
          border: 1px solid $red;
          color: $red;
          font-size: 1.25rem;
          transform: translateY(0);
          transition: 0.6s;
        }
        > .addBtn:hover {
          background-color: $red;
          color: white;
          transform: translateY(5px);
        }
      }
    }
  }
}
button.disabled {
  background-color: #fff;
  color: #ddd;
  pointer-events: none;
  border-color: #ddd;
}
@media screen and (min-width: 1200px) {
  .productId {
    width: 1160px;
    max-width: 1160px;
    > .container {
      > .section {
        display: flex;
        flex-direction: row;
        > .pic {
          width: 50%;
          display: flex;
          justify-content: center;
          > img {
            width: 500px;
            height: 500px;
          }
        }
        > .txt {
          margin: 0 line(2);
          width: 50%;
        }
      }
    }
  }
}
</style>