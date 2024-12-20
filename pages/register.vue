<template>
  <div
    class="h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <div class="rounded-2xl w-[600px] h-[600px] bg-black/50">
      <div class="flex justify-center mt-4">
        <img src="public/images/logoLogin.png" class="w-[230px] mt-2" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white">
        <h1>Register</h1>
      </div>

      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-6">
          <label for="firstname"> Firstname </label> <br />
          <input
            type="text"
            id="firstname"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Your Firstname"
          />
        </div>

        <div class="w-full px-6">
          <label for="lastname"> Lastname </label> <br />
          <input
            type="text"
            id="lastname"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Your Lastname"
          />
        </div>
      </div>

      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-5">
          <label for="username"> Username </label> <br />
          <input
            type="text"
            id="username"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Your Username"
          />
        </div>

        <div class="w-full px-5">
          <label for="phone"> Phone Number </label> <br />
          <input
            type="number"
            id="phone"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Phone Number"
          />
        </div>
      </div>

      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-5">
          <label for="email"> Email </label> <br />
          <input
            type="text"
            id="email"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Email Address"
          />
        </div>
      </div>

      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-5">
          <label for="password"> Password </label> <br />
          <input
            type="text"
            id="password"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Your Password"
          />
        </div>

        <div class="w-full px-5">
          <label for="confirmPassword"> Confirm Password </label> <br />
          <input
            type="text"
            id="confirmPassword"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Confirm Password"
          />
        </div>
      </div>

      <div class="px-6 mt-8 text-sm font-medium text-white flex justify-center">
        <div
          class="w-[300px] h-[40px] bg-indigo-400 hover:bg-blue-400 rounded-xl">
          <NuxtLink
            to="/login"
            class="flex items-center justify-center w-full h-full">
            Register
          </NuxtLink>
        </div>
      </div>

      <hr class="border-white mt-5 mx-6" />


        <div class="flex justify-center mt-5 text-sm">
          <div class="text-white">Already have an account?</div>
          <NuxtLink to="/login" class="text-red-500 ml-2">Log in</NuxtLink>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<style scoped></style>
