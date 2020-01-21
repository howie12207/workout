<template>
  <div class="bannerSec">
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
        spaceBetween: 0,
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

<style lang="scss">
@import "../../assets/variable";
a {
  @extend %abutton;
  display: inline-block;
}
.bannerSec {
  max-width: 600px;
  width: 100%;
  margin: line(2) auto;
  font-family: "Noto Serif TC", serif;
  > .swiper-container {
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
        background-color: $red;
        color: white;
      }
      > .title {
        padding: line(1) line(1) 0 line(2);
        box-sizing: border-box;
        width: 118px;
        color: black;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .bannerSec {
    max-width: 1160px;
    width: 1160px;
    height: 300px;
    > .swiper-container {
      > .swiper-button-next {
        right: 10px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      > .swiper-button-prev {
        left: 10px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      height: 300px;
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
