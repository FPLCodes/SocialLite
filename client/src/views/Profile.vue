<template>
  <div class="container mx-auto w-3/4 pt-10 sm:w-2/3 md:w-2/4 xl:w-2/6">
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
            <div class="flex gap-2">
              <p class="title is-4" v-if="!selected">{{ firstName }}</p>
              <input
                type="text"
                class="border-2 rounded w-40 sm:w-60 xl:w-72"
                v-if="selected"
                v-model="editedFirstName"
              />
              <p class="title is-4" v-if="!selected">{{ lastName }}</p>
            </div>
            <input
              type="text"
              class="mt-2 border-2 rounded w-40 sm:w-60 xl:w-72"
              v-if="selected"
              v-model="editedLastName"
            />
            <p class="subtitle is-6 -mt-5" v-if="!selected">@{{ username }}</p>
          </div>
        </div>

        <div class="content flex items-center pr-2 h-20">
          <div
            v-if="!selected"
            class="border-1 rounded-md w-11/12 h-20 px-2 mt-4"
          >
            {{ description }}
          </div>
          <textarea
            type="text"
            class="border-2 rounded-md w-full h-20 px-2 pt-1 outline-none"
            maxlength="100"
            v-if="selected"
            v-model="editedDesc"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between gap-3">
      <div
        class="flex gap-2 items-center w-36 mt-2 pl-2 border-2 rounded shadow-sm h-10 bg-white"
      >
        <div class="text-md mt-px">Edit Profile</div>
        <i
          class="far fa-edit cursor-pointer ml-3 -mt-px mb-px"
          v-if="!selected"
          @click="select"
        ></i>
        <i
          class="fas fa-check cursor-pointer"
          v-if="selected"
          @click="updateProfileInfo"
        ></i>
        <i
          class="far fa-times-circle cursor-pointer"
          v-if="selected"
          @click="unselect"
        ></i>
      </div>

      <!-- Sign-out button -->
      <button class="button is-danger mt-3 shadow" @click="signOut">
        Sign out
      </button>
    </div>
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
      editedFirstName: "",
      lastName: "",
      editedLastName: "",
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
            if (this.description === "") this.description = "Add a bio";
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
      this.editedFirstName = this.firstName;
      this.editedLastName = this.lastName;
    },
    // Finish editing bio
    unselect() {
      this.selected = false;
      this.editedDesc = "";
      this.editedFirstName = "";
      this.editedLastName = "";
    },
    // Update bio
    async updateProfileInfo() {
      if (!this.editedFirstName) this.editedFirstName = this.firstName;
      if (!this.editedLastName) this.editedLastName = this.lastName;
      const response = await axios.put(
        "../api/userProfiles/" + this.currUser[0]._id,
        {
          firstName: this.editedFirstName,
          lastName: this.editedLastName,
          description: this.editedDesc,
        }
      );
      this.currUser[0] = response.data;
      this.description = this.currUser[0].description;
      this.firstName = this.currUser[0].firstName;
      this.lastName = this.currUser[0].lastName;
      if (this.description === "") this.description = "Add a bio";
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

<style>
div {
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}

textarea {
  resize: none;
  overflow: hidden;
}
</style>
