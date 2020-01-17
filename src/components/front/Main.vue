<template>
  <div class="main">
    <Banner />
    <BannerSec />
    <div class="container">
      <div class="sort">
        <div class="pic">
          <img src="../../assets/new.jpg" alt="new" />
        </div>
        <div class="txt">新品上市</div>
      </div>
      <div class="section">
        <div class="item" v-for="(item,index) in newer" :key="index">
          <a href="#" class="pic" v-if="item">
            <div class="mask">
              <div class="icon">
                <a href="#">
                  <i class="far fa-heart"></i>
                </a>
                <a href="#">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <div class="txt" v-if="item">
            <a href="#" class="title">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price">
              <span class="origin">{{ item.origin_price |currency }}</span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sort">
        <div class="pic">
          <img src="../../assets/beginner.jpg" alt="beginner" />
        </div>
        <div class="txt">新手推薦</div>
      </div>
      <div class="section">
        <div class="item" v-for="(item,index) in beginner" :key="index">
          <a href="#" class="pic" v-if="item">
            <div class="mask">
              <div class="icon">
                <a href="#">
                  <i class="far fa-heart"></i>
                </a>
                <a href="#">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <div class="txt" v-if="item">
            <a href="#" class="title">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price">
              <span class="origin">{{ item.origin_price |currency }}</span>
              <span class="special">{{ item.price|currency }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sort">
        <div class="pic">
          <img src="../../assets/old.jpg" alt="old" />
        </div>
        <div class="txt">老手必備</div>
      </div>
      <div class="section">
        <div class="item" v-for="(item,index) in oldder" :key="index">
          <a href="#" class="pic" v-if="item">
            <div class="mask">
              <div class="icon">
                <a href="#">
                  <i class="far fa-heart"></i>
                </a>
                <a href="#">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <div class="txt" v-if="item">
            <a href="#" class="title">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price">
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
import BannerSec from "./BannerSec.vue";
export default {
  name: "Main",
  components: { Banner, BannerSec },
  computed: {
    ...mapGetters(["newer", "beginner", "oldder", "products", "cart"])
    //     starShow() {
    //       return this.$store.state.starShow;
    //     },
    //     cartShow() {
    //       return this.$store.state.cartShow;
    //     },
    //     star() {
    //       return this.$store.state.star;
    //     },
    //     search() {
    //       return this.$store.state.search;
    //     },
    //     pageProducts() {
    //       let vm = this;
    //       const nowPage = this.$store.state.page.pageNow;
    //       const str = nowPage * 9 - 9;
    //       const end = nowPage * 9;
    //       let tmpProduct = this.$store.state.products;
    //       if (vm.$store.state.categorySwitch !== "全部") {
    //         tmpProduct = tmpProduct.filter(function(item) {
    //           return item.category.match(vm.$store.state.categorySwitch);
    //         });
    //       }
    //       tmpProduct = tmpProduct.filter(function(item) {
    //         return item.title.match(vm.$store.state.search);
    //       });
    //       this.$store.commit("PAGETOTAL", Math.ceil(tmpProduct.length / 10));
    //       tmpProduct = tmpProduct.slice(str, end);
    //       return tmpProduct;
    //     }
  },
  methods: {
    //     starClose() {
    //       this.$store.commit("STARSHOW", false);
    //       // console.log("1");
    //     },
    //     starshow() {
    //       this.$store.commit("STARSHOW", !this.starShow);
    //     },
    //     cartClose() {
    //       this.$store.commit("CARTSHOW", false);
    //       // console.log("1");
    //     },
    //     cartshow() {
    //       this.$store.commit("CARTSHOW", !this.cartShow);
    //     },
    //     categorySwitch(category) {
    //       this.$store.dispatch("categorySwitch", category);
    //     },
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
    //     this.$store.commit("CARTSHOW", false);
    //     this.$store.commit("STARSHOW", false);
    //     this.$store.commit("NAVSHOW", false);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
a {
  @extend %abutton;
}
.main {
  width: 1200px;
  margin: 0 auto;
  font-family: "Noto Serif TC", serif;
  > .container {
    width: 1200px;
    height: 640px;
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    > .sort {
      position: relative;
      > .pic {
        > img {
          width: 280px;
          height: 600px;
          vertical-align: top;
        }
      }
      > .txt {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 32px;
        right: 24px;
        background-color: rgba(255, 255, 255, 0.6);
        width: 80px;
        height: 240px;
        writing-mode: vertical-lr;
        font-size: 3rem;
        letter-spacing: 8px;
        color: $red;
      }
    }
    > .section {
      display: flex;
      flex-wrap: wrap;
      > .item {
        width: 200px;
        margin: line(1) 0 line(1) line(2);
        > .pic {
          position: relative;
          > .mask {
            opacity: 0;
            position: absolute;
            width: 200px;
            height: 200px;
            background-color: rgba(255, 255, 255, 0.4);
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
                  color: $red;
                }
                > i.fa-heart {
                  background-color: #caa1aa;
                }
                > i.fa-heart:hover {
                  background-color: #eec8c1;
                }
                > i.fa-cart-plus {
                  background-color: #89a1bb;
                }
                > i.fa-cart-plus:hover {
                  background-color: #abc3dd;
                }
              }
            }
          }
          > img {
            width: 200px;
            height: 200px;
            vertical-align: top;
            border-radius: 8px;
          }
        }
        > .txt {
          line-height: 1.25rem;
          margin: line(1) 0 0;
          > .title {
            color: $red;
          }
          > .title:hover {
            text-decoration: underline;
          }
          > .description {
            color: #ccc;
          }
          > .price {
            display: flex;
            justify-content: space-between;
            > .origin {
              text-decoration: line-through;
              font-size: 0.9rem;
            }
            > .special {
              color: red;
            }
          }
        }
      }
      > .item:hover .mask {
        opacity: 1;
      }
    }
  }
}
</style>