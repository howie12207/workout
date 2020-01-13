<template>
  <div class="orderslist">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <table>
        <caption>訂單列表</caption>
        <thead>
          <tr>
            <th>下單時間</th>
            <th>Email</th>
            <th>產品項目</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for=" item in orders " :key="item.id" :class="{'paid':item.is_paid}">
            <td>{{ item.create_at | date }}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <ul>
                <li v-for="(product, index) in item.products" :key="index">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="right">{{ item.total | currency }}</td>
            <td v-if="item.is_paid">已付款</td>
            <td v-else>未付款</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pagination="pagination" @changePage="getOrders" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "./Pagination.vue";
export default {
  name: "Orderlist",
  computed: {
    ...mapGetters(["orders", "isLoading"])
  },

  components: { Pagination },
  data() {
    return {
      pagination: {}
    };
  },
  methods: {
    ...mapActions(["getOrders"])
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang="scss" scoped>
.orderslist {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
}
.orderslist caption {
  text-align: left;
  font-size: 1.5rem;
  color: #8d2f23;
  margin: 90.66px 0 20px;
  position: relative;
  padding: 0 0 10px;
}

.orderslist caption:after {
  content: "";
  background-color: #8d2f23;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
}

td,
th {
  padding: 8px 5px;
}
thead th {
  text-align: left;
}
thead tr {
  background-color: #ffe8e8;
}
tbody tr {
  background-color: #eee;
}
tbody tr.paid {
  background-color: rgb(162, 209, 164);
}
.right {
  text-align: right;
}
</style>
