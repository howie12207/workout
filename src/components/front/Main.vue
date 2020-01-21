<template>
  <div class="main">
    <Banner />
    <BannerSec />
    <div class="container">
      <div class="sort">
        <div class="pic">
          <img src="../../assets/new.jpg" alt="new" />
        </div>
        <div class="txt">特價商品</div>
      </div>
      <div class="section">
        <div class="item" v-for="(item,index) in sales" :key="index">
          <a href="#" class="pic" v-if="item" @click.prevent="seeMore(item.id)">
            <div class="mask">
              <div class="icon">
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
                <a href="#" @click.prevent.stop="addCart(item.id)">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <div class="txt" v-if="item">
            <a href="#" class="title" @click.prevent="seeMore(item.id)">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price" v-if="item.origin_price===item.price">
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
      <div class="sort">
        <div class="pic">
          <img src="../../assets/beginner.jpg" alt="beginner" />
        </div>
        <div class="txt">新手推薦</div>
      </div>
      <div class="section">
        <div class="item" v-for="(item,index) in beginner" :key="index">
          <a href="#" class="pic" v-if="item" @click="seeMore(item.id)">
            <div class="mask">
              <div class="icon">
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
                <a href="#" @click.prevent.stop="addCart(item.id)">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <div class="txt" v-if="item">
            <a href="#" class="title" @click="seeMore(item.id)">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price" v-if="item.origin_price===item.price">
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
      <div class="sort">
        <div class="pic">
          <img src="../../assets/old.jpg" alt="old" />
        </div>
        <div class="txt">老手專區</div>
      </div>
      <div class="section">
        <div class="item" v-for="(item,index) in oldder" :key="index">
          <a href="#" class="pic" v-if="item" @click.prevent="seeMore(item.id)">
            <div class="mask">
              <div class="icon">
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
                <a href="#" @click.prevent.stop="addCart(item.id)">
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
            <img :src="item.imageUrl" alt="course" />
          </a>
          <div class="txt" v-if="item">
            <a href="#" class="title" @click.prevent="seeMore(item.id)">{{ item.title }}</a>
            <p class="description">{{ item.description }}</p>
            <p class="price" v-if="item.origin_price===item.price">
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
import BannerSec from "./BannerSec.vue";
export default {
  name: "Main",
  components: { Banner, BannerSec },
  computed: {
    ...mapGetters(["newer", "beginner", "oldder", "products", "cart"]),
    sales() {
      let tmp = this.$store.getters.sales;
      if (tmp.length === 8) {
        tmp.splice(8);
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
    this.$store.dispatch("getProducts");
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
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  font-family: "Noto Serif TC", serif;
  > .container {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    > .sort {
      > .pic {
        display: none;
      }
      > .txt {
        position: relative;
        color: $red;
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
        background-color: $red;
      }
    }
    > .section {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0 auto;
      > .item {
        width: 150px;
        margin: line(1) line(1) line(1) 0;
        > .pic {
          position: relative;
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
            width: 150px;
            height: 150px;
            vertical-align: top;
            border-radius: 8px;
            object-fit: cover;
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
            color: #999;
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
      > .item:hover {
        border-radius: 8px;
        box-shadow: 0 0 3px black;
      }
      > .more {
        width: 150px;
        margin: line(1) line(1) line(1) 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        > a {
          color: $red;
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
      height: 640px;
      > .sort {
        position: relative;
        > .pic {
          display: block;
          > img {
            width: 280px;
            height: 600px;
            vertical-align: top;
            object-fit: cover;
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
          height: 200px;
          writing-mode: vertical-lr;
          font-size: 2rem;
          letter-spacing: 8px;
        }
      }
      > .section {
        > .item {
          width: 200px;
          margin: line(1) 0 line(1) line(0.5);
          padding: line(1);
          > .pic {
            position: relative;
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