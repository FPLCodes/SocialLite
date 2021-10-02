<template>
  <div class="flex w-full h-full mt-3">
    <div class="ml-20 w-full">
      <div class="flex mr-5 border-2">
        <div class="field w-2/5">
          <div class="flex w-full h-full border-l-2">
            <div class="control w-full h-full">
              <div class="card w-full">
                <header class="card-header w-full">
                  <div class="tabs is-toggle is-fullwidth w-full">
                    <ul>
                      <li
                        v-bind:class="{ 'is-active': showList }"
                        @click="showList = true"
                      >
                        <a>
                          <span class="icon is-small"
                            ><i class="fas fa-user-friends"></i
                          ></span>
                          <span>Friends ({{ friendsList.length }})</span>
                        </a>
                      </li>
                      <li
                        v-bind:class="{ 'is-active': !showList }"
                        @click="showList = false"
                      >
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
                <div
                  class="border-2 -mt-px max-h-96 overflow-auto"
                  v-if="showList"
                >
                  <li
                    v-for="user in friendsList"
                    :key="user.username"
                    class="grid grid-cols-2 justify-items-stretch p-1 border-b-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
                    @click="loadChat(user.uid)"
                  >
                    <div class="flex items-center">
                      <figure class="image is-32x32">
                        <img :src="user.pic" alt="pf" class="is-rounded" />
                      </figure>
                      <p class="justify-self-start ml-2">
                        {{ user.username }}
                      </p>
                    </div>
                  </li>
                </div>
                <div class="border-2 -mt-px" v-if="!showList && friendReqs">
                  <li
                    v-for="request in friendReqs"
                    :key="request.username"
                    class="grid grid-cols-2 justify-items-stretch p-1 border-b-2 bg-gray-50 hover:bg-gray-100"
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
          </div>
        </div>

        <div class="w-full">
          <header class="card-header bg-blue-50 border-2 h-10">
            <div class="w-max -mt-1">
              <p class="card-header-title">Chat box</p>
            </div>
          </header>
          <div class="w-full border-2 max-h-96 overflow-auto">
            <ul class="grid grid-cols-1 w-full" v-if="chat[0]">
              <li
                class="w-max mr-2 ml-2 pt-1"
                v-bind:class="{
                  'justify-self-end': message.sender === username,
                }"
                v-for="message in chat"
                :key="message.message"
              >
                <!-- Messages sent by user -->
                <div class="flex" v-if="message.sender === username">
                  <div class="px-2 py-1 border-2 h-8 rounded-xl ml-52 bg-white">
                    {{ message.message }}
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
                <div class="flex" v-if="message.sender !== username">
                  <figure class="image is-32x32 mr-2">
                    <img
                      :src="message.senderPhoto"
                      alt="pf"
                      class="is-rounded"
                    />
                  </figure>
                  <div class="px-2 py-1 border-2 h-8 rounded-xl mr-40 bg-white">
                    {{ message.message }}
                  </div>
                </div>
              </li>
            </ul>
            <div class="flex">
              <input
                class="input mt-2"
                type="text"
                placeholder="Message"
                v-model="message"
              />
              <button class="button is-info mt-2" v-if="message" @click="send">
                <i class="fas fa-paper-plane"></i>
              </button>
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
