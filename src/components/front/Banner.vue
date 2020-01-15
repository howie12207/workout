<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in banner" :key="index">
        <a href="#" @click.prevent="seeMore(item.to)">
          <div class="img">
            <img :src="item.src" alt />
          </div>
          <div class="txt">
            <p>{{ item.title }}</p>
          </div>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
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
        effect: "fade",
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
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
.banner {
  > .swiper-container {
    // width: 960px;
    width: 100%;
    margin: 0 auto;
    img {
      width: 100%;
      height: 300px;
      vertical-align: top;
    }
    .txt {
      position: absolute;
      width: 80%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 2rem;
      font-weight: 900;
      line-height: 2.5rem;
    }
  }
}

@media screen and (min-width: 960px) {
  .banner {
    > .swiper-container {
      img {
        height: 600px;
      }
      .txt {
        font-size: 2.5rem;
        line-height: 4rem;
      }
    }
  }
}
</style>
