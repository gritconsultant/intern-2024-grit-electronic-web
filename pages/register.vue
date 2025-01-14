<template>
  <div
    class="min-h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center px-4"
  >
    <form
      class="rounded-2xl w-full max-w-[500px] bg-gray-500/40 p-6 h-auto m-10"
      @submit.prevent="handleRegister"
    >
      <!-- Logo -->
      <div class="flex justify-center">
        <img src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png" class="w-[150px] sm:w-[200px] md:w-[230px]" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-4">
        <h1>ลงทะเบียน</h1>
      </div>

      <!-- Firstname & Lastname -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm mt-6">
        <div>
          <label for="firstname"> ชื่อจริง </label>
          <input
            type="text"
            id="firstname"
            v-model="register.firstname"
            class="w-full h-[45px] mt-2 inputbox text-black rounded-md px-3"
            required
            placeholder="กรุณาใส่ชื่อ"
          />
        </div>
        <div>
          <label for="lastname"> นามสกุล </label>
          <input
            type="text"
            id="lastname"
            v-model="register.lastname"
            class="w-full h-[45px] mt-2 inputbox text-black rounded-md px-3"
            required
            placeholder="กรุณาใส่นามสกุล"
          />
        </div>
      </div>

      <!-- Username & Phone -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm mt-6">
        <div>
          <label for="username"> ชื่อผู้ใช้ </label>
          <input
            type="text"
            id="username"
            v-model="register.username"
            class="w-full h-[45px] mt-2 inputbox text-black rounded-md px-3"
            required
            placeholder="กรุณาใส่ชื่อผู้ใช้"
          />
        </div>
        <div>
          <label for="phone"> เบอร์โทรศัพท์ </label>
          <input
            type="text"
            id="phone"
            v-model="register.phone"
            class="w-full h-[45px] mt-2 inputbox text-black rounded-md px-3"
            required
            placeholder="กรุณาใส่เบอร์โทรศัพท์"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="text-white text-sm mt-6">
        <label for="email"> อีเมล </label>
        <input
          type="email"
          id="email"
          v-model="register.email"
          class="w-full h-[45px] mt-2 inputbox text-black rounded-md px-3"
          required
          placeholder="กรุณาใส่อีเมล"
        />
      </div>

      <!-- Password & Confirm Password -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm mt-6">
        <div class="relative">
          <label for="password"> รหัสผ่าน </label>
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            v-model="register.password"
            class="w-full h-[45px] mt-2 inputbox text-black rounded-md px-3"
            :class="{ 'border-red-500': passwordError }"
            required
            placeholder="กรุณาใส่รหัสผ่าน"
          />
          <span
            class="absolute right-3 top-[42px] cursor-pointer text-black"
            @click="togglePasswordVisibility"
          >
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
          <p v-if="passwordError" class="text-red-500 text-xs mt-1">
            รหัสต้องมีความยาว 8 ตัวขึ้นไป , มีตัวอักษรเล็ก , ตัวอักษรใหญ่ และ ตัวเลข
          </p>
        </div>
        <div>
          <label for="confirmPassword"> ยืนยันรหัสผ่าน </label>
          <input
            v-model="register.confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full h-[45px] mt-2 inputbox text-black rounded-md px-3"
            required
            placeholder="กรุณายืนยันรหัสผ่าน"
          />
          <p v-if="passwordMismatch" class="text-red-500 text-xs mt-1">
            รหัสผ่านไม่ตรงกัน.
          </p>
        </div>
      </div>

      <!-- Register Button -->
      <div class="mt-8 flex justify-center">
        <button
          type="submit"
          class="w-full max-w-[300px] h-[45px] bg-[#FCCA81] hover:bg-[#EE973C] rounded-xl text-white"
        >
          ลงทะเบียน
        </button>
      </div>

      <!-- Divider -->
      <hr class="border-white mt-6" />

      <!-- Log in Link -->
      <div class="flex justify-center mt-6 text-sm">
        <p class="text-white">มีบัญชีผู้ใช้แล้ว ?</p>
        <NuxtLink
          to="/login"
          class="text-red-500 ml-2 font-semibold hover:underline"
        >
          เข้าสู่ระบบ
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

const register = ref({
  firstname: "",
  lastname: "",
  username: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const passwordVisible = ref(false);
const passwordError = ref(false);
const passwordMismatch = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleRegister = () => {
  if (!register.value.firstname || !register.value.lastname) {
    alert("Please fill in all fields");
    return;
  }
  if (register.value.password !== register.value.confirmPassword) {
    passwordMismatch.value = true;
    alert("Passwords do not match.");
    return;
  }
  passwordMismatch.value = false;

  console.log("Registration successful", register.value);
  alert("Registration successful!");
};
</script>

<style scoped>
</style>
