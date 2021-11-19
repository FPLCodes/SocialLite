<template>
  <div class="mainbg font-sans">
    <loading
      :active="isLoading"
      :color="'#62D7F0'"
      :blur="'8px'"
      :height="200"
      :width="200"
      :opacity="0.8"
      :background-color="'black'"
      :lock-scroll="true"
    />
    <div class="w-full h-screen items-center absolute mainbg">
      <div
        class="card mx-auto p-10 mt-52 w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12"
        style="background-color: #2b2b2b"
      >
        <div class="flex mx-auto justify-center filter drop-shadow-md">
          <h1
            class="text-gray-50 font-bold text-6xl"
            style="text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);"
          >
            Social
          </h1>
          <h1
            class="font-bold text-6xl"
            style="color: #62D7F0; text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);"
          >
            Lite
          </h1>
        </div>
        <div class="mx-auto max-w-xl mt-14">
          <div>
            <div class="card-content">
              <!-- Email input card -->
              <div class="field text-lg filter drop-shadow-md">
                <p class="text-gray-100 pb-1">Email</p>
                <div class="control has-icons-left">
                  <input
                    class="input border-none text-gray-100"
                    type="email"
                    v-model="email"
                    style="background-color: #2d3a46"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
              </div>

              <!-- Password input card -->
              <div class="field text-lg  filter drop-shadow-md">
                <p class="text-gray-100 pb-1">Password</p>
                <div class="control has-icons-left">
                  <input
                    class="input border-none text-gray-100"
                    type="password"
                    v-model="password"
                    style="background-color: #2d3a46"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              <!-- Login buttons -->
              <div class="flex gap-2 w-full pt-3 filter drop-shadow-md">
                <div class="field w-full">
                  <p class="control">
                    <button
                      class="button is-success w-full"
                      @click.prevent="login()"
                      :disabled="!password || !email"
                    >
                      Login
                    </button>
                  </p>
                </div>

                <!-- Google Sign-in button -->
                <div class="field w-full">
                  <p class="control flex gap-2">
                    <button
                      class="button bg-blue-500 text-gray-100 transition hover:text-gray-100 hover:bg-blue-600 border-none w-full"
                      @click.prevent="googleSignIn()"
                    >
                      <i class="fab fa-google mr-3"></i>
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

              <!-- Login fail/success notification -->
              <LoginNotification
                :success-message="successMessage"
                :failed-message="failedMessage"
              />

              <div class="text-gray-100 w-full mt-6 -mb-7">
                <p
                  class="text-center cursor-pointer"
                  @click.prevent="googleSignIn()"
                >
                  Don't have an account? Click here to sign up
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mt-44">
        <h1 class="text-center text-gray-200">Made by Sahab Ul Ferdous</h1>
        <div class="flex justify-center items-center gap-2 mt-2">
          <a
            class="fab fa-github fa-2x cursor-pointer"
            :href="'//' + 'github.com/FPLCodes'"
            target="_blank"
          ></a>
          <a
            class="fab fa-youtube fa-2x cursor-pointer"
            :href="'//' + 'youtube.com/channel/UCc7O8GMeaHOVczWNWpqdMDQ'"
            target="_blank"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import LoginNotification from "../components/loginFailWarning.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Sign-in",
  components: {
    LoginNotification,
    Loading,
  },
  data() {
    return {
      success: false,
      successMessage: "",
      failedMessage: "",
      signedIn: false,
      email: "",
      password: "",
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("api/userProfiles/");
    this.users = response.data;

    // Check for logged in user & get user info
    const auth = getAuth();
    this.isLoading = true;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userID = user.providerData[0].uid;

        if (user.providerData.length === 2) {
          this.isLoading = false;
          this.$router.push({
            path: `/user/${userID}`,
          });
        } else {
          this.isLoading = false;
          this.$router.push("sign-up");
        }
      } else {
        this.isLoading = false;
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
            path: `/user/${userID}`, // Redirect to home page
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);

          // Incorrect email
          if (errorCode === "auth/invalid-email") {
            this.failedMessage = "Invalid email";
            setTimeout(() => {
              this.failedMessage = "";
            }, 5000);
          }

          // Incorrect password
          else if (errorCode === "auth/wrong-password") {
            this.failedMessage = "Incorrect password";
            setTimeout(() => {
              this.failedMessage = "";
            }, 5000);

            // Too many incorrect attempts
          } else if (errorCode === "auth/too-many-requests") {
            this.failedMessage =
              "Too many failed login attempts. Please try again later";
            setTimeout(() => {
              this.failedMessage = "";
            }, 5000);
          }
          // Unknown error
          else {
            this.failedMessage = "There was an error trying to log in";
            setTimeout(() => {
              this.failedMessage = "";
            }, 5000);
          }
        });
    },
    // Login with Google function
    googleSignIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    },
    // Sign out user
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

#app {
  background-color: #212121;
}

.mainbg {
  background: rgb(26, 26, 28);
  background: linear-gradient(
    90deg,
    rgba(26, 26, 28, 1) 10%,
    rgba(36, 36, 40, 1) 50%,
    rgba(26, 26, 28, 1) 90%
  );
}

.card {
  background: rgb(19, 21, 24);
  background: linear-gradient(
    0deg,
    rgba(19, 21, 24, 1) 0%,
    rgba(39, 44, 52, 1) 100%
  );
}
</style>
