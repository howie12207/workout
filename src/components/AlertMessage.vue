<template>
  <div class="message-alert">
    <div class="alert" :class="item.status" v-for="(item, index) in messages" :key="index">
      {{ item.message }}
      <!-- 關閉符號 -->
      <a href="#" @click.prevent="removeMessage(index)">
        <span>
          <i class="fas fa-times"></i>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AlertMessage",
  computed: {
    ...mapGetters(["messages"])
  },
  methods: {
    removeMessage(num) {
      this.$store.dispatch("removeMessage", num);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/variable.scss";
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 120px;
  right: 20px;
  z-index: 1100;
  // 成功
  > .success {
    background-color: #28a745;
    padding: 10px;
    border-radius: 30px;
    color: white;
  }
  // 失敗
  > .false {
    background-color: #dc3545;
    padding: 10px;
    border-radius: 30px;
    color: white;
  }
  > .alert {
    a {
      @extend %abutton;
      padding: 0;
      border: none;
      display: inline-block;
      color: white;
      transition: 0.6s;
    }
    > a:hover {
      color: $red;
    }
  }
}
</style>
