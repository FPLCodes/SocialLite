<template>
  <div class="homebg font-sans">
    <div class="flex justify-items-stretch mx-auto xl:w-9/12">
      <div class="flex-auto">
        <div class=" flex field w-full">
          <div class="w-full h-full">
            <div class="flex control w-full" style="background: #1E1E1E;">
              <div
                class="relative px-2 border-r-2"
                style="border-color: rgb(82, 82, 82)"
              >
                <div class="flex justify-center pt-5 cursor-default">
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

                  <div
                    class="pt-1 px-2 max-h-100 overflow-y-auto"
                    v-if="showList"
                  >
                    <li
                      v-for="user in friends"
                      :key="user.username"
                      class="p-1 py-px cursor-pointer text-gray-50 transition-all rounded-lg"
                      @click="loadChat(user.uid)"
                    >
                      <div class="flist-item">
                        <div class="flex items-center">
                          <figure class="image is-32x32">
                            <img
                              :src="user.pic"
                              onerror="this.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1'"
                              alt="pfp"
                              class="is-rounded"
                            />
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
                  <div
                    class="-mt-px px-2 max-h-100 overflow-y-auto"
                    v-if="!showList && friendReqs"
                  >
                    <li
                      v-for="request in friendReqs"
                      :key="request.username"
                      class="flex justify-between p-1 pt-3 text-gray-50"
                    >
                      <div class="flex items-center">
                        <figure class="image is-32x32">
                          <img
                            :src="request.pic"
                            onerror="this.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1'"
                            alt="pfp"
                            class="is-rounded"
                          />
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
                  class="absolute bottom-2 w-full text-center -ml-2 text-gray-50 text-xl"
                  style="border-color: rgb(82, 82, 82)"
                >
                  <div class="menu-item" @click="findUsers = !findUsers">
                    <h1>
                      Add friend
                    </h1>
                    <div
                      class="menu-effect w-0 h-0.5 mt-2 mx-auto bg-gray-500 transition-all duration-300"
                    ></div>
                  </div>

                  <div v-if="findUsers">
                    <div class="field has-addons flex mx-3 pb-1">
                      <div class="w-full opacity-90 items-center">
                        <input
                          class="input h-9 pr-20 rounded-xl"
                          type="text"
                          placeholder="Username"
                          v-model="userSearch"
                        />

                        <button
                          class="button is-info w-full mt-2 transition-all rounded-2xl ease-in"
                          :disabled="!userSearch"
                          @click="sendFriendReq"
                        >
                          Send request
                        </button>

                        <div
                          class="notification is-warning h-9 mt-2"
                          v-if="requestSent"
                        >
                          <button
                            class="delete mt-1"
                            @click="requestSent = !requestSent"
                          ></button>
                          <p class="-mt-2 text-sm ml-3 font-medium">
                            {{ requestMessage }}!
                          </p>
                        </div>
                      </div>
                    </div>
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
              <div class="w-full h-screen relative chat">
                <header
                  class="h-16 sticky z-10 flex justify-between"
                  style="background-color: #1a1a1a"
                >
                  <div class="flex w-max items-center" v-if="currChatUser">
                    <figure class="image is-32x32 ml-3 -mr-2">
                      <img
                        :src="currChatUser.senderPhoto"
                        onerror="this.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1'"
                        alt="pfp"
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
                        onerror="this.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1'"
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
                        onerror="this.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1'"
                        @click="openProfile(this.userID)"
                      />
                    </figure>
                  </div>
                </header>
                <div
                  v-if="!this.receiverID"
                  class="mx-auto text-center h-full chat"
                >
                  <h1 class="text-gray-50 text-xl mt-20">
                    Click on a user to start chatting
                  </h1>
                </div>
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
                      class="w-max mr-4 ml-4 pt-1 mt-1 filter drop-shadow-md"
                      v-bind:class="{
                        'justify-self-end': message.senderID === currUser.uid,
                      }"
                      v-for="(message, index) in chat"
                      :key="index"
                    >
                      <!-- Messages sent by user -->
                      <div
                        class="flex items-center"
                        v-if="message.senderID === currUser.uid"
                      >
                        <div
                          class="px-3 py-1 rounded-xl ml-52 text-gray-50"
                          style="background-color: #0B87AE"
                        >
                          <p
                            class="inline-block align-middle max-w-xs lg:max-w-sm xl:max-w-md"
                          >
                            {{ message.message }}
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
                            onerror="this.src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1'"
                            alt="pfp"
                            class="is-rounded "
                          />
                        </figure>
                        <div
                          class="px-3 py-1 rounded-xl mr-40 text-gray-50"
                          style="background-color: #0B87AE"
                        >
                          <p
                            class="inline-block align-middle max-w-xs lg:max-w-sm xl:max-w-md"
                          >
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
                  v-if="this.receiverID"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
