<template>
  <h1>Profile</h1>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {};
  },
  async mounted() {
    // Load all users
    const response = await axios.get("api/userProfiles/");
    this.users = response.data;
  },
};
</script>

<style></style>
