<template>
  <div href class="totop">
    <a href="#" class="container" @click.prevent="backTop" v-if="btnFlag">
      <i class="fas fa-sort-up"></i>
      Top
    </a>
  </div>
</template>

<script>
export default {
  name: "Totop",
  data() {
    return {
      btnFlag: false,
      scrollTop: 0
    };
  },
  methods: {
    backTop() {
      const vm = this;
      let timer = setInterval(() => {
        let move = Math.floor(-vm.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          vm.scrollTop + move;
        // 到最上面時結束
        if (vm.scrollTop === 0) clearInterval(timer);
      }, 16);
    },
    scrollToTop() {
      const vm = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      vm.scrollTop = scrollTop;
      // 是否顯示
      if (vm.scrollTop > 200) {
        vm.btnFlag = true;
      } else {
        vm.btnFlag = false;
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
  bottom: 10px;
  right: 10px;
  color: $red;
  z-index: 10;
  > .container {
    @extend %abutton;
    color: $primary;
    width: 50px;
    height: 50px;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: 0.6s;
    > i {
      transform: translateY(5px);
      transition: 0.6s;
    }
  }
  > .container:hover {
    background-color: black;
    color: white;
    > i {
      transform: translateY(-5px);
    }
  }
}
</style>