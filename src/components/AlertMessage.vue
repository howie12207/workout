<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
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

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 120px;
  right: 20px;
  z-index: 1100;
}
.message-alert .success {
  background-color: #55aa00;
  padding: 10px;
  border-radius: 30px;
}
.message-alert .false {
  background-color: #ff8888;
  padding: 10px;
  border-radius: 30px;
}
.message-alert button {
  padding: 0;
  border: none;
}
</style>
