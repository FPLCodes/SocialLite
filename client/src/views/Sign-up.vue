<template>
  <div id="app" class="bg-gray-50">
    <div class="container w-full h-screen flex items-center">
      <div class="w-1/2 mx-auto max-w-xl mb-20">
        <!-- Sign-up & Sign-in tabs -->
        <div class="tabs is-medium">
          <ul>
            <li class="is-active">
              <router-link to="/sign-up">Sign up</router-link>
            </li>
          </ul>
          <router-view />
        </div>

        <!-- Username input card -->
        <div class="card">
          <div class=" card-content">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Username"
                  v-model="username"
                  v-bind:class="{ 'border-red-300': usernameError }"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>

            <!-- Show if username is taken -->
            <UsernameTakenWarning :user-exists="userExists" />

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

            <!-- Confirm password input card -->
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  placeholder="Confirm password"
                  v-model="confirmPass"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <IncorrectPasswordWarning :message-status="!correctPass" />

            <!-- First name input card -->
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="First name"
                  v-model="firstName"
                />
                <span class="icon is-small is-left">
                  <i class="far fa-user"></i>
                </span>
              </p>
            </div>

            <!-- Last name input card -->
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="Last name"
                  v-model="lastName"
                />
                <span class="icon is-small is-left">
                  <i class="far fa-user"></i>
                </span>
              </p>
            </div>

            <!-- Birthdate input card -->
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input font-extralight"
                  type="date"
                  v-model="birthDate"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-birthday-cake"></i>
                </span>
              </p>
            </div>

            <!-- Gender input radio -->
            <h1 class="font-semibold">Gender:</h1>
            <div class="control mb-3">
              <label class="radio">
                <input type="radio" value="Male" v-model="gender" />
                Male
              </label>
              <label class="radio">
                <input type="radio" value="Female" v-model="gender" />
                Female
              </label>
              <label class="radio">
                <input type="radio" value="Others" v-model="gender" />
                Others
              </label>
            </div>

            <!-- Submit button -->
            <div class="field">
              <p class="control">
                <!-- Only allow click if username and password is added -->
                <button
                  class="button is-success"
                  @click="addUser()"
                  :disabled="!password || !username"
                >
                  Submit
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import UsernameTakenWarning from "../components/usernameTakenWarning.vue";
import IncorrectPasswordWarning from "../components/incorrectPasswordWarning.vue";
export default {
  name: "Sign-up",
  components: {
    UsernameTakenWarning,
    IncorrectPasswordWarning,
  },
  data() {
    return {
      users: [],
      username: "",
      userExists: "",
      usernameError: false,
      password: "",
      confirmPass: "",
      correctPass: true,
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/userProfiles/");
    this.users = response.data;
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
    async addUser() {
      // Check for existing username and warn user if found
      let existingUser = [];
      this.users.forEach((user) => {
        if (user.username === this.username) existingUser.push(user);
      });
      if (existingUser[0]) {
        this.userExists = "This username is already taken";
        this.usernameError = true;
      }
      if (!existingUser[0]) {
        this.userExists = "";
        this.usernameError = false;
      }
      // Check if password and confirm password matches
      if (this.password !== this.confirmPass) this.correctPass = false;
      // Create new user if username not found and passwords match
      else {
        this.correctPass = true;

        const auth = getAuth();
        const user = auth.currentUser;
        updatePassword(user, this.password)
          .then(() => {
            console.log(user.providerData[0].uid);
            console.log("Updated password");
          })
          .catch((error) => {
            console.log(error);
          });

        const response = await axios.post("api/userProfiles/", {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.birthDate,
          gender: this.gender,
          photoURL: user.providerData[0].photoURL,
          uid: user.providerData[0].uid,
        });
        this.users.push(response.data);
        this.username = "";
        this.password = "";
        this.confirmPass = "";
        this.firstName = "";
        this.lastName = "";
        this.birthDate = "";
        this.gender = "";
        this.$router.push("profile");
      }
    },
  },
};
</script>

<style></style>
