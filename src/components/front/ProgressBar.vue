<template>
  <div class="progressBar">
    <ol class="list">
      <li :class="{ active: true }">
        <span>確認商品</span>
      </li>
      <li :class="{ active: order.create_at }">
        <span>輸入資料</span>
      </li>
      <li :class="{ active: order.is_paid }">
        <span>確認付款</span>
      </li>
      <li :class="{ active: order.is_paid }">
        <span>訂購完成</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  computed: {
    order() {
      return this.$store.state.order;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable";
.progressBar {
  > .list {
    margin: 20px 0 40px;
    display: flex;
    justify-content: center;
    > li {
      text-align: center;
      position: relative;
      color: #ccc;
      margin: 0 line(2);
      width: 56px;
      span {
        font-size: 14px;
      }
    }
    // ---圓形---
    > li:after {
      content: "";
      // font-size: 16px;
      position: absolute;
      bottom: -28px;
      left: 0;
      right: 0;
      margin: auto;
      width: 24px;
      height: 24px;
      background-color: #ccc;
      border-radius: 50%;
    }
    > li.active:after {
      font-family: "Font Awesome 5 Free";
      content: "\f00c";
      font-weight: 600;
      line-height: 24px;
      color: white;
      background-color: green;
    }
    > li.active {
      + li:after {
        background-color: green;
      }
      + li {
        color: green;
      }
    }
    // ---線條---
    > li:not(:last-child):before {
      content: "";
      position: absolute;
      bottom: -16px;
      // left: 40px;
      right: -48px;
      width: 64px;
      height: 1px;
      background-color: #ccc;
    }
    > li.active:before {
      background-color: green;
    }

    > li.active {
      > span {
        color: green;
      }
    }
  }
}
</style>
