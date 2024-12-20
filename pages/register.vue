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

      <form @submit.prevent="handleRegister">
        <!-- Firstname & Lastname -->
        <div class="flex justify-center text-white text-sm mt-4">
          <div class="w-full px-6">
            <label for="firstname"> Firstname </label> <br />
            <input
              type="text"
              id="firstname"
              v-model="form.firstname"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black"
              required
              placeholder="Enter Your Firstname"
            />
          </div>

          <div class="w-full px-6">
            <label for="lastname"> Lastname </label> <br />
            <input
              type="text"
              id="lastname"
              v-model="form.lastname"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black"
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
              v-model="form.username"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black"
              required
              placeholder="Enter Your Username"
            />
          </div>

          <div class="w-full px-5">
            <label for="phone"> Phone Number </label> <br />
            <input
              type="text"
              id="phone"
              v-model="form.phone"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black"
              required
              placeholder="Enter Phone Number"
              @input="validatePhone"
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
              v-model="form.email"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black"
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
              v-model="form.password"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black border"
              :class="{ 'border-red-500': passwordError }"
              required
              placeholder="Enter Your Password"
              @input="validatePassword"
            />
            <span
              class="absolute top-[38px] right-8 transform-translate-y-1/2 cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <i
                :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              ></i>
            </span>
            <p v-if="passwordError" class="text-red-500 text-xs mt-1">
              Password must be at least 8 characters, include an uppercase
              letter, a lowercase letter, and a number.
            </p>
          </div>

          <div class="w-full px-5">
            <label for="confirmPassword"> Confirm Password </label> <br />
            <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black"
              required
              placeholder="Enter Confirm Password"
            />
          </div>
        </div>

        <!-- Register Button -->
        <div
          class="px-6 mt-8 text-sm font-medium text-white flex justify-center"
        >
          <button
            type="submit"
            class="w-[300px] h-[40px] bg-indigo-400 hover:bg-blue-400 rounded-xl text-white"
          >
            Register
          </button>
        </div>
      </form>

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

definePageMeta({
  layout: "auth",
});

const form = reactive({
  firstname: "",
  lastname: "",
  username: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const passwordVisible = ref(false); // สถานะสำหรับแสดง/ซ่อนรหัสผ่าน
const passwordError = ref(false); // แสดงข้อผิดพลาดของรหัสผ่าน

const validatePhone = () => {
  form.phone = form.phone.replace(/[^0-9]/g, "").slice(0, 10);
};

const validatePassword = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  passwordError.value = !passwordPattern.test(form.password);
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (passwordError.value) {
    alert("Fix the password error before submitting.");
    return;
  }

  alert("Registration successful!");
};
</script>

<style scoped></style>
