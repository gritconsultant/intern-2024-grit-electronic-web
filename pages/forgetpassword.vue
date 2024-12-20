<template>
  <div
    class="h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <div class="rounded-2xl w-[450px] h-[600px] bg-black/50">
      <div class="flex justify-center mt-10">
        <img src="public/images/logoLogin.png" class="w-[230px] mt-4" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-4">
        <h1>Forget Password</h1>
      </div>

      <div class="text-sm text-white mt-12">
        <div class="w-full px-6">
          <label for="email"> Email </label> <br />
          <input
            type="text"
            id="email"
            class="w-full h-[40px] rounded-xl mt-4 bg-gray-200 shadow-lg text-xs px-2"
            v-model="email"
            required
            placeholder="Enter Your Email"
          />
        </div>
      </div>

      <div class="px-6 mt-16 text-sm font-medium text-white flex justify-center">
        <div
          class="w-[300px] h-[40px] bg-indigo-400 hover:bg-blue-400 rounded-xl"
        >
          <button
            @click="handleSend"
            class="flex items-center justify-center w-full h-full"
          >
            Send
          </button>
        </div>
      </div>


      <div class="flex justify-center mt-5 text-sm text-white"> Back to ->
        <NuxtLink to="/login" class="text-red-500 ml-3 font-semibold underline"
          >Log in</NuxtLink>
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

<style scoped></style>
