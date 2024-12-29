<template>
  <div
    class="h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <div class="rounded-2xl w-[600px] h-auto bg-black/50">
      <div class="flex justify-center mt-4">
        <img src="public/images/logoLogin.png" class="w-[230px] mt-2" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white">
        <h1>Register</h1>
      </div>

      <!-- Firstname & Lastname -->
      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-6">
          <label for="firstname"> Firstname </label> <br />
          <input
            type="text"
            id="firstname"
            class="w-full h-[40px] mt-2 inputbox text-black"
            required
            placeholder="Enter Your Firstname"
          />
        </div>

        <div class="w-full px-6">
          <label for="lastname"> Lastname </label> <br />
          <input
            type="text"
            id="lastname"
            class="w-full h-[40px] mt-2 inputbox text-black"
            required
            placeholder="Enter Your Lastname"
          />
        </div>
      </div>

      <!-- Username & Phone -->
      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-5">
          <label for="username"> Username </label> <br />
          <input
            type="text"
            id="username"
            class="w-full h-[40px] mt-2 inputbox text-black"
            required
            placeholder="Enter Your Username"
          />
        </div>

        <div class="w-full px-5">
          <label for="phone"> Phone Number </label> <br />
          <input
            type="text"
            id="phone"
            class="w-full h-[40px] mt-2 inputbox text-black"
            required
            placeholder="Enter Phone Number"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-5">
          <label for="email"> Email </label> <br />
          <input
            type="email"
            id="email"
            class="w-full h-[40px] mt-2 inputbox text-black"
            required
            placeholder="Enter Email Address"
          />
        </div>
      </div>

      <!-- Password & Confirm Password -->
      <div class="flex justify-center text-white text-sm mt-4">
        <div class="w-full px-5 relative">
          <label for="password"> Password </label> <br />
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            class="w-full h-[40px] mt-2 inputbox text-black"
            :class="{ 'border-red-500': passwordError }"
            required
            placeholder="Enter Your Password"
          />
          <span
            class="absolute top-[38px] right-8 transform-translate-y-1/2 cursor-pointer text-black"
            @click="togglePasswordVisibility"
          >
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
          <p v-if="passwordError" class="text-red-500 text-xs mt-1">
            Password must be at least 8 characters, include an uppercase letter,
            a lowercase letter, and a number.
          </p>
        </div>

        <div class="w-full px-5">
          <label for="confirmPassword"> Confirm Password </label> <br />
          <input
            v-model="register.confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full h-[40px] mt-2 inputbox text-black"
            required
            placeholder="Enter Confirm Password"
          />
          <p v-if="passwordMismatch" class="text-red-500 text-xs mt-1">
            Passwords do not match.
          </p>
        </div>
      </div>

      <!-- Register Button -->
      <div class="px-6 mt-8 text-sm font-medium text-white flex justify-center">
        <button
          type="submit"
          class="w-[300px] h-[40px] bg-violet-400 hover:bg-[#765798] rounded-xl text-white"
        >
          <NuxtLink to="/login">Register</NuxtLink>
        </button>
      </div>

      <hr class="border-white mt-5 mx-6" />

      <div class="flex justify-center mt-5 text-sm mb-5">
        <div class="text-white">Already have an account?</div>
        <NuxtLink to="/login" class="text-red-500 ml-2 font-semibold underline"
          >Log in</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { Register } from "~/models/page.model";

definePageMeta({
  layout: "auth",
});

const register = ref<Register>({
  firstname: "",
  lastname: "",
  username: "",
  phone: 0,
  email: "",
  password: "",
  confirmPassword: "",
});

const passwordVisible = ref(false); // สถานะสำหรับแสดง/ซ่อนรหัสผ่าน
const passwordError = ref(false); // แสดงข้อผิดพลาดของรหัสผ่าน
const passwordMismatch = ref(false);

const validatePassword = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  passwordError.value = !passwordPattern.test(register.value.password);
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleRegister = () => {
  if (register.value.password !== register.value.confirmPassword) {
    passwordMismatch.value = true;
  } else {
    passwordMismatch.value = false;
    // Proceed with registration logic
    console.log("Registration successful", register.value);
  }
};
</script>

<style scoped></style>
