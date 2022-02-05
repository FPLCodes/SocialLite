<template>
  <div class="overflow-y-scroll h-screen mainbg">
    <div class="xl:w-full 2xl:w-10/12 2xl:mx-auto">
      <div
        class="flex justify-between invisible mx-5 -mt-6 md:visible md:mt-12 xl:mt-10"
      >
        <img src="../assets/logo.png" width="35" class="ml-5" />
        <div class="flex items-center gap-4 mr-5 xl:mr-6">
          <button
            class="login py-2 px-4 rounded-sm bg-gray-700 hover:bg-gray-800 transition-all text-gray-50 cursor-pointer"
            @click="login()"
          >
            LOGIN
          </button>
          <button
            class="signup py-2 px-5 rounded-sm bg-blue-500 hover:bg-blue-600 transition-all text-gray-50 cursor-pointer"
            @click="login()"
          >
            SIGNUP
          </button>
        </div>
      </div>
      <div class="xl:flex items-center justify-items-end pt-24 xl:pt-16">
        <div class="px-6 xl:pr-6 xl:pl-5 leftSection">
          <h1
            class="font-bold text-5xl text-center xl:text-left xl:text-6xl 2xl:text-7xl"
          >
            Stay connected with SocialLite
          </h1>
          <p class="text-center text-xl xl:text-left mt-6">
            Start messaging today with a <b>fast </b> and <b>secure</b> online
            messaging platform.
          </p>
          <div class="w-ful flex justify-center xl:justify-start">
            <button
              class="w-max py-3 px-6 my-6 lg:mt-6 text-xl md:text-2xl md:font-semibold rounded-md 
            bg-blue-500 hover:bg-blue-700 transition-all text-gray-50 cursor-pointer
            xl:mx-0"
              @click="login()"
            >
              Get Started
            </button>
          </div>
        </div>
        <div class="px-6 rightSection">
          <img
            src="../assets/homepage.png"
            alt="Demo"
            class="filter drop-shadow-2xl mx-auto"
          />
        </div>
      </div>
      <div
        class="slider relative pt-32 mt-24 bottomSection w-full overflow-hidden"
      >
        <div class="slider-track flex absolute left-0 animate">
          <div class="slide flex gap-5 justify-around w-1/2">
            <img src="../assets/mongodb.png" class="w-16 p-px" />
            <img src="../assets/vuejs.png" class="w-16 p-px" />
            <img src="../assets/firebase.png" class="w-16 p-px" />
            <img src="../assets/tailwind.svg" class="w-16 p-px" />
            <img src="../assets/nodejs.svg" class="w-16 p-px" />
          </div>
          <div class="slide flex gap-5 justify-around w-1/2">
            <img src="../assets/mongodb.png" class="w-16 p-px" />
            <img src="../assets/vuejs.png" class="w-16 p-px" />
            <img src="../assets/firebase.png" class="w-16 p-px" />
            <img src="../assets/tailwind.svg" class="w-16 p-px" />
            <img src="../assets/nodejs.svg" class="w-16 p-px" />
          </div>
        </div>
      </div>
      <div class="w-full pt-32 bottomSection">
        <h1 class="text-center text-4xl">Product features</h1>
        <div
          class="text-center mt-6 justify-around gap-6 lg:flex lg:mx-20 xl:mx-32"
        >
          <div
            class="p-5 bg-gray-800 text-gray-50 m-5 filter drop-shadow-lg rounded-md max-w-sm mx-auto"
          >
            <i class="fas fa-sync fa-3x"></i>
            <h1 class="font-bold text-xl mt-4">Real-time messaging</h1>
            <p class="mt-4">
              All messages are sent instantly between users
            </p>
          </div>
          <div
            class="p-10 bg-gray-800 text-gray-50 m-5 filter drop-shadow-lg rounded-md max-w-sm mx-auto"
          >
            <i class="fas fa-shield fa-3x"></i>
            <h1 class="font-bold text-xl mt-4">Strong security</h1>
            <p class="mt-4">
              All messages & user authentications are handled by Firebase
            </p>
          </div>
          <div
            class="p-10 bg-gray-800 text-gray-50 m-5 filter drop-shadow-lg rounded-md max-w-sm mx-auto"
          >
            <i class="fas fa-user fa-3x"></i>
            <h1 class="font-bold text-xl mt-4">User profiles</h1>
            <p class="mt-4">
              Users have their own unique profiles
            </p>
          </div>
        </div>
      </div>
      <p class="text-gray-400 text-xs text-center mt-6 mb-2">
        Copyright ©️ SocialLite 2022 • All rights reserved
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
  methods: {
    login() {
      this.$router.push({ path: "/sign-in" });
    },
  },
};
</script>

<style>
.mainbg {
  background: #1e1e1e;
  color: white;
}

.BG {
  aspect-ratio: 960/540;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.layer1 {
  background-image: url("../assets/wave-haikei.svg");
}

.leftSection {
  animation: transitionLeft 1s;
}

.rightSection {
  animation: transitionRight 1s;
}

.bottomSection {
  animation: transitionBottom 1s;
}

.login {
  animation: transitionLogin 1s;
}

.signup {
  animation: transitionSignup 1.5s;
}

@keyframes transitionLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes transitionRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes transitionBottom {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes transitionLogin {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  50% {
    opacity: 1;
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes transitionSignup {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  50% {
    opacity: 1;
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0);
  }
}

.slider-track {
  width: 200%;
}

@keyframes scroll {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}

.animate {
  width: 200%;
  animation: scroll 30s linear infinite;
  top: 50%;
  transform: translate(0, -50%);
}

.animate:hover {
  animation-play-state: paused;
}
</style>
