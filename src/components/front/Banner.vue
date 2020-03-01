<template>
  <div class="banner">
    <!-- 第一個Banner -->
    <swiper :options="swiperOption2" class="banner2">
      <swiper-slide v-for="(item,index) in banner2" :key="index">
        <a href="#" @click.prevent="seeMore(item.to)">
          <div class="pic">
            <img :src="item.src" alt />
          </div>
          <div class="txt">
            <p class="sort">{{ item.tag }}</p>
            <p class="title">{{ item.description }}</p>
          </div>
        </a>
      </swiper-slide>
      <!-- 前一頁 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <!-- 下一頁 -->
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <!-- 第二個Banner -->
    <swiper :options="swiperOption1" class="banner1">
      <swiper-slide v-for="(item, index) in banner1" :key="index">
        <a href="#" @click.prevent="seeMore(item.to)">
          <div class="img">
            <img :src="item.src" alt />
          </div>
        </a>
      </swiper-slide>
      <!-- 文字敘述 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "Banner",
  computed: {
    banner1() {
      return this.$store.state.banner1;
    },
    banner2() {
      return this.$store.state.banner2;
    }
  },
  data() {
    return {
      swiperOption1: {
        spaceBetween: 30,
        centeredSlides: true,
        // 自動播放
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function(index, className) {
            var text = "";
            switch (index) {
              case 0:
                text = "運動必備搖搖杯";
                break;
              case 1:
                text = "訓練中補充營養";
                break;
              case 2:
                text = "舒服涼爽好吊嘎";
                break;
              case 3:
                text = "居家訓練真方便";
                break;
              case 4:
                text = "團體課程動起來";
                break;
            }
            return '<li class="' + className + '">' + text + "</li>";
          }
        },
        effect: "fade"
      },
      swiperOption2: {
        // 顯示數量
        slidesPerView: 4,
        loop: false,
        notNextTick: true,
        spaceBetween: 0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          640: {
            slidesPerView: 2
          },
          1200: {
            slidesPerView: 3
          }
        }
      }
    };
  },
  methods: {
    seeMore(id) {
      this.$store.dispatch("seeMore", id);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/variable.scss";
a {
  @extend %abutton;
}
.banner {
  font-family: "Noto Serif TC", serif;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  > .swiper-container.banner1 {
    border-top: 1px solid $light;
    > .swiper-wrapper {
      img {
        width: 100%;
        height: 250px;
        vertical-align: top;
        object-fit: cover;
      }
    }
    div.swiper-pagination {
      border-bottom: 1px solid #ccc;
      display: none;
      font-size: 15px;
    }
    li.swiper-pagination-bullet {
      width: 20%;
      margin: 0 !important;
      background: none;
      position: relative;
      height: inherit;
      opacity: 0.7;
      color: $dark;
    }
    li.swiper-pagination-bullet:hover {
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      opacity: 1 !important;
    }
    .swiper-pagination-bullet-active:after {
      content: "";
      position: absolute;
      height: 4px;
      left: 0;
      right: 0;
      bottom: -1px;
      background: $primary;
    }
  }
  > .swiper-container.banner2 {
    padding: 0 0 40px;
    > .swiper-button-next {
      background-color: rgba(0, 0, 0, 0.4);
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
      padding: line(2) line(1);
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      right: 0;
    }
    > .swiper-button-prev {
      background-color: rgba(0, 0, 0, 0.4);
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
      padding: line(2) line(1);
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      left: 0;
    }
    .swiper-slide {
      display: flex;
      justify-content: center;
      .pic {
        img {
          width: 150px;
          height: 150px;
          vertical-align: top;
          object-fit: cover;
        }
      }
    }
    .txt {
      display: flex;
      align-items: center;
      margin: line(1) 0;
      > .sort {
        width: 32px;
        box-sizing: border-box;
        padding: line(1);
        background-color: $primary;
        color: white;
        font-size: 14px;
        line-height: 20px;
      }
      > .title {
        padding: line(1) line(1) 0 line(2);
        box-sizing: border-box;
        width: 118px;
        color: black;
        font-size: 15px;
        line-height: 20px;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .banner {
    max-width: 1160px;
    width: 1160px;
    > .swiper-container.banner1 {
      height: 654px;
      > .swiper-wrapper {
        img {
          height: 600px;
        }
      }
      div.swiper-pagination {
        display: block;
        line-height: 43px;
      }
    }
    > .swiper-container.banner2 {
      > .swiper-button-next {
        right: 0px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: transparent;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
      }
      > .swiper-button-prev {
        left: 0px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        background-color: transparent;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
      }
      height: 310px;
      .swiper-slide {
        display: flex;
        justify-content: center;
        .pic {
          img {
            width: 280px;
            height: 240px;
          }
        }
      }
      .txt {
        display: flex;
        align-items: center;
        margin: line(1) 0;
        > .sort {
          width: 50px;
          height: 50px;
          box-sizing: border-box;
          padding: 5px;
          background-color: $primary;
          color: white;
          text-align: center;
        }
        > .title {
          padding: line(0.5) line(1) line(0.5) line(2);
          line-height: 20px;
          box-sizing: border-box;
          height: 50px;
          width: 232px;
          color: $dark;
        }
      }
    }
  }
}
</style>
