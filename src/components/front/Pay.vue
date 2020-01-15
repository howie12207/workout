<template>
  <div class="checkout">
    <Alert />
    <Header />
    <ProgressBar />
    <div class="container">
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
            <td>{{ item.qty }}{{ item.product.unit }}</td>
            <td class="textright">{{ item.final_total | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="textright">總計</td>
            <td class="textright">{{ order.total | currency }}</td>
          </tr>
        </tfoot>
      </table>
      <table class="info">
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
        <button @click="toHome" v-else>返回產品列表</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import ProgressBar from "./ProgressBar.vue";
import { mapActions } from "vuex";
export default {
  name: "Pay",
  components: { Header, ProgressBar },
  methods: {
    ...mapActions(["toHome"]),
    getOrder() {
      this.$store.dispatch("getOrder", this.orderId);
    },
    pay() {
      this.$store.dispatch("pay", this.orderId);
    }
  },
  created() {
    this.$store.commit("ORDERID", this.$route.params.orderId);
    // console.log(this.$route.params.orderId);
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
.checkout {
  width: 100%;
  font-family: "Noto Serif TC", serif;
  color: #8d2f23;
  min-height: calc(100vh - 110px);
}
.checkout .container {
  width: 90%;
  max-width: 600px;
  margin: 10px auto 0;
}

.checkout .container table {
  width: 100%;
  text-align: left;
}
caption {
  font-size: 1.5rem;
  text-align: left;
  margin: 10px 0;
}
th {
  font-weight: 900;
}
th,
td {
  padding: 10px 5px;
}
thead tr,
tbody tr {
  border-bottom: 1px solid #ccc;
}
tfoot,
td.red {
  color: red;
}
td.green {
  color: green;
}

// ----- 購物清單 -----
.cartlist thead tr {
  border-top: 1px solid #ccc;
}
.cartlist th:first-child,
.cartlist td:first-child {
  width: 60%;
}
// ----- 顧客資訊 -----
.info tbody tr:first-child {
  border-top: 1px solid #ccc;
}
.info th {
  width: 30%;
}
.info td {
  width: 70%;
}
// ----- 付款按鈕 -----

.checkout .btn {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

.textright {
  text-align: right !important;
}
</style>
