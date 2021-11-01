<template>
  <div class="homebg">
    <div class="flex justify-items-stretch w-9/12 mx-auto">
      <div class="flex-auto">
        <div class=" flex field w-full">
          <div class="w-full h-full">
            <div class="flex control w-full" style="background: #1E1E1E;">
              <div
                class="relative px-2 border-r-2"
                style="border-color: rgb(82, 82, 82)"
              >
                <div class="flex mx-auto justify-center pt-5 cursor-default">
                  <h1
                    class="text-gray-50 font-bold text-5xl"
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
                <div class="w-full">
                  <header class="card-header w-full px-2 pt-10">
                    <div class="w-full rounded-md">
                      <ul
                        class="flex justify-center h-8 items-center text-gray-50"
                        style="background-color: #415D6C;"
                      >
                        <li
                          class="w-full text-center h-full pt-1"
                          v-bind:class="{ active: showList }"
                          @click="showList = true"
                        >
                          <a class="flex gap-1 justify-center items-center">
                            <span class="text-white font-semibold"
                              >Friends ({{ friends.length }})</span
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
                    <div
                      class="control has-icons-left w-full opacity-90 rounded-md"
                    >
                      <input
                        class="input h-9 pr-20"
                        type="text"
                        placeholder="Search"
                        v-model="friendsSearch"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-search mb-1"></i>
                      </span>
                    </div>
                  </div>

                  <div class="pt-1 px-2" v-if="showList">
                    <li
                      v-for="user in friends"
                      :key="user.username"
                      class="p-1 py-px cursor-pointer text-gray-50 transition-all rounded-lg"
                      @click="loadChat(), (this.receiverID = user.uid)"
                    >
                      <div class="flist-item">
                        <div class="flex items-center">
                          <figure class="image is-32x32">
                            <img :src="user.pic" alt="pf" class="is-rounded" />
                          </figure>
                          <p class="justify-self-start ml-2 text-lg">
                            {{ user.username }}
                          </p>
                        </div>
                        <div
                          class="w-0 h-0.5 bg-gray-300 mt-2 transition-all flist-effect duration-300"
                        ></div>
                      </div>
                    </li>
                  </div>
                  <div class="-mt-px px-2" v-if="!showList && friendReqs">
                    <li
                      v-for="request in friendReqs"
                      :key="request.username"
                      class="flex justify-between p-1 pt-3 text-white"
                    >
                      <div class="flex items-center">
                        <figure class="image is-32x32">
                          <img :src="request.pic" alt="pf" class="is-rounded" />
                        </figure>
                        <p class="justify-self-start ml-2">
                          {{ request.username }}
                        </p>
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
                <div
                  class="absolute bottom-4 w-full text-center -ml-2 text-gray-50 text-xl"
                >
                  <div class="menu-item">
                    <h1>
                      Find users
                    </h1>
                    <div
                      class="menu-effect w-0 h-0.5 mt-2 mx-auto bg-gray-500 transition-all duration-300"
                    ></div>
                  </div>
                  <div class="menu-item">
                    <h1 @click="signOut">
                      Sign out
                    </h1>
                    <div
                      class="menu-effect w-0 h-0.5 mt-2 mx-auto bg-gray-500 transition-all duration-300"
                    ></div>
                  </div>
                </div>
              </div>

              <!------------------------- Chat box --------------------->
              <div
                class="w-full h-screen relative"
                style="background-color: #2D2D2D"
              >
                <header
                  class="h-16 sticky z-10 flex justify-between"
                  style="background-color: #1a1a1a"
                >
                  <div class="flex w-max items-center" v-if="currChatUser">
                    <figure class="image is-32x32 ml-3 -mr-2">
                      <img
                        :src="currChatUser.senderPhoto"
                        alt="pf"
                        class="is-rounded"
                      />
                    </figure>
                    <p
                      class="card-header-title text-gray-200 cursor-pointer"
                      @click="visitProfile(currChatUser.senderID)"
                    >
                      {{ currChatUser.sender }}
                    </p>
                  </div>
                  <div v-if="chat[0]">
                    <figure
                      class="image is-48x48 mt-2 pt-px mr-3 absolute right-0 transition filter drop-shadow-md hover:drop-shadow-lg"
                    >
                      <img
                        class="cursor-pointer is-rounded"
                        :src="this.photoURL"
                        @click="openProfile(this.userID)"
                      />
                    </figure>
                  </div>
                  <div v-if="!chat[0]">
                    <figure
                      class="image is-48x48 mt-2 pt-px mr-3 absolute right-0 transition filter drop-shadow-md hover:drop-shadow-lg"
                    >
                      <img
                        class="cursor-pointer is-rounded"
                        :src="this.photoURL"
                        @click="openProfile(this.userID)"
                      />
                    </figure>
                  </div>
                </header>
                <div
                  class="absolute bottom-0 w-full max-h-full overflow-y-auto pb-16"
                  ref="container"
                  v-if="chat[0]"
                >
                  <ul
                    class="grid grid-cols-1 max-w-full pb-3 z-0 mt-16"
                    v-if="chat[0]"
                  >
                    <li
                      class="w-max mr-4 ml-4 pt-1 mt-1 h-10 filter drop-shadow-md"
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
                          class="px-3 h-9 rounded-xl ml-52 text-gray-50"
                          style="background-color: #0B87AE"
                        >
                          <p class="inline-block align-middle -mb-3">
                            {{ message.message }}
                          </p>
                          <p
                            class="inline-block align-bottom text-xs ml-3 -mb-2 font-light"
                          >
                            {{ message.time }}
                          </p>
                        </div>
                      </div>

                      <!-- Messages sent by others -->
                      <div
                        class="flex items-center text-gray-50"
                        v-if="message.senderID !== currUser.uid"
                      >
                        <figure class="image w-9 mr-2">
                          <img
                            :src="message.senderPhoto"
                            alt="pf"
                            class="is-rounded "
                          />
                        </figure>
                        <div
                          class="px-3 h-9 rounded-xl mr-40 text-white"
                          style="background-color: #0B87AE"
                        >
                          <p class="inline-block align-middle -mb-3">
                            {{ message.message }}
                          </p>
                          <p
                            class="inline-block align-bottom text-xs ml-3 -mb-2 font-light text-gray-200"
                          >
                            {{ message.time }}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  class="flex absolute bottom-0 w-full z-10"
                  style="background-color: #A4A4A4"
                  v-if="chat[0]"
                >
                  <input
                    class="input my-3 opacity-90 rounded-xl mx-2 filter drop-shadow-lg"
                    type="text"
                    placeholder="Message"
                    v-model="message"
                    @keyup.enter="send"
                  />
                  <button
                    class="button is-info my-3 mr-2 rounded-3xl filter drop-shadow-md"
                    v-if="message"
                    @click="send"
                  >
                    <i class="fas fa-paper-plane mr-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-none mr-52" v-if="showMenu">
        <div
          class="container w-52 pt-44 absolute h-screen text-gray-100 text-center text-2xl"
          style="background-color: #1a1a1a"
        >
          <div class="menu-item" @click="openProfile(this.userID)">
            <h1>
              Profile
            </h1>
            <div
              class="menu-effect w-0 h-0.5 mt-2 mx-auto bg-gray-500 transition-all duration-300"
            ></div>
          </div>
          <div class="menu-item">
            <h1 @click="signOut">
              Sign out
            </h1>
            <div
              class="menu-effect w-0 h-0.5 mt-2 mx-auto bg-gray-500 transition-all duration-300"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  name: "Home",
  data() {
    return {
      users: [],
      currUser: {},
      friendReqs: [],
      friends: [],
      showList: true,
      chat: [],
      message: "",
      currChatUser: "",
      showMenu: false,
      photoURL: "",
      receiverID: "",
      friendsSearch: "",
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("../api/userProfiles/");
    this.users = response.data;
    this.currUser = {};
    console.log(this.users);

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
            this.photoURL = userInDB.photoURL;
            this.friendReqs = userInDB.friendRequests;
            this.friends = userInDB.friendsList;
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
  beforeUpdate() {
    let search = this.friendsSearch.toLowerCase();
    if (search)
      this.friends = this.friends.filter((user) =>
        user.username.toLowerCase().includes(search)
      );
    else this.friends = [...this.currUser.friendsList];
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
      this.friends.forEach((user, i) => {
        this.users.forEach((userInDB) => {
          if (user === userInDB.uid) {
            this.friends[i] = {
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
        console.log(updatedFriendsList);
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

        console.log(updatedFriendsList);
        await axios.put("../api/userProfiles/" + userInDB._id, {
          friendsList: updatedFriendsList,
        });

        this.friendReqs = this.currUser.friendRequests;
        this.friends = [...this.currUser.friendsList];
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
    async loadChat() {
      const response = await axios.get("../api/chatMessages/");
      this.chat = response.data.filter(
        (message) =>
          (message.receiverID === this.userID &&
            message.senderID === this.receiverID) ||
          (message.receiverID === this.receiverID &&
            message.senderID === this.userID)
      );
      this.getChatTime();

      this.currentCode = this.receiverID;
      this.currChatUser = "";
      this.chat.forEach((message) => {
        if (message.senderID === this.receiverID) {
          this.currChatUser = message;
        }
      });
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
      console.log("");
    },
    async send() {
      const currTime = new Date();

      await axios.post("../api/chatMessages/", {
        message: this.message,
        sender: this.username,
        senderPhoto: this.photoURL,
        senderID: this.userID,
        receiverID: this.receiverID,
        time: currTime,
      });
      this.loadChat();
      this.message = "";
      this.scrollToBottom();
    },
    getChatTime() {
      this.chat.forEach((message) => {
        const date = new Date(message.time);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let time = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        if (hours === 0) hours = 12;

        message.time = `${hours}:${(minutes =
          minutes < 10 ? (minutes = "0" + minutes) : minutes)} ${time}`;
      });
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
    scrollToBottom() {
      const container = this.$refs.container;
      container.scrollTop = container.scrollHeight;
    },
    visitProfile(id) {
      this.$router.push({
        path: `/profileVisit/${id}`, // Redirect to friends profile
      });
    },
    openProfile(id) {
      this.$router.push({
        path: `/profile/${id}`, // Redirect to user profile
      });
    },
  },
};
</script>

<style>
.homebg {
  background: rgb(34, 34, 36);
  background: linear-gradient(
    90deg,
    rgba(34, 34, 36, 1) 0%,
    rgba(45, 45, 50, 1) 50%,
    rgba(34, 34, 36, 1) 100%
  );
}

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

.active {
  background-color: #2677a5;
}

.menu {
  margin-right: 10rem;
}

.menu-item {
  height: 3rem;
  margin-top: 1rem;
  cursor: pointer;
}

.menu-item:hover .menu-effect {
  width: 100%;
}

.flist-item:hover .flist-effect {
  width: 100%;
}

/* width */
div::-webkit-scrollbar {
  width: 6px;
}

/* Track */
div::-webkit-scrollbar-track {
  background: rgb(31, 31, 31);
}

/* Handle */
div::-webkit-scrollbar-thumb {
  background: rgb(90, 90, 90);
}

/* Handle on hover */
div::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
