<template>
  <div class="productId" :key="$route.path">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <div class="container">
      <Breadcrumb />
      <div class="section">
        <!-- 圖片 -->
        <div class="pic">
          <img :src="product.imageUrl" alt />
        </div>
        <!-- 文字 -->
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
            <!-- 追蹤按鈕 -->
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
            <!-- 購物車按鈕 -->
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
      return this.$store.state.star.some(el => item.id === el.id);
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
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > .section {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      // 圖片
      > .pic {
        > img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          vertical-align: top;
        }
      }
      // 文字
      > .txt {
        display: flex;
        flex-direction: column;
        line-height: 1.5rem;
        > .title {
          font-size: 20px;
          line-height: 30px;
          color: #1e1e1e;
          font-weight: 900;
          margin: 0 0 line(1);
        }
        > .description {
          padding: 0 0 0 line(4);
          font-size: 15px;
          line-height: 1.5;
          color: #666;
        }
        > .content {
          border-top: 1px solid $light;
          margin: line(1) 0 0;
          padding: line(1) 0 0 line(4);
          font-size: 13px;
          color: $dark;
        }
        .linethrough {
          text-decoration: line-through;
          font-size: 15px;
          line-height: 2;
        }
        .price {
          color: red;
          line-height: 3rem;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 0 line(2);
        }
        // 數量區
        > .qty {
          display: flex;
          height: 48px;
          border-top: 1px solid $light;
          padding: line(2) 0 0 0;
          color: #4c4242;
          font-size: 15px;
          > .qtyBtn {
            @extend %abutton;
            height: 48px;
            text-align: center;
            line-height: 48px;
            border: 1px solid #666;
            color: #666;
            background-color: #fff;
            font-size: 36px;
            width: 48px;
            box-sizing: border-box;
            font-weight: 800;
          }
          // 禁止狀態
          > .qtyBtn.disabled {
            background-color: #fff;
            color: #ddd;
            pointer-events: none;
            border-color: #ddd;
          }
          > .qtyBtn:nth-child(2) {
            line-height: 40px;
          }
          > button:hover {
            cursor: pointer;
          }
          > input {
            width: 160px;
            height: 48px;
            box-sizing: border-box;
            border: 1px solid #666;
            font-size: 1.5rem;
            text-align: center;
          }
          > .unit {
            font-size: 15px;
            align-self: center;
            margin: 0 0 0 line(1);
          }
        }
        // 追蹤、購物車按鈕
        > .icon {
          margin: line(4) 0 0;
          font-size: 18px;
          text-align: center;
          > .star {
            background-color: $btn-star;
            color: white;
            padding: line(1);
            > i {
              margin: 0 line(1) 0 0;
            }
          }
          > .star:hover {
            background-color: $btn-star-hover;
          }
          > .addBtn {
            margin: 0 0 0 line(2);
            background-color: $btn-cart;
            color: white;
            padding: line(1);
            > i {
              margin: 0 line(1) 0 0;
            }
          }
          > .addBtn:hover {
            background-color: $btn-cart-hover;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .productId {
    width: 1160px;
    max-width: 1160px;
    > .container {
      width: 100%;
      > .section {
        flex-direction: row;
        // 圖片
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
        // 文字
        > .txt {
          margin: 0 line(2);
          width: 50%;
          align-self: flex-start;
          > .qty {
            > .amt {
              margin: 0 line(2) 0 0;
            }
          }
          // 追蹤、購物車按鈕
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
