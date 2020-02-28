import Vue from "vue";
import VueRouter from "vue-router";
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
    path: "/product",
    component: Product,
    meta: {
      breadcrumb: [{ name: "產品介紹", link: "product" }]
    },
    children: [
      {
        path: "",
        name: "main",
        component: Main,
        meta: {
          breadcrumb: [{ name: "產品介紹", link: "product" }]
        }
      },
      {
        path: "equipment",
        name: "equipment",
        component: Sort,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "健身器材", link: "/product/equipment" }
          ]
        }
      },
      {
        path: "clothes",
        name: "clothes",
        component: Sort,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "運動服飾", link: "/product/clothes" }
          ]
        }
      },
      {
        path: "course",
        name: "course",
        component: Sort,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "專業課程", link: "/product/course" }
          ]
        }
      },
      {
        path: "accessory",
        name: "accessory",
        component: Sort,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "運動配件", link: "/product/accessory" }
          ]
        }
      },
      {
        path: "gear",
        name: "gear",
        component: Sort,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "健身護具", link: "/product/gear" }
          ]
        }
      },
      {
        path: "boxing",
        name: "boxing",
        component: Sort,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "拳擊用品", link: "/product/boxing" }
          ]
        }
      },
      {
        path: "nutrition",
        name: "nutrition",
        component: Sort,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "營養補充", link: "/product/nutrition" }
          ]
        }
      },
      {
        path: "sales",
        name: "sales",
        component: Sales,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "特價商品", link: "/product/sales" }
          ]
        }
      },
      {
        path: "search",
        name: "search",
        component: Search,
        meta: {
          breadcrumb: [
            { name: "產品介紹", link: "/product" },
            { name: "商品搜尋", link: "/product/search" }
          ]
        }
      }
    ]
  },
  {
    path: "/product/:productId",
    name: "productId",
    component: ProductId,
    meta: {
      breadcrumb: [
        { name: "產品介紹", link: "/product" },
        { name: "sort", link: "sort" },
        { name: "title", link: "" }
      ]
    }
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
    meta: {
      breadcrumb: [
        { name: "產品介紹", link: "/product" },
        { name: "結帳", link: "/checkout" }
      ]
    }
  },
  {
    path: "/pay/:orderId",
    name: "pay",
    component: Pay,
    meta: {
      breadcrumb: [
        { name: "產品介紹", link: "/product" },
        { name: "結帳", link: "/checkout" }
      ]
    }
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
  },
  {
    path: "*",
    redirect: "/product"
  }
];

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: "hash"
});

export default router;
