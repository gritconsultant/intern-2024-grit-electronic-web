<template>
  <div
    class="min-h-screen bg-[url('https://static.vecteezy.com/system/resources/thumbnails/042/345/355/small/pastel-gradient-blur-background-vector.jpg')] bg-cover bg-center flex justify-center items-center px-4"
  >
    <div class="rounded-2xl w-full max-w-[450px] drop-shadow-2xl bg-white p-6">
      <!-- Logo -->
      <div class="flex justify-center mt-4">
        <img
          src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
          class="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[230px]"
        />
      </div>
      <div class="flex justify-center font-normal text-lg mt-2">
        <h1>กรุณาติดต่อที่</h1>
      </div>

      <!-- Email Input -->
      <div class="text-base mt-8 flex justify-center">
        <div>
          <span class="font-semibold text-lg"
            >Email : Bangkokbrand@gmail.com</span
          >
          <p class="flex justify-center mt-4">ขออภัยในความไม่สะดวก</p>
        </div>
      </div>

      <!-- Send Button -->
      <div class="mt-12 flex justify-center" v-if="!loading">
        <NuxtLink
          to="/login"
          class="w-full max-w-[250px] h-[40px] flex justify-center items-center bg-[#EE973C] hover:bg-[#FD8C35]/70 rounded-xl text-white text-lg"
          >กลับหน้าเข้าสู่ระบบ
        </NuxtLink>
      </div>
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import Swal from "sweetalert2";
import { ref } from "vue";

const loading = ref(false); 

</script>

<style scoped></style>
