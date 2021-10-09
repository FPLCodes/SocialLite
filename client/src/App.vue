<template>
  <div id="app" class="h-screen">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  font-family: "Roboto";
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
