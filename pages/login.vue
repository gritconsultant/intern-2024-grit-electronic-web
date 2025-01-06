<template>
  <div
    class="min-h-screen bg-[url('/images/Loginbg.jpg')] bg-cover bg-center flex justify-center items-center px-4"
  >
    <form
      class="rounded-2xl w-full max-w-[450px] bg-black/50 p-6 h-auto m-10"
      @submit.prevent="handleLogin"
    >
      <!-- Logo -->
      <div class="flex justify-center">
        <img src="public/images/logoLogin.png" class="w-[150px] sm:w-[200px] md:w-[230px]" />
      </div>
      <div class="flex justify-center font-normal text-xl text-white mt-4">
        <h1>Log in</h1>
      </div>

      <!-- Username Input -->
      <div class="text-sm text-white mt-6">
        <label for="username"> Username </label>
        <input
          type="text"
          id="username"
          v-model="login.username"
          class="w-full h-[45px] mt-2 inputbox text-black px-3 rounded-md"
          required
          placeholder="Enter Your Username"
        />
      </div>

      <!-- Password Input -->
      <div class="text-sm text-white mt-6 relative">
        <label for="password"> Password </label>
        <input
          :type="passwordVisible ? 'text' : 'password'"
          id="password"
          v-model="login.password"
          class="w-full h-[45px] mt-2 inputbox text-black px-3 rounded-md"
          required
          placeholder="Enter Your Password"
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
          class="text-red-500 font-semibold underline"
        >
          Forget Password?
        </NuxtLink>
      </div>

      <!-- Login Button -->
      <div class="mt-8 flex justify-center">
        <button
          type="submit"
          class="w-full max-w-[300px] h-[45px] bg-violet-400 hover:bg-[#765798] rounded-xl text-white"
          @click="redirectToIndex"
        >
          Log in
        </button>
      </div>

      <!-- Divider -->
      <hr class="border-white my-6" />

      <!-- Register Now -->
      <div class="flex justify-center text-sm">
        <p class="text-white">Don’t have an account?</p>
        <NuxtLink
          to="/register"
          class="text-red-500 ml-2 font-semibold underline"
        >
          Register now
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

const login = ref({
  username: "",
  password: "",
});

const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = () => {
  if (!login.value.username || !login.value.password) {
    alert("Please fill in all fields");
    return;
  }
  console.log("Login successful", login.value);
  alert("Login successful!");
};


const router = useRouter();

// ฟังก์ชันสำหรับเปลี่ยนเส้นทางไปยังหน้า index
const redirectToIndex = () => {
  router.push("/"); // เปลี่ยนไปหน้า index
};
</script>

<style scoped>
</style>
