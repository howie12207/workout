<template>
  <header class="header">
    <!-- 前台 -->
    <template v-if="$route.path.indexOf('admin')==-1">
      <!-- 遮罩層 -->
      <div class="mask" v-if="sidebarShow"></div>
      <transition name="move">
        <!-- 側邊欄 -->
        <div class="sidebar" v-if="sidebarShow">
          <!-- 關閉按鈕 -->
          <a href="#" class="closeBtn" @click.prevent="sidebarshow(false)">
            <i class="fas fa-times"></i>
          </a>
          <!-- 搜尋區 -->
          <label for="searchbox" class="searchbox">搜尋</label>
          <div class="searchbar">
            <input
              type="text"
              id="searchbox"
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
          <h2>商品分類</h2>
          <!-- 分類按鈕 -->
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
      <div class="container">
        <!-- 小尺寸選單按鈕 -->
        <a href="#" class="menu" @click.prevent="sidebarshow(true)">
          <i class="fas fa-bars"></i>
        </a>
        <!-- LOGO -->
        <router-link to="/" class="logo">
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
          <!-- 搜尋區 -->
          <div class="searchicon" v-if="!searchShow">
            <a href="#" @click.prevent="searchHandler(true)">
              <i class="fas fa-search"></i>
            </a>
          </div>
          <div class="search" v-else>
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
          <!-- 觀察名單 -->
          <div class="star">
            <i class="far fa-heart"></i>
            <span class="num" v-if="star.length">{{ star.length }}</span>
            <ul class="list starlist">
              <li class="titlelist" v-if="star.length < 1">
                <span>目前沒有觀察名單</span>
              </li>
              <li v-for="(item, index) in star" :key="index">
                <!-- 取消觀察按鈕 -->
                <a href="#" @click.prevent="seeMore(item.id)" class="pic">
                  <img :src="item.imageUrl" alt />
                </a>
                <a href="#" @click.prevent="seeMore(item.id)" class="txt">
                  <span class="title">{{ item.title }}</span>
                </a>
                <span class="price">{{ item.price | currency }}</span>
                <a href="#" class="delBtn" @click.prevent="removeStar(item)">
                  <i class="far fa-trash-alt"></i>
                </a>
              </li>
            </ul>
          </div>
          <!-- 購物車 -->
          <div class="cart" v-if="cart.carts">
            <a href="#" @click.prevent="toCheckout">
              <i class="fas fa-shopping-cart"></i>
            </a>
            <span class="num" v-if="cart.carts.length">{{ cart.carts.length }}</span>
            <ul class="list cartlist" v-if="cart.carts">
              <li class="titlelist" v-if="cart.carts.length < 1">
                <span>目前購物車是空的</span>
              </li>
              <li v-for="(item, index) in cart.carts" :key="index">
                <a href="#" @click.prevent="seeMore(item.product.id)" class="pic">
                  <img :src="item.product.imageUrl" alt />
                </a>
                <p class="txt">
                  <a
                    href="#"
                    @click.prevent="seeMore(item.product.id)"
                    class="title"
                  >{{ item.product.title }}</a>
                  <span class="price">{{ item.product.price | currency }} x{{ item.qty }}</span>
                </p>
                <a href="#" class="delBtn" @click.prevent="removeCart(item.id)">
                  <i class="far fa-trash-alt"></i>
                </a>
              </li>
              <li class="cartfoot">
                <p>
                  總計:
                  <span class="dollar">{{ cart.final_total | currency }}</span>
                </p>
                <a href="#" @click.prevent="toCheckout" class="btnCheckout">結帳</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <!-- 後台 -->
    <template v-else>
      <!-- 遮罩層 -->
      <div class="mask" v-if="sidebarShow"></div>
      <transition name="move">
        <!-- 側邊欄 -->
        <div class="sidebar" v-if="sidebarShow">
          <!-- 關閉按鈕 -->
          <a href="#" class="closeBtn" @click.prevent="sidebarshow(false)">
            <i class="fas fa-times"></i>
          </a>
          <h2>管理員</h2>
          <!-- 選單按鈕 -->
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
      <div class="container containerback">
        <!-- 小尺寸選單按鈕 -->
        <a href="#" class="menu" @click.prevent="sidebarshow(true)">
          <i class="fas fa-bars"></i>
        </a>
        <!-- LOGO -->
        <router-link to="/product" class="logo">
          <img src="../assets/logo.png" alt="logo" />
          <h2>健身趣</h2>
        </router-link>
        <!-- 選單 -->
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
  </header>
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
    searchShow() {
      return this.$store.state.searchShow;
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
    searchHandler(state) {
      this.$store.commit("SEARCHSHOW", state);
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
  // 遮罩層
  > .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);
  }
  // 側邊欄
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
    color: #444;
    font-size: 15px;
    // 關閉按鈕
    > .closeBtn {
      position: fixed;
      left: 248px;
      top: 8px;
      color: white;
      font-size: 24px;
    }
    // 搜尋區
    > h2,
    > .searchbox {
      display: block;
      font-size: 16px;
      line-height: 3rem;
      border-bottom: 1px solid $light;
      color: $btn-cart-hover;
      font-weight: bold;
    }
    > .searchbar {
      display: flex;
      align-items: center;
      width: 208px;
      border: 1px solid $btn-star-hover;
      margin: line(2) auto 0;
      padding: line(0.5) line(1.5);
      box-sizing: border-box;
      border-radius: 16px;
      > input {
        width: 100%;
        border: none;
      }
      > a {
        color: $btn-star-hover;
      }
    }
    // 分類按鈕
    > .sort {
      display: flex;
      flex-direction: column;
      > a {
        color: $dark;
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
    margin: 0 auto;
    padding: 0 line(1);
    height: 80px;
    box-sizing: border-box;
    font-family: "Noto Serif TC", serif;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $light;
    z-index: 11;
    // 菜單按鈕
    > .menu {
      color: $btn-cart;
      margin: 0 line(2);
      font-size: 1.75rem;
    }
    // LOGO
    > .logo {
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
        padding: line(0.5) 0 line(0.5) line(0.5);
        letter-spacing: 4px;
        font-weight: 900;
        color: #666;
      }
    }
    // 分類按鈕
    > .sort {
      display: none;
      align-items: center;
      height: 100%;
      margin: 0 auto 0 line(4);
      > a {
        @extend %abutton;
        color: $dark;
        padding: 0 line(2.5);
        margin: line(2) 0 0;
        font-size: 15px;
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
      > a:after {
        content: "";
        position: absolute;
        right: 50%;
        left: 50%;
        bottom: -16px;
        height: 3px;
        background-color: $primary;
        transition: 0.4s;
      }
      > a:hover:after {
        left: 0;
        right: 0;
      }
    }
    // 小圖示
    > .icon {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      // 搜尋區
      .searchicon {
        display: none !important;
      }
      > .search {
        display: none;
      }
      // 觀察名單及購物車
      > a,
      div:not(.search) {
        @extend %abutton;
        color: #666;
        font-size: 24px;
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
            color: #666;
            height: 80px;
            line-height: 80px;
            padding: line(1);
            box-sizing: border-box;
          }
        }
        > span {
          position: absolute;
          width: 18px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          top: 28px;
          right: 0px;
          background-color: $primary;
          border-radius: 50%;
          font-size: 12px;
          color: white;
        }
        > .list {
          border: 1px solid $light;
          display: none;
          position: absolute;
          width: 300px;
          font-size: 1rem;
          top: 80px;
          right: -16px;
          background-color: #fff;
          padding: line(1) line(1);
          box-sizing: border-box;
          > .titlelist {
            display: flex;
            padding: line(1) 0 0 0;
            font-weight: 600;
          }
          > li {
            display: flex;
            align-items: center;
            height: 70px;
            > .pic {
              > img {
                width: 50px;
                height: 50px;
                object-fit: cover;
              }
            }
            > .txt {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              width: 200px;
              height: 50px;
              font-size: 13px;
              margin: 0 0 0 12px;
              color: $dark;
              > .title {
                color: #555;
              }
              > .title:hover {
                color: $active;
                font-weight: 600;
              }
            }
            > .delBtn {
              color: $dark;
              opacity: 0.5;
              font-size: 14px;
            }
            > .delBtn:hover {
              opacity: 1;
            }
          }
          > li:not(:last-child) {
            border-bottom: 1px dotted $light;
          }
          > .cartfoot {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            line-height: 30px;
            font-size: 13px;
            .dollar {
              color: red;
            }
            .btnCheckout {
              padding: 0 line(1);
              background: $btn-cart;
              color: white;
              border-radius: 4px;
            }
            .btnCheckout:hover {
              background-color: $btn-cart-hover;
            }
          }
        }
        > .starlist {
          width: 260px;
          font-size: 13px;
          > li {
            justify-content: space-between;
            > .txt {
              width: auto;
              margin: 0 auto 0 16px;
            }
            > .delBtn {
              margin: 0 0 0 24px;
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
          border-top: 12px solid transparent;
          border-bottom: 12px solid $light;
          border-right: 12px solid transparent;
          border-left: 12px solid transparent;
        }
        > .list:after {
          content: "";
          position: absolute;
          top: -23px;
          right: 26px;
          width: 0;
          height: 0;
          border-top: 12px solid transparent;
          border-bottom: 12px solid white;
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
// Transition
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
    // 遮罩層
    > .mask {
      display: none;
    }
    // 側邊欄
    > .sidebar {
      display: none;
    }
    // 搜尋區
    > .searchBlock {
      display: none;
    }
    > .container {
      height: 120px;
      // 菜單按鈕
      > .menu {
        display: none;
      }
      // LOGO
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
      // 分類按鈕
      > .sort {
        display: flex;
        // margin: 0 auto 0 line(5);
      }
      // 小圖示
      > .icon {
        align-items: flex-end;
        // 搜尋區
        > .searchicon {
          display: block !important;
        }
        > .search {
          display: flex;
          align-items: center;
          margin: 0 line(1) line(2);
          padding: 0 0 0 line(1);
          box-sizing: border-box;
          background-color: #f8f8f8;
          > input {
            border: none;
            width: 145px;
            color: $dark;
            font-size: 13px;
            background-color: transparent;
          }
          > a {
            color: white;
            background-color: $primary;
            font-size: 24px;
            padding: 2px;
          }
        }
      }
    }
    // 後台
    > .containerback {
      // 分類按鈕
      > .sort {
        margin: 0 0 0 auto;
      }
    }
  }
}
</style>
