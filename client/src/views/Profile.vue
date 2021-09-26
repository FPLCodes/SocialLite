<template>
  <div class="container mx-auto w-2/5">
    <div class="card mt-10">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="photoURL" alt="Placeholder image" class="is-rounded" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ firstName }} {{ lastName }}</p>
            <p class="subtitle is-6">{{ username }}</p>
          </div>
        </div>

        <div class="content">
          Sample bio
        </div>
      </div>
    </div>

    <!-- Sign-out button -->
    <button class="button is-danger mt-3" @click="signOut">
      Sign out
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
export default {
  name: "Profile",
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      photoURL: "",
    };
  },
  async created() {
    // Get users from MongoDB
    const response = await axios.get("api/userProfiles/");
    this.users = response.data;

    // Check for logged in user & get user info
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.providerData);
        this.users.forEach((userInDB) => {
          // update info if userID from both database match
          if (userInDB.uid === user.providerData[0].uid) {
            this.username = userInDB.username;
            this.firstName = userInDB.firstName;
            if (userInDB.lastName) this.lastName = userInDB.lastName;
            this.birthDate = userInDB.birthDate;
            this.gender = userInDB.gender;
            this.photoURL = userInDB.photoURL;
          }
        });
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.username = "";
          this.firstName = "";
          this.lastName = "";
          this.gender = "";
          this.photoURL = "";
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

<style></style>
