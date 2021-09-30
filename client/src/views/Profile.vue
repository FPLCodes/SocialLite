<template>
  <div
    class="grid grid-cols-2 grid-rows-2 gap-5 justify-items-stretch container mx-auto pt-5"
  >
    <ProfileCard />

    <SearchBox />

    <ChatBox />

    <FriendsListCard />
  </div>
</template>

<script>
import SearchBox from "../components/searchBox.vue";
import ProfileCard from "../components/profileCard.vue";
import ChatBox from "../components/chatBox.vue";
import FriendsListCard from "../components/friendsListCard.vue";
export default {
  name: "Profile",
  components: {
    SearchBox,
    ProfileCard,
    ChatBox,
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
