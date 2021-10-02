<template>
  <div class="flex flex-wrap justify-items-stretch container mx-auto pt-5">
    <ProfileCard />

    <SearchBox />

    <SocialBox />
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
