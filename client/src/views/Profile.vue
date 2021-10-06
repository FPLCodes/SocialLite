<template>
  <div class="flex flex-wrap w-full">
    <SocialBox />
    <div class="w-2/4 justify-self-center">
      <SearchBox />
      <ProfileCard />
    </div>
  </div>
</template>

<script>
import SearchBox from "../components/searchBox.vue";
import ProfileCard from "../components/profileCard.vue";
import SocialBox from "../components/socialBox.vue";
export default {
  name: "Profile",
  components: {
    SearchBox,
    ProfileCard,
    SocialBox,
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
