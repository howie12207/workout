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
    products: [],
    product: { category: "" },
    isNew: false,
    fileUploading: false,
    coupons: [],
    coupon: {},
    pagination: {},
    banner: [
      {
        id: 0,
        title: "舊金山必去20大景點！沒去過別說你來過舊金山！",
        src: require("../assets/USA.jpg"),
        alt: "USA",
        to: ""
      },
      {
        id: 1,
        title: "2020櫻花季日本賞櫻行程！景點、交通、行程...一次搞定",
        src: require("../assets/Japan.jpg"),
        alt: "Japan",
        to: ""
      },
      {
        id: 2,
        title: "暢遊浪漫水都「威尼斯」",
        src: require("../assets/Italia.jpg"),
        alt: "Italia",
        to: ""
      },
      {
        id: 3,
        title:
          "「峇里島」這裡不是天堂，卻讓人迷失，在這美麗原始的小島，享受寧靜的片刻!",
        src: require("../assets/Bali.jpg"),
        alt: "Bali",
        to: ""
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
      state.pageNow = payload;
    },
    PAGETOTAL(state, payload) {
      state.pageTotal = payload;
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
    MENUSHOW(state, payload) {
      state.menuShow = payload;
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
    // --- 優惠券 ---
    COUPONS(state, payload) {
      state.coupons = payload;
    },
    COUPON(state, payload) {
      state.coupon = payload;
    },
    // --- 後台分頁 ---
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    // --- 警示 ---
    MESSAGES(state, payload) {
      state.messages = payload;
    }
  },
  actions: {
    //----- 登入 -----
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
    //----- 返回主頁 -----
    toHome(context) {
      context.commit("ISLOADING", true);
      router.push("/");
      context.commit("ISLOADING", false);
    },
    //----- 登出 -----
    logout() {
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      axios.post(url).then(() => {
        router.push("/login");
      });
    },
    // ----- 後台取得訂單列表 -----
    // getOrders(context) {
    //   context.commit("ISLOADING", true);
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=1`;
    //   axios.get(url).then(response => {
    //     context.commit("ORDERS", response.data.orders);
    //     // console.log(response);
    //     context.commit("ISLOADING", false);
    //   });
    // },
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
        context.commit("ISNEW", isNew);
        context.commit("PRODUCT", {});
        context.commit("COUPON", {});
      } else {
        context.commit("PRODUCT", Object.assign({}, item));
        context.commit("COUPON", Object.assign({}, item));
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
          console.log("新增失敗");
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
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${context.state.product.id}`;
      axios.delete(url).then(response => {
        if (response.data.success) {
          context.commit("DELMODALSHOW", false);
          context.dispatch("getProductslist");
          context.dispatch("updateMessage", {
            message: "產品刪除成功",
            status: "success"
          });
        } else {
          console.log("刪除失敗");
          context.commit("DELMODALSHOW", false);
          context.dispatch("getProductslist");
          context.dispatch("updateMessage", {
            message: "產品刪除失敗",
            status: "false"
          });
        }
      });
    },
    // ----- 後台分頁切換 -----
    // End_changePage(context, payload) {
    //   let page = 1;
    //   window.scroll(0, 0);
    //   if (payload == "pre") {
    //     page = Number(context.state.pagination.current_page) - 1;
    //   } else if (payload == "next") {
    //     page = Number(context.state.pagination.current_page) + 1;
    //   } else {
    //     page = payload;
    //   }
    //   context.commit("CURRENTPAGE", page);
    //   context.dispatch("getProductslist", page);
    // }
    // // ----- 後台取得優惠券列表 -----
    // getCoupons(context) {
    //   context.commit("ISLOADING", true);
    //   let payload = 1;
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload}`;
    //   axios.get(url).then(response => {
    //     // console.log(response);
    //     context.commit("COUPONS", response.data.coupons);
    //     context.commit("ISLOADING", false);
    //   });
    // },
    // // ----- 更新優惠券 -----
    // updateCoupon(context) {
    //   let method = "post";
    //   let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
    //   if (!context.state.isNew) {
    //     method = "put";
    //     url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${context.state.coupon.id}`;
    //   }
    //   axios[method](url, { data: context.state.coupon }).then(response => {
    //     if (response.data.success) {
    //       console.log("method", method, "url", url);
    //       console.log(response);
    //       context.commit("MODAL_HANDLER", false);
    //       context.dispatch("getCoupons");
    //       context.dispatch("updateMessage", {
    //         message: "優惠券更新成功",
    //         status: "success"
    //       });
    //     } else {
    //       console.log("更新失敗");
    //       context.dispatch("getCoupons");
    //       context.dispatch("updateMessage", {
    //         message: "優惠券更新失敗",
    //         status: "false"
    //       });
    //     }
    //   });
    // },
    // // ----- 刪除優惠券 -----
    // delCoupon(context) {
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${context.state.coupon.id}`;
    //   axios.delete(url).then(response => {
    //     if (response.data.success) {
    //       context.commit("DELSHOWMODAL", false);
    //       context.dispatch("getCoupons");
    //       context.dispatch("updateMessage", {
    //         message: "優惠券刪除成功",
    //         status: "success"
    //       });
    //     } else {
    //       console.log("刪除失敗");
    //       context.commit("DELSHOWMODAL", false);
    //       context.dispatch("getCoupons");
    //       context.dispatch("updateMessage", {
    //         message: "優惠券刪除失敗",
    //         status: "false"
    //       });
    //     }
    //   });
    // },
    // // ----- 套用優惠券 -----
    // submitCoupon(context) {
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
    //   axios
    //     .post(url, { data: { code: context.state.couponCode } })
    //     .then(response => {
    //       if (response.data.success) {
    //         console.log(response);
    //         context.dispatch("getCart");
    //         context.dispatch("updateMessage", {
    //           message: "優惠券套用成功",
    //           status: "success"
    //         });
    //       } else {
    //         console.log(response);
    //         context.dispatch("getCart");
    //         context.dispatch("updateMessage", {
    //           message: response.data.message,
    //           status: "false"
    //         });
    //       }
    //     });
    // },
    // ----- 取得所有產品清單 -----
    getProducts(context) {
      context.commit("ISLOADING", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(url).then(response => {
        context.commit("PRODUCTS", response.data.products);
        context.commit(
          "PAGETOTAL",
          Math.ceil(response.data.products.length / 10)
        ); //取得產品總頁數
        context.commit("CATEGORIES", response.data.products); //分類
        context.commit("ISLOADING", false);
        console.log(response);
      });
    },
    //----- 分類切換 -----
    categorySwitch(context, payload) {
      context.commit("PAGENOW", 1);
      window.scroll(0, 0);
      context.commit("CATEGORY_SWITCH", payload);
      // context.dispatch("pageProducts");
      context.commit("CATEGORIES_HANDLER", false);
    },
    //     // ----- 產品分類及分頁 -----
    //     // pageProducts(context) {
    //     //   let tmpProduct = [];
    //     //   const nowPage = context.state.page.pageNow;
    //     //   const start = nowPage * 10 - 10;
    //     //   const end = nowPage * 10;
    //     //   if (context.state.categorySwitch === "全部") {
    //     //     context.commit(
    //     //       "PAGETOTAL",
    //     //       Math.ceil(context.state.products.length / 10)
    //     //     );
    //     //     tmpProduct = context.state.products.slice(start, end);
    //     //   } else {
    //     //     context.state.products.forEach(element => {
    //     //       if (element.category == context.state.categorySwitch) {
    //     //         tmpProduct.push(element);
    //     //       }
    //     //     });
    //     //     context.commit("PAGETOTAL", Math.ceil(tmpProduct.length / 10));
    //     //     tmpProduct = tmpProduct.slice(start, end);
    //     //   }
    //     //   context.commit("PAGEPRODUCTS", tmpProduct);
    //     // },

    //     // ----- 分頁切換 -----
    //     changePage(context, payload) {
    //       let page = 1;
    //       window.scroll(0, 0);
    //       if (payload == "pre") {
    //         page = Number(context.state.page.pageNow) - 1;
    //       } else if (payload == "next") {
    //         page = Number(context.state.page.pageNow) + 1;
    //       } else {
    //         page = payload;
    //       }
    //       context.commit("PAGENOW", page);
    //       // context.dispatch("pageProducts");
    //     },
    //----- 開啟產品詳情模型 -----
    openModal(context, payload) {
      context.commit("MODALSHOW", true);
      context.dispatch("getProduct", payload);
    },
    //     //----- 關閉產品詳情模型 -----
    //     closeModal(context) {
    //       context.commit("MODAL_HANDLER", false);
    //     },
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
      let tmp = context.state.messages;
      tmp.splice(payload, 1);
      context.commit("MESSAGES", tmp);
    },
    // ----- 自動移除警示語畫面  -----
    removeMessageWithTiming(context, payload) {
      setTimeout(() => {
        let tmp = context.state.messages;
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
    }
  },
  modules: {}
});

// strict: true,
//   state: {
//     isLoading: false,
//     showNav: false,
//     showCart: false,
//     showStar: false,
//     showCategories: false,
//     showModal: false,
//     delshowModal: false,
//     isNew: false,
//     bannerSwitch: 0,
//     categorySwitch: "全部",
//     qty: 1,
//     status: { fileUploading: false },
//     user: { username: "", password: "" },
//     customer: {
//       user: { name: "", phone: "", email: "", address: "" },
//       message: ""
//     },
//     page: { pageNow: "1", pageTotal: "1", pageProducts: [] },
//     loginTips: "",
//     orderId: "",
//     couponCode: "",
//     search: "",
//     product: {},
//     coupon: {},
//     cart: {},
//     pagination: {},
//     order: {
//       user: {}
//     },
//     products: [],
//     categories: [],
//     star: [],
//     orders: [],
//     coupons: [],
//     messages: []
//   },
//   mutations: {
//     LOADING(state, status) {
//       state.isLoading = status;
//     },
//     NAV_HANDLER(state, status) {
//       state.showNav = status;
//       if (!state.showNav) {
//         state.showCart = false;
//         state.showStar = false;
//       }
//       if (state.showNav) {
//         state.showCategories = false;
//       }
//     },
//     CART_HANDLER(state, status) {
//       state.showCart = status;
//     },
//     STAR_HANDLER(state, status) {
//       state.showStar = status;
//     },
//     CATEGORIES_HANDLER(state, status) {
//       state.showCategories = status;
//       if (state.showCategories) {
//         state.showNav = false;
//         state.showCart = false;
//         state.showStar = false;
//       }
//     },
//     BANNER_HANDLER(state, payload) {
//       if (payload != "pre" && payload != "next") {
//         state.bannerSwitch = payload;
//       } else if (payload == "pre") {
//         payload = -1;
//         state.bannerSwitch =
//           (Number(state.bannerSwitch) + payload + state.banner.length) %
//           state.banner.length;
//       } else {
//         payload = 1;
//         state.bannerSwitch =
//           (Number(state.bannerSwitch) + payload + state.banner.length) %
//           state.banner.length;
//       }
//     },
//     MODAL_HANDLER(state, status) {
//       state.showModal = status;
//     },
//     CART(state, payload) {
//       state.cart = payload;
//     },
//     PRODUCTS(state, payload) {
//       state.products = payload;
//     },
//     PRODUCT(state, payload) {
//       state.product = payload;
//     },
//     STAR(state, payload) {
//       state.star = payload;
//     },
//     CATEGORIES(state, payload) {
//       // 方法一
//       const categories = new Set();
//       payload.forEach(item => {
//         categories.add(item.category);
//       });
//       state.categories = Array.from(categories);
//       // 方法二
//       // let productarray = payload;
//       // productarray.forEach(item => {
//       //   if (state.categories.indexOf(item.category) == -1) {
//       //     state.categories.push(item.category);
//       //   }
//       // });
//       // return state.categories;
//     },
//     MESSAGES(state, payload) {
//       state.messages = payload;
//     },
//     CATEGORY_SWITCH(state, payload) {
//       state.categorySwitch = payload;
//     },
//     LOGIN_TIPS(state, payload) {
//       state.loginTips = payload;
//     },
//     UPDATE_USERNAME(state, preload) {
//       state.user.username = preload;
//     },
//     UPDATE_PASSWORD(state, preload) {
//       state.user.password = preload;
//     },
//     UPDATE_QTY(state, payload) {
//       state.qty = payload;
//     },
//     UPDATE_NAME(state, payload) {
//       state.customer.user.name = payload;
//     },
//     UPDATE_PHONE(state, payload) {
//       state.customer.user.phone = payload;
//     },
//     UPDATE_EMAIL(state, payload) {
//       state.customer.user.email = payload;
//     },
//     UPDATE_ADDRESS(state, payload) {
//       state.customer.user.address = payload;
//     },
//     UPDATE_MESSAGE(state, payload) {
//       state.customer.message = payload;
//     },
//     ORDERS(state, payload) {
//       state.orders = payload;
//     },
//     DELSHOWMODAL(state, payload) {
//       state.delshowModal = payload;
//     },
//     DELMODALSHOW(state, payload) {
//       state.delmodalShow = payload;
//     },
//     ISNEW(state, payload) {
//       state.isNew = payload;
//     },
//     FILEUPLOADING(state, payload) {
//       state.fileUploading = payload;
//     },
//     PAGINATION(state, payload) {
//       state.pagination = payload;
//     },
//     ORDERID(state, payload) {
//       state.orderId = payload;
//     },
//     ORDER(state, payload) {
//       state.order = payload;
//     },
//     PAGENOW(state, payload) {
//       state.page.pageNow = payload;
//     },
//     PAGETOTAL(state, payload) {
//       state.page.pageTotal = payload;
//     },
//     PAGEPRODUCTS(state, payload) {
//       state.page.pageProducts = payload;
//     },
//     COUPONS(state, payload) {
//       state.coupons = payload;
//     },
//     COUPON(state, payload) {
//       state.coupon = payload;
//     },
//     COUPON_TITLE(state, payload) {
//       state.coupon.title = payload;
//     },
//     COUPON_CODE(state, payload) {
//       state.coupon.code = payload;
//     },
//     COUPON_PERCENT(state, payload) {
//       state.coupon.percent = payload;
//     },
//     COUPON_DATE(state, payload) {
//       state.coupon.date = payload;
//     },
//     COUPON_IS_ENABLED(state, payload) {
//       state.coupon.is_enabled = payload;
//     },
//     COUPONCODE(state, payload) {
//       state.couponCode = payload;
//     },
//     CURRENTPAGE(state, payload) {
//       state.pagination.current_page = payload;
//     },
//     SEARCH(state, payload) {
//       state.search = payload;
//     }
//   },
//   actions: {
//     //----- 控制Loading畫面 -----
//     updateLoading(context, status) {
//       context.commit("LOADING", status);
//     },
//     //----- 小畫面上方Nav開關 -----
//     navHandler(context, status) {
//       context.commit("NAV_HANDLER", status);
//     },
//     //----- 上方購物車開關 -----
//     cartHandler(context, status) {
//       context.commit("CART_HANDLER", status);
//       context.commit("STAR_HANDLER", false);
//     },
//     //----- 上方觀察清單開關 -----
//     starHandler(context, status) {
//       context.commit("STAR_HANDLER", status);
//       context.commit("CART_HANDLER", false);
//     },
//     //----- 小畫面左側分類開關 -----
//     categoriesHandler(context, status) {
//       context.commit("CATEGORIES_HANDLER", status);
//     },

//     //----- 取得購物車清單 -----
//     getCart(context) {
//       context.commit("LOADING", true);
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
//       axios.get(url).then(response => {
//         // console.log(response);
//         context.commit("CART", response.data.data);
//         context.commit("LOADING", false);
//       });
//     },

//     //----- 取得個別產品內容 -----
//     getProduct(context, payload) {
//       context.commit("LOADING", true);
//       // --- 數量初始化 ---
//       context.commit("UPDATE_QTY", 1);
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${payload}`;
//       axios.get(url).then(response => {
//         // console.log(response.data.product);
//         context.commit("PRODUCT", response.data.product);
//         context.commit("LOADING", false);
//       });
//     },
//     //----- 取得觀察清單 -----
//     getStar(context) {
//       context.commit("LOADING", true);
//       let ls = JSON.parse(localStorage.getItem("favorite") || "[]");
//       context.commit("STAR", ls);
//       context.commit("LOADING", false);
//     },
//     //----- 產品數量修改器 -----
//     changeQty(context, payload) {
//       if (context.state.amt <= 0) {
//         context.commit("UPDATE_QTY", 1);
//       } else if (context.state.amt >= 100) {
//         context.commit("UPDATE_QTY", 99);
//       } else {
//         let qty = Number(context.state.qty) + Number(payload);
//         context.commit("UPDATE_QTY", Number(qty));
//       }
//     },
//     // ----- 加入購物車 -----
//     addCart(context, { id, qty = 1 }) {
//       context.commit("LOADING", true);
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
//       axios.post(url, { data: { product_id: id, qty } }).then(response => {
//         if (response.data.success) {
//           context.commit("MODAL_HANDLER", false);
//           context.commit("LOADING", false);
//           context.dispatch("getCart");
//           context.dispatch("updateMessage", {
//             message: "已加入購物車",
//             status: "success"
//           });
//           // console.log(response);
//         } else {
//           context.commit("LOADING", false);
//           console.log("加入失敗");
//           context.dispatch("updateMessage", {
//             message: "加入購物車失敗",
//             status: "false"
//           });
//         }
//       });
//     },
//     // ----- 加入觀察名單 -----
//     addStar(context, payload) {
//       context.commit("LOADING", true);
//       if (!context.state.star.includes(payload)) {
//         payload.star = true;
//         let tmp = context.state.star;
//         tmp.push(payload);
//         context.commit("STAR", tmp);
//         localStorage.setItem("favorite", JSON.stringify(tmp));
//       }
//       context.commit("LOADING", false);
//       context.dispatch("updateMessage", {
//         message: "已加入觀察名單",
//         status: "success"
//       });
//     },
//     // ----- 移除觀察名單 -----
//     removeStar(context, payload) {
//       context.commit("LOADING", true);
//       let index = "";
//       let tmp = context.state.star;
//       context.state.star.forEach((element, key) => {
//         if (payload.id === element.id) {
//           index = key;
//         }
//         context.dispatch("updateMessage", {
//           message: "已從觀察名單移除",
//           status: "success"
//         });
//       });
//       tmp.splice(index, 1);
//       context.commit("STAR", tmp);
//       localStorage.setItem("favorite", JSON.stringify(tmp));
//       context.commit("LOADING", false);
//     },
//     // ----- 移除購物車 -----
//     removeCart(context, payload) {
//       context.commit("LOADING", true);
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${payload}`;
//       axios.delete(url).then(response => {
//         if (response.data.success) {
//           console.log("已刪除");
//           context.commit("LOADING", false);
//           context.dispatch("getCart");
//           context.dispatch("updateMessage", {
//             message: "已從購物車移除",
//             status: "success"
//           });
//         } else {
//           console.log("刪除失敗");
//           context.commit("LOADING", false);
//           context.dispatch("updateMessage", {
//             message: "從購物車移除失敗",
//             status: "false"
//           });
//         }
//       });
//     },
//     // ----- 變換愛心圖示 -----
//     // changeStar(context, payload) {
//     //   return context.state.star.some(el => {
//     //     const result = payload.id === el.id;
//     //     context.commit('STARICON',result)
//     //   });
//     // },
//     // ----- 送出訂單 -----
//     submitOrder(context) {
//       context.commit("LOADING", true);
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
//       axios.post(url, { data: context.state.customer }).then(response => {
//         if (response.data.success) {
//           console.log("訂單已建立");
//           context.commit("LOADING", false);
//           router.push(`/checkout/${response.data.orderId}`);
//         } else {
//           console.log("訂單建立失敗");
//           context.commit("LOADING", false);
//           context.dispatch("updateMessage", {
//             message: response.data.message,
//             status: "false"
//           });
//         }
//       });
//     },
//     // ----- 取得特定訂單 -----
//     getOrder(context, payload) {
//       context.commit("LOADING", true);
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${payload}`;
//       axios.get(url).then(response => {
//         context.commit("ORDER", response.data.order);
//         console.log(response);
//         context.commit("LOADING", false);
//       });
//     },
//     // ----- 付款按鈕 -----
//     pay(context, payload) {
//       context.commit("LOADING", true);
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${payload}`;
//       axios.post(url).then(response => {
//         if (response.data.success) {
//           context.commit("LOADING", false);
//           context.dispatch("getOrder", payload);
//           context.dispatch("updateMessage", {
//             message: "付款成功",
//             status: "success"
//           });
//         } else {
//           context.commit("LOADING", false);
//           context.dispatch("getOrder", payload);
//           context.dispatch("updateMessage", {
//             message: "付款失敗",
//             status: "false"
//           });
//         }
//       });
//     },

//   },
//   getters: {
//     isLoading(state) {
//       return state.isLoading;
//     },
//     banner(state) {
//       return state.banner;
//     },
//     bannerSwitch(state) {
//       return state.bannerSwitch;
//     },

//     showCategories(state) {
//       return state.showCategories;
//     },
//     categorySwitch(state) {
//       return state.categorySwitch;
//     },
//     categories(state) {
//       return state.categories;
//     },

//     showNav(state) {
//       return state.showNav;
//     },

//     showCart(state) {
//       return state.showCart;
//     },
//     cart(state) {
//       return state.cart;
//     },

//     showStar(state) {
//       return state.showStar;
//     },
//     star(state) {
//       return state.star;
//     },
//     starIcon(state) {
//       return state.starIcon;
//     },

//     loginTips(state) {
//       return state.loginTips;
//     },

//     products(state) {
//       return state.products;
//     },
//     product(state) {
//       return state.product;
//     },

//     showModal(state) {
//       return state.showModal;
//     },

//     messages(state) {
//       return state.messages;
//     },

//     orders(state) {
//       return state.orders;
//     },
//     delshowModal(state) {
//       return state.delshowModal;
//     },
//     isNew(state) {
//       return state.isNew;
//     },
//     status(state) {
//       return state.status.fileUploading;
//     },
//     pagination(state) {
//       return state.pagination;
//     }
//   },
//   modules: {}
// });
