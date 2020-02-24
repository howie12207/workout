<template>
  <div class="sales">
    <div class="container">
      <loading :active.sync="isLoading"></loading>
      <!-- Banner -->
      <div class="banner">
        <img src="../../assets/sales.jpg" alt="特價商品" />
        <h2>特價商品</h2>
      </div>
      <Breadcrumb />
      <!-- 排序方法 -->
      <div class="sequence">
        <label for="sequence">排序:</label>
        <select name id="sequence" v-model="sequence">
          <option value="timeold" selected>上架時間 - 舊至新</option>
          <option value="timenew">上架時間 - 新至舊</option>
          <option value="pricelow">價格 - 低至高</option>
          <option value="pricehigh">價格 - 高至低</option>
        </select>
      </div>
      <!-- 主區域 -->
      <div class="section">
        <div class="item" v-for="(item, index) in pageProducts" :key="index">
          <!-- 圖片 -->
          <div class="pic" v-if="item" @click.prevent="seeMore(item.id)">
            <a href="#" class="mask">
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
            </a>
            <img :src="item.imageUrl" alt="course" />
          </div>
          <!-- 文字 -->
          <div class="txt" v-if="item">
            <a href="#" class="title" @click.prevent="seeMore(item.id)">
              {{
              item.title
              }}
            </a>
            <p class="description">{{ item.description }}</p>
            <p class="price" v-if="item.origin_price === item.price">
              <span></span>
              <span class="special">{{ item.price | currency }}</span>
            </p>
            <p class="price" v-else>
              <span class="origin">{{ item.origin_price | currency }}</span>
              <span class="special">{{ item.price | currency }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Pagination />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Breadcrumb from "./Breadcrumb.vue";
import Pagination from "../Pagination.vue";
export default {
  name: "Sales",
  components: { Breadcrumb, Pagination },
  computed: {
    ...mapGetters(["products", "isLoading"]),
    pageProducts() {
      const nowPage = this.$store.state.page.pageNow;
      const str = nowPage * 16 - 16;
      const end = nowPage * 16;
      let tmpProduct = [];
      tmpProduct = [...this.$store.getters.sales];
      let sequence = this.$store.state.sequence;
      // 排序
      if (sequence === "timenew") {
        tmpProduct = tmpProduct.reverse();
      } else if (sequence === "pricelow") {
        tmpProduct.sort(function(a, b) {
          return a.price - b.price;
        });
      } else if (sequence === "pricehigh") {
        tmpProduct.sort(function(a, b) {
          return b.price - a.price;
        });
      }
      this.$store.commit("PAGETOTAL", Math.ceil(tmpProduct.length / 16));
      tmpProduct = tmpProduct.slice(str, end);
      return tmpProduct;
    },
    sortBanner() {
      let sort = this.$store.state.sortBanner[this.$route.name];
      return sort;
    },
    sequence: {
      get() {
        return this.$store.state.sequence;
      },
      set(value) {
        this.$store.commit("SEQUENCE", value);
      }
    }
  },
  methods: {
    ...mapActions(["getProducts"]),
    getCategory() {
      this.$store.dispatch("getCategory", this.$router.history.current.name);
    },
    seeMore(page) {
      this.$store.dispatch("seeMore", page);
    },
    addStar(item) {
      this.$store.dispatch("addStar", item);
    },
    removeStar(id) {
      this.$store.dispatch("removeStar", id);
    },
    changeStar(item) {
      return this.$store.state.star.some(el => item.id === el.id);
    },
    addCart(id, qty = 1) {
      this.$store.dispatch("addCart", { id, qty });
    }
  },
  created() {
    this.getProducts();
    this.getCategory();
    scroll(0, 0);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
a {
  @extend %abutton;
}
.sales {
  font-family: "Noto Serif TC", serif;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: calc(100vh - 188px);
  .container {
    min-height: calc(90vh - 188px);
    // Banner
    > .banner {
      position: relative;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      > h2 {
        position: absolute;
        top: 152px;
        left: 16px;
        background-color: rgba(255, 255, 255, 0.4);
        padding: line(1.5);
        font-size: 1.5rem;
        color: white;
        font-weight: 900;
        letter-spacing: 8px;
      }
      // > h2:before {
      //   content: "";
      //   position: absolute;
      //   top: 8px;
      //   left: 8px;
      //   width: 8px;
      //   height: 60px;
      //   background-color: $red;
      // }
    }
    // 排序方法
    > .sequence {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 14px;
      margin: 0 0 line(2);
      > label {
        margin: 0 line(1) 0 0;
      }
    }
    // 主區域
    > .section {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      > .item {
        width: 150px;
        margin: line(1) auto;
        padding: 0 line(0.5);
        // 圖片
        > .pic {
          position: relative;
          > .mask {
            opacity: 1;
            position: absolute;
            width: 150px;
            height: 150px;
            transition: 0.8s;
            > .icon {
              color: white;
              position: absolute;
              top: 8px;
              right: 4px;
              z-index: 10;
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
    }
  }
}

@media screen and (min-width: 1200px) {
  .sales {
    width: 1160px;
    max-width: 1160px;
    > .container {
      // Banner
      > .banner {
        > img {
          width: 1160px;
          height: 280px;
        }
        > h2 {
          top: 196px;
          left: 48px;
          font-size: 3rem;
        }
        > h2:before {
          content: "";
          height: 80px;
        }
      }
      // 主區域
      > .section {
        width: 1160px;
        > .item {
          width: 200px;
          margin: line(3) line(4);
          // 圖片
          > .pic {
            > .mask {
              opacity: 0;
              width: 200px;
              height: 200px;
              background-color: rgba(255, 255, 255, 0.4);
            }
            > img {
              width: 200px;
              height: 200px;
            }
          }
        }
        > .item:hover .mask {
          opacity: 1;
        }
      }
    }
  }
}
</style>
