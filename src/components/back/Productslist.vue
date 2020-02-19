<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>
    <!-- 主畫面 -->
    <div class="container">
      <button class="createBtn" @click="modalshow(true)">建立新產品</button>
      <table>
        <caption>
          產品列表
        </caption>
        <thead>
          <tr>
            <th style="width:100px;">分類</th>
            <th style="min-width:100px;">產品名稱</th>
            <th style="width:80px;">售價</th>
            <th style="width:100px;">是否啟用</th>
            <th style="width:120px;">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pagelist" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="right" v-if="item.price">{{ item.price | currency }}</td>
            <td class="right" v-else>{{ item.origin_price | currency }}</td>
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
        <!-- 關閉按鈕 -->
        <a href="#" class="closeBtn" @click.prevent="closeModal">
          <i class="fas fa-times-circle"></i>
        </a>
        <form>
          <h3>編輯產品</h3>
          <label for="title">產品名稱</label>
          <input
            type="text"
            id="title"
            placeholder="請輸入產品名稱"
            v-model="title"
          />
          <label for="category">產品分類</label>
          <input
            type="text"
            id="category"
            placeholder="請輸入產品類別"
            v-model="category"
          />
          <label for="origin_price">產品原價</label>
          <input
            type="text"
            id="origin_price"
            placeholder="請輸入產品原價"
            v-model="origin_price"
          />
          <label for="price">產品售價</label>
          <input
            type="text"
            id="price"
            placeholder="請輸入產品售價"
            v-model="price"
          />
          <label for="unit">產品單位</label>
          <input
            type="text"
            id="unit"
            placeholder="請輸入產品單位"
            v-model="unit"
          />
          <label for="description">產品描述</label>
          <input
            type="text"
            id="description"
            placeholder="請輸入產品描述"
            v-model="description"
          />
          <label for="content">產品說明</label>
          <textarea
            id="content"
            placeholder="請輸入產品說明"
            v-model="content"
            cols="10"
            rows="5"
          ></textarea>
          <label for="image">產品圖片</label>
          <input
            type="text"
            id="image"
            placeholder="請輸入產品圖片連結"
            v-model="imageUrl"
          />
          <label for="file">
            或是上傳圖片
            <i class="fas fa-spinner fa-spin" v-if="fileUploading"></i>
          </label>
          <input type="file" id="customFile" ref="files" @change="uploadFile" />
          <img :src="imageUrl" style="width:50%;" />
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
            <button @click.prevent="updateProduct">確認</button>
            <button @click.prevent="closeModal">取消</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 刪除模型 -->
    <div class="delmodal" v-if="delmodalShow">
      <div class="container">
        <a href="#" class="closeBtn" @click.prevent="closedelModal">
          <i class="fas fa-times-circle"></i>
        </a>
        <h3>刪除產品</h3>
        <p>
          確認是否刪除產品「
          <span class="strong">{{ product.title }}</span
          >」
        </p>
        <div class="modalBtn">
          <button @click="delProduct">確認</button>
          <button @click="closedelModal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "../Pagination.vue";
export default {
  name: "Productslist",
  components: { Pagination },
  computed: {
    ...mapGetters(["products", "modalShow", "product", "isLoading"]),
    pagelist() {
      const nowPage = this.$store.state.page.pageNow;
      const str = nowPage * 10 - 10;
      const end = nowPage * 10;
      let tmplist = [];
      tmplist = [...this.$store.state.products];
      this.$store.commit("PAGETOTAL", Math.ceil(tmplist.length / 10));
      tmplist = tmplist.slice(str, end);
      return tmplist;
    },
    title: {
      get() {
        return this.$store.state.product.title;
      },
      set(value) {
        this.$store.commit("PRODUCT_TITLE", value);
      }
    },
    category: {
      get() {
        return this.$store.state.product.category;
      },
      set(value) {
        this.$store.commit("PRODUCT_CATEGORY", value);
      }
    },
    origin_price: {
      get() {
        return this.$store.state.product.origin_price;
      },
      set(value) {
        this.$store.commit("PRODUCT_ORIGIN_PRICE", value);
      }
    },
    price: {
      get() {
        return this.$store.state.product.price;
      },
      set(value) {
        this.$store.commit("PRODUCT_PRICE", value);
      }
    },
    unit: {
      get() {
        return this.$store.state.product.unit;
      },
      set(value) {
        this.$store.commit("PRODUCT_UNIT", value);
      }
    },
    description: {
      get() {
        return this.$store.state.product.description;
      },
      set(value) {
        this.$store.commit("PRODUCT_DESCRIPTION", value);
      }
    },
    content: {
      get() {
        return this.$store.state.product.content;
      },
      set(value) {
        this.$store.commit("PRODUCT_CONTENT", value);
      }
    },
    imageUrl: {
      get() {
        return this.$store.state.product.imageUrl;
      },
      set(value) {
        this.$store.commit("PRODUCT_IMAGEURL", value);
      }
    },
    is_enabled: {
      get() {
        return this.$store.state.product.is_enabled;
      },
      set(value) {
        this.$store.commit("PRODUCT_IS_ENABLED", value);
      }
    },
    pagination() {
      return this.$store.state.pagination;
    },
    delmodalShow() {
      return this.$store.state.delmodalShow;
    },
    isNew() {
      return this.$store.state.isNew;
    },
    fileUploading() {
      return this.$store.state.fildUploading;
    }
  },
  methods: {
    ...mapActions(["updateProduct", "delProduct"]),
    getProducts() {
      this.$store.dispatch("getProducts");
    },
    modalshow(isNew, item) {
      this.$store.dispatch("modalShow", { isNew, item });
    },
    delModal(item) {
      this.$store.dispatch("delModal", item);
    },
    closeModal() {
      this.$store.commit("MODALSHOW", false);
    },
    closedelModal() {
      this.$store.commit("DELMODALSHOW", false);
    },
    uploadFile() {
      this.$store.commit("FILEUPLOADING", true);
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      const vm = this;
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          vm.$store.commit("FILEUPLOADING", false);
          if (response.data.success) {
            vm.$set(
              vm.$store.state.product,
              "imageUrl",
              response.data.imageUrl
            );
          } else {
            vm.$store.dispatch("updateMessage", {
              message: response.data.message,
              status: "false"
            });
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.product {
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
      height: 500px;
      background-color: #eee;
      box-shadow: 0 0 10px $red;
      border-radius: 8px;
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
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
    }
  }
}
.right {
  text-align: right;
}
span.strong {
  color: red;
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
  .product {
    width: 1160px;
    max-width: 1160px;
    min-height: calc(100vh - 228px);
    > .container {
      min-height: calc(90vh - 228px);
    }
    > .modal {
      > .container {
        width: 600px;
        height: 700px;
      }
    }
  }
}
</style>
