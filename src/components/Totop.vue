<template>
  <div href class="totop">
    <a href="#" class="container" click.prevent="backTop" v-if="btnFlag">
      <i class="fas fa-sort-up"></i>Top
    </a>
  </div>
</template>

<script>
export default {
  name: "Totop",
  data() {
    return {
      btnFlag: false
    };
  },
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 0) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/variable.scss";
.totop {
  position: fixed;
  bottom: 110px;
  right: 10px;
  color: $red;
  > .container {
    @extend %abutton;
    width: 50px;
    height: 50px;
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: 0.6s;
    transform: translateY(0);
  }
  > .container:hover {
    background-color: black;
    color: white;
    transform: translateY(-10px);
  }
}
</style>