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
import { getDatabase, ref, onValue } from "firebase/database";
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

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedInUser = this.users.find(
          (userInDB) => userInDB.uid === user.providerData[0].uid
        );

        this.db = getDatabase();
        this.currStatus();
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
  },
  methods: {
    sendFriendReq() {},
    removeRequest() {},
    removeFriend() {},
    currStatus() {
      this.friendReqs = [];
      const reqRef = ref(this.db, `Users/${this.currUser.uid}/requests/`);
      onValue(reqRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.friendReqs = Object.values(data);
          this.reqStatus = this.friendReqs.find(
            (req) => req.uid === this.loggedInUser.uid
          );
          console.log(this.reqStatus);
        }
      });

      this.friends = [];
      const friendsRef = ref(this.db, `Users/${this.currUser.uid}/friends/`);
      onValue(friendsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.friends = Object.values(data);
          this.friend = this.friends.find(
            (friend) => friend.uid === this.loggedInUser.uid
          );
          console.log(this.friends);
        }
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
