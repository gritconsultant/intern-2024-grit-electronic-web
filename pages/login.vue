<template>
  <div
    class="h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center "
  >
    <div class="rounded-2xl w-[450px] h-[600px] bg-black/50">
      <div class="flex justify-center mt-4">
        <img src="public/images/loginlogo.png" class=" w-[200px] mt-2" />
      </div>
      <div class="flex justify-center font-normal text-white">
        <h1>Log in</h1>
      </div>

      <div class="m-9 text-white">
        <label for="username"> Username </label> <br />
        <input
          type="text"
          id="username"
          class="w-full h-[40px] rounded-xl mt-2 bg-gray-300 shadow-lg text-black/80"
          required
          placeholder="Enter your username"
        />
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
