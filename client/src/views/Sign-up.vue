<template>
  <div id="app" class="bg-gray-50 font-sans">
    <div class="container w-full h-screen flex items-center">
      <div
        class="flex flex-col gap-12 mx-auto max-w-xl mb-20 w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12"
      >
        <div class="card p-5 mt-36" style="background-color: #2b2b2b">
          <div class="flex text-gray-50 items-center">
            <i
              class="fas fa-long-arrow-alt-left mr-1 cursor-pointer"
              @click="signOut"
            ></i>
            <p class="cursor-pointer" @click="signOut">Go back</p>
          </div>
          <div class="text-center filter drop-shadow-md">
            <h1
              class="text-gray-50 font-bold text-4xl pb-5"
              style="text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);"
            >
              Sign up
            </h1>
          </div>
          <div class="card-content text-gray-50">
            <!-- Username input card -->
            <div class="field filter drop-shadow-md">
              <p class="text-gray-50 pb-1">Username</p>
              <div class="control has-icons-left has-icons-right text-gray-50">
                <input
                  class="input text-gray-50 border-none"
                  type="text"
                  maxlength="20"
                  pattern="\S+"
                  v-model="username"
                  v-bind:class="{ 'border-red-300': usernameError }"
                  style="background-color: #2d3a46"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>

            <!-- Show if username is taken -->
            <UsernameTakenWarning :user-exists="userExists" />

            <!-- Password input card -->
            <div class="field filter drop-shadow-md">
              <p class="text-gray-50 pb-1">Password</p>
              <div class="control has-icons-left">
                <input
                  class="input text-gray-50 border-none"
                  type="password"
                  minlength="6"
                  pattern="\S+"
                  v-model="password"
                  v-bind:class="{ 'border-red-300': !correctPass }"
                  style="background-color: #2d3a46"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <!-- Confirm password input card -->
            <div class="field filter drop-shadow-md">
              <p class="text-gray-50 pb-1">Confirm Password</p>
              <div class="control has-icons-left">
                <input
                  class="input text-gray-50 border-none"
                  type="password"
                  minlength="6"
                  v-model="confirmPass"
                  v-bind:class="{ 'border-red-300': !correctPass }"
                  style="background-color: #2d3a46"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <incorrectField
              :message-status="!correctPass"
              :message="'Passwords do not match'"
            />
            <incorrectField
              :message-status="shortPass"
              :message="'Password has to be at least 6 characters long'"
            />

            <!-- Names input -->
            <div class="flex w-full gap-10">
              <!-- First name input card -->
              <div class="field w-full filter drop-shadow-md">
                <p class="text-gray-50 pb-1">First name</p>
                <div class="control has-icons-left">
                  <input
                    class="input text-gray-50 border-none"
                    type="text"
                    v-model="firstName"
                    style="background-color: #2d3a46"
                  />
                  <span class="icon is-small is-left">
                    <i class="far fa-user"></i>
                  </span>
                </div>
              </div>

              <!-- Last name input card -->
              <div class="field w-full filter drop-shadow-md">
                <p class="text-gray-50 pb-1">Last name</p>
                <p class="control has-icons-left">
                  <input
                    class="input text-gray-50 border-none"
                    type="text"
                    v-model="lastName"
                    style="background-color: #2d3a46"
                  />
                  <span class="icon is-small is-left">
                    <i class="far fa-user"></i>
                  </span>
                </p>
              </div>
            </div>

            <!-- Birthdate input card -->
            <div class="field filter drop-shadow-md">
              <p class="text-gray-50 pb-1">Birthdate</p>
              <div class="control has-icons-left">
                <input
                  class="input text-gray-50 border-none"
                  type="date"
                  v-model="birthDate"
                  style="background-color: #2d3a46"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-birthday-cake"></i>
                </span>
              </div>
            </div>

            <!-- Gender input radio -->
            <div class="mb-3">
              <h1 class="font-semibold">Gender:</h1>
              <div class="control flex">
                <label class="radio hover:text-gray-400">
                  <input type="radio" value="Male" v-model="gender" />
                  Male
                </label>
                <label class="radio hover:text-gray-400">
                  <input type="radio" value="Female" v-model="gender" />
                  Female
                </label>
                <label class="radio hover:text-gray-400">
                  <input type="radio" value="Others" v-model="gender" />
                  Others
                </label>
              </div>
            </div>
            <!-- Submit button -->
            <div class="field w-full">
              <p class="control">
                <!-- Only allow click if username and password is added -->
                <button
                  class="button is-success w-full"
                  @click="addUser()"
                  :disabled="
                    !password ||
                      !username ||
                      !confirmPass ||
                      !firstName ||
                      !birthDate ||
                      !gender
                  "
                >
                  Submit
                </button>
              </p>
            </div>
          </div>
        </div>
        <div class="w-full">
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
        <div class="bottom-3 absolute self-center">
          <p class="text-gray-400 text-xs">
            Copyright ©️ SocialLite 2022 • All rights reserved
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  getAuth,
  updatePassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import UsernameTakenWarning from "../components/usernameTakenWarning.vue";
import incorrectField from "../components/incorrectField.vue";

export default {
  name: "Sign-up",
  components: {
    UsernameTakenWarning,
    incorrectField,
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
      shortPass: false,
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
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
        // Sign out any user who already has an account
        if (user.providerData.length === 2) {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              console.log("Signed out!");
              this.$router.push({ path: "/" }); // Redirect to sign-in page
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    async addUser() {
      const existingUser = this.users.filter(
        (user) => user.username === this.user
      );
      // Warn user if found existing username
      if (existingUser[0]) {
        this.userExists = "This username is already taken";
        this.usernameError = true;
      } else {
        this.userExists = "";
        this.usernameError = false;
      }
      // Check if password and confirm password inputs match
      if (this.password !== this.confirmPass) this.correctPass = false;
      else this.correctPass = true;

      // Make sure password is at least 6 characters long
      if (this.password.length <= 5) this.shortPass = true;
      else this.shortPass = false;

      // Create new user if all conditions met
      if (
        !this.usernameError &&
        this.correctPass &&
        !this.firstNameMissing &&
        !this.shortPass
      ) {
        // Update password in firebase
        const auth = getAuth();
        const user = auth.currentUser;
        updatePassword(user, this.password)
          .then(async () => {
            console.log(user.providerData[0].uid);
            console.log("Updated password");

            // Create user in MongoDB database
            const response = await axios.post("api/userProfiles/", {
              username: this.username,
              firstName: this.firstName,
              lastName: this.lastName,
              birthDate: this.birthDate,
              gender: this.gender,
              photoURL: user.providerData[0].photoURL,
              uid: user.providerData[0].uid,
              description: "Sample bio",
            });
            this.users.push(response.data);

            // Reset inputs
            this.username = "";
            this.password = "";
            this.confirmPass = "";
            this.firstName = "";
            this.lastName = "";
            this.birthDate = "";
            this.gender = "";

            // Redirect to profile
            const userID = user.providerData[0].uid;
            this.$router.push({
              path: `/user/${userID}`,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Signed out!");
          this.$router.push({ path: "/" }); // Redirect to sign-in page
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
::-webkit-datetime-edit-year-field:not([aria-valuenow]),
::-webkit-datetime-edit-month-field:not([aria-valuenow]),
::-webkit-datetime-edit-day-field:not([aria-valuenow]) {
  color: transparent;
}
</style>
