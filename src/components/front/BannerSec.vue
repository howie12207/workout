<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item) in banner" :key="item.to">
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
      fullWidth: 0,
      swiperOption: {
        slidesPerView: 2,
        loop: false,
        notNextTick: true,
        // spaceBetween: 0,
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
      console.log(id);
    }
  },
  created() {
    const vm = this;
    this.fullWidth = window.innerWidth;
    if (vm.fullWidth >= 1200) {
      vm.swiperOption.slidesPerView = 4;
    } else if (vm.fullWidth < 1200) {
      vm.swiperOption.slidesPerView = 2;
    }
  },
  mounted() {
    const vm = this;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
    };
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
  max-width: 600px;
  width: 100%;
  margin: line(2) auto 0;
  font-family: "Noto Serif TC", serif;
  > .swiper-container {
    display: flex;
    justify-content: center;
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
        // height: 48px;
        box-sizing: border-box;
        padding: line(1);
        background-color: $red;
        color: white;
      }
      > .title {
        padding: line(1) line(1) 0 line(2);
        box-sizing: border-box;
        // height: 48px;
        width: 118px;
        color: black;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .banner {
    max-width: 1160px;
    width: 1160px;
    height: 300px;
    > .swiper-container {
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
          width: 48px;
          height: 48px;
          box-sizing: border-box;
          padding: line(1);
          background-color: $red;
          color: white;
        }
        > .title {
          padding: line(1) line(1) 0 line(2);
          box-sizing: border-box;
          height: 48px;
          width: 232px;
          color: black;
        }
      }
    }
  }
}
</style>
