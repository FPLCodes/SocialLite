<template>
  <div>
    <transition name="bounce">
      <div class="card bg-green-300 mt-3 h-10" v-if="successMessage">
        <div class="card-content grid grid-cols-2">
          <div class="content font-semibold pt-1 -mt-5">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div class="card bg-red-400 mt-3 h-10" v-if="failedMessage">
        <div class="card-content grid grid-cols-2">
          <div class="content font-semibold pt-1 -mt-5">
            {{ failedMessage }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "loginFailWarning",
  props: {
    successMessage: String,
    failedMessage: String,
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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
