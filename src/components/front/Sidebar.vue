<template>
  <div class="sidebar">
    <div class="container">
      <div class="search">
        <input type="text" />
      </div>
      <nav class="category">
        <a href="#">
          <img src="../../assets/Asia.jpg" alt="亞洲" />
          <p>亞洲</p>
        </a>
        <a href="#">
          <img src="../../assets/Europe.jpg" alt="歐洲" />
          <p>歐洲</p>
        </a>
        <a href="#">
          <img src="../../assets/America.jpg" alt="美洲" />
          <p>美洲</p>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-family: "Noto Serif TC", serif;
  > .container {
    > .category {
      display: flex;
      flex-wrap: wrap;
      //   flex-direction: column;
      justify-content: space-around;
      > a {
        position: relative;
        > img {
          width: 150px;
          height: 100px;
          vertical-align: top;
          opacity: 1;
          transition: 0.6s;
        }
        > p {
          position: absolute;
          height: 2rem;
          font-size: 2rem;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          color: white;
          transition: 0.6s;
          transform: translateY(0px);
        }
      }
      > a:hover img {
        opacity: 0.7;
      }
      > a:hover p {
        color: black;
        transform: translateY(10px);
      }
    }
  }
}
</style>