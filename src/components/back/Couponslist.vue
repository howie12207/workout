<template>
  <div class="couponslist">
    <!-- 主畫面 -->
    <div class="container">
      <button class="createBtn" @click="modalshow(true)">建立新優惠券</button>
      <table>
        <caption>
          優惠券列表
        </caption>
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
          <tr v-for="item in pagelist" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.due_date | date }}</td>
            <td v-if="item.is_enabled" style="color:green;">啟用</td>
            <td v-else style="color:red;">未啟用</td>
            <td>
              <button @click="modalshow(false, item)">編輯</button>
              <button @click="delModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination />
    <!-- 編輯模型 -->
    <div class="modal" v-if="modalShow">
      <div class="container">
        <a href="#" class="closeBtn" @click.prevent="modalClose">
          <i class="fas fa-times-circle"></i>
        </a>
        <form>
          <h3>編輯優惠券</h3>
          <label for="title">優惠券名稱</label>
          <input
            type="text"
            id="title"
            placeholder="請輸入優惠券名稱"
            v-model="title"
          />
          <label for="code">優惠碼</label>
          <input
            type="text"
            id="code"
            placeholder="請輸入優惠碼"
            v-model="code"
          />
          <label for="percent">折扣百分比</label>
          <input
            type="text"
            id="percent"
            placeholder="請輸入折扣百分比"
            v-model="percent"
          />
          <label for="date">到期日</label>
          <input
            type="text"
            v-model.lazy="date"
            id="date"
            placeholder="格式: 2020/1/1"
          />
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
            <button @click.prevent="modalClose">取消</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 刪除模型 -->
    <div class="delmodal" v-if="delmodalShow">
      <div class="container">
        <a href="#" class="closeBtn" @click.prevent="delmodalClose">
          <i class="fas fa-times-circle"></i>
        </a>
        <h3>刪除優惠券</h3>
        <p>
          確認是否刪除優惠券「
          <span class="strong">{{ coupon.title }}</span
          >」
        </p>
        <div class="modalBtn">
          <button @click="delCoupon">確認</button>
          <button @click="delmodalClose">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "../Pagination.vue";
export default {
  name: "Couponslist",
  components: { Pagination },
  computed: {
    ...mapGetters(["modalShow"]),
    pagelist() {
      const nowPage = this.$store.state.page.pageNow;
      const str = nowPage * 10 - 10;
      const end = nowPage * 10;
      let tmplist = [];
      tmplist = [...this.$store.state.coupons];
      this.$store.commit("PAGETOTAL", Math.ceil(tmplist.length / 10));
      tmplist = tmplist.slice(str, end);
      return tmplist;
    },
    delmodalShow() {
      return this.$store.state.delmodalShow;
    },
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
        let tmp = this.$store.state.coupon.due_date;
        if (tmp != undefined) {
          const date = new Date(tmp * 1000);
          return date.toLocaleDateString();
        } else {
          return "";
        }
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
    ...mapActions(["updateCoupon", "getCoupons", "delCoupon"]),
    modalshow(isNew, item) {
      this.$store.dispatch("modalShow", { isNew, item });
    },
    modalClose() {
      this.$store.commit("MODALSHOW", false);
    },
    delModal(item) {
      this.$store.dispatch("delModal", item);
    },
    delmodalClose() {
      this.$store.commit("DELMODALSHOW", false);
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.couponslist {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: calc(100vh - 188px);
  // 主畫面
  > .container {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
    min-height: calc(90vh - 228px);
    > .createBtn {
      margin: line(1) 0 0;
      align-self: flex-end;
    }
    > table {
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
        background-color: #8d2f23;
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
      tbody tr:nth-of-type(odd) {
        background-color: #ffe8e8;
      }
      thead tr,
      tbody tr:nth-of-type(even) {
        background-color: #fff2f2;
      }
    }
  }
  // 編輯產品模型
  > .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    > .container {
      width: 300px;
      background-color: #eee;
      box-shadow: 0 0 10px $red;
      border-radius: 8px;
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // 關閉按鈕
      > .closeBtn {
        font-size: 2rem;
        position: absolute;
        color: $red;
        top: -5px;
        right: -5px;
      }
      > form {
        width: 90%;
        margin: line(2) auto;
        overflow: auto;
        > h3 {
          margin: 0 0 line(1) 0;
          font-size: 1.5rem;
          line-height: 2rem;
          border-bottom: 2px solid $red;
          font-weight: 600;
        }
        > input[type="text"],
        textarea {
          width: 100%;
          margin: line(1) 0;
          border-radius: 8px;
          box-sizing: border-box;
          padding: line(0.5) line(1);
          outline: none;
          border: 1px solid $red;
        }
        > input:focus[type="text"],
        textarea:focus {
          border: 1px solid $yellow;
        }
        > .modalBtn {
          margin: line(1) 0 0 0;
          display: flex;
          justify-content: space-around;
          > button {
            width: 40%;
          }
        }
      }
    }
  }
  // 刪除產品模型
  > .delmodal {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    > .container {
      width: 300px;
      background-color: #eee;
      box-shadow: 0 0 10px #8d2f23;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      // 關閉按鈕
      > .closeBtn {
        font-size: 2rem;
        position: absolute;
        color: $red;
        top: -5px;
        right: -5px;
      }
      > h3 {
        margin: 0 0 line(1) 0;
        font-size: 1.5rem;
        line-height: 2rem;
        border-bottom: 2px solid $red;
        font-weight: 600;
      }
      > .modalBtn {
        margin: line(1) 0 0 0;
        display: flex;
        justify-content: space-around;
        > button {
          width: 40%;
        }
      }
      span.strong {
        color: red;
      }
    }
  }
}
button {
  border: 1px solid $red;
  background-color: #fff;
  color: $red;
  border-radius: 8px;
  transition: 0.6s;
}
button:hover {
  background-color: $red;
  color: white;
  cursor: pointer;
}
@media screen and (min-width: 1200px) {
  .couponslist {
    width: 1160px;
    max-width: 1160px;
    min-height: calc(100vh - 228px);
    > .container {
      min-height: calc(90vh - 228px);
    }
    > .modal {
      > .container {
        width: 600px;
      }
    }
  }
}
</style>
