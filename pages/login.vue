<template>
  <div
    class="min-h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <form
      class="rounded-2xl w-full max-w-[500px] bg-gray-500/40 p-6 m-10"
    >
      <!-- Logo -->
      <div class="flex justify-center">
        <img src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png" class="w-[170px] sm:w-[220px] md:w-[250px]" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-4">
        <h1>เข้าสู่ระบบ</h1>
      </div>

      <!-- Username Input -->
      <div class="text-sm text-white mt-6">
        <label for="email"> อีเมล </label>
        <input
          type="text"
          id="email"
          class="w-full h-[45px] mt-2 inputbox text-black px-3 rounded-md"
          required
          placeholder="กรุณาใส่อีเมล"
        />
      </div>

      <!-- Password Input -->
      <div class="text-sm text-white  mt-6 relative">
        <label for="password"> รหัสผ่าน </label>
        <input
          :type="passwordVisible ? 'text' : 'password'"
          id="password"
          class="w-full h-[45px] mt-2 inputbox text-black px-3 rounded-md"
          required
          placeholder="หรุณาใส่รหัสผ่าน"
        />
        <span
          class="absolute right-3 top-[38px] cursor-pointer text-black"
          @click="togglePasswordVisibility"
        >
          <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <!-- Forget Password -->
      <div class="flex justify-end mt-4 text-sm">
        <NuxtLink
          to="/forgetpassword"
          class="text-red-500 font-semibold hover:underline"
        >
          ลืมรหัสผ่าน?
        </NuxtLink>
      </div>

      <!-- Login Button -->
      <div class="mt-8 flex justify-center">
        <button
          type="submit"
          class=" text-white w-full max-w-[300px] h-[45px] bg-[#FCCA81] hover:bg-[#EE973C] rounded-xl"
          @click="redirectToIndex"
        >
          เข้าสู่ระบบ
        </button>
      </div>

      <!-- Divider -->
      <hr class="border-white my-6" />

      <!-- Register Now -->
      <div class="flex justify-center text-sm text-white">
        <p>ไม่มีบัญชีผู้ใช้ ?</p>
        <NuxtLink
          to="/register"
          class="text-red-500 ml-2 font-semibold hover:underline"
        >
        ลงทะเบียน
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "auth",
});

const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const router = useRouter();

// ฟังก์ชันสำหรับเปลี่ยนเส้นทางไปยังหน้า index
const redirectToIndex = () => {
  router.push("/"); // เปลี่ยนไปหน้า index
};
</script>

<style scoped>
</style>
