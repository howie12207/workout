<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; Copyright 2020 圖片及素材均由網路抓取</p>
      <p>本網站僅做練習，無任何商業營利行為</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
.footer {
  height: 100px;
  width: 100%;
  background-color: #000;
  // margin-top: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 9;
  position: relative;
}
.footer p {
  margin: 10px 0;
}
</style>
