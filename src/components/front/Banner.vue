<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in banner" :key="index">
        <a href="#" @click.prevent="seeMore(item.to)">
          <div class="img">
            <img :src="item.src" alt />
          </div>
        </a>
      </swiper-slide>
    </swiper>
    <div class="txt">
      <a href="#" class="section">運動必備搖搖杯</a>
      <a href="#" class="section active">訓練中補充營養</a>
      <a href="#" class="section">舒服涼爽好吊嘎</a>
      <a href="#" class="section">居家訓練真方便</a>
      <a href="#" class="section">團體課程動起來</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  computed: {
    banner() {
      return this.$store.state.banner;
    }
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        effect: "fade"
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
@import "../../assets/variable.scss";
a {
  @extend %abutton;
  color: $red;
}
.banner {
  font-family: "Noto Serif TC", serif;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  > .swiper-container {
    > .swiper-wrapper {
      max-height: 300px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
      }
    }
  }
  > .txt {
    display: none;
  }
}
@media screen and (min-width: 1200px) {
  .banner {
    max-width: 1160px;
    width: 1160px;
    > .swiper-container {
      > .swiper-wrapper {
        max-height: 600px;
        height: 600px;
        img {
        }
      }
    }
    > .txt {
      display: flex;
      width: 1160px;
      margin: 0 auto;
      border-bottom: 1px solid #ccc;
      > .section {
        width: 20%;
        text-align: center;
        position: relative;
        padding: line(2);
        box-sizing: border-box;
      }
      > .section.active:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: $red;
      }
    }
  }
}
</style>
