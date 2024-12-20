<template>
  <div
    class="h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <div class="rounded-2xl w-[450px] h-[600px] bg-black/50">
      <div class="flex justify-center mt-4">
        <img src="public/images/logoLogin.png" class="w-[230px] mt-2" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-2">
        <h1>Log in</h1>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="text-sm text-white mt-10">
          <div class="w-full px-6">
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
        </div>

        <div class="text-sm text-white mt-10">
          <div class="w-full px-6">
            <label for="password"> Password </label> <br />
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              class="w-full h-[40px] rounded-xl mt-2 bg-gray-200 shadow-lg text-xs px-2 text-black"
              required
              placeholder="Enter Your Password"
            />
            <span
              class="absolute -translate-x-7 translate-y-[18px] cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <i
                :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              ></i>
            </span>
          </div>
        </div>

        <div class="flex justify-end m-8 text-sm">
        <NuxtLink to="/forgetpassword" class="text-red-500 font-semibold underline"
          >Forget Password?</NuxtLink
        >
      </div>

        <div class="px-6 mt-12 text-sm font-medium text-white flex justify-center">
          <button
            type="submit"
            :disabled="!form.username || !form.password"
            class="w-[300px] h-[40px] rounded-xl text-white"
            :class="{
              'bg-indigo-400 hover:bg-blue-400': form.username && form.password,
              'bg-gray-400 cursor-not-allowed': !form.username || !form.password,
            }"
          >
            Log in
          </button>
        </div>
      </form>

      <hr class="border-white mx-6 mt-8" />

      <div class="flex justify-center mt-5 text-sm">
        <div class="text-white">Don’t have an account?</div>
        <NuxtLink to="/register" class="text-red-500 ml-2 font-semibold underline">Register now</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";


definePageMeta({
  layout: "auth",
});

const router = useRouter(); // ใช้ router สำหรับเปลี่ยนหน้า

const form = reactive({
  username: "",
  password: "",
});

const passwordVisible = ref(false); // สถานะสำหรับแสดง/ซ่อนรหัสผ่าน

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = () => {
  // ตรวจสอบว่ากรอกครบทั้ง username และ password
  if (form.username && form.password) {
    // เปลี่ยนหน้าไปที่ /index
    router.push("/");
  } else {
    alert("Please fill in both username and password.");
  }
};
</script>

<style scoped>
</style>
