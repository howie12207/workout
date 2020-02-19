<template>
  <div class="orderslist">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <table>
        <caption>
          訂單列表
        </caption>
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
          <tr
            v-for="item in pagelist"
            :key="item.id"
            :class="{ paid: item.is_paid }"
          >
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
            <td class="textRight">{{ item.total | currency }}</td>
            <td v-if="item.is_paid">已付款</td>
            <td v-else>未付款</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "../Pagination.vue";
export default {
  name: "Orderlist",
  computed: {
    ...mapGetters(["isLoading"]),
    orders() {
      return this.$store.state.orders;
    },
    pagelist() {
      const nowPage = this.$store.state.page.pageNow;
      const str = nowPage * 10 - 10;
      const end = nowPage * 10;
      let tmplist = [];
      tmplist = [...this.$store.state.orders];
      this.$store.commit("PAGETOTAL", Math.ceil(tmplist.length / 10));
      tmplist = tmplist.slice(str, end);
      return tmplist;
    }
  },
  components: { Pagination },
  methods: {
    ...mapActions(["getOrders"])
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.orderslist {
  width: 100%;
  max-width: 600px;
  margin: 0 auto line(4);
  min-height: calc(100vh - 188px);
  // 主畫面
  > .container {
    display: flex;
    flex-direction: column;
    min-height: calc(90vh - 228px);
    width: 95%;
    margin: 0 auto;
    > table {
      width: 100%;
      > caption {
        text-align: left;
        font-size: 1.5rem;
        line-height: 3rem;
        color: $red;
        position: relative;
        margin: 0 0 line(2) 0;
      }
      > caption:after {
        content: "";
        background-color: $red;
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      td,
      th {
        padding: line(1);
      }
      thead th {
        text-align: left;
      }
      thead tr {
        background-color: #ffe8e8;
        border: 1px solid $red;
      }
      tbody tr {
        background-color: #eee;
        border: 1px solid $red;
      }
      // 已付款
      tbody tr.paid {
        background-color: rgb(162, 209, 164);
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .orderslist {
    width: 1160px;
    max-width: 1160px;
    min-height: calc(100vh - 228px);
    > .container {
      min-height: calc(90vh - 228px);
    }
  }
}
</style>
