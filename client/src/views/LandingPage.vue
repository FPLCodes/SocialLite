<template>
  <div class="overflow-y-scroll h-screen mainbg">
    <div class="BG layer1">
      <div
        class="flex justify-between invisible -mt-6 md:visible md:mt-6 xl:mt-12"
      >
        <p class="p-1 ml-12 xl:ml-44">SL</p>
        <div class="flex gap-6 mr-12 xl:mr-44">
          <p class="p-1">LOGIN</p>
          <p class="p-1 px-4 rounded-md bg-gray-50 text-gray-900">SIGNUP</p>
        </div>
      </div>
      <div class="xl:flex items-center justify-between mt-20 xl:-mt-10">
        <div class="px-10 xl:pl-32">
          <h1 class="text-center xl:text-start font-bold text-4xl xl:text-5xl">
            Stay connected with SocialLite
          </h1>
          <p class="text-center xl:text-start mt-6 mx-5">
            Start messaging today with a <strong>fast, </strong>
            <strong>free,</strong> and <strong>secure</strong> online messaging
            platform.
          </p>
        </div>
        <div class="w-full drop-shadow-lg filter pt-10 xl:mt-24">
          <img
            src="../assets/homepage.png"
            class="w-11/12 md:w-9/12 xl:w-2/3 p-10
          mx-auto transform -skew-y-3 -skew-x-12"
          />
        </div>
      </div>
    </div>
    <div class="flex gap-5 justify-evenly mt-5">
      <img src="../assets/mongodb.png" class="w-16 p-px" />
      <img src="../assets/vuejs.png" class="w-16 p-px" />
      <img src="../assets/firebase.png" class="w-16 p-px" />
    </div>
    <div class="w-full mt-20">
      <h1 class="text-center text-3xl">Product features</h1>
      <div class="text-center mt-5 md:flex">
        <div
          class="p-5 bg-gray-50 text-gray-900 m-5 filter drop-shadow-lg rounded-md"
        >
          <i class="fas fa-sync fa-3x"></i>
          <h1 class="font-bold text-xl mt-4">Real-time messaging</h1>
          <p class="mt-4">
            All messages are sent instantly between users
          </p>
        </div>
        <div
          class="p-10 bg-gray-50 text-gray-900 m-5 filter drop-shadow-lg rounded-md"
        >
          <i class="fas fa-shield fa-3x"></i>
          <h1 class="font-bold text-xl mt-4">Strong security</h1>
          <p class="mt-4">
            All messages & user authentications are handled by Firebase
          </p>
        </div>
        <div
          class="p-10 bg-gray-50 text-gray-900 m-5 filter drop-shadow-lg rounded-md"
        >
          <i class="fas fa-user fa-3x"></i>
          <h1 class="font-bold text-xl mt-4">User profiles</h1>
          <p class="mt-4">
            Users have their own unique profiles
          </p>
        </div>
      </div>
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
