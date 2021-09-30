<template>
  <div
    class="grid grid-cols-2 grid-rows-2 gap-5 justify-items-stretch container mx-auto pt-5"
  >
    <div class="ml-20">
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
              <p class="subtitle is-6 -mt-5" v-if="!selected">
                @{{ username }}
              </p>
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
      <div class="mt-2">
        <button class="button is-info" @click="sendFriendReq">
          Add friend
        </button>
      </div>
    </div>

    <SearchBox />
  </div>
</template>

<script>
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SearchBox from "../components/searchBox.vue";
export default {
  name: "ProfileVisit",
  components: {
    SearchBox,
  },
  data() {
    return {
      users: [],
      currUser: [],
      username: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      photoURL: "",
      description: "",
      selected: false,
      searchedUsers: [],
      search: "",
      loggedInUser: {},
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("../api/userProfiles/");
    this.users = response.data;
    this.currUser = [];
    this.searchedUsers = [];
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedInUser = user.providerData[0];
        console.log(this.loggedInUser);
      } else {
        console.log("No user signed in");
      }
    });

    // Check for logged in user & get user info
    this.users.forEach((userInDB) => {
      // update info if userID matches URL ID
      if (userInDB.uid === this.$route.params.id) {
        this.currUser.push(userInDB);
        this.username = userInDB.username;
        this.firstName = userInDB.firstName;
        if (userInDB.lastName) this.lastName = userInDB.lastName;
        this.birthDate = userInDB.birthDate;
        this.gender = userInDB.gender;
        this.photoURL = userInDB.photoURL;
        this.description = userInDB.description;
        if (this.description === "") this.description = "No bio...";
      }
    });
    console.log(this.currUser);
  },
  beforeUpdate() {
    this.searchedUsers = this.users
      .filter((user) =>
        user.username.toLowerCase().includes(this.search.toLowerCase())
      )
      .slice(0, 5);

    if (this.search === "") this.searchedUsers = [];
  },
  methods: {
    sendFriendReq() {
      this.users.forEach(async (userInDB) => {
        if (userInDB.uid === this.loggedInUser.uid) {
          let updatedFriendRequests = [];

          if (this.currUser[0].friendRequests)
            updatedFriendRequests = this.currUser[0].friendRequests;
          updatedFriendRequests.push(userInDB.uid);

          try {
            const response = await axios.put(
              "../api/userProfiles/" + this.currUser[0]._id,
              {
                friendRequests: updatedFriendRequests,
              }
            );
            this.currUser[0] = response.data;
            console.log("Sent friend request!");
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    goToUser(searchedUser) {
      // Redirect to user profile
      this.$router.push({
        path: `/profileVisit/${searchedUser.uid}`,
      });
      this.search = "";
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

ul {
  list-style-type: none;
}

li {
  list-style: none;
}

input:focus {
  outline: none;
}
</style>
