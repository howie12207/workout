<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>
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
          <tr v-for="item in products" :key="item.id">
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
    <div class="modal" :class="{ modalShow: modalShow }">
      <div class="container">
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
    <div class="delmodal" :class="{ modalShow: delmodalShow }">
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
import Pagination from "./Pagination.vue";
export default {
  name: "Productslist",
  components: { Pagination },
  computed: {
    ...mapGetters(["products", "modalShow", "product", "isLoading"]),
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
    getProductslist(page = 1) {
      this.$store.dispatch("getProductslist", page);
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
            console.log(response);
          } else {
            vm.$store.dispatch("updateMessage", {
              message: response.data.message,
              status: "false"
            });
            console.log(response);
          }
        });
    }
  },
  created() {
    this.getProductslist();
  }
};
</script>

<style lang="scss" scoped>
.product {
  width: calc(100% - 150px);
  border-left: 1px solid #ccc;
  // min-height: calc(100vh - 60px);
  // height: 100%;
}
.product .container {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}
.product .createBtn {
  align-self: flex-end;
  margin: 30px 0;
}
.product caption {
  text-align: left;
  font-size: 1.5rem;
  color: #8d2f23;
  margin: 0 0 20px;
  position: relative;
  padding: 0 0 10px;
}
.product caption:after {
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
  padding: 8px;
}
thead th {
  text-align: left;
}
td button {
  margin: 0 5px;
  padding: 3px 5px;
}
tbody tr:nth-of-type(odd) {
  background-color: #ffe8e8;
}
thead tr,
tbody tr:nth-of-type(even) {
  background-color: #fff2f2;
}
.right {
  text-align: right;
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
  z-index: 101;
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
.modalShow {
  display: flex;
}
span.strong {
  color: red;
}
@media screen and (max-width: 800px) {
  .product {
    width: 100%;
  }
}
</style>
