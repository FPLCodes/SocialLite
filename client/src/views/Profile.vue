<template>
  <div class="container mx-auto w-2/6 pt-10">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img
                :src="photoURL"
                alt="Profile picture"
                class="is-rounded shadow"
              />
            </figure>
          </div>
          <div class="media-content mt-1">
            <p class="title is-4">{{ firstName }} {{ lastName }}</p>
            <p class="subtitle is-6">{{ username }}</p>
          </div>
        </div>

        <div class="content flex items-center border-2 rounded-md pr-2 h-10">
          <div
            v-if="!selected"
            class="border-1 rounded-md w-full h-10 px-2 mt-4"
          >
            {{ description }}
          </div>
          <input
            type="text"
            class="border-2 rounded-md w-full h-10 px-2"
            maxlength="30"
            v-if="selected"
            v-model="editedDesc"
          />
          <i
            class="far fa-edit ml-2 mb-1 cursor-pointer"
            v-if="!selected"
            @click="select"
          ></i>
          <i
            class="fas fa-check ml-2 mb-1 cursor-pointer"
            v-if="selected"
            @click="changeDesc"
          ></i>
        </div>
      </div>
    </div>

    <!-- Sign-out button -->
    <button class="button is-danger mt-3 shadow-md" @click="signOut">
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
      currUser: [],
      username: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      photoURL: "",
      description: "",
      editedDesc: "",
      selected: false,
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("../api/userProfiles/");
    this.users = response.data;
    this.currUser = [];

    // Check for logged in user & get user info
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.providerData);
        this.users.forEach((userInDB) => {
          // update info if userID is correct
          if (
            userInDB.uid === this.$route.params.id &&
            userInDB.uid === user.providerData[0].uid
          ) {
            this.currUser.push(userInDB);
            this.username = userInDB.username;
            this.firstName = userInDB.firstName;
            if (userInDB.lastName) this.lastName = userInDB.lastName;
            this.birthDate = userInDB.birthDate;
            this.gender = userInDB.gender;
            this.photoURL = userInDB.photoURL;
            this.description = userInDB.description;
          }
        });
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    // Allow editing bio
    select() {
      this.selected = true;
      this.editedDesc = this.description;
    },
    // Finish editing bio
    unselect() {
      this.selected = false;
      this.editedDesc = "";
    },
    // Update bio
    async changeDesc() {
      const response = await axios.put(
        "../api/userProfiles/" + this.currUser[0]._id,
        {
          description: this.editedDesc,
        }
      );
      this.currUser[0] = response.data;
      this.description = this.currUser[0].description;
      this.unselect();
    },
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
