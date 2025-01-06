<template>
  <div
    class="min-h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center px-4"
  >
    <div class="rounded-2xl w-full max-w-[450px] bg-black/50 p-6">
      <!-- Logo -->
      <div class="flex justify-center mt-4">
        <img src="public/images/logoLogin.png" class="w-[150px] sm:w-[200px] md:w-[230px]" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-4">
        <h1>Forget Password</h1>
      </div>

      <!-- Email Input -->
      <div class="text-sm text-white mt-6">
        <label for="email"> Email </label>
        <input
          type="text"
          id="email"
          class="w-full h-[45px] mt-4 inputbox text-black px-3 rounded-md"
          v-model="email"
          required
          placeholder="Enter Your Email"
        />
      </div>

      <!-- Send Button -->
      <div class="mt-10 flex justify-center">
        <button
          @click="handleSend"
          class="w-full max-w-[300px] h-[45px] bg-violet-400 hover:bg-[#765798] rounded-xl text-white"
        >
          Send
        </button>
      </div>

      <!-- Back to Log in -->
      <div class="flex justify-center mt-6 text-sm text-white">
        <p>Back to -></p>
        <NuxtLink
          to="/login"
          class="text-red-500 ml-2 font-semibold underline"
        >
          Log in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "auth",
});

import Swal from "sweetalert2";
import { ref } from "vue";

// Type ของ response
type ResponseType = {
  success: boolean;
};

// เก็บค่าจาก input
const email = ref("");

// ฟังก์ชันจำลองการส่งข้อมูล
const fakeSendEmail = (email: string): Promise<ResponseType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true }); // จำลองสถานะสำเร็จ
    }, 1000);
  });
};

// ฟังก์ชันสำหรับส่งข้อมูล
const handleSend = async () => {
  if (email.value) {
    try {
      const response: ResponseType = await fakeSendEmail(email.value);

      if (response.success) {
        // แสดง Popup แจ้งเตือนสำเร็จ
        Swal.fire({
          title: "Email Sent Successfully!",
          text: "Please check your email for change password.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // แสดง Popup แจ้งเตือนข้อผิดพลาด
      Swal.fire({
        title: "Error!",
        text: "Failed to send email. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } else {
    // แสดง Popup แจ้งเตือนให้กรอก Email
    Swal.fire({
      title: "Warning!",
      text: "Please enter your email.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  }
};
</script>

<style scoped>
</style>
