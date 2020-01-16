<template>
  <div class="home">
    <Header />
    <div class="section">
      <!-- <img src="../../assets/view.jpg" alt /> -->
      <h1>Best Trip</h1>
      <a href="#" @click.prevent="ScrollTop(500,200)">
        <i class="fas fa-angle-double-down"></i>
      </a>
    </div>
    <div class="section2">
      <h1>Best Trip</h1>
      <a href="#" @click.prevent>
        <i class="fas fa-angle-double-down"></i>
      </a>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
export default {
  name: "Home",
  components: { Header },
  methods: {
    ScrollTop(number = 0, time) {
      const top1 = document.querySelector(".section").offsetTop;
      const top2 = document.querySelector(".section2").offsetTop;
      // console.log(top1, top2, high);
      if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
      }
      const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
      let spacingInex = time / spacingTime; // 计算循环的次数
      let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
      let everTop = (top2 - top1) / spacingInex; // 计算每次滑动的距离
      let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
          spacingInex--;
          this.ScrollTop((nowTop += everTop));
          console.log("1");
        } else {
          clearInterval(scrollTimer); // 清除计时器
          console.log("2");
        }
      }, spacingTime);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.home {
  font-family: "Noto Serif TC", serif;
  > .section {
    background: center center url("../../assets/view.jpg");
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > h1 {
      color: white;
      font-size: 5rem;
      text-align: center;
    }
    > a {
      @extend %abutton;
      position: absolute;
      bottom: 20px;
      width: 25px;
      height: 50px;
      border: 3px solid white;
      border-radius: 20px;
      color: white;
      text-align: center;
      // background-color: #fff;
      > i {
        animation: slide 2s infinite;
        opacity: 0;
      }
    }
  }
  > .section2 {
    background: center center url("../../assets/view.jpg");
    width: 100%;
    height: 100vh;
  }
}
@keyframes slide {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    transform: translateY(30px);
    opacity: 1;
  }
}
</style>
