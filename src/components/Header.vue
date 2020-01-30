<template>
  <div class="header">
    <!-- 前台 -->
    <template v-if="$route.path.indexOf('admin')==-1">
      <!-- 小尺寸 -->
      <div class="mask" v-if="sidebarShow "></div>
      <transition name="move">
        <!-- 側邊欄 -->
        <div class="sidebar" v-if="sidebarShow">
          <a href="#" class="closeBtn" @click.prevent="sidebarshow(false)">
            <i class="fas fa-times"></i>
          </a>
          <label for="searchbox" class="searchbox">商品搜尋</label>
          <div class="searchbar">
            <input
              type="text"
              id="searchbox"
              placeholder="請輸入關鍵字.."
              v-model="search"
              @keyup.enter="searching"
              @keyup.esc="clearsearch"
            />
            <a href="#" @click.prevent="searching">
              <i class="fas fa-search"></i>
            </a>
          </div>
          <h2>商品分類</h2>
          <nav class="sort">
            <a href="#" @click.prevent="categorySwitch('equipment')">
              <h3>健身器材</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="categorySwitch('clothes')">
              <h3>運動服飾</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="categorySwitch('course')">
              <h3>專業課程</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="categorySwitch('accessory')">
              <h3>運動配件</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="categorySwitch('gear')">
              <h3>健身護具</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="categorySwitch('boxing')">
              <h3>拳擊用品</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="categorySwitch('nutrition')">
              <h3>營養補充</h3>
              <i class="fas fa-angle-right"></i>
            </a>
          </nav>
        </div>
      </transition>
      <!-- 大尺寸 -->
      <div class="container">
        <a href="#" class="menu" @click.prevent="sidebarshow(true)">
          <i class="fas fa-bars"></i>
        </a>
        <!-- LOGO -->
        <router-link to="/product" class="logo">
          <img src="../assets/logo.png" alt="logo" />
          <h2>健身趣</h2>
        </router-link>
        <!-- 分類 -->
        <nav class="sort">
          <a href="#" @click.prevent="categorySwitch('equipment')">
            <img src="../assets/dumbell.png" alt="equipment" />
            <h3>健身器材</h3>
          </a>
          <a href="#" @click.prevent="categorySwitch('clothes')">
            <img src="../assets/clothes.png" alt="clothes" />
            <h3>運動服飾</h3>
          </a>
          <a href="#" @click.prevent="categorySwitch('course')">
            <img src="../assets/coach.png" alt="course" />
            <h3>專業課程</h3>
          </a>
          <a href="#" @click.prevent="categorySwitch('accessory')">
            <img src="../assets/bag.png" alt="accessory" />
            <h3>運動配件</h3>
          </a>
          <a href="#" @click.prevent="categorySwitch('gear')">
            <img src="../assets/gloves.png" alt="gear" />
            <h3>健身護具</h3>
          </a>
          <a href="#" @click.prevent="categorySwitch('boxing')">
            <img src="../assets/boxing.png" alt="boxing" />
            <h3>拳擊用品</h3>
          </a>
          <a href="#" @click.prevent="categorySwitch('nutrition')">
            <img src="../assets/food.png" alt="nutrition" />
            <h3>營養補充</h3>
          </a>
        </nav>
        <!-- 小圖示 -->
        <div class="icon">
          <div class="search">
            <input
              type="text"
              placeholder="請輸入關鍵字.."
              v-model="search"
              @keyup.enter="searching"
              @keyup.esc="clearsearch"
              @keyup="btnup"
            />
            <a href="#" @click.prevent="searching">
              <i class="fas fa-search"></i>
            </a>
          </div>
          <div class="star">
            <i class="fas fa-heart"></i>
            <span class="num" v-if="star.length">{{ star.length }}</span>
            <ul class="list starlist">
              <li class="titlelist" v-if="star.length < 1">
                <span>目前沒有觀察名單</span>
              </li>
              <li class="titlelist" v-else>
                <span>觀察清單</span>
              </li>
              <li v-for="(item, index) in star" :key="index">
                <a href="#" class="delBtn" @click.prevent="removeStar(item)">
                  <i class="fas fa-heart"></i>
                </a>
                <a href="#" @click.prevent="seeMore(item.id)">
                  <span class="title">{{ item.title }}</span>
                  <span class="price">{{ item.price | currency }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="cart" v-if="cart.carts">
            <a href="#" @click.prevent="toCheckout">
              <i class="fas fa-shopping-cart"></i>
            </a>
            <span class="num" v-if="cart.carts.length">{{ cart.carts.length }}</span>
            <ul class="list cartlist" v-if="cart.carts">
              <li class="titlelist" v-if="cart.carts.length < 1">
                <span>目前購物車為空</span>
              </li>
              <li class="titlelist" v-else>
                <span>購物車</span>
                <router-link to="/checkout" class="txt">
                  <span>結帳</span>
                </router-link>
              </li>
              <li v-for="(item, index) in cart.carts" :key="index">
                <a href="#" class="delBtn" @click.prevent="removeCart(item.id)">
                  <i class="far fa-trash-alt"></i>
                </a>
                <a href="#" @click.prevent="seeMore(item.product.id)">
                  <span class="title">{{ item.product.title }}</span>
                  <span class="qty">{{ item.qty }}{{ item.product.unit }}</span>
                  <span class="price">{{ item.final_total | currency }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <!-- 後台 -->
    <template v-else>
      <!-- 小尺寸 -->
      <div class="mask" v-if="sidebarShow "></div>
      <transition name="move">
        <!-- 側邊欄 -->
        <div class="sidebar" v-if="sidebarShow">
          <a href="#" class="closeBtn" @click.prevent="sidebarshow(false)">
            <i class="fas fa-times"></i>
          </a>
          <h2>管理員</h2>
          <nav class="sort">
            <a href="#" @click.prevent="toPage('/admin/productslist')">
              <h3>產品列表</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="toPage('/admin/orderslist')">
              <h3>訂單列表</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="toPage('/admin/couponslist')">
              <h3>優惠券列表</h3>
              <i class="fas fa-angle-right"></i>
            </a>
            <a href="#" @click.prevent="logout">
              <h3>登出</h3>
            </a>
          </nav>
        </div>
      </transition>
      <!-- 大尺寸 -->
      <div class="container containerback">
        <a href="#" class="menu" @click.prevent="sidebarshow(true)">
          <i class="fas fa-bars"></i>
        </a>
        <router-link to="/product" class="logo">
          <img src="../assets/logo.png" alt="logo" />
          <h2>健身趣</h2>
        </router-link>
        <nav class="sort">
          <a href="#" @click.prevent="toPage('/admin/productslist')">
            <h3>產品列表</h3>
          </a>
          <a href="#" @click.prevent="toPage('/admin/orderslist')">
            <h3>訂單列表</h3>
          </a>
          <a href="#" @click.prevent="toPage('/admin/couponslist')">
            <h3>優惠券</h3>
          </a>
          <a href="#" @click.prevent="logout">
            <h3>登出</h3>
          </a>
        </nav>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["cart", "star"]),
    sidebarShow() {
      return this.$store.state.sidebarShow;
    },
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        // ----- 限制特殊符號 -----
        value = value
          .replace(
            /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
            ""
          )
          .replace(/\s/g, "");
        this.$store.commit("SEARCH", value);
      }
    }
  },
  methods: {
    ...mapActions(["searching"]),
    logout() {
      this.$store.dispatch("logout");
      this.$store.commit("SIDEBARSHOW", false);
    },
    toPage(page) {
      this.$store.dispatch("toPage", page);
      this.$store.commit("SIDEBARSHOW", false);
    },
    clearsearch() {
      this.$store.commit("SEARCH", "");
    },
    sidebarshow(status) {
      this.$store.commit("SIDEBARSHOW", status);
    },
    categorySwitch(category) {
      this.$store.dispatch("categorySwitch", category);
      this.$store.commit("SIDEBARSHOW", false);
    },
    clearSearch() {
      this.$store.commit("SEARCH", "");
    },
    removeStar(item) {
      this.$store.dispatch("removeStar", item);
    },
    removeCart(item) {
      this.$store.dispatch("removeCart", item);
    },
    seeMore(page) {
      this.$store.dispatch("seeMore", page);
    },
    changeStar(item) {
      const vm = this;
      return vm.$store.state.star.some(el => {
        const result = item.id === el.id;
        return result;
      });
    },
    toCheckout() {
      this.$store.dispatch("toPage", "/checkout");
    },
    // ----- 限制特殊符號 -----
    btnup(e) {
      e.target.value = e.target.value
        .replace(
          /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
          ""
        )
        .replace(/\s/g, "");
    }
  },
  created() {
    this.$store.dispatch("getCart");
    this.$store.dispatch("getStar");
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/variable.scss";
a {
  @extend %abutton;
}
.header {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  > .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);
  }
  > .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 240px;
    z-index: 100;
    background-color: #fff;
    padding: line(1) line(2);
    box-sizing: border-box;
    > .closeBtn {
      position: fixed;
      left: 248px;
      top: 8px;
      color: white;
      font-size: 2rem;
    }
    > h2,
    > .searchbox {
      display: block;
      font-size: 1.25rem;
      line-height: 4rem;
      border-bottom: 1px solid rgb(66, 151, 45);
    }
    > .searchbar {
      display: flex;
      align-items: center;
      width: 208px;
      border: 1px solid $red;
      margin: line(2) auto 0;
      padding: line(0.5) line(1.5);
      box-sizing: border-box;
      border-radius: 16px;
      > input {
        width: 100%;
        border: none;
      }
      > a {
        color: $red;
      }
    }
    > .sort {
      display: flex;
      flex-direction: column;
      > a {
        color: $red;
        line-height: 3rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .container {
    position: sticky;
    margin: 0 auto line(1);
    padding: 0 line(1);
    height: 80px;
    box-sizing: border-box;
    font-family: "Noto Serif TC", serif;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    z-index: 11;
    > .menu {
      color: $red;
      margin: 0 line(2);
      font-size: 1.75rem;
    }
    > .logo {
      // --- logo ---
      @extend %abutton;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto 0 line(1);
      > img {
        width: 60px;
        height: 60px;
      }
      > h2 {
        display: none;
        width: 80px;
        text-align: center;
        padding: line(0.5) 0;
        color: $red;
      }
    }
    > .sort {
      // --- 分類 ---
      // display: flex;
      display: none;
      align-items: center;
      height: 100%;
      > a {
        @extend %abutton;
        color: $red;
        padding: 0 line(2);
        margin: line(2) 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        > img {
          width: 40px;
          height: 40px;
          margin: 0 0 line(2);
        }
      }
      > a:hover:after {
        content: "";
        position: absolute;
        bottom: -16px;
        width: 100%;
        height: 3px;
        background-color: $red;
      }
    }
    > .icon {
      // --- icon ---
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      > .search {
        display: none;
      }
      > a,
      div:not(.search) {
        @extend %abutton;
        color: $red;
        font-size: 1.75rem;
        margin: 0 line(1);
        position: relative;
        > i {
          height: 80px;
          line-height: 80px;
          padding: line(1);
          box-sizing: border-box;
        }
        > a {
          > i {
            color: $red;
            height: 80px;
            line-height: 80px;
            padding: line(1);
            box-sizing: border-box;
          }
        }
        > span {
          position: absolute;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          top: 24px;
          right: -4px;
          background-color: #92a6b5;
          border-radius: 50%;
          font-size: 1rem;
          color: white;
        }
        > .cartlist {
          display: none;
        }
        > .starlist {
          width: 260px !important;
        }
        > .list {
          border: 1px solid #fff3ee;
          // border-top: 1px solid white;
          display: none;
          position: absolute;
          width: 300px;
          font-size: 1rem;
          right: -16px;
          top: 79px;
          background-color: #fff3ee;
          padding: line(1) line(1);
          box-sizing: border-box;
          > .titlelist {
            display: flex;
            justify-content: space-between;
            > span {
              line-height: 1.5rem;
            }
            > a {
              background-color: $red;
              padding: line(1);
              box-sizing: border-box;
              border-radius: 8px;
              color: white;
            }
          }
          li {
            display: flex;
            align-items: center;
            margin: line(1) 0 0;
            .delBtn {
              display: inline-block;
              color: red;
              width: 24px;
            }
            a {
              display: flex;
              align-items: center;
              transform: scale(1);
              transition: 0.7s;
              .title {
                display: inline-block;
                color: black;
                width: 160px;
              }
              .qty {
                display: inline-block;
                width: 40px;
                color: black;
              }
              .price {
                display: inline-block;
                color: red;
                text-align: right;
                width: 56px;
              }
            }
            a:hover {
              transform: scale(0.95);
            }
          }
        }
        > .list:before {
          content: "";
          position: absolute;
          top: -24px;
          right: 26px;
          width: 0;
          height: 0;
          // background-color: #ccc;
          border-top: 12px solid transparent;
          border-bottom: 12px solid #fff3ee;
          border-right: 12px solid transparent;
          border-left: 12px solid transparent;
        }
      }
      > a:hover,
      div:hover {
        > .list {
          display: block;
        }
      }
    }
  }
}
.move-leave,
.move-enter-to {
  transform: translateX(0);
}
.move-leave-active,
.move-enter-active {
  transition: 0.7s;
}
.move-leave-to,
.move-enter {
  transform: translateX(-300px);
}
@media screen and (min-width: 1200px) {
  .header {
    max-width: 1160px;
    width: 1160px;
    > .mask {
      display: none;
    }
    > .sidebar {
      display: none;
    }
    > .searchBlock {
      display: none;
    }
    > .container {
      height: 120px;
      > .menu {
        display: none;
      }
      > .logo {
        margin: 0 0 0 line(1);
        > img {
          width: 80px;
          height: 80px;
        }
        > h2 {
          display: block;
        }
      }
      > .sort {
        display: flex;
        margin: 0 auto 0 line(1);
      }
      > .icon {
        align-items: flex-end;
        > .search {
          display: flex;
          align-items: center;
          border: 1px solid $red;
          font-size: 1.75rem;
          margin: 0 0 line(2);
          padding: 0 line(2);
          border-radius: 16px;
          box-sizing: border-box;
          > input {
            border: none;
            width: 180px;
          }
          > a {
            color: $red;
          }
        }
        > a,
        div {
          > .list {
            top: 80px !important;
          }
        }
      }
    }
    > .containerback {
      > .sort {
        margin: 0 0 0 auto;
      }
    }
  }
}
</style>
