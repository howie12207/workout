<template>
  <div class="login">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <form @submit.prevent="login()">
        <fieldset>
          <legend>管理員登入</legend>
          <label for="username">帳號</label>
          <input
            type="email"
            id="username"
            placeholder="Email address"
            required
            autofocus
            v-model="username"
          />
          <label for="password">密碼</label>
          <input type="password" id="password" placeholder="Password" required v-model="password" />
          <div class="btn">
            <button type="submit">登入</button>
            <button @click.prevent="toPage()">返回產品列表</button>
          </div>
          <div class="loginTips">{{ loginTips }}</div>
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
    ...mapActions(["login"]),
    toPage() {
      this.$store.dispatch("toPage", "/product");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/variable.scss";
.login {
  height: 100vh;
  width: 100%;
  background: url("../../assets/login.jpg") center center no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Serif TC", serif;
  > .container {
    width: 300px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    > form {
      > fieldset {
        > legend {
          font-size: 2rem;
          line-height: 4rem;
          text-align: center;
          font-weight: 600;
        }
        > input {
          padding: line(1);
          width: 300px;
          box-sizing: border-box;
          border-radius: 8px;
          outline: none;
          border: 1px solid $red;
          font-size: 1.5rem;
        }
        > input:focus {
          border: 1px solid $yellow;
        }
        > label {
          color: white;
          font-size: 1.25rem;
          line-height: 3rem;
        }
        > .btn {
          display: flex;
          margin: line(2) 0;
          justify-content: space-around;
          > button {
            background-color: white;
            color: $red;
            border: 1px solid $red;
            padding: line(1);
            border-radius: line(1);
            width: 45%;
          }
          > button:hover {
            cursor: pointer;
          }
        }
        > .loginTips {
          color: red;
          padding: 5px;
          text-align: left;
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .login {
    > .container {
      padding: line(2);
    }
  }
}
</style>
