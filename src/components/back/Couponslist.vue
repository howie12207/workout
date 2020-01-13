<template>
  <div class="couponslist">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <button class="createBtn" @click="ShowModal(true)">建立新優惠券</button>
      <table>
        <caption>優惠券列表</caption>
        <thead>
          <tr>
            <th>名稱</th>
            <th>優惠碼</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody class="textcenter">
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.date | date }}</td>
            <td v-if="item.is_enabled" style="color:green;">啟用</td>
            <td v-else style="color:red;">未啟用</td>
            <td>
              <button @click="ShowModal(false, item)">編輯</button>
              <button @click="delModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <Pagination :pagination="pagination" @emitchangePage="getProductslist" /> -->
    <div class="modal" :class="{ showModal: showModal }">
      <div class="container">
        <a href="#" class="closeBtn" @click.prevent="closeModal">
          <i class="fas fa-times-circle"></i>
        </a>
        <form>
          <h3>編輯優惠券</h3>
          <label for="title">優惠券名稱</label>
          <input type="text" id="title" placeholder="請輸入優惠券名稱" v-model="title" />
          <label for="code">優惠碼</label>
          <input type="text" id="code" placeholder="請輸入優惠碼" v-model="code" />
          <label for="percent">折扣百分比</label>
          <input type="text" id="percent" placeholder="請輸入折扣百分比" v-model="percent" />
          <label for="date">到期日</label>
          <input type="date" v-model="date" id="date" />
          <div>
            <input
              type="checkbox"
              id="is_enabled"
              v-model="is_enabled"
              :true-value="1"
              :false-value="0"
            />
            <label for="is_enabled" class="is_enabled">是否啟用</label>
          </div>
          <div class="modalBtn">
            <button @click.prevent="updateCoupon">確認</button>
            <button @click.prevent="closeModal">取消</button>
          </div>
        </form>
      </div>
    </div>
    <div class="delmodal" :class="{ showModal: delshowModal }">
      <div class="container">
        <a href="#" class="closeBtn" @click.prevent="closedelModal">
          <i class="fas fa-times-circle"></i>
        </a>
        <h3>刪除優惠券</h3>
        <p>
          確認是否刪除產品「
          <span class="strong">{{ coupon.title }}</span>」
        </p>
        <div class="modalBtn">
          <button @click="delCoupon">確認</button>
          <button @click="closedelModal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Couponslist",
  computed: {
    ...mapGetters(["isLoading", "showModal", "delshowModal"]),
    coupons() {
      return this.$store.state.coupons;
    },
    coupon() {
      return this.$store.state.coupon;
    },

    title: {
      get() {
        return this.$store.state.coupon.title;
      },
      set(value) {
        this.$store.commit("COUPON_TITLE", value);
      }
    },
    code: {
      get() {
        return this.$store.state.coupon.code;
      },
      set(value) {
        this.$store.commit("COUPON_CODE", value);
      }
    },
    percent: {
      get() {
        return this.$store.state.coupon.percent;
      },
      set(value) {
        this.$store.commit("COUPON_PERCENT", value);
      }
    },
    date: {
      get() {
        return this.$store.state.coupon.date;
      },
      set(value) {
        let timestamp = Math.floor(new Date(value) / 1000);
        this.$store.commit("COUPON_DATE", timestamp);
      }
    },
    is_enabled: {
      get() {
        return this.$store.state.coupon.is_enabled;
      },
      set(value) {
        this.$store.commit("COUPON_IS_ENABLED", value);
      }
    }
  },
  methods: {
    ...mapActions(["updateCoupon", "closeModal", "getCoupons", "delCoupon"]),
    ShowModal(isNew, item) {
      this.$store.dispatch("showModal", { isNew, item });
    },
    delModal(item) {
      this.$store.dispatch("delModal", item);
    },
    closedelModal() {
      this.$store.commit("DELSHOWMODAL", false);
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>

<style lang="scss" scoped>
.couponslist {
  width: 100%;
  color: #8d2f23;
  font-family: "Noto Serif TC", serif;
}
.couponslist .container {
  width: 95%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
}
.couponslist .container .createBtn {
  align-self: flex-end;
  margin: 10px 0;
}
.couponslist .container caption {
  text-align: left;
  font-size: 1.5rem;
  margin: 0 0 10px;
  // padding: 0 0 10px;
  // position: relative;
}

// .couponslist caption:after {
//   content: "";
//   background-color: #8d2f23;
//   width: 100%;
//   height: 2px;
//   position: absolute;
//   bottom: 0;
//   left: 0;
// }

tr {
  border-bottom: 1px solid #ccc;
}

td,
th {
  padding: 8px 5px;
}

.textcenter {
  text-align: center;
}
.textleft {
  text-align: left;
}

.modal,
.delmodal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
}
.modal .container {
  width: 300px;
  height: 500px;
  background-color: #eee;
  box-shadow: 0 0 10px #8d2f23;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.modal .container form {
  width: 90%;
  margin: 20px auto;
  overflow: auto;
}
.container h3 {
  margin-bottom: 10px;
  padding: 0 0 5px 0;
  font-size: 1.5rem;
  border-bottom: 2px solid #8d2f23;
}
.modal .container form label:not(.is_enabled) {
  display: block;
}
.modal .container form input {
  margin: 5px 0;
}
.modal .container form input:focus[type="text"],
.modal .container form textarea:focus {
  box-shadow: 0 0 5px #8d2f23;
}
.modal .container form input[type="text"],
textarea {
  width: 100%;
  margin: 5px 0;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 3px 10px;
  outline: none;
  border: 1px solid #8d2f23;
}
.container .modalBtn {
  display: flex;
  justify-content: space-around;
}
.container .modalBtn button {
  width: 40%;
  margin-top: 10px;
}
.delmodal .container {
  width: 300px;
  background-color: #eee;
  box-shadow: 0 0 10px #8d2f23;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
.closeBtn {
  align-self: flex-end;
  padding: 0;
  border: none;
  font-size: 2rem;
  position: absolute;
  color: #8d2f23;
  top: -5px;
  right: -5px;
}
.showModal {
  display: flex;
}
// span.strong {
//   color: red;
// }
</style>
