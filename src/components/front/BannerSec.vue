<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in banner" :key="index">
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
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "BannerSec",
  computed: {
    banner() {
      return this.$store.state.bannerSec;
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        loop: true,
        // spaceBetween: 30,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
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

<style lang="scss" scoped>
@import "../../assets/variable";
a {
  @extend %abutton;
  display: inline-block;
}
.banner {
  margin: line(2) auto 0;
  font-family: "Noto Serif TC", serif;
  // display: flex;
  // justify-content: center;
  > .swiper-container {
    // max-width: 1200px;
    // width: 100%;
    display: flex;
    justify-content: center;
    width: 1200px;
    height: 300px;
    .swiper-slide {
      display: flex;
      justify-content: center;
      .pic {
        img {
          width: 280px;
          height: 240px;
          vertical-align: top;
        }
      }
    }
    .txt {
      display: flex;
      align-items: center;
      margin: line(1) 0;
      > .sort {
        width: 48px;
        height: 48px;
        box-sizing: border-box;
        padding: line(1);
        background-color: $red;
        color: white;
      }
      > .title {
        padding: line(1);
        box-sizing: border-box;
        height: 48px;
        width: 192px;
        color: black;
      }
    }
  }
}
</style>
