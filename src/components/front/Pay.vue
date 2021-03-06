<template>
  <div class="pay">
    <Alert />
    <Header />
    <Breadcrumb />
    <ProgressBar />
    <div class="container">
      <!-- 購物車清單 -->
      <table class="cartlist">
        <caption>購物清單</caption>
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.products" :key="index">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }} {{ item.product.unit }}</td>
            <td class="textRight">{{ item.final_total | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="textRight">總計</td>
            <td class="textRight">{{ order.total | currency }}</td>
          </tr>
        </tfoot>
      </table>
      <!-- 購買人資訊 -->
      <table class="info" v-if="order.user">
        <caption>顧客資訊</caption>
        <tbody>
          <tr>
            <th>Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>收件人姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.phone }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td v-if="!order.is_paid" class="red">尚未付款</td>
            <td v-else class="green">已付款</td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <button @click="pay" v-if="!order.is_paid">確認付款</button>
        <button @click="toPage" v-else>返回產品列表</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import Breadcrumb from "./Breadcrumb.vue";
import ProgressBar from "./ProgressBar.vue";
export default {
  name: "Pay",
  components: { Header, ProgressBar, Breadcrumb },
  methods: {
    getOrder() {
      this.$store.dispatch("getOrder", this.orderId);
    },
    pay() {
      this.$store.dispatch("pay", this.orderId);
    },
    toPage() {
      this.$store.dispatch("toPage", "/product");
    }
  },
  created() {
    // 將當前頁面的ID儲存
    this.$store.commit("ORDERID", this.$route.params.orderId);
    this.getOrder();
  },
  computed: {
    orderId() {
      return this.$store.state.orderId;
    },
    order() {
      return this.$store.state.order;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.pay {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Noto Serif TC", serif;
  color: $dark;
  min-height: calc(100vh - 100px);
  font-size: 14px;
  > .container {
    width: 90%;
    max-width: 600px;
    margin: 10px auto 0;
    > table {
      width: 100%;
      text-align: left;
      > caption {
        text-align: left;
        margin: 10px 0;
        font-size: 18px;
        color: $primary;
      }
      th {
        font-weight: 900;
        background-color: #f6f6f6;
      }
      th,
      td {
        padding: 10px 5px;
      }
      thead tr,
      tbody tr {
        border-bottom: 1px solid $light;
      }
      tfoot,
      // 未付款
      td.red {
        color: red;
      }
      // 已付款
      td.green {
        color: $active;
      }
    }
    // 購物車清單
    > .cartlist {
      thead tr {
        border-top: 1px solid $light;
      }
      th:first-child,
      td:first-child {
        width: 60%;
      }
    }
    // 顧客資訊
    > .info {
      tbody tr:first-child {
        border-top: 1px solid $light;
      }
      th {
        width: 30%;
      }
      td {
        width: 70%;
      }
    }
    // 付款按鈕
    > .btn {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0;
      > button {
        padding: line(0.5) line(1);
        background-color: $btn-cart;
        color: white;
        border: 1px solid $btn-cart;
        border-radius: 5px;
        transition: 0.7s;
      }
      > button:hover {
        cursor: pointer;
        background-color: $btn-cart-hover;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .pay {
    width: 1160px;
    max-width: 1160px;
  }
}
</style>
