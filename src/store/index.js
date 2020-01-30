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
    sidebarShow: false,
    menuShow: false,
    modalShow: false,
    delmodalShow: false,
    page: {
      pageNow: 1,
      pageTotal: 1
    },
    categories: [],
    categorySwitch: "",
    sort: "",
    sequence: "timeold",
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
    code: "",
    pagination: {},
    banner1: [
      {
        src: require("../assets/shake.jpg"),
        alt: "shake",
        to: "-LxULEc2iXOAYLYjlRRj"
      },
      {
        src: require("../assets/whey.jpg"),
        alt: "whey",
        to: "-LxUDhK_wBafnper1FoU"
      },
      {
        src: require("../assets/clothes.jpg"),
        alt: "clothes",
        to: "-LyvhuXJY-gZLIbYhuPS"
      },
      {
        src: require("../assets/barbell.jpg"),
        alt: "dumbell",
        to: "-LxUB8_TcXPic76dNZKn"
      },
      {
        src: require("../assets/course.jpg"),
        alt: "course",
        to: "-Lyvj9zOvUF9ouXBiBpY"
      }
    ],
    banner2: [
      {
        tag: "私人教練",
        src:
          "https://storage.googleapis.com/vue-course-api.appspot.com/howieg1220%2F1579403007598.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=GTA7vtIA0W3pmD5%2BKf8XTeX65i0uDltIlk6p%2FMkrw8OKGWcbhw7FflpSQAk2SAtlqH%2Bxn8N4Io5VVnueFzHyIQb%2FWc5eeqh2xSHgzCXmkpLQQlCjvvQ3UpOJMgpaElzw8OeE5LXYwz4tPEG8NxMLIFsXmj69QDBtmzi8kondkZJWTaAtlPK8hIGLC%2BaU9woKUnfsDVt3xEiYiaqaKw1v3o3qBZd8tvZhkSxUQpKYLSHHuzla6VHlM%2FKt2pZJ%2Fg3l2PaIZ4hsPxCXXnUvp4FEEJq9%2BllVMBJ6hWQ%2BExisigOBNH%2BeklWD31Ss8JRu%2F4mNF%2Foayi2bQ2L0yzAmD184SA%3D%3D",
        description: "專業1對1指導訓練，讓你突飛猛進",
        to: "-LyvkMt2XlxH2tCk9C2X"
      },
      {
        tag: "心律監測",
        src:
          "https://storage.googleapis.com/vue-course-api.appspot.com/howieg1220%2F1579420864114.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QifVKK5jXnsIjKGDIb8LbZ5y5XivCWTfIvJu1JsvLeAUdKEF7uPkWXyXtgu5nYsX8D9fTYhBVoixHMEB1fvpFQLvV2cJJSpJouiJSxd1a8u8%2B0yIjZExKc%2FR4Rch%2FXbkVFN%2B8aFBdlnS78bTFUDqeGDEEsrwrtyt7HbES%2FjwuOuB9gcEOgt91%2BxNBtmDRSaC7E0ZM8%2B8e4vRFLfevPgQRb%2Fq91S%2B%2BlltQ3UHI3tQzefmbZyYPgYaBcyqpjAb6tN7F6fNE9KQmu8GRoJVbJetP5cWdUdyzLIbJzB51zaoleMfStfPG%2B1xt1qINdNGMJsTJOEZCYKxREx%2BRenBGavvTw%3D%3D",
        description: "多種搭配運動計步功能以及通話撥話等功能。",
        to: "-LxUJuHnZTrbQqCsMDC3"
      },
      {
        tag: "放鬆神器",
        src:
          "https://storage.googleapis.com/vue-course-api.appspot.com/howieg1220%2F1579421054615.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IUZ73GZfrlKUC5WbhVQr282agWhHL5nZoZDyY4X2iWeXhN031WAiwGaaW5ZwfwmB0DypSKdmYI%2BHe1YuFst5i8Vegdpwn0TugEJJaKeeks5ZrDcgBImjqgPIe5mCSY%2FeVy1KjKFbhisp7IWFgkWIIPsBdbJX8g%2BmPZrLJziNt%2FiPjW7VdBXMsrjZvXNyRVJ7ldM1GJJ9OkQ0clivRYAxWquV5e%2FBniJPlZXX2cnZLLzxg1EgAo2ozt%2FD24ZrEnSFOlGAtisDXMW46%2BNJIMgNy5zuM12uFSkfXRzIbui2oXZ0fDG90q4RxSVMjJ72%2BwHcBYWhVsYZJ7rmwcd9VRJgMw%3D%3D",
        description: "運動完痠痛?使用它來好好放鬆吧。",
        to: "-LxUKlOGVkBrGr8w7U7P"
      },
      {
        tag: "補充能量",
        src:
          "https://storage.googleapis.com/vue-course-api.appspot.com/howieg1220%2F1579240011072.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fYRG1ZC%2BkP80eeIoPgNzlLeyNaSCknRCJmAoexm0hGnNHaZKzUvXIH1%2BhG84iH3wrRwtbO%2FgSXe42dThq9NlRyLdarmOnuuFyCcCLwV8FLCwqDG5mB9lQFSuBwOcB%2FO%2BBupWvjrF2GdHw%2FjnDB7pxJRgsFJVi1sc13PxOokix4nlnWFCQ52uFYfQRNTUSjdkFXy8lW3NKyvb0vvWoNcwMca%2Bi6aJMTwc7kKhNT4qC51mOioCsuxkPecmm8bHjonzer7Mi6a5hi9IAplUkSijJ3gn0SpW26l5bnRZRfiqU4r63fRSHA0bw9WX7oUqDzzkja8Sxg4Qp5BEEZklQEeKRQ%3D%3D",
        description: "運動前、運動完方便補充能量。",
        to: "-LxUGEe7UjuOj4rvDR8C"
      },
      {
        tag: "音樂世界",
        src:
          "https://storage.googleapis.com/vue-course-api.appspot.com/howieg1220%2F1577850512423.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LiDuiZtTIAgZEXRZQt5lzirseXSVArkTV0cYOU4%2BiRpDBTR0Csgs%2FaNP4t5uxKHXaz6TeTa3UObV83axcKHm2brYPjpQ6DprAYM9WlnOnxmPzvRaqXEG1gTtc7Ohsqjl3QghRQD3Dc7YPYWyqf%2B1VXj5ZpkJaVhteg4%2BtQwIEZV6giM6FIDFj0U%2BmeMnC8KF%2FErV%2BrYrbI4vlo%2BRRvkabHp1jbAXFBRIek%2Bcxo2hPWgeWBFc8ehIdOiJw%2B3gSTx0HOH3fwmOK7OHMGNlwR5CCzhiXHpV9N4tcKkwmg5jDbuHrCtjhcQ6mkcFVc2CIHL3dT6GZaXm0rk8pXwXx7NaxA%3D%3D",
        description: "運動不再單調乏味",
        to: "-LxUD2R2ttgl5bY7aBe3"
      },
      {
        tag: "懶人神器",
        src:
          "https://storage.googleapis.com/vue-course-api.appspot.com/howieg1220%2F1579275379515.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=i96vBsGjYooNUXdlc1G26hc3yTLn7hQttMTMy7qK3YWLCWlvkbg8yW0CMBNG7dsB8qq6v%2FycQ%2F%2FnjmgMAU3cdDjvAlIeRiMT6eitUHgzt%2FQ%2BLKyMI%2BpqGxXc6R%2Fr3EmpKU3MgGn1CiJeuz7Cum3XEfkfWBxbeOrbRqELz78Y4p4dyM%2B5Qhz%2FDUTo0IxbzW74OGVLMA5sDH1kA7fuHwRRa1MLzF3fiCogNfrgiF7w5rCWBMkNL1wfO9fKnrOZ800jaRiZbzCMHw7NsH3eEWXLL8Hc1DfBLBrJSIYcosGaAC%2Bhw9xDmV%2FJ01lBJqEsqwOjO2NbGaCgRjkxp260xcO4cw%3D%3D",
        description: "按下開關輕鬆按摩",
        to: "-Lyo8Ug-ydmWocOl881I"
      }
    ],
    sortBanner: {
      equipment: {
        src: require("../assets/tools.jpg"),
        alt: "健身器材",
        title: "健身器材"
      },
      clothes: {
        src: require("../assets/clothesbanner.jpg"),
        alt: "運動服飾",
        title: "運動服飾"
      },
      course: {
        src: require("../assets/coursebanner.jpg"),
        alt: "專業課程",
        title: "專業課程"
      },
      accessory: {
        src: require("../assets/accessorybanner.jpg"),
        alt: "運動配件",
        title: "運動配件"
      },
      gear: {
        src: require("../assets/gearbanner.jpg"),
        alt: "健身護具",
        title: "健身護具"
      },
      boxing: {
        src: require("../assets/boxingbanner.jpg"),
        alt: "拳擊用品",
        title: "拳擊用品"
      },
      nutrition: {
        src: require("../assets/nutritionbanner.jpg"),
        alt: "營養補充",
        title: "營養補充"
      }
    }
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
    // ---Header ---
    SIDEBARSHOW(state, status) {
      state.sidebarShow = status;
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
    SORT(state, payload) {
      state.sort = payload;
    },
    SEQUENCE(state, payload) {
      state.sequence = payload;
    },
    MENUSHOW(state, payload) {
      state.menuShow = payload;
    },
    SEARCH(state, payload) {
      // let specialKey =
      //   "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      if (payload.indexOf("\\") != -1 || payload.indexOf("*") != -1) {
        payload = "";
      }
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
    // --- 訂單 ---
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
    CODE(state, payload) {
      state.code = payload;
    },
    ORDERID(state, payload) {
      state.orderId = payload;
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
      state.coupon.due_date = payload;
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
    // ----- 取得當前分頁的分類 -----
    getCategory(context, payload) {
      let sort = "";
      if (
        payload === "equipment" ||
        payload === "clothes" ||
        payload === "course" ||
        payload === "accessory" ||
        payload === "gear" ||
        payload === "boxing" ||
        payload === "nutrition" ||
        payload === "sales"
      ) {
        switch (payload) {
          case "equipment":
            sort = "健身器材";
            break;
          case "clothes":
            sort = "運動服飾";
            break;
          case "course":
            sort = "專業課程";
            break;
          case "accessory":
            sort = "運動配件";
            break;
          case "gear":
            sort = "健身護具";
            break;
          case "boxing":
            sort = "拳擊用品";
            break;
          case "nutrition":
            sort = "營養補充";
            break;
          case "sales":
            sort = "特價商品";
            break;
        }
        context.commit("SORT", payload);
        context.commit("CATEGORYSWITCH", sort);
      } else {
        switch (payload) {
          case "健身器材":
            sort = "equipment";
            break;
          case "運動服飾":
            sort = "clothes";
            break;
          case "專業課程":
            sort = "course";
            break;
          case "運動配件":
            sort = "accessory";
            break;
          case "健身護具":
            sort = "gear";
            break;
          case "拳擊用品":
            sort = "boxing";
            break;
          case "營養補充":
            sort = "nutrition";
            break;
        }
        context.commit("SORT", sort);
        // console.log(sort, payload);
        context.commit("CATEGORYSWITCH", payload);
      }
    },
    // ----- 分類切換 -----
    categorySwitch(context, payload) {
      context.commit("PAGENOW", 1); //初始化為第一頁
      window.scroll(0, 0); //將畫面移至最上面
      context.commit("SEARCH", ""); //清空搜尋
      if (router.history.current.name === payload) return;
      context.dispatch("getCategory", payload);
      router.push(`/product/${payload}`);
      context.commit("SEQUENCE", "timeold");
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
      router.push(`/product/${payload}`); //跳到產品頁
      context.dispatch("getProduct", payload);
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
    // ----- 搜尋功能 -----
    searching(context) {
      router.push("/product/search");
      context.commit("SIDEBARSHOW", false);
    },
    //----- 產品數量修改器 -----
    changeQty(context, payload) {
      if (context.state.amt <= 0) {
        context.commit("QTY", 1);
      } else if (context.state.amt >= 100) {
        context.commit("QTY", 99);
      } else {
        let qty = Number(context.state.qty) + Number(payload);
        context.commit("QTY", Number(qty));
      }
    },
    // ----- 套用優惠券 -----
    submitCoupon(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      axios.post(url, { data: { code: context.state.code } }).then(response => {
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
    // ----- 更換頁面 -----
    toPage(context, payload) {
      router.push(`${payload}`);
      context.commit("PAGENOW", 1);
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
      }, 2000);
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
    },
    star(state) {
      return state.star;
    },
    oldder(state) {
      let tmp = [];
      tmp.push(state.products[0]);
      tmp.push(state.products[1]);
      tmp.push(state.products[2]);
      tmp.push(state.products[3]);
      tmp.push(state.products[4]);
      tmp.push(state.products[5]);
      return tmp;
    },
    newer(state) {
      let tmp = [];
      tmp.push(state.products[6]);
      tmp.push(state.products[7]);
      tmp.push(state.products[8]);
      tmp.push(state.products[9]);
      tmp.push(state.products[10]);
      tmp.push(state.products[11]);
      return tmp;
    },
    beginner(state) {
      let tmp = [];
      tmp.push(state.products[12]);
      tmp.push(state.products[13]);
      tmp.push(state.products[14]);
      tmp.push(state.products[15]);
      tmp.push(state.products[16]);
      tmp.push(state.products[17]);
      return tmp;
    },
    // --- 整理出有特價的商品 ---
    sales(state) {
      // tmp.filter(function(item) {
      //   return item.price === item.origin_price;
      // });
      let tmp = state.products;
      tmp = tmp.filter(function(item) {
        return !item.price.match(item.origin_price);
      });
      return tmp;
    }
  },
  modules: {}
});
