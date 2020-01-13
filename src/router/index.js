import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/front/Home.vue";
import Product from "../components/front/Product.vue";
import Login from "../components/back/Login.vue";
import Dashboard from "../components/back/Dashboard.vue";
import Productslist from "../components/back/Productslist.vue";

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
    path: "/product",
    name: "product",
    component: Product
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
        component: Productslist
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
