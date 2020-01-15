import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    messages: [],
    navShow: false,
    loginTips: "",
    login: {
      username: "",
      password: ""
    },
    menuShow: false,
    modalShow: false,
    delmodalShow: false,
    page: {
      pageNow: 1,
      pageTotal: 1
    },
    categories: [],
    categorySwitch: "全部",
    products: [],
    product: { category: "" },
    search: "",
    productId: "",
    qty: 1,
    star: [],
    cart: [],
    customer: {
      user: {
        name: "",
        phone: "",
        email: "",
        address: ""
      },
      message: ""
    },
    starShow: false,
    cartShow: false,
    order: {},
    cartlistShow: false,
    isNew: false,
    fileUploading: false,
    orders: [],
    coupons: [],
    coupon: {},
    pagination: {},
    banner: [
      {
        id: 0,
        title: "舊金山必去20大景點！沒去過別說你來過舊金山！",
        src: require("../assets/USA.jpg"),
        alt: "USA",
        to: "-LyPTx445DlNFFqSjLbG"
      },
      {
        id: 1,
        title: "2020櫻花季日本賞櫻行程！景點、交通、行程...一次搞定",
        src: require("../assets/Japan.jpg"),
        alt: "Japan",
        to: "-LyPNcvtbjLy5J-2bnVJ"
      },
      {
        id: 2,
        title: "暢遊浪漫水都「威尼斯」",
        src: require("../assets/Italia.jpg"),
        alt: "Italia",
        to: "-LyPPeo9SKru4vO1RQ66"
      },
      {
        id: 3,
        title:
          "「峇里島」這裡不是天堂，卻讓人迷失，在這美麗原始的小島，享受寧靜的片刻!",
        src: require("../assets/Bali.jpg"),
        alt: "Bali",
        to: "-LybqeLb3XDP1tUqtvRB"
      },
      {
        id: 4,
        title:
          "紐西蘭自助旅行│紐西蘭南島皇后鎮絕對不可錯過的Skyline、Gondola纜車、小雪橇滑板車Luge",
        src: require("../assets/NewZealand.jpg"),
        alt: "NewZealand",
        to: ""
      }
    ]
  },
  mutations: {
    // --- Header ---
    NAVSHOW(state, status) {
      state.navShow = status;
    },
    // --- 讀取 ---
    ISLOADING(state, status) {
      state.isLoading = status;
    },
    // --- 登入 ---
    LOGINTIPS(state, status) {
      state.loginTips = status;
    },
    LOGIN_USERNAME(state, status) {
      state.login.username = status;
    },
    LOGIN_PASSWORD(state, status) {
      state.login.password = status;
    },
    // --- 產品 ---
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    MODALSHOW(state, status) {
      state.modalShow = status;
    },
    DELMODALSHOW(state, status) {
      state.delmodalShow = status;
    },
    ISNEW(state, status) {
      state.isNew = status;
    },
    FILEUPLOADING(state, status) {
      state.fileUploading = status;
    },
    PAGENOW(state, payload) {
      state.page.pageNow = payload;
    },
    PAGETOTAL(state, payload) {
      state.page.pageTotal = payload;
    },
    CATEGORIES(state, payload) {
      // 方法一
      const categories = new Set();
      payload.forEach(item => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
      // 方法二
      // let productarray = payload;
      // productarray.forEach(item => {
      //   if (state.categories.indexOf(item.category) == -1) {
      //     state.categories.push(item.category);
      //   }
      // });
      // return state.categories;
    },
    CATEGORYSWITCH(state, payload) {
      state.categorySwitch = payload;
    },
    MENUSHOW(state, payload) {
      state.menuShow = payload;
    },
    SEARCH(state, payload) {
      state.search = payload;
    },
    PRODUCTID(state, payload) {
      state.productId = payload;
    },
    QTY(state, payload) {
      state.qty = payload;
    },
    STAR(state, payload) {
      state.star = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    STARSHOW(state, payload) {
      state.starShow = payload;
    },
    CARTSHOW(state, payload) {
      state.cartShow = payload;
    },
    CUSTOMER_NAME(state, payload) {
      state.customer.user.name = payload;
    },
    CUSTOMER_PHONE(state, payload) {
      state.customer.user.phone = payload;
    },
    CUSTOMER_EMAIL(state, payload) {
      state.customer.user.email = payload;
    },
    CUSTOMER_ADDRESS(state, payload) {
      state.customer.user.address = payload;
    },
    CUSTOMER_MESSAGE(state, payload) {
      state.customer.message = payload;
    },
    ORDER(state, payload) {
      state.order = payload;
    },
    CARTLISTSHOW(state, payload) {
      state.cartlistShow = payload;
    },

    PRODUCT_TITLE(state, payload) {
      state.product.title = payload;
    },
    PRODUCT_CATEGORY(state, payload) {
      state.product.category = payload;
    },
    PRODUCT_ORIGIN_PRICE(state, payload) {
      state.product.origin_price = payload;
    },
    PRODUCT_PRICE(state, payload) {
      state.product.price = payload;
    },
    PRODUCT_UNIT(state, payload) {
      state.product.unit = payload;
    },
    PRODUCT_DESCRIPTION(state, payload) {
      state.product.description = payload;
    },
    PRODUCT_CONTENT(state, payload) {
      state.product.content = payload;
    },
    PRODUCT_IMAGEURL(state, payload) {
      state.product.imageUrl = payload;
    },
    PRODUCT_IS_ENABLED(state, payload) {
      state.product.is_enabled = payload;
    },
    ORDERS(state, payload) {
      state.orders = payload;
    },
    // --- 優惠券 ---
    COUPONS(state, payload) {
      state.coupons = payload;
    },
    COUPON(state, payload) {
      state.coupon = payload;
    },
    COUPON_TITLE(state, payload) {
      state.coupon.title = payload;
    },
    COUPON_CODE(state, payload) {
      state.coupon.code = payload;
    },
    COUPON_PERCENT(state, payload) {
      state.coupon.percent = payload;
    },
    COUPON_DATE(state, payload) {
      state.coupon.date = payload;
    },
    COUPON_IS_ENABLED(state, payload) {
      state.coupon.is_enabled = payload;
    },
    // --- 後台分頁 ---
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    CURRENTPAGE(state, payload) {
      state.pagination.current_page = payload;
    },
    // --- 警示 ---
    MESSAGES(state, payload) {
      state.messages = payload;
    }
  },
  actions: {
    // ----- 取得所有產品清單 -----
    getProducts(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(url).then(response => {
        context.commit("PRODUCTS", response.data.products); //將取得的產品塞入
        context.commit(
          "PAGETOTAL",
          Math.ceil(response.data.products.length / 9)
        ); //取得產品總頁數
        context.commit("CATEGORIES", response.data.products); //分類
        context.commit("ISLOADING", false);
        // console.log(response);
      });
    },
    // ----- 分類切換 -----
    categorySwitch(context, payload) {
      context.commit("PAGENOW", 1); //初始化為第一頁
      // window.scroll(0, 0); //將畫面移至最上面
      context.commit("CATEGORYSWITCH", payload);
      context.commit("SEARCH", ""); //清空搜尋
      context.commit("MENUSHOW", false); //將選單關閉
    },
    // ----- 分頁切換 -----
    changePage(context, payload) {
      let page = 1;
      window.scroll(0, 0);
      if (payload == "pre") {
        page = Number(context.state.page.pageNow) - 1;
      } else if (payload == "next") {
        page = Number(context.state.page.pageNow) + 1;
      } else {
        page = payload;
      }
      context.commit("PAGENOW", page);
    },
    // ----- 查看產品細節 -----
    seeMore(context, payload) {
      context.commit("ISLOADING", true);
      router.push(`/product/${payload}`);
      context.commit("ISLOADING", false);
    },
    // ----- 取得個別產品內容 -----
    getProduct(context, payload) {
      context.commit("ISLOADING", true);
      // console.log(payload);
      context.commit("QTY", 1); //數量初始化
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${payload}`;
      axios.get(url).then(response => {
        // console.log(response);
        context.commit("PRODUCT", response.data.product); //將取得的產品塞入
        context.commit("ISLOADING", false);
      });
    },
    // ----- 返回產品頁 -----
    toProducts(context) {
      context.commit("ISLOADING", true);
      router.push("/product");
      context.commit("ISLOADING", false);
    },
    // ----- 取得觀察清單 -----
    getStar(context) {
      let ls = JSON.parse(localStorage.getItem("favorite") || "[]"); //取出LS資料若空則給陣列
      context.commit("STAR", ls);
    },
    // ----- 加入觀察名單 -----
    addStar(context, payload) {
      context.commit("ISLOADING", true);
      if (!context.state.star.includes(payload)) {
        let [...tmp] = context.state.star; //複製內容
        tmp.push(payload); //若原本不存在此項則加入
        // console.log(tmp);
        context.commit("STAR", tmp);
        localStorage.setItem("favorite", JSON.stringify(tmp)); //存入LS
      }
      context.commit("ISLOADING", false);
      context.dispatch("updateMessage", {
        message: "已加入觀察名單",
        status: "success"
      });
    },
    // ----- 移除觀察名單 -----
    removeStar(context, payload) {
      context.commit("ISLOADING", true);
      let index = "";
      let [...tmp] = context.state.star;
      tmp.forEach((element, key) => {
        if (payload.id === element.id) {
          index = key; //找出位置
        }
        context.dispatch("updateMessage", {
          message: "已從觀察名單移除",
          status: "success"
        });
      });
      tmp.splice(index, 1);
      context.commit("STAR", tmp);
      localStorage.setItem("favorite", JSON.stringify(tmp));
      context.commit("ISLOADING", false);
    },
    // ----- 取得購物車清單 -----
    getCart(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then(response => {
        // console.log(response);
        context.commit("CART", response.data.data);
        context.commit("ISLOADING", false);
      });
    },
    // ----- 加入購物車 -----
    addCart(context, { id, qty = 1 }) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.post(url, { data: { product_id: id, qty } }).then(response => {
        if (response.data.success) {
          context.commit("ISLOADING", false);
          context.dispatch("getCart");
          context.dispatch("updateMessage", {
            message: "已加入購物車",
            status: "success"
          });
          // console.log(response);
        } else {
          context.commit("ISLOADING", false);
          // console.log("加入失敗");
          context.dispatch("updateMessage", {
            message: "加入購物車失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 移除購物車 -----
    removeCart(context, payload) {
      context.commit("ISLOADING", true);
      // console.log(payload);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${payload}`;
      axios.delete(url).then(response => {
        if (response.data.success) {
          // console.log("已刪除");
          context.commit("ISLOADING", false);
          context.dispatch("getCart");
          context.dispatch("updateMessage", {
            message: "已從購物車移除",
            status: "success"
          });
        } else {
          // console.log("刪除失敗");
          context.commit("ISLOADING", false);
          context.dispatch("updateMessage", {
            message: "從購物車移除失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 套用優惠券 -----
    submitCoupon(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      axios
        .post(url, { data: { code: context.state.couponCode } })
        .then(response => {
          if (response.data.success) {
            // console.log(response);
            context.dispatch("getCart");
            context.dispatch("updateMessage", {
              message: "優惠券套用成功",
              status: "success"
            });
          } else {
            // console.log(response);
            context.dispatch("getCart");
            context.dispatch("updateMessage", {
              message: response.data.message,
              status: "false"
            });
          }
        });
    },
    // ----- 送出訂單 -----
    submitOrder(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      axios.post(url, { data: context.state.customer }).then(response => {
        if (response.data.success) {
          // console.log("訂單已建立");
          context.commit("ISLOADING", false);
          router.push(`/pay/${response.data.orderId}`);
        } else {
          // console.log("訂單建立失敗");
          context.commit("ISLOADING", false);
          context.dispatch("updateMessage", {
            message: response.data.message,
            status: "false"
          });
        }
      });
    },
    // ----- 取得特定訂單 -----
    getOrder(context, payload) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${payload}`;
      axios.get(url).then(response => {
        context.commit("ORDER", response.data.order);
        // console.log(response);
        context.commit("ISLOADING", false);
      });
    },
    // ----- 付款按鈕 -----
    pay(context, payload) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${payload}`;
      axios.post(url).then(response => {
        if (response.data.success) {
          context.commit("ISLOADING", false);
          context.dispatch("getOrder", payload);
          context.dispatch("updateMessage", {
            message: "付款成功",
            status: "success"
          });
        } else {
          context.commit("ISLOADING", false);
          context.dispatch("getOrder", payload);
          context.dispatch("updateMessage", {
            message: "付款失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 登入 -----
    login(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      context.commit("LOGINTIPS", "");
      axios.post(url, context.state.login).then(response => {
        if (response.data.success) {
          router.push("/admin/productslist");
          context.commit("ISLOADING", false);
        } else {
          context.commit("LOGINTIPS", "帳密有誤，請重新填寫");
          context.commit("ISLOADING", false);
        }
      });
    },
    // ----- 返回主頁 -----
    toHome(context) {
      context.commit("ISLOADING", true);
      router.push("/");
      context.commit("ISLOADING", false);
    },
    // ----- 登出 -----
    logout() {
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      axios.post(url).then(() => {
        router.push("/login");
      });
    },
    // ----- 後台取得產品列表 -----
    getProductslist(context, payload) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${payload}`;
      axios.get(url).then(response => {
        context.commit("PRODUCTS", response.data.products);
        // console.log(response);
        context.commit("PAGINATION", response.data.pagination);
        context.commit("ISLOADING", false);
      });
    },
    // ----- 開關產品模型 -----
    modalShow(context, { isNew, item }) {
      context.commit("MODALSHOW", true);
      if (isNew) {
        context.commit("ISNEW", isNew); //new塞入
        context.commit("PRODUCT", {}); //產品內容初始化
        context.commit("COUPON", {}); //優惠卷內容初始化
      } else {
        context.commit("PRODUCT", Object.assign({}, item)); //將原本內容複製塞入
        context.commit("COUPON", Object.assign({}, item)); //將原本內容複製塞入
        context.commit("ISNEW", isNew);
      }
    },
    // ----- 刪除產品的模型 -----
    delModal(context, payload) {
      context.commit("DELMODALSHOW", true);
      context.commit("PRODUCT", Object.assign({}, payload));
      context.commit("COUPON", Object.assign({}, payload));
    },
    // ----- 更新(新增,編輯)產品 -----
    updateProduct(context) {
      let method = "post";
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      if (!context.state.isNew) {
        method = "put";
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${context.state.product.id}`;
      }
      axios[method](url, { data: context.state.product }).then(response => {
        if (response.data.success) {
          // console.log(response);
          context.commit("MODALSHOW", false);
          context.dispatch("getProductslist");
          context.dispatch("updateMessage", {
            message: "產品更新成功",
            status: "success"
          });
        } else {
          // console.log("新增失敗");
          context.dispatch("getProductslist");
          context.dispatch("updateMessage", {
            message: "產品更新失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 刪除產品 -----
    delProduct(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${context.state.product.id}`;
      axios.delete(url).then(response => {
        if (response.data.success) {
          context.commit("DELMODALSHOW", false);
          context.commit("ISLOADING", false);
          context.dispatch("getProductslist");
          context.dispatch("updateMessage", {
            message: "產品刪除成功",
            status: "success"
          });
        } else {
          // console.log("刪除失敗");
          context.commit("DELMODALSHOW", false);
          context.commit("ISLOADING", false);
          context.dispatch("getProductslist");
          context.dispatch("updateMessage", {
            message: "產品刪除失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 後台分頁切換 -----
    End_changePage(context, payload) {
      let page = 1;
      window.scroll(0, 0);
      if (payload == "pre") {
        page = Number(context.state.pagination.current_page) - 1;
      } else if (payload == "next") {
        page = Number(context.state.pagination.current_page) + 1;
      } else {
        page = payload;
      }
      context.commit("CURRENTPAGE", page);
      context.dispatch("getProductslist", page);
    },
    // ----- 後台取得訂單列表 -----
    getOrders(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=1`;
      axios.get(url).then(response => {
        context.commit("ORDERS", response.data.orders);
        // console.log(response);
        context.commit("ISLOADING", false);
      });
    },
    // ----- 後台取得優惠券列表 -----
    getCoupons(context) {
      context.commit("ISLOADING", true);
      let payload = 1;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload}`;
      axios.get(url).then(response => {
        // console.log(response);
        context.commit("COUPONS", response.data.coupons);
        context.commit("ISLOADING", false);
      });
    },
    // ----- 更新優惠券 -----
    updateCoupon(context) {
      context.commit("ISLOADING", true);
      let method = "post";
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      if (!context.state.isNew) {
        method = "put";
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${context.state.coupon.id}`;
      }
      axios[method](url, { data: context.state.coupon }).then(response => {
        if (response.data.success) {
          // console.log(response);
          context.commit("MODALSHOW", false);
          context.dispatch("getCoupons");
          context.commit("ISLOADING", false);
          context.dispatch("updateMessage", {
            message: "優惠券更新成功",
            status: "success"
          });
        } else {
          // console.log("更新失敗");
          context.commit("MODALSHOW", false);
          context.dispatch("getCoupons");
          context.commit("ISLOADING", false);
          context.dispatch("updateMessage", {
            message: "優惠券更新失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 刪除優惠券 -----
    delCoupon(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${context.state.coupon.id}`;
      axios.delete(url).then(response => {
        if (response.data.success) {
          context.commit("DELMODALSHOW", false);
          context.dispatch("getCoupons");
          context.commit("ISLOADING", false);
          context.dispatch("updateMessage", {
            message: "優惠券刪除成功",
            status: "success"
          });
        } else {
          // console.log("刪除失敗");
          context.commit("DELMODALSHOW", false);
          context.dispatch("getCoupons");
          context.commit("ISLOADING", false);
          context.dispatch("updateMessage", {
            message: "優惠券刪除失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 更新警示語 -----
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      let tmp = [];
      tmp.push({
        message,
        status,
        timestamp
      });
      context.commit("MESSAGES", tmp);
      context.dispatch("removeMessageWithTiming", timestamp);
    },
    // ----- 手動移除警示語畫面 -----
    removeMessage(context, payload) {
      let [...tmp] = context.state.messages;
      tmp.splice(payload, 1);
      context.commit("MESSAGES", tmp);
    },
    // ----- 自動移除警示語畫面  -----
    removeMessageWithTiming(context, payload) {
      setTimeout(() => {
        let [...tmp] = context.state.messages;
        tmp.forEach((item, index) => {
          if (item.timestamp === payload) {
            tmp.splice(index, 1);
            context.commit("MESSAGES", tmp);
          }
        });
      }, 5000);
    }
  },
  getters: {
    navShow(state) {
      return state.navShow;
    },
    modalShow(state) {
      return state.modalShow;
    },
    products(state) {
      return state.products;
    },
    product(state) {
      return state.product;
    },
    pagination(state) {
      return state.pagination;
    },
    isLoading(state) {
      return state.isLoading;
    },
    messages(state) {
      return state.messages;
    },
    cart(state) {
      return state.cart;
    }
  },
  modules: {}
});
