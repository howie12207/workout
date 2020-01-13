import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// ----- axios套件 -----
import axios from "axios";
import VueAxios from "vue-axios";

// ----- loading畫面套件 -----
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// ----- 輪播套件 -----
import VueAwesomeSwiper from "vue-awesome-swiper";
// ----- 輪播樣式 -----
import "swiper/dist/css/swiper.css";

// ----- 警示 -----
import AlertMessage from "./components/AlertMessage.vue";
// ----- 頁尾 -----
import Footer from "./components/Footer.vue";

// ========== filter ==========
// ----- 金錢 -----
import CurrencyFilter from "./filters/Currency.js";
// ----- 日期 -----
import DateFilter from "./filters/Date.js";

// ----- 驗證套件 -----
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
// ----- 載入所有規則 -----
import * as rules from "vee-validate/dist/rules";
// ----- 載入中文 -----
import tw from "vee-validate/dist/locale/zh_TW";

Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper /* { default global options } */);

// ----- 跨域 -----
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

Vue.filter("currency", CurrencyFilter);
Vue.filter("date", DateFilter);
Vue.component("Loading", Loading);
Vue.component("Alert", AlertMessage);
Vue.component("Footer", Footer);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// ----- 驗證登入 -----
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const url = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(url).then(response => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});

// ----- Vee-validate規則中文化 -----
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // 加規則
    message: tw.messages[rule] // 中文化
  });
}