/* import { io } from "socket.io-client";
import { format } from "timeago.js"; */
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
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
      photoURL: "",
      receiverID: "",
      friendsSearch: "",
      userSearch: "",
      findUsers: false,
      requestSent: false,
      requestMessage: "Error sending request",
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("../api/userProfiles/");
    this.users = response.data;

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
          }
        });
        this.loadFriendReq();
        this.loadFriendsList();

        const db = getDatabase();
        this.db = db;
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
        const userInDB = this.users.find(
          (userInDB) => request === userInDB.uid
        );
        this.friendReqs[i] = {
          username: userInDB.username,
          pic: userInDB.photoURL,
          uid: userInDB.uid,
        };
      });
    },
    loadFriendsList() {
      this.friends.forEach((user, i) => {
        const userInDB = this.users.find((userInDB) => user === userInDB.uid);
        this.friends[i] = {
          username: userInDB.username,
          pic: userInDB.photoURL,
          uid: userInDB.uid,
        };
      });
    },
    sendFriendReq() {
      let updatedFriendRequests = [];
      this.users.forEach(async (userInDB) => {
        if (userInDB.username === this.userSearch) {
          updatedFriendRequests = userInDB.friendRequests;

          const exists = updatedFriendRequests.find(
            (reqs) => reqs === this.currUser.uid
          );

          if (exists) {
            this.requestMessage = "Already sent request";
            this.requestSent = true;
          } else if (userInDB.username === this.username) {
            this.requestMessage = "Cannot add yourself";
            this.requestSent = true;
          } else {
            updatedFriendRequests.push(this.currUser.uid);
            try {
              await axios.put("../api/userProfiles/" + userInDB._id, {
                friendRequests: updatedFriendRequests,
              });
              this.requestMessage = "Request sent";
              this.requestSent = true;
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          this.requestMessage = "No user found";
          this.requestSent = true;
        }
      });
    },
    async acceptFriend(id) {
      let updatedFriendsList = [];
      this.currUser.friendsList.forEach((user) =>
        updatedFriendsList.push(user.uid)
      );
      updatedFriendsList.push(id);

      try {
        const response = await axios.put(
          "../api/userProfiles/" + this.currUser._id,
          {
            friendsList: updatedFriendsList,
          }
        );
        this.currUser = response.data;
        this.removeReq(id);

        const userInDB = this.users.find((user) => user.uid === id);
        updatedFriendsList = [];
        updatedFriendsList = userInDB.friendsList;
        updatedFriendsList.push(this.currUser.uid);

        await axios.put("../api/userProfiles/" + userInDB._id, {
          friendsList: updatedFriendsList,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async removeReq(id) {
      let updatedFriendReq = [];
      if (this.currUser.friendRequests.length !== 1) {
        this.currUser.friendRequests.forEach((user) => {
          if (user.uid !== id) updatedFriendReq.push(user.uid);
        });
      }

      try {
        const response = await axios.put(
          "../api/userProfiles/" + this.currUser._id,
          {
            friendRequests: updatedFriendReq,
          }
        );

        this.currUser = response.data;
        this.friendReqs = this.currUser.friendRequests;
        this.friends = this.currUser.friendsList;
        this.loadFriendReq();
        this.loadFriendsList();
      } catch (err) {
        console.log(err);
      }
    },
    loadChat(receiverID) {
      this.receiverID = receiverID;
      const chatRef = ref(this.db, "Chats/");

      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.chat = Object.values(data).filter(
            (message) =>
              (message.receiverID === this.userID &&
                message.senderID === this.receiverID) ||
              (message.receiverID === this.receiverID &&
                message.senderID === this.userID)
          );
          this.chatSize = Object.keys(data).length;

          setTimeout(() => {
            this.scrollToBottom();
          }, 10);

          this.currChatUser = "";
          this.chat.forEach((message) => {
            if (message.senderID === receiverID) {
              this.currChatUser = message;
            }
          });
        } else this.chatSize = 0;
      });
    },
    send() {
      const currTime = new Date();

      set(ref(this.db, "Chats/" + (this.chatSize + 1)), {
        message: this.message,
        sender: this.username,
        senderPhoto: this.photoURL,
        senderID: this.userID,
        receiverID: this.receiverID,
        time: currTime.toString(),
      });
      this.message = "";
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

.chat {
  background: rgb(51, 51, 55);
  background: linear-gradient(
    180deg,
    rgb(49, 49, 53) 0%,
    rgba(25, 25, 27, 1) 100%
  );
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
