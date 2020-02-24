<template>
  <div class="main">
    <Banner v-if="fullWidth>=1200" />
    <BannerS v-else />
    <div class="container">
      <!-- 左邊大標題 -->
      <div class="sort">
        <!-- 圖片 -->
        <div class="pic">
          <img src="../../assets/new.jpg" alt="new" />
        </div>
        <!-- 文字 -->
        <div class="txt">特價商品</div>
      </div>
      <!-- 右邊主區域 -->
      <div class="section">
        <div class="item" v-for="(item,index) in sales" :key="index">
          <a href="#" class="pic" v-if="item" @click.prevent="seeMore(item.id)">
            <!-- 圖片 -->
            <div class="mask">
              <div class="icon">
                <!-- 觀察名單按鈕 -->
                <a
                  href="#"
                  class="star"
                  @click.prevent.stop="removeStar(item)"
                  v-if="changeStar(item)"
                >
                  <i class="fas fa-heart"></i>
                </a>
                <a href="#" @click.prevent.stop="addStar(item)" v-else>
                  <i class="far fa-heart"></i>
                </a>
                <!-- 購物車按鈕 -->
                <a href="#" @click.prevent.stop="addCart(item.id)">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <!-- 文字 -->
          <div class="txt" v-if="item">
            <a href="#" class="title" @click.prevent="seeMore(item.id)">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price" v-if="item.origin_price===item.price">
              <!-- 留空讓價錢靠右 -->
              <span></span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
            <p class="price" v-else>
              <span class="origin">{{ item.origin_price |currency }}</span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
          </div>
        </div>
        <div class="item more" v-if="sales.length<8">
          <router-link to="/product/sales">查看更多</router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- 左邊大標題 -->
      <div class="sort">
        <!-- 圖片 -->
        <div class="pic">
          <img src="../../assets/beginner.jpg" alt="beginner" />
        </div>
        <!-- 文字 -->
        <div class="txt">新手推薦</div>
      </div>
      <!-- 右邊主區域 -->
      <div class="section">
        <div class="item" v-for="(item,index) in beginner" :key="index">
          <a href="#" class="pic" v-if="item" @click="seeMore(item.id)">
            <!-- 圖片 -->
            <div class="mask">
              <div class="icon">
                <!-- 觀察名單按鈕 -->
                <a
                  href="#"
                  class="star"
                  @click.prevent.stop="removeStar(item)"
                  v-if="changeStar(item)"
                >
                  <i class="fas fa-heart"></i>
                </a>
                <a href="#" @click.prevent.stop="addStar(item)" v-else>
                  <i class="far fa-heart"></i>
                </a>
                <!-- 購物車按鈕 -->
                <a href="#" @click.prevent.stop="addCart(item.id)">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <!-- 文字 -->
          <div class="txt" v-if="item">
            <a href="#" class="title" @click="seeMore(item.id)">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price" v-if="item.origin_price===item.price">
              <!-- 留空讓價錢靠右 -->
              <span></span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
            <p class="price" v-else>
              <span class="origin">{{ item.origin_price |currency }}</span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- 左邊大標題 -->
      <div class="sort">
        <!-- 圖片 -->
        <div class="pic">
          <img src="../../assets/old.jpg" alt="old" />
        </div>
        <!-- 文字 -->
        <div class="txt">老手專區</div>
      </div>
      <!-- 右邊主區域 -->
      <div class="section">
        <div class="item" v-for="(item,index) in oldder" :key="index">
          <a href="#" class="pic" v-if="item" @click.prevent="seeMore(item.id)">
            <!-- 圖片 -->
            <div class="mask">
              <div class="icon">
                <!-- 觀察名單按鈕 -->
                <a
                  href="#"
                  class="star"
                  @click.prevent.stop="removeStar(item)"
                  v-if="changeStar(item)"
                >
                  <i class="fas fa-heart"></i>
                </a>
                <a href="#" @click.prevent.stop="addStar(item)" v-else>
                  <i class="far fa-heart"></i>
                </a>
                <!-- 購物車按鈕 -->
                <a href="#" @click.prevent.stop="addCart(item.id)">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <!-- 文字 -->
          <div class="txt" v-if="item">
            <a href="#" class="title" @click.prevent="seeMore(item.id)">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price" v-if="item.origin_price===item.price">
              <!-- 留白讓價錢靠右 -->
              <span></span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
            <p class="price" v-else>
              <span class="origin">{{ item.origin_price |currency }}</span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Banner from "./Banner.vue";
