<template>
  <div class="checkout">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <Breadcrumb />
    <ProgressBar />
    <div class="col-2">
      <!-- 購物車清單 -->
      <div class="cartlist">
        <!-- 清單按鈕 -->
        <transition name="fade">
          <table class="carttable" v-if="cartlistShow">
            <thead>
              <tr>
                <th class="edit">編輯</th>
                <th class="title">項目</th>
                <th class="eachprice textRight">單價</th>
                <th class="qty">數量</th>
                <th class="itemprice textRight">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="edit">
                  <a href="#" class="delBtn" @click.prevent="removeCart(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </a>
                </td>
                <td>{{ item.product.title }}</td>
                <td class="textRight">{{ item.product.price | currency }}</td>
                <td class="qty">{{ item.qty }}</td>
                <td class="textRight">
                  <p
                    :class="{ textThrough: item.final_total != item.total }"
                  >{{ item.total | currency }}</p>
                  <p
                    class="red"
                    v-if="item.final_total != item.total"
                  >{{ item.final_total | currency }}</p>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colspan="3"
                  class="textCenter"
                  :class="{ textThrough: cart.final_total != cart.total }"
                >總計</td>
                <td
                  colspan="3"
                  class="textCenter red"
                  :class="{ textThrough: cart.final_total != cart.total }"
                >{{ cart.total | currency }}</td>
              </tr>
              <tr v-if="cart.final_total != cart.total">
                <td colspan="3" class="textCenter red">優惠券折扣價</td>
                <td colspan="3" class="textCenter red">{{ cart.final_total | currency }}</td>
              </tr>
            </tfoot>
          </table>
        </transition>
        <a href="#" class="toggleCart" @click.prevent="cartlistshow">
          <span v-if="!cartlistShow">顯示</span>
          <span v-else>隱藏</span>購物明細
        </a>
        <!-- 優惠券區 -->
        <div class="coupon">
          <label for="coupon">輸入test獲得優惠</label>
          <div class="block">
            <input type="text" placeholder="輸入優惠碼" id="coupon" v-model="code" />
            <a href="#" @click.prevent="submitCoupon">套用優惠碼</a>
          </div>
        </div>
      </div>
      <!-- 購買人資訊 -->
      <div class="info">
        <!-- v-slot="{ invalid }" 為搭配BTN未符合狀態禁用 只要任一位有不符合就會回傳true -->
        <ValidationObserver tag="form" v-slot="{ invalid }" @submit.prevent="submitOrder">
          <ValidationProvider rules="required" v-slot="{ errors }" name="姓名">
            <label for="name">收件人姓名</label>
            <input
              type="text"
              placeholder="輸入收件人姓名"
              id="name"
              :class="{ invalid: errors[0] }"
              v-model="name"
            />
            <p class="tips">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }" name="電話">
            <label for="phone">收件人電話</label>
            <input
              type="text"
              placeholder="輸入收件人電話"
              id="phone"
              :class="{ invalid: errors[0] }"
              v-model="phone"
            />
            <p class="tips">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider rules="required|email" v-slot="{ errors }" name="Email">
            <label for="email">收件人信箱</label>
            <input
              type="email"
              placeholder="輸入收件人Email"
              id="email"
              :class="{ invalid: errors[0] }"
              v-model="email"
            />
            <p class="tips">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }" name="地址">
            <label for="address">收件人地址</label>
            <input
              type="text"
              placeholder="輸入收件人地址"
              id="address"
              :class="{ invalid: errors[0] }"
              v-model="address"
            />
            <p class="tips">{{ errors[0] }}</p>
          </ValidationProvider>
          <label for="message">留言</label>
          <textarea name id="message" cols="40" rows="10" placeholder="輸入對賣家說的話" v-model="message"></textarea>
          <button class="submit" :disabled="invalid" :class="{ disabled: invalid }">送出</button>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import Breadcrumb from "./Breadcrumb.vue";
