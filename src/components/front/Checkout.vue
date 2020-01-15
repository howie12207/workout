<template>
  <div class="cart">
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <Header />
    <ProgressBar />
    <!-- ----- 購物車清單 ----- -->
    <div class="col-2">
      <div class="cartlist">
        <a href="#" class="toggleCart" @click.prevent="cartlistshow">
          <span v-if="!cartlistShow">展開</span>
          <span v-else>收起</span>購物清單
        </a>
        <transition name="fade">
          <table class="carttable" v-if="cartlistShow">
            <thead>
              <tr>
                <th class="edit">編輯</th>
                <th class="title">項目</th>
                <th class="eachprice text-align-right">單價</th>
                <th class="qty">人數</th>
                <th class="itemprice text-align-right">小計</th>
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
                <td class="text-align-right">{{ item.product.price | currency }}</td>
                <td class="qty">{{ item.qty }}</td>
                <td class="text-align-right">
                  <p
                    :class="{'text-through':item.final_total != item.total}"
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
                  class="text-align-center"
                  :class="{'text-through':cart.final_total != cart.total}"
                >總計</td>
                <td
                  colspan="3"
                  class="text-align-center"
                  :class="{'text-through':cart.final_total != cart.total}"
                >{{ cart.total | currency }}</td>
              </tr>
              <tr v-if="cart.final_total != cart.total">
                <td colspan="3" class="text-align-center red">優惠券折扣價</td>
                <td colspan="3" class="text-align-center red">{{ cart.final_total | currency }}</td>
              </tr>
            </tfoot>
          </table>
        </transition>
        <div class="coupon">
          <label for="coupon">輸入test獲得優惠</label>
          <input type="text" placeholder="輸入優惠碼" id="coupon" v-model="couponCode" />
          <button @click="submitCoupon">套用優惠碼</button>
        </div>
      </div>
      <!-- ----- 購買人資訊 ----- -->
      <div class="info">
        <!-- v-slot="{ invalid }" 為搭配BTN未符合狀態禁用 只要任一位有不符合就會回傳true -->
        <ValidationObserver tag="form" v-slot="{ invalid }" @submit.prevent="submitOrder">
          <h2>購買人資訊</h2>
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
import ProgressBar from "./ProgressBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Checkout",
  components: { Header, ProgressBar },
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
    couponCode: {
      get() {
        return "";
      },
      set(value) {
        this.$store.commit("COUPONCODE", value);
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
.cart {
  width: 100%;
  font-family: "Noto Serif TC", serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8d2f23;
}
.cart .cartlist .toggleCart {
  @extend %abutton;
  display: block;
  text-align: center;
  background-color: brown;
  padding: 20px 10px;
  border-radius: 10px;
  color: white;
}
// ----- 購物車清單 -----
.cart .cartlist {
  margin: 10px auto;
  width: 95%;
}
.cart .cartlist .carttable {
  margin: 10px 0 0;
}
.cart .cartlist .carttable th {
  border-top: 1px solid #8d2f23;
}
.cart .cartlist .carttable th,
.cart .cartlist .carttable td {
  padding: 10px 5px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #8d2f23;
}
.cart .cartlist .carttable .edit {
  width: 10%;
  text-align: center;
}
.cart .cartlist .carttable .delBtn {
  text-decoration: none;
  color: red;
}
.cart .cartlist .carttable .pic {
  width: 20%;
}
.cart .cartlist .carttable .pic img {
  width: 100%;
  vertical-align: top;
}
.cart .cartlist .carttable .title {
  width: 20%;
}
.cart .cartlist .carttable .eachprice {
  width: 20%;
}
.cart .cartlist .carttable .qty {
  width: 10%;
  text-align: center;
}
.cart .cartlist .carttable .itemprice {
  width: 20%;
}

// ----- 購買人資訊 -----
.cart .info {
  width: 95%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
}
.cart .info h2 {
  font-size: 2rem;
  margin: 0 0 10px 0;
}
.cart .info input,
textarea {
  width: 80%;
}

.cart .info button.submit {
  margin: 20px 0 20px 50%;
  width: 30%;
  display: block;
}

.cart .info .tips {
  height: 1rem;
  color: red;
  margin: 5px 0 0 10px;
}

.text-align-right {
  text-align: right !important;
}
.text-align-center {
  text-align: center !important;
}
.text-through {
  text-decoration: line-through;
}
.red {
  color: red;
}
label {
  display: block;
  margin: 10px 0;
}
input.invalid {
  border: 1px solid red;
}
button.disabled {
  background-color: #fff;
  color: #ddd;
  pointer-events: none;
  border-color: #ddd;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media screen and (min-width: 960px) {
  .cart .col-2 {
    width: 100%;
    display: flex;
  }
  .cart .cartlist,
  .cart .info {
    width: 45%;
  }
}
</style>
