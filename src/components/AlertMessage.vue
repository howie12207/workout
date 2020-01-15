<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <a href="#" @click.prevent="removeMessage(i)">
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
    updateMessage(message, status) {
      // const timestamp = Math.floor(new Date() / 1000);
      // this.messages.push({
      //   message,
      //   status,
      //   timestamp
      // });
      // this.removeMessageWithTiming(timestamp);
      this.$store.dispatch("updateMessage", { message, status });
    },
    removeMessage(num) {
      // this.messages.splice(num, 1);
      this.$store.dispatch("removeMessage", num);
    }
    // removeMessageWithTiming(timestamp) {
    // const vm = this;
    // setTimeout(() => {
    //   vm.messages.forEach((item, i) => {
    //     if (item.timestamp === timestamp) {
    //       vm.messages.splice(i, 1);
    //     }
    //   });
    // }, 5000);
    // this.$store.dispatch("removeMessageWithTiming", timestamp);
    // }
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
}
.message-alert .success {
  background-color: #28a745;
  padding: 10px;
  border-radius: 30px;
  color: white;
}
.message-alert .false {
  background-color: #dc3545;
  padding: 10px;
  border-radius: 30px;
  color: white;
}
.message-alert a {
  @extend %abutton;
  padding: 0;
  border: none;
  display: inline-block;
  color: white;
  transition: 0.6s;
}
.message-alert a:hover {
  color: $red;
}
</style>
