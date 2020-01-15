<template>
  <div class="progressBar">
    <ol class="list">
      <li :class="{ active: true }">
        <p>1</p>
        <span>輸入資料</span>
      </li>
      <li class="line" :class="{ active: order.create_at }"></li>
      <li :class="{ active: order.create_at }">
        <p>2</p>
        <span>確認付款</span>
      </li>
      <li class="line" :class="{ active: order.is_paid }"></li>
      <li :class="{ active: order.is_paid }">
        <p>3</p>
        <span>完成</span>
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
.progressBar ol {
  margin: 20px 0 20px;
  display: flex;
  justify-content: center;
}
.progressBar ol li {
  text-align: center;
  color: #ccc;
}
.progressBar ol li p {
  background-color: #ccc;
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 50%;
  margin: 0 0 10px 0;
  color: black;
}
.progressBar ol .line {
  width: 60px;
  height: 1px;
  background-color: #ccc;
  position: relative;
  top: 35px;
}
.progressBar ol .line.active {
  background-color: green;
}
.progressBar ol li.active p {
  color: white;
  background-color: green;
}
.progressBar ol li.active span {
  color: green;
}
.progressBar .col-2 {
  width: 95%;
}
</style>
