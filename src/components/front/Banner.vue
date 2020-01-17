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

    <div></div>
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
.banner {
  font-family: "Noto Serif TC", serif;
  > .swiper-container {
    // max-width: 1200px;
    // width: 100%;
    width: 1200px;
    height: 600px;
    > .swiper-wrapper {
      margin: 0 auto;
      img {
        width: 100%;
        height: 600px;
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
}
</style>
