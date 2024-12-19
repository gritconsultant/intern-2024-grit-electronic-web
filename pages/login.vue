<template>
  <div
    class="h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <div class="rounded-2xl w-[450px] h-[600px] bg-black/50">
      <div class="flex justify-center mt-4">
        <img src="public/images/logoLogin.png" class="w-[230px] mt-3" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-2">
        <h1>Log in</h1>
      </div>

      <div class="m-8 text-white">
        <label for="username"> Username </label> <br />
        <input
          type="text"
          id="username"
          class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg"
          required
          placeholder="Enter Your Username"
        />
      </div>

      <div class="m-8 text-white">
        <label for="password"> Password </label> <br />
        <input
          type="text"
          id="password"
          class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg"
          required
          placeholder="Enter Your Password"
        />
      </div>

      <div class="flex justify-end m-8">
        <NuxtLink to="/forgetpassword" class="text-red-500">Forget Password?</NuxtLink>
      </div>

      <div>
        <div
          class="bg-indigo-400 hover:bg-blue-400 text-white rounded-xl flex justify-center m-8 font-medium">
          <button type="submit" class="w-full h-[45px]">
            <p>Log in</p>
          </button>
        </div>
      </div>

      <hr class="border-white m-9" />

      <div class="flex justify-center">
        <div class="flex justify-center">
          <div class="text-white">Don’t have an account?</div>
          <NuxtLink to="/register" class="text-red-500 ml-2">Register now</NuxtLink>
        </div>
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
