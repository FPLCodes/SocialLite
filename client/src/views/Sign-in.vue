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
                  placeholder="Email"
                  v-model="email"
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
                  v-model="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>

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
    const response = await axios.get("api/userProfiles/");
    this.users = response.data;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.providerData);
        this.signedIn = true;
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.successMessage = "Logged in!";
          console.log(user);
        })
        .catch((error) => {
          this.failedMessage = "Failed to log in";
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    googleSignIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          if (user.providerData.length === 2)
            /* const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log(token); */
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
