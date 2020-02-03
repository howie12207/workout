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
          <h2 class="title">{{ product.title }}</h2>
          <h3 class="description">{{ product.description }}</h3>
          <h3 class="content" v-html="product.content"></h3>
          <div v-if="product.price !== product.origin_price">
            <span class="linethrough">原價: {{ product.origin_price | currency }}</span>
            <span class="price">特價: {{ product.price | currency }}</span>
          </div>
          <div v-else>
            <p class="price">售價: {{ product.origin_price | currency }}</p>
          </div>
          <div class="qty">
            <span class="amt">數量</span>
            <a
              href="#"
              @click.prevent="changeQty(-1)"
              class="qtyBtn"
              :class="{ disabled: qty <= 1 }"
            >-</a>
            <input
              type="text"
              v-model="qty"
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              maxlength="2"
            />
            <a
              href="#"
              @click.prevent="changeQty(1)"
              class="qtyBtn"
              :class="{ disabled: qty >= 99 }"
            >+</a>
            <span class="unit">{{ product.unit }}</span>
          </div>
          <div class="icon">
            <a
              href="#"
              class="star"
              @click.prevent="removeStar(product)"
              v-if="changeStar(product)"
            >
              <i class="fas fa-heart"></i>
              <span>取消追蹤</span>
            </a>
            <a href="#" class="star" @click.prevent="addStar(product)" v-else>
              <i class="far fa-heart"></i>
              <span>加入追蹤</span>
            </a>
            <a href="#" class="addBtn" @click.prevent="addCart(product.id, qty)">
              <i class="fas fa-cart-plus"></i>
              <span>加入購物車</span>
            </a>
          </div>
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
    // width: 100%;
    width: 90%;
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
          font-size: 20px;
          line-height: 30px;
          color: $red;
          font-weight: 900;
          margin: 0 0 line(1);
          > a {
            @extend %abutton;
            display: inline-block;
            color: red;
          }
        }
        > .description {
          padding: 0 0 0 line(4);
          font-size: 1rem;
          line-height: 1.5;
          color: #00a5a8;
        }
        > .content {
          border-top: 1px solid #eee;
          margin: line(1) 0 0;
          padding: line(1) 0 0 line(4);
          font-size: 13px;
        }
        .linethrough {
          text-decoration: line-through;
          font-size: 14px;
          line-height: 2;
        }
        .price {
          color: red;
          line-height: 3rem;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 0 line(2);
        }
        > .qty {
          display: flex;
          height: 48px;
          border-top: 1px solid #eee;
          padding: line(2) 0 0 0;

          > .qtyBtn {
            @extend %abutton;
            height: 48px;
            text-align: center;
            line-height: 48px;
            border: 1px solid $red;
            background-color: #fff;
            font-size: 36px;
            width: 48px;
            box-sizing: border-box;
            font-weight: 800;
          }
          > .qtyBtn:nth-child(2) {
            line-height: 40px;
          }
          > button:hover {
            cursor: pointer;
          }
          > input {
            color: $red;
            width: 160px;
            height: 48px;
            box-sizing: border-box;
            border: 1px solid $red;
            font-size: 1.5rem;
            text-align: center;
          }
          > .unit {
            font-size: 24px;
            align-self: center;
            margin: 0 0 0 line(1);
          }
        }
        > .icon {
          margin: line(4) 0 0;
          font-size: 18px;
          text-align: center;
          > .star {
            background-color: #caa1aa;
            color: white;
            padding: line(1);
            > i {
              margin: 0 line(1) 0 0;
            }
          }
          > .star:hover {
            background-color: #eec8c1;
          }
          > .addBtn {
            margin: 0 0 0 line(2);
            background-color: #89a1bb;
            color: white;
            padding: line(1);
            > i {
              margin: 0 line(1) 0 0;
            }
          }
          > .addBtn:hover {
            background-color: #abc3dd;
          }
        }
      }
    }
  }
}
.qtyBtn.disabled {
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
      width: 100%;
      > .section {
        flex-direction: row;
        > .pic {
          width: 50%;
          display: flex;
          justify-content: center;
          align-self: flex-start;
          > img {
            width: 500px;
            height: 500px;
          }
        }
        > .txt {
          margin: 0 line(2);
          width: 50%;
          align-self: flex-start;
          > .qty {
            > .amt {
              margin: 0 line(2) 0 0;
            }
          }
          > .icon {
            text-align: left;
            > .star {
              padding: line(1) line(4);
            }
            > .addBtn {
              padding: line(1) line(4);
            }
          }
        }
      }
    }
  }
}
</style>