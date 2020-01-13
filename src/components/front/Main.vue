<template>
  <div class="main">
    <div class="container">
      <div class="item" v-for="item in products" :key="item.id">
        <!-- <a href="#" class="star" @click.prevent="removeStar(item)" v-if="changeStar(item)">
          <i class="fas fa-heart"></i>
        </a>
        <a href="#" class="star" @click.prevent="addStar(item)" v-else>
          <i class="far fa-heart"></i>
        </a>-->
        <div class="pic">
          <img :src="item.imageUrl" alt />
          <router-link to class="mask">查看更多</router-link>
        </div>
        <div class="txt">
          <router-link to class="sorttxt">{{ item.category }}</router-link>
          <router-link to class="title">{{ item.title }}</router-link>
          <p v-if="item.price !== item.origin_price">
            <span class="linethrough">原價:{{ item.origin_price | currency }}元</span>
            <span class="special">特價:{{ item.price | currency }}元</span>
          </p>
          <p v-else>
            <span class="special">售價:{{ item.origin_price | currency }}元</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["products"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.main {
  width: 100%;
  > .container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    > .item {
      width: 300px;
      height: 350px;
      border: 1px solid #eee;
      //   background-color: #eee;
      margin: line(1) auto;
      border-radius: 5px;
      color: $red;
      box-shadow: 0 0 10px black;
      transform: translateY(0);
      transition: 0.6s;
      > .pic {
        width: 100%;
        position: relative;
        > img {
          width: 100%;
          height: 250px;
          vertical-align: top;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        > .mask {
          @extend %abutton;
          display: none;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.6);
          width: 100%;
          height: 250px;
          top: 0;
          font-size: 2rem;
          line-height: 250px;
          text-align: center;
          font-weight: 900;
          color: white;
          z-index: 1;
        }
      }
      > .pic:hover > .mask {
        display: block;
      }
      > .txt {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 line(0.5);
        height: 100px;
        > .sorttxt {
          @extend %abutton;
          color: $red;
          background-color: orange;
          margin: line(0.5) 0;
          padding: line(0.5);
          border-radius: 5px;
          display: inline-block;
          align-self: flex-end;
          transform: translateY(0);
          transition: 0.6s;
        }
        > .sorttxt:hover {
          transform: translateY(5px);
        }
        > .title {
          @extend %abutton;
          align-self: flex-start;
          font-size: 1.25rem;
          position: relative;
          color: $red;
          font-weight: 900;
        }
        > .title:after {
          content: "";
          position: absolute;
          left: 50%;
          right: 50%;
          top: 0;
          bottom: -5px;
          border-bottom: 2px solid $red;
          transition: 0.7s;
        }
        > .title:hover:after {
          left: 0;
          right: 0;
        }
        > p {
          display: flex;
          font-size: 1.25rem;
          line-height: 2rem;
          justify-content: space-around;
          > .special {
            color: red;
            font-weight: 700;
          }
        }
      }
    }
    > .item:hover {
      transform: translateY(3px);
    }
  }
}
.linethrough {
  text-decoration: line-through;
}
</style>