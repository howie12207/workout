import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../components/front/Home.vue";
// import About from "../components/front/About.vue";
import Product from "../components/front/Product.vue";
import Main from "../components/front/Main.vue";
import Sort from "../components/front/Sort.vue";
import Sales from "../components/front/Sales.vue";
import Search from "../components/front/Search.vue";
import ProductId from "../components/front/ProductId.vue";
import Checkout from "../components/front/Checkout.vue";
import Pay from "../components/front/Pay.vue";
import Login from "../components/back/Login.vue";
import Dashboard from "../components/back/Dashboard.vue";
import Productslist from "../components/back/Productslist.vue";
import Orderslist from "../components/back/Orderslist.vue";
import Couponslist from "../components/back/Couponslist.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/product"
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: About
  // },
  {
    path: "/product",
    component: Product,
    children: [
      {
        path: "",
        name: "main",
        component: Main
      },
      {
        path: "equipment",
        name: "equipment",
        component: Sort
      },
      {
        path: "clothes",
        name: "clothes",
        component: Sort
      },
      {
        path: "course",
        name: "course",
        component: Sort
      },
      {
        path: "accessory",
        name: "accessory",
        component: Sort
      },
      {
        path: "gear",
        name: "gear",
        component: Sort
      },
      {
        path: "boxing",
        name: "boxing",
        component: Sort
      },
      {
        path: "nutrition",
        name: "nutrition",
        component: Sort
      },
      {
        path: "sales",
        name: "sales",
        component: Sales
      },
      {
        path: "search",
        name: "search",
        component: Search
      }
    ]
  },
  {
    path: "/product/:productId",
    name: "productId",
    component: ProductId
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout
  },
  {
    path: "/pay/:orderId",
    name: "pay",
    component: Pay
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/admin",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "productslist",
        name: "productslist",
        component: Productslist,
        meta: { requiresAuth: true }
      },
      {
        path: "orderslist",
        name: "orderslist",
        component: Orderslist,
        meta: { requiresAuth: true }
      },
      {
        path: "couponslist",
        name: "couponslist",
        component: Couponslist,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
