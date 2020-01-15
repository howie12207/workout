<template>
  <div class="productId">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <div class="container">
      <div class="back">
        <a href="#" @click="toProducts">
          <i class="fas fa-arrow-left"></i>返回
        </a>
      </div>
      <div class="section">
        <div class="pic">
          <img :src="product.imageUrl" alt />
        </div>
        <div class="txt">
          <h2 class="title">
            【 {{ product.title }} 】
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
          <h3 class="content" v-html="product.content"></h3>
          <div v-if="product.price !== product.origin_price">
            <p class="linethrough">原價:{{ product.origin_price | currency }}</p>
            <p class="price">現在只要:{{ product.price | currency }}</p>
          </div>
          <div v-else>
            <p class="price">售價:{{ product.origin_price | currency }}</p>
          </div>
          <select name id v-model="qty" class="qty">
            <option :value="num" v-for="num in 10" :key="num">報名人數: {{ num }}人</option>
          </select>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductId",
  components: { Header, Alert },
  computed: {
    ...mapGetters(["isLoading", "product"]),
    qty: {
      get() {
        return this.$store.state.qty;
      },
      set(value) {
        this.$store.commit("QTY", value);
      }
    }
  },
  methods: {
    ...mapActions(["toProducts"]),
    getProduct() {
      this.$store.dispatch("getProduct", this.$store.state.productId);
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.productId {
  min-height: calc(100vh - 110px);
  margin: 0 0 10px;
  > .container {
    max-width: 1200px;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
      > .pic {
        > img {
          width: 100%;
          vertical-align: top;
        }
      }
      > .txt {
        display: flex;
        flex-direction: column;
        line-height: 1.5rem;
        > .title {
          font-size: 1.5rem;
          line-height: 2rem;
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
          color: $yellow;
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
          width: 300px;
          padding: line(0.5) line(1);
        }
        > .qty:focus {
          outline: 1px solid $red;
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

@media screen and(min-width:960px) {
  .productId {
    > .container {
      > .section {
        display: flex;
        flex-direction: row;
        > .pic {
          width: 50%;
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