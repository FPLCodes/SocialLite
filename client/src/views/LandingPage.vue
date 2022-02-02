<template>
  <div class="overflow-y-scroll h-screen mainbg">
    <div class="xl:w-full 2xl:w-10/12 2xl:mx-auto">
      <div
        class="flex justify-between invisible -mt-6 md:visible md:mt-12 xl:mt-10 sticky top-0"
      >
        <img src="../assets/logo.png" width="35" height="35" class="ml-5" />
        <div class="flex items-center gap-4 mr-5">
          <p
            class="py-2 px-4 rounded-sm bg-gray-700 hover:bg-gray-800 transition-all text-gray-50 cursor-pointer"
          >
            LOGIN
          </p>
          <p
            class="py-2 px-5 rounded-sm bg-blue-500 hover:bg-blue-600 transition-all text-gray-50 cursor-pointer"
          >
            SIGNUP
          </p>
        </div>
      </div>
      <div class="xl:flex items-center justify-items-end pt-20">
        <div class="px-6">
          <h1
            class="font-bold text-4xl text-center xl:text-left xl:text-6xl 2xl:text-7xl"
          >
            Stay connected with SocialLite
          </h1>
          <p class="text-center text-2xl xl:text-left mt-6">
            Start messaging today with a <b>fast </b> and <b>secure</b> online
            messaging platform.
          </p>
          <p
            class="w-max py-3 px-6 mt-6 text-3xl font-semibold rounded-md bg-blue-500 hover:bg-blue-700 transition-all text-gray-50 cursor-pointer"
          >
            Get Started
          </p>
        </div>
        <div class="px-5">
          <img
            src="../assets/homepage.png"
            class="filter drop-shadow-xl mx-auto"
          />
        </div>
      </div>
      <div class="flex gap-5 justify-evenly pt-32">
        <img src="../assets/mongodb.png" class="w-16 p-px" />
        <img src="../assets/vuejs.png" class="w-16 p-px" />
        <img src="../assets/firebase.png" class="w-16 p-px" />
      </div>
      <div class="w-full pt-32">
        <h1 class="text-center text-4xl">Product features</h1>
        <div class="text-center mt-6 justify-evenly gap-0 md:flex xl:mx-32">
          <div
            class="p-5 bg-gray-800 text-gray-50 m-5 filter drop-shadow-lg rounded-md"
          >
            <i class="fas fa-sync fa-3x"></i>
            <h1 class="font-bold text-xl mt-4">Real-time messaging</h1>
            <p class="mt-4">
              All messages are sent instantly between users
            </p>
          </div>
          <div
            class="p-10 bg-gray-800 text-gray-50 m-5 filter drop-shadow-lg rounded-md"
          >
            <i class="fas fa-shield fa-3x"></i>
            <h1 class="font-bold text-xl mt-4">Strong security</h1>
            <p class="mt-4">
              All messages & user authentications are handled by Firebase
            </p>
          </div>
          <div
            class="p-10 bg-gray-800 text-gray-50 m-5 filter drop-shadow-lg rounded-md"
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
export default {};
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
</style>
