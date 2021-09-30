<template>
  <div class="w-2/4 justify-self-start ml-5 mt-3">
    <div class="card">
      <header class="card-header w-full">
        <div class="tabs is-toggle is-fullwidth w-full">
          <ul>
            <li>
              <a>
                <span class="icon is-small"
                  ><i class="fas fa-user-friends"></i
                ></span>
                <span>Friends</span>
              </a>
            </li>
            <li class="is-active">
              <a>
                <span class="icon is-small"
                  ><i class="fas fa-user-plus"></i
                ></span>
                <span>Requests ({{ friendReqs.length }})</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div class="border-2">
        <li
          v-for="request in friendReqs"
          :key="request.username"
          class="grid grid-cols-2 justify-items-stretch p-1 border-b-2 bg-gray-50 hover:bg-gray-100"
        >
          <div class="flex items-center">
            <figure class="image is-32x32">
              <img :src="request.pic" alt="pf" class="is-rounded" />
            </figure>
            <a class="justify-self-start ml-2">{{ request.username }}</a>
          </div>
          <div class="flex justify-self-end">
            <button
              class="button is-success h-8 w-5 mr-1"
              @click="acceptFriend"
            >
              <i class="fas fa-check"></i>
            </button>
            <button class="button is-danger h-8 w-5" @click="denyFriend">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "friendsListCard",
  data() {
    return {
      users: [],
      currUser: [],
      friendReqs: [],
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
            this.friendReqs = userInDB.friendRequests;
          }
        });
        this.friendReqs.forEach((request, i) => {
          this.users.forEach((userInDB) => {
            if (request === userInDB.uid) {
              this.friendReqs[i] = {
                username: userInDB.username,
                pic: userInDB.photoURL,
                uid: userInDB.uid,
              };
            }
          });
        });
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    acceptFriend() {
      console.log("Accepted!");
    },
    denyFriend() {
      console.log("Denied");
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
