<template>
  <div
    class="min-h-screen bg-[url('https://static.vecteezy.com/system/resources/thumbnails/042/345/355/small/pastel-gradient-blur-background-vector.jpg')] bg-cover bg-center flex justify-center items-center px-4"
  >
    <div class="rounded-2xl w-full max-w-[450px] drop-shadow-2xl  bg-white p-6">
      <!-- Logo -->
      <div class="flex justify-center mt-4">
        <img
          src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
          class="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[230px]"
        />
      </div>
      <div class="flex justify-center font-normal text-xl mt-6">
        <h1>ลืมรหัสผ่าน</h1>
      </div>

      <!-- Email Input -->
      <div class="text-base mt-10">
        <label for="email"> อีเมล </label>
        <input
          type="text"
          id="email"
          class="inputbox inputboxform"
          v-model="email"
          required
          placeholder="กรุณาใส่อีเมล"
        />
      </div>

      <!-- Send Button -->
      <div class="mt-12 flex justify-center">
        <button
          @click="handleSend"
          class="w-full max-w-[300px] h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 rounded-xl text-white text-lg"
        >
          ส่งลืมรหัสผ่าน
        </button>
      </div>

      <!-- Back to Log in -->
      <div class="flex justify-center mt-6 text-sm sm:text-base">
        <NuxtLink
          to="/login"
          class="hover:text-[#FD8C35] ml-2 font-normal hover:underline"
        >
          เข้าสู่ระบบ
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
.inputbox {
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .inputbox {
    height: 40px;
    font-size: 0.875rem;
  }
}

@media (min-width: 1024px) {
  .inputbox {
    font-size: 1rem;
  }
}
</style>
