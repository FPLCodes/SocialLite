<template>
  <div id="app" class="bg-gray-50">
    <div class="container is-fluid w-full h-screen flex items-center">
      <div class="w-1/2 mx-auto max-w-xl mb-20">
        <div class="tabs is-medium">
          <ul>
            <li class="is-active">
              <router-link to="/">Sign In</router-link>
            </li>
            <li>
              <router-link to="/sign-up">Sign up</router-link>
            </li>
          </ul>
          <router-view />
        </div>

        <div class="card">
          <div class=" card-content">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Username"
                  v-model="currUsername"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  placeholder="Password"
                  v-model="currPassword"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <div class="field">
              <p class="control">
                <button
                  class="button is-success"
                  @click="login()"
                  :disabled="!currPassword || !currUsername"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>

        <LoginFailWarning
          :success-message="successMessage"
          :failed-message="failedMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoginFailWarning from "../components/loginFailWarning.vue";
export default {
  name: "Sign-in",
  components: {
    LoginFailWarning,
  },
  data() {
    return {
      currUser: [],
      currUsername: "",
      currPassword: "",
      success: false,
      successMessage: "",
      failedMessage: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/userProfiles/");
    this.users = response.data;
  },
  methods: {
    login() {
      this.successMessage = "";
      this.failedMessage = "";
      this.currUser = {};
      this.currUser = this.users.filter(
        (user) =>
          user.username === this.currUsername &&
          user.password === this.currPassword
      );
      if (this.currUser[0]) {
        this.success = true;
        this.successMessage = `Signed in as ${this.currUsername}!`;
      } else {
        this.failedMessage = `Incorrect username or password!`;
      }
    },
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}
</style>