import BannerS from "./BannerS.vue";
export default {
  name: "Main",
  components: { Banner, BannerS },
  data() {
    return {
      fullWidth: 0
    };
  },
  computed: {
    ...mapGetters(["newer", "beginner", "oldder", "products", "cart"]),
    sales() {
      let tmp = this.$store.getters.sales;
      // 剛好8個就全顯示
      if (tmp.length === 8) {
        tmp.splice(8);
        // 否則只顯示7個
      } else {
        tmp.splice(7);
      }
      return tmp;
    }
  },
  methods: {
    seeMore(page) {
      this.$store.dispatch("seeMore", page);
    },
    changeStar(item) {
      return this.$store.state.star.some(el => el.id === item.id);
    },
    addStar(item) {
      this.$store.dispatch("addStar", item);
    },
    removeStar(item) {
      this.$store.dispatch("removeStar", item);
    },
    addCart(id, qty = 1) {
      this.$store.dispatch("addCart", { id, qty });
    },
    removeCart(item) {
      this.$store.dispatch("removeCart", item);
    }
  },
  created() {
    this.$store.dispatch("getProducts");
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
a {
  @extend %abutton;
}
.main {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Noto Serif TC", serif;
  > .container {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid $light;
    // 左邊大標題
    > .sort {
      // 圖片
      > .pic {
        display: none;
      }
      // 文字
      > .txt {
        position: relative;
        color: $primary;
        line-height: 2rem;
        font-size: 1.25rem;
        margin: line(1);
        padding: 0 0 0 line(2);
      }
      > .txt:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        background-color: $primary;
      }
    }
    // 右邊主區域
    > .section {
      display: flex;
      flex-wrap: wrap;
      // justify-content: flex-start;
      justify-content: center;
      // 單一個體
      > .item {
        width: 150px;
        margin: line(1) auto;
        padding: 0 line(0.5);
        // 圖片
        > .pic {
          position: relative;
          // 遮照層
          > .mask {
            position: absolute;
            width: 150px;
            height: 150px;
            transition: 0.8s;
            > .icon {
              color: white;
              position: absolute;
              top: 8px;
              right: 4px;
              > a {
                > i {
                  border-radius: 50%;
                  padding: line(1);
                  font-size: 1.25rem;
                  margin: 0 line(0.5);
                  color: white;
                }
                > i.fa-heart {
                  background-color: $btn-star;
                }
                > i.fa-heart:hover {
                  background-color: $btn-star-hover;
                }
                > i.fa-cart-plus {
                  background-color: $btn-cart;
                }
                > i.fa-cart-plus:hover {
                  background-color: $btn-cart-hover;
                }
              }
            }
          }
          > img {
            width: 150px;
            height: 150px;
            vertical-align: top;
            border-radius: 8px;
            object-fit: cover;
          }
        }
        // 文字
        > .txt {
          line-height: 20px;
          margin: line(1) 0 0;
          > .title {
            color: #505050;
            font-size: 14px;
            font-weight: 600;
          }
          > .title:hover {
            text-decoration: underline;
          }
          > .description {
            color: #999;
            font-size: 13px;
          }
          > .price {
            display: flex;
            justify-content: space-between;
            > .origin {
              text-decoration: line-through;
              font-size: 12px;
              color: #888;
            }
            > .special {
              color: red;
              font-size: 14px;
            }
          }
        }
      }
      > .item:hover {
        border-radius: 8px;
      }
      > .more {
        width: 150px;
        margin: line(1) auto line(1) 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        > a {
          color: $primary;
          padding: line(2);
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .main {
    width: 1160px;
    max-width: 1160px;
    > .container {
      flex-direction: row;
      align-items: center;
      height: 720px;
      // 左邊大標題
      > .sort {
        position: relative;
        // 圖片
        > .pic {
          display: block;
          > img {
            width: 280px;
            height: 640px;
            vertical-align: top;
            object-fit: cover;
          }
        }
        // 文字
        > .txt {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 32px;
          right: 24px;
          background-color: rgba(0, 0, 0, 0.6);
          width: 60px;
          height: 180px;
          writing-mode: vertical-lr;
          font-size: 2rem;
          letter-spacing: 8px;
          padding: 0;
        }
        > .txt:before {
          width: 0;
        }
      }
      // 右邊主區域
      > .section {
        justify-content: flex-start;
        // 單一個體
        > .item {
          width: 200px;
          margin: line(1) 0 line(1) line(0.5);
          padding: line(1);
          // 圖片
          > .pic {
            position: relative;
            // 遮罩層
            > .mask {
              opacity: 0;
              width: 200px;
              height: 200px;
              background-color: rgba(255, 255, 255, 0.4);
            }
            > img {
              width: 200px;
              height: 200px;
              vertical-align: top;
              border-radius: 8px;
              object-fit: cover;
            }
          }
        }
        > .item:hover {
          .mask {
            opacity: 1;
          }
        }
        > .more {
          width: 200px;
          margin: line(1) 0 line(1) line(0.5);
          padding: line(1);
          font-size: 2rem;
        }
      }
    }
  }
}
</style>