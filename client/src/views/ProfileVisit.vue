<template>
  <div>
    <div class="w-full mx-auto">
      <div class="card h-44 bg-gray-200 cardbg"></div>
      <div class="z-10 -mt-7">
        <button
          class="button is-info absolute right-0 mr-96 h-14 rounded-full w-36 filter drop-shadow-md"
          v-if="!friend && !reqStatus"
          @click="sendFriendReq"
        >
          Add friend
        </button>
        <button
          class="button is-danger absolute right-0 mr-96 h-14 rounded-full w-36 filter drop-shadow-md"
          v-if="reqStatus"
          @click="removeRequest"
        >
          Remove request
        </button>
        <button
          class="button is-danger absolute right-0 mr-96 h-14 rounded-full w-36 filter drop-shadow-md"
          v-if="friend"
          @click="removeFriend"
        >
          Remove friend
        </button>
      </div>
      <figure class="image is-96x96 ml-96 -mt-5 z-10 filter drop-shadow-md">
        <img :src="photoURL" alt="Profile picture" class="is-rounded shadow" />
      </figure>
      <div class="card-content ml-80 pl-14">
        <div class="media">
          <div class="media-content mt-1">
            <div class="flex gap-2">
              <p class="title is-4 text-gray-50">{{ firstName }}</p>
              <p class="title is-4 text-gray-50">{{ lastName }}</p>
            </div>
            <p class="subtitle is-6 -mt-5 text-gray-50">@{{ username }}</p>
          </div>
        </div>

        <div class="content flex items-center pr-2 h-20">
          <div class="border-1 rounded-md w-11/12 h-20 mt-6">
            <p class="text-gray-50">{{ description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "ProfileVisit",
  data() {
    return {
      users: [],
      currUser: {},
      username: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      photoURL: "",
      description: "",
      loggedInUser: {},
      reqStatus: false,
      friend: false,
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("../api/userProfiles/");
    this.users = response.data;
    this.currUser = {};
    this.searchedUsers = [];
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedInUser = user.providerData[0];
        this.users.forEach((userInDB) => {
          if (userInDB.uid === this.loggedInUser.uid) {
            this.loggedInUser = userInDB;
          }
        });
        this.currUser.friendRequests.forEach((reqID) => {
          if (reqID === this.loggedInUser.uid) this.reqStatus = true;
        });
        this.currUser.friendsList.forEach((friendID) => {
          if (friendID === this.loggedInUser.uid) this.friend = true;
        });
        console.log(this.reqStatus);
      } else {
        console.log("No user signed in");
      }
    });

    this.users.forEach((userInDB) => {
      // update info if userID matches URL ID
      if (userInDB.uid === this.$route.params.id) {
        this.currUser = userInDB;
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
    console.log(this.currUser.friendRequests);
  },
  methods: {
    async sendFriendReq() {
      let updatedFriendRequests = [];
      this.users.forEach((userInDB) => {
        if (userInDB.uid === this.loggedInUser.uid) {
          updatedFriendRequests = this.loggedInUser.friendRequests;

          updatedFriendRequests.forEach((reqs) => {
            if (reqs === userInDB.uid) {
              console.log("Request already exists!");
              this.reqStatus = false;
            }
          });
        }
      });
      if (!this.reqStatus) {
        updatedFriendRequests.push(this.loggedInUser.uid);
        try {
          const response = await axios.put(
            "../api/userProfiles/" + this.currUser._id,
            {
              friendRequests: updatedFriendRequests,
            }
          );
          this.reqStatus = true;
          this.currUser = response.data;
          console.log("Sent friend request!");
        } catch (err) {
          console.log(err);
        }
      }
    },
    async removeRequest() {
      let updatedFriendRequests = this.currUser.friendsList;

      if (this.reqStatus) {
        this.currUser.friendRequests.forEach((reqID, index) => {
          if (reqID === this.loggedInUser.uid)
            updatedFriendRequests.splice(index, 1);
        });
        try {
          const response = await axios.put(
            "../api/userProfiles/" + this.currUser._id,
            {
              friendRequests: updatedFriendRequests,
            }
          );
          this.reqStatus = false;
          this.currUser = response.data;
          console.log("Removed request!");
        } catch (err) {
          console.log(err);
        }
      }
    },
    async removeFriend() {
      let updatedFriendsList1 = this.loggedInUser.friendsList;
      let updatedFriendsList2 = this.currUser.friendsList;

      this.loggedInUser.friendsList.forEach((friendID, index) => {
        if (friendID === this.$route.params.id)
          updatedFriendsList1.splice(index, 1);
      });
      this.currUser.friendsList.forEach((friendID, index) => {
        if (friendID === this.loggedInUser.uid)
          updatedFriendsList2.splice(index, 1);
      });

      try {
        const response1 = await axios.put(
          "../api/userProfiles/" + this.loggedInUser._id,
          {
            friendsList: updatedFriendsList1,
          }
        );
        this.loggedInUser = response1.data;

        const response2 = await axios.put(
          "../api/userProfiles/" + this.currUser._id,
          {
            friendsList: updatedFriendsList2,
          }
        );
        this.currUser = response2.data;

        this.friend = false;
        console.log("Removed friend!");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
body {
  font-family: "Roboto";
}

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

.cardbg {
  background: linear-gradient(327deg, #00caf7, #f76bd3);
  background-size: 400% 400%;

  -webkit-animation: Animation 30s ease infinite;
  -moz-animation: Animation 30s ease infinite;
  animation: Animation 30s ease infinite;
}

@-webkit-keyframes Animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes Animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes Animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
