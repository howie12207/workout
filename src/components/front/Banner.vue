<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in banner" :key="index">
        <div class="img">
          <img :src="item.src" alt />
        </div>
        <div class="text">
          <p>{{ item.title }}</p>
          <p>
            <a href="#" @click="openModal(item.to)">點擊查看</a>
          </p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Banner",
  computed: {
    ...mapGetters(["banner"])
  },
  data() {
    return {
      swiperOption: {
        effect: "fade",
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        }
      },
      swiperSlides: [1, 2, 3, 4]
    };
  },
  mounted() {
    setInterval(() => {
      console.log("simulate async data");
      if (this.swiperSlides.length < 5) {
        this.swiperSlides.push(this.swiperSlides.length + 1);
      }
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
.banner {
  margin: 50px 0;
}
.swiper-container {
  width: 960px;
  margin: 0 auto;
}
.swiper-container-active {
}
img {
  width: 100%;
  height: 400px;
}
.text {
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
  font-size: 2.5rem;
}
.text {
  p {
    a {
      color: white;
      background-color: brown;
      padding: 10px;
      display: inline-block;
      border-radius: 5px;
    }
  }
}
</style>
