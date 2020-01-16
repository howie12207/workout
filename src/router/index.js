import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/front/Home.vue";
import About from "../components/front/About.vue";
import Product from "../components/front/Product.vue";
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
    redirect: "/"
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/product",
    name: "product",
    component: Product
  },
  {
    path: "/product/:productId",
    name: "productid",
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
  routes
});

export default router;
