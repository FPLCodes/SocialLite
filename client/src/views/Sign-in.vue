<template>
  <div id="app" class="bg-gray-50">
    <div class="container is-fluid w-full h-screen flex items-center">
      <div class="w-1/2 mx-auto max-w-xl mb-20">
        <div class="tabs is-medium">
          <ul>
            <li class="is-active">
              <router-link to="/">Sign In</router-link>
            </li>
          </ul>
          <router-view />
        </div>

        <div class="card">
          <div class=" card-content">
            <!-- Email input card -->
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>

            <!-- Password input card -->
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <!-- Login button -->
            <div class="flex gap-2">
              <div class="field">
                <p class="control">
                  <button
                    class="button is-success"
                    @click="login()"
                    :disabled="!password || !email"
                  >
                    Login
                  </button>
                </p>
              </div>

              <!-- Google Sign-in button -->
              <div class="field">
                <p class="control flex gap-2">
                  <button class="button is-success" @click="googleSignIn()">
                    Sign in with Google
                  </button>
                  <button
                    class="button is-danger"
                    v-if="signedIn === true"
                    @click="signOut"
                  >
                    Sign out
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Login fail/success notification -->
        <LoginNotification
          :success-message="successMessage"
          :failed-message="failedMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import LoginNotification from "../components/loginFailWarning.vue";

export default {
  name: "Sign-in",
  components: {
    LoginNotification,
  },
  data() {
    return {
      success: false,
      successMessage: "",
      failedMessage: "",
      signedIn: false,
      email: "",
      password: "",
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("api/userProfiles/");
    this.users = response.data;

    // Check for logged in user & get user info
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.providerData);
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    // Login with email & password function
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userID = user.providerData[0].uid;
          console.log(user);
          this.successMessage = "Logged in!";
          this.$router.push({
            path: `/profile/${userID}`,
          });
        })
        .catch((error) => {
          this.failedMessage = "Failed to log in";
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          if (errorCode === "auth/wrong-password")
            this.failedMessage = "Incorrect password";
          if (errorCode === "auth/too-many-requests")
            this.failedMessage =
              "Too many failed login attemps. Try again later";
        });
    },

    // Login with Google function
    googleSignIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          const userID = user.providerData[0].uid;
          if (user.providerData.length === 2)
            this.$router.push({
              path: `/profile/${userID}`,
            });
          else this.$router.push("sign-up");
          console.log(user.providerData);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode);
          console.log(errorMessage);
          console.log(email);
          console.log(credential);
        });
    },

    // Sign out function
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.signedIn = false;
          console.log("Signed out!");
        })
        .catch((error) => {
          console.log(error);
        });
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