import ProgressBar from "./ProgressBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Checkout",
  components: { ProgressBar, Breadcrumb, Header },
  computed: {
    ...mapGetters(["isLoading", "cart"]),
    cartlistShow() {
      return this.$store.state.cartlistShow;
    },
    name: {
      get() {
        return this.$store.state.customer.user.name;
      },
      set(value) {
        this.$store.commit("CUSTOMER_NAME", value);
      }
    },
    phone: {
      get() {
        return this.$store.state.customer.user.phone;
      },
      set(value) {
        this.$store.commit("CUSTOMER_PHONE", value);
      }
    },
    email: {
      get() {
        return this.$store.state.customer.user.email;
      },
      set(value) {
        this.$store.commit("CUSTOMER_EMAIL", value);
      }
    },
    address: {
      get() {
        return this.$store.state.customer.user.address;
      },
      set(value) {
        this.$store.commit("CUSTOMER_ADDRESS", value);
      }
    },
    message: {
      get() {
        return this.$store.state.customer.message;
      },
      set(value) {
        this.$store.commit("CUSTOMER_MESSAGE", value);
      }
    },
    code: {
      get() {
        return "";
      },
      set(value) {
        this.$store.commit("CODE", value);
      }
    }
  },
  methods: {
    ...mapActions(["getCart", "submitOrder", "submitCoupon"]),
    removeCart(id) {
      this.$store.dispatch("removeCart", id);
    },
    cartlistshow() {
      this.$store.commit("CARTLISTSHOW", !this.cartlistShow);
    }
  },
  created() {
    this.getCart();
    this.$store.commit("ORDER", "");
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.checkout {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Noto Serif TC", serif;
  color: #1e1e1e;
  font-size: 15px;
  > .col-2 {
    margin: line(1) auto;
    width: 95%;
    display: flex;
    flex-direction: column;
    // 購物車清單
    > .cartlist {
      // 清單按鈕
      > .toggleCart {
        @extend %abutton;
        text-align: center;
        background-color: #f7f7f7;
        padding: line(1);
        border-radius: 5px;
        color: #555;
        display: inline-block;
        width: 100%;
        max-width: 800px;
        box-sizing: border-box;
        font-size: 13px;
      }
      > .carttable {
        margin: 10px 0 0;
        width: 100%;
        max-width: 800px;

        th {
          // border-top: 1px solid $light;
          background-color: #f6f6f6;
        }
        th,
        td {
          padding: 10px 5px;
          text-align: left;
          border-bottom: 1px solid $light;
        }
        .edit,
        .qty {
          width: 10%;
          text-align: center;
        }
        .delBtn {
          @extend %abutton;
          color: $dark;
        }
        .delBtn:hover {
          opacity: 0.6;
        }
        .title,
        .eachprice,
        .itemprice {
          width: 20%;
        }
      }
      // 優惠券區
      > .coupon {
        margin: line(1) 0;
        > .block {
          display: flex;
          align-items: center;
          font-size: 0;
          > input {
            margin: line(1) 0;
            height: 30px;
            box-sizing: border-box;
            border-radius: 5px;
            padding: line(0.5) line(1);
            border: 1px solid $btn-star;
            width: 200px;
            border-radius: 5px 0 0 5px;
            font-size: 13px;
          }
          > a {
            @extend %abutton;
            background-color: $btn-star;
            height: 30px;
            display: flex;
            align-items: center;
            font-size: 13px;
            color: white;
            padding: line(0.5) line(1);
            box-sizing: border-box;
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
    // 購買人資訊
    > .info {
      > form {
        display: flex;
        flex-direction: column;
        label {
          display: block;
          line-height: 2rem;
        }
        input {
          width: 80%;
          box-sizing: border-box;
        }
        textarea {
          width: 80%;
        }
        input:focus,
        textarea:focus {
          outline: none;
          border: 1px solid $active;
        }
        input,
        textarea {
          border-radius: 5px;
          padding: line(0.5) line(1);
          border: 1px solid $primary;
        }
        input.invalid {
          border: 1px solid red;
        }
        .tips {
          height: 1rem;
          color: red;
          margin: 5px 0 0 10px;
        }
        button.submit {
          margin: line(1) 0;
          align-self: flex-end;
          padding: line(0.5) line(1.5);
          box-sizing: border-box;
          color: white;
          background-color: $btn-cart;
          border: 1px solid $btn-cart;
          border-radius: 5px;
          transition: 0.7s;
        }
        // 禁止狀態
        button.disabled {
          background-color: #fff;
          color: #ddd;
          pointer-events: none;
          border-color: #ddd;
        }
        button:hover {
          cursor: pointer;
          background-color: $btn-cart-hover;
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .checkout {
    width: 1160px;
    max-width: 1160px;
  }
  .checkout .col-2 {
    width: 1160px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  // 購物車清單及購買人資訊
  .checkout .cartlist,
  .checkout .info {
    width: 45%;
    margin: 0 auto;
  }
}
</style>
