<template>
  <div class="login">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <form @submit.prevent="login()">
        <fieldset>
          <legend>管理員登入</legend>
          <input
            type="email"
            id="username"
            placeholder="Email address"
            required
            autofocus
            v-model="username"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            v-model="password"
          />
          <button type="submit">登入</button>
          <div class="loginTips">{{ loginTips }}</div>
          <button @click.prevent="toHome()">返回使用者畫面</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapGetters(["isLoading"]),
    username: {
      get() {
        return this.$store.state.login.username;
      },
      set(value) {
        this.$store.commit("LOGIN_USERNAME", value);
      }
    },
    password: {
      get() {
        return this.$store.state.login.password;
      },
      set(value) {
        this.$store.commit("LOGIN_PASSWORD", value);
      }
    },
    loginTips() {
      return this.$store.state.loginTips;
    }
  },
  methods: {
    ...mapActions(["login", "toHome"])
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Serif TC", serif;
}
.login .container {
  text-align: center;
  width: 360px;
}
.login .container fieldset {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8d2f23;
}
.login .container legend {
  padding: 20px 0;
  font-size: 3rem;
}
.login input {
  padding: 5px 15px;
  width: 360px;
  box-sizing: border-box;
  margin: 30px 0;
  border-radius: 10px;
  outline-color: none;
  outline: none;
  border: 1px solid #8d2f23;
  font-size: 1.5rem;
}
.login input:focus {
  box-shadow: 0 0 5px #8d2f23;
}
.login button {
  width: 360px;
  font-size: 1.25rem;
  margin: 30px 0;
}
.login .loginTips {
  color: red;
  padding: 5px;
  text-align: left;
}
</style>
