<template>
  <div
    class="grid grid-cols-2 grid-rows-2 gap-5 justify-items-stretch container mx-auto pt-5"
  >
    <ProfileCard />

    <SearchBox />

    <FriendsListCard class="col-span-2" />
  </div>
</template>

<script>
import SearchBox from "../components/searchBox.vue";
import ProfileCard from "../components/profileCard.vue";
import FriendsListCard from "../components/friendsListCard.vue";
export default {
  name: "Profile",
  components: {
    SearchBox,
    ProfileCard,
    FriendsListCard,
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
