<template>
  <div
    class="h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <div class="rounded-2xl w-[450px] h-[600px] bg-black/50">
      <div class="flex justify-center mt-4">
        <img src="public/images/logoLogin.png" class="w-[230px] mt-2" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-2">
        <h1>Log in</h1>
      </div>

      <div class="text-sm text-white mt-10">
        <div class="w-full px-6">
          <label for="username"> Username </label> <br />
          <input
            type="text"
            id="username"
            class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2"
            required
            placeholder="Enter Your Username"
          />
        </div>

        <div class="text-sm text-white mt-10">
          <div class="w-full px-6">
            <label for="password"> Password </label> <br />
            <input
              type="text"
              id="password"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg"
              required
              placeholder="Enter Your Password"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end m-8 text-sm">
        <NuxtLink to="/forgetpassword" class="text-red-500"
          >Forget Password?</NuxtLink
        >
      </div>

      <div class="px-6 mt-14 text-sm font-medium text-white flex justify-center">
        <div
          class="w-[300px] h-[40px] bg-indigo-400 hover:bg-blue-400 rounded-xl"
        >
          <NuxtLink
            to="/"
            class="flex items-center justify-center w-full h-full"
          >
            Log in
          </NuxtLink>
        </div>
      </div>

      <hr class="border-white mx-6 mt-8" />

      <div class="flex justify-center mt-5 text-sm">
          <div class="text-white">Don’t have an account?</div>
          <NuxtLink to="/register" class="text-red-500 ml-2"
            >Register now</NuxtLink
          >
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
