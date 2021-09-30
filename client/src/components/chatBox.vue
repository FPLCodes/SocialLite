<template>
  <div class="ml-20 mt-3">
    <div class="card border-2">
      <header class="card-header bg-blue-50">
        <div class="w-full flex items-center justify-self-end">
          <p class="card-header-title">Chat box: {{ currentCode }}</p>
          <!-- Create/Join chat -->
          <div class="field pr-3">
            <div class="flex gap-2">
              <div class="control">
                <input
                  class="input"
                  type="type"
                  placeholder="Chat code"
                  v-model="messagePass"
                />
              </div>
              <button class="button is-info" @click="loadChat">Join</button>
            </div>
          </div>
        </div>
      </header>
      <div>
        <ul class="grid grid-cols-1 w-full mt-2" v-if="currentCode">
          <li
            class="w-max mb-1 mr-2 ml-2"
            v-bind:class="{
              'justify-self-end': message.sender === username,
            }"
            v-for="message in chat"
            :key="message.message"
          >
            <!-- Messages sent by user -->
            <div class="flex" v-if="message.sender === username">
              <div class="px-2 py-1 border-2 h-8 rounded-xl ml-52">
                {{ message.message }}
              </div>
              <figure class="image is-32x32 ml-2">
                <img :src="message.senderPhoto" alt="pf" class="is-rounded" />
              </figure>
            </div>

            <!-- Messages sent by others -->
            <div class="flex" v-if="message.sender !== username">
              <figure class="image is-32x32 mr-2">
                <img :src="message.senderPhoto" alt="pf" class="is-rounded" />
              </figure>
              <div class="px-2 py-1 border-2 h-8 rounded-xl mr-40">
                {{ message.message }}
              </div>
            </div>
          </li>
        </ul>
        <div class="flex" v-if="currentCode">
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
</template>

<script>
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "chatBox",
  data() {
    return {
      chat: [],
      message: "",
      messagePass: "",
      currentCode: "",
      username: "",
      photoURL: "",
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
      } else {
        console.log("No user signed in");
      }
    });
  },
  methods: {
    async loadChat() {
      const response = await axios.get("../api/chatMessages/");
      this.chat = response.data.filter(
        (message) => message.code === this.messagePass
      );
      this.currentCode = this.messagePass;
      this.messagePass = "";
    },
    async send() {
      const response = await axios.post("../api/chatMessages/", {
        message: this.message,
        sender: this.username,
        senderPhoto: this.photoURL,
        code: this.currentCode,
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
