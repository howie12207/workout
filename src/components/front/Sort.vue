<template>
  <div class="sort">
    <loading :active.sync="isLoading"></loading>
    <div class="banner">
      <img src="../../assets/tools.jpg" alt="訓練器材" />
      <h2>訓練器材</h2>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Sort",
  computed: {
    ...mapGetters(["products", "isLoading", "oldder"])
  },
  methods: {
    ...mapActions(["getProducts", "getStar", "getCart"])
  },
  created() {
    this.getProducts();
    // this.getStar();
    // this.getCart();
    // scroll(0, 0);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
a {
  @extend %abutton;
}
.sort {
  font-family: "Noto Serif TC", serif;
  width: 1200px;
  margin: 0 auto;
  > .banner {
    position: relative;
    img {
      width: 1200px;
      height: 400px;
    }
    h2 {
      position: absolute;
      top: 240px;
      left: 80px;
      background-color: rgba(255, 255, 255, 0.4);
      padding: line(3);
      color: white;
      font-size: 3rem;
      font-weight: 900;
    }
  }
  > .section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // margin: 0 auto;
    width: 1200px;
    > .item {
      width: 200px;
      margin: line(3) line(4);
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
</style>
