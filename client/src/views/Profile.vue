<template>
  <div class="flex" style="background-color: #212121">
    <SearchBox />
    <ProfileCard />
  </div>
</template>

<script>
import SearchBox from "../components/searchBox.vue";
import ProfileCard from "../components/profileCard.vue";
export default {
  name: "Home",
  components: {
    SearchBox,
    ProfileCard,
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
