<template>
  <div class="w-full h-full">
    <div style="background-color: #1E1E1E">
      <div class=" flex field w-full h-screen">
        <div class="w-full h-full">
          <div class="flex control w-full h-full" style="background: #1E1E1E;">
            <div class="px-2 border-r-2" style="border-color: rgb(82, 82, 82)">
              <div
                class="flex mx-auto justify-center pt-5"
                style="background: #1E1E1E;"
              >
                <h1
                  class="text-white font-bold text-5xl"
                  style="text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);"
                >
                  Social
                </h1>
                <h1
                  class="font-bold text-5xl"
                  style="color: #62D7F0; text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);"
                >
                  Lite
                </h1>
              </div>
              <div class="card w-full" style="background-color: #1E1E1E">
                <header class="card-header w-full px-2 pt-10">
                  <div class="w-full rounded-md">
                    <ul
                      class="flex justify-center h-8 items-center"
                      style="background-color: #415D6C;"
                    >
                      <li
                        class="w-full text-center h-full pt-1"
                        v-bind:class="{ active: showList }"
                        @click="showList = true"
                      >
                        <a class="flex gap-1 justify-center items-center">
                          <span class="text-white font-semibold"
                            >Friends ({{ friendsList.length }})</span
                          >
                        </a>
                      </li>
                      <li
                        v-bind:class="{ active: !showList }"
                        @click="showList = false"
                        class="w-full text-center h-full pt-1"
                      >
                        <a class="flex gap-1 justify-center items-center">
                          <span class="text-white font-semibold"
                            >Requests ({{ friendReqs.length }})</span
                          >
                        </a>
                      </li>
                    </ul>
                  </div>
                </header>

                <div class="field has-addons flex px-2 pt-3">
                  <div class="control w-full opacity-90 rounded-md">
                    <input
                      class="input h-9 pr-20"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </div>

                <div class="-mt-px px-2" v-if="showList">
                  <li
                    v-for="user in friendsList"
                    :key="user.username"
                    class="p-1 pt-3 cursor-pointer text-white transition transform hover:scale-105"
                    @click="loadChat(user.uid)"
                  >
                    <div class="flex items-center">
                      <figure class="image is-32x32">
                        <img :src="user.pic" alt="pf" class="is-rounded" />
                      </figure>
                      <p class="justify-self-start ml-2 text-lg">
                        {{ user.username }}
                      </p>
                    </div>
                  </li>
                </div>
                <div class="-mt-px" v-if="!showList && friendReqs">
                  <li
                    v-for="request in friendReqs"
                    :key="request.username"
                    class="p-1 border-b-2 bg-gray-50 hover:bg-gray-100"
                  >
                    <div class="flex items-center">
                      <figure class="image is-32x32">
                        <img :src="request.pic" alt="pf" class="is-rounded" />
                      </figure>
                      <a class="justify-self-start ml-2">{{
                        request.username
                      }}</a>
                    </div>
                    <div class="flex justify-self-end">
                      <button
                        class="button is-success h-8 w-5 mr-1"
                        @click="acceptFriend(request.uid)"
                      >
                        <i class="fas fa-check"></i>
                      </button>
                      <button
                        class="button is-danger h-8 w-5"
                        @click="removeReq(request.uid)"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </li>
                </div>
              </div>
            </div>

            <!------------------------- Chat box --------------------->
            <div
              class="w-full h-screen relative"
              style="background-color: #2D2D2D"
            >
              <header
                class=" bg-blue-50 h-12 sticky z-10"
                style="background-color: #1a1a1a"
              >
                <div class="flex w-max items-center" v-if="currChatUser">
                  <figure class="image is-32x32 ml-2 -mr-2">
                    <img
                      :src="currChatUser.senderPhoto"
                      alt="pf"
                      class="is-rounded"
                    />
                  </figure>
                  <p class="card-header-title text-white">
                    {{ currChatUser.sender }}
                  </p>
                </div>
              </header>
              <div
                class="absolute bottom-0 w-full max-h-full overflow-y-auto pb-16"
                ref="container"
                v-if="chat[0]"
              >
                <ul class="grid grid-cols-1 max-w-full pb-3 z-0" v-if="chat[0]">
                  <li
                    class="w-max mr-2 ml-2 pt-2 h-10"
                    v-bind:class="{
                      'justify-self-end': message.senderID === currUser.uid,
                    }"
                    v-for="message in chat"
                    :key="message.message"
                  >
                    <!-- Messages sent by user -->
                    <div
                      class="flex items-center"
                      v-if="message.senderID === currUser.uid"
                    >
                      <div
                        class="px-3 h-7 rounded-xl ml-52 text-white font-semibold"
                        style="background-color: #0B87AE"
                      >
                        <p class="inline-block align-middle">
                          {{ message.message }}
                        </p>
                      </div>
                      <figure class="image is-32x32 ml-2">
                        <img
                          :src="message.senderPhoto"
                          alt="pf"
                          class="is-rounded"
                        />
                      </figure>
                    </div>

                    <!-- Messages sent by others -->
                    <div
                      class="flex items-center"
                      v-if="message.senderID !== currUser.uid"
                    >
                      <figure class="image is-32x32 mr-2">
                        <img
                          :src="message.senderPhoto"
                          alt="pf"
                          class="is-rounded "
                        />
                      </figure>
                      <div
                        class="px-3 h-7 rounded-xl mr-40 text-white font-semibold"
                        style="background-color: #0B87AE"
                      >
                        <p class="inline-block align-middle">
                          {{ message.message }}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                class="flex absolute bottom-0 w-full z-10"
                style="background-color: #A4A4A4"
              >
                <input
                  class="input my-3 opacity-90 rounded-xl mx-2 filter drop-shadow-lg"
                  type="text"
                  placeholder="Message"
                  v-model="message"
                />
                <button
                  class="button is-info my-3 mr-2 rounded-3xl filter drop-shadow-md"
                  v-if="message"
                  @click="send"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
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
  name: "socialBox",
  data() {
    return {
      users: [],
      currUser: {},
      friendReqs: [],
      friendsList: [],
      showList: true,
      chat: [],
      message: "",
      currChatUser: "",
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("../api/userProfiles/");
    this.users = response.data;
    this.currUser = {};

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
            this.currUser = userInDB;
            this.username = userInDB.username;
            this.firstName = userInDB.firstName;
            if (userInDB.lastName) this.lastName = userInDB.lastName;
            this.birthDate = userInDB.birthDate;
            this.gender = userInDB.gender;
            this.photoURL = userInDB.photoURL;
            this.description = userInDB.description;
            if (this.description === "") this.description = "Add a bio";
            this.friendReqs = userInDB.friendRequests;
            this.friendsList = userInDB.friendsList;
            this.userID = userInDB.uid;
            this.loggedInUser = user.providerData[0];
          }
        });
        this.loadFriendReq();
        this.loadFriendsList();
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    loadFriendReq() {
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
    },
    loadFriendsList() {
      this.friendsList.forEach((user, i) => {
        this.users.forEach((userInDB) => {
          if (user === userInDB.uid) {
            this.friendsList[i] = {
              username: userInDB.username,
              pic: userInDB.photoURL,
              uid: userInDB.uid,
            };
          }
        });
      });
    },
    async acceptFriend(id) {
      let updatedFriendsList = [];
      if (this.currUser.friendsList[0])
        updatedFriendsList = this.currUser.friendsList;
      updatedFriendsList.push(id);

      let userInDB = {};
      this.users.forEach((user) => {
        if (user.uid === id) userInDB = user;
      });
      try {
        const response1 = await axios.put(
          "../api/userProfiles/" + this.currUser._id,
          {
            friendsList: updatedFriendsList,
          }
        );
        this.currUser = response1.data;

        updatedFriendsList = [];
        if (userInDB.friendsList[0]) updatedFriendsList = userInDB.friendsList;
        updatedFriendsList.push(this.loggedInUser.uid);

        const response2 = await axios.put(
          "../api/userProfiles/" + userInDB._id,
          {
            friendsList: updatedFriendsList,
          }
        );
        console.log(response2);

        this.friendReqs = this.currUser.friendRequests;
        this.friendsList = this.currUser.friendsList;
        this.loadFriendReq();
        this.loadFriendsList();
        this.removeReq(id);
      } catch (err) {
        console.log(err);
      }
    },
    removeReq(id) {
      let updatedFriendReq = [];
      updatedFriendReq = this.currUser.friendRequests.filter(
        (user) => user.uid !== id
      );
      this.users.forEach(async (userInDB) => {
        if (userInDB.uid === this.loggedInUser.uid) {
          try {
            const response = await axios.put(
              "../api/userProfiles/" + this.currUser._id,
              {
                friendRequests: updatedFriendReq,
              }
            );
            this.currUser = response.data;
            this.friendReqs = this.currUser.friendRequests;
            this.friendsList = this.currUser.friendsList;
            this.loadFriendReq();
            this.loadFriendsList();
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    async loadChat(id) {
      this.receiverID = id;
      const response = await axios.get("../api/chatMessages/");
      this.chat = response.data.filter(
        (message) => message.receiverID === id || message.senderID === id
      );
      this.currentCode = id;
      this.currChatUser = "";
      this.chat.forEach((message) => {
        if (message.senderID === id) this.currChatUser = message;
      });
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
    },
    async send() {
      const response = await axios.post("../api/chatMessages/", {
        message: this.message,
        sender: this.username,
        senderPhoto: this.photoURL,
        senderID: this.userID,
        receiverID: this.receiverID,
      });
      this.chat.push(response.data);
      this.message = "";
      this.scrollToBottom();
    },
    scrollToBottom() {
      const container = this.$refs.container;
      container.scrollTop = container.scrollHeight;
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

.active {
  background-color: #2677a5;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(31, 31, 31);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(90, 90, 90);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
