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
      <div>
        <span>123</span>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <div class="txt">
      <a href="#" class="section">運動必備搖搖杯</a>
      <a href="#" class="section active">訓練中補充營養</a>
      <a href="#" class="section">舒服涼爽好吊嘎</a>
      <a href="#" class="section">居家訓練真方便</a>
      <a href="#" class="section">團體課程動起來</a>
    </div>-->
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
  color: $red;
}

.banner {
  font-family: "Noto Serif TC", serif;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  > .swiper-container {
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
      color: $red;
      display: none;
    }
    li.swiper-pagination-bullet {
      width: 20%;
      margin: 0 !important;
      background: none;
      position: relative;
      padding: line(1) 0;
      height: inherit;
      opacity: 0.4;
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
      height: 3px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $red;
    }
  }
}
@media screen and (min-width: 1200px) {
  .banner {
    max-width: 1160px;
    width: 1160px;
    > .swiper-container {
      height: 645px;
      > .swiper-wrapper {
        img {
          height: 600px;
        }
      }
      div.swiper-pagination {
        display: block;
      }
    }
  }
}
</style>
