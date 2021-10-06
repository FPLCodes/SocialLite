<template>
  <div class="justify-self-start w-full my-5">
    <div class="card">
      <div class="field has-addons flex">
        <div class="control w-full">
          <input
            class="input"
            type="text"
            placeholder="Find users"
            v-model="search"
          />
        </div>
        <div class="control">
          <button class="button is-info">
            <i class="fas fa-search pr-2"></i>
          </button>
        </div>
      </div>
      <div
        class="border-2 -mt-4 max-h-52 overflow-auto"
        v-if="searchedUsers[0]"
      >
        <li
          class="flex items-center p-1 pt-2 cursor-pointer border-b-2 bg-gray-50 hover:bg-gray-100"
          v-for="user in searchedUsers"
          :key="user.username"
        >
          <figure class="image is-32x32 mr-2">
            <img :src="user.photoURL" alt="pf" class="is-rounded" />
          </figure>
          <a @click="goToUser(user)">{{ user.username }}</a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "searchBox",
  props: {
    searchText: String,
  },
  data() {
    return {
      users: [],
      searchedUsers: [],
      search: "",
    };
  },
  async mounted() {
    // Get users from MongoDB
    const response = await axios.get("../api/userProfiles/");
    this.users = response.data;
    this.searchedUsers = [];
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
