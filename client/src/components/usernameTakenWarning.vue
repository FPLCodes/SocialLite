<template>
  <transition name="bounce">
    <div
      class="notification is-danger is-light h-16 mb-3 flex md:h-8"
      v-if="userExists"
    >
      <i class="fas fa-exclamation-triangle -ml-3 mr-2 md:-mt-2"></i>
      <p class="-mt-2 text-sm sm:-mt-3 sm:text-base">
        {{ userExists }}
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "usernameTakenWarning",
  props: {
    userExists: String,
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}
</style>
