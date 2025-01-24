<template>
  <div
    class="min-h-screen bg-[url('https://static.vecteezy.com/system/resources/thumbnails/042/345/355/small/pastel-gradient-blur-background-vector.jpg')] bg-cover bg-center flex justify-center items-center"
  >
    <form
      class="rounded-2xl w-full drop-shadow-2xl max-w-[570px] bg-white p-6 h-auto m-10"
    >
      <!-- Logo -->
      <div class="flex justify-center">
        <img src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png" class="w-[150px] sm:w-[200px] md:w-[230px]" />
      </div>
      <div class="flex justify-center font-normal text-xl mt-6">
        <h1>ลงทะเบียน</h1>
      </div>

      <!-- Firstname & Lastname -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-base mt-12">
        <div>
          <label for="firstname"> ชื่อจริง </label>
          <input
            type="text"
            id="firstname"
            v-model="registers.firstname"
            class="inputbox inputboxform"
            required
            placeholder="กรุณาใส่ชื่อ"
          />
        </div>
        <div>
          <label for="lastname"> นามสกุล </label>
          <input
            type="text"
            id="lastname"
            v-model="registers.lastname"
            class="inputbox inputboxform"
            required
            placeholder="กรุณาใส่นามสกุล"
          />
        </div>
      </div>

      <!-- Username & Phone -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-base mt-6">
        <div>
          <label for="username"> ชื่อผู้ใช้ </label>
          <input
            type="text"
            id="username"
            v-model="registers.username"
            class="inputbox inputboxform"
            required
            placeholder="กรุณาใส่ชื่อผู้ใช้"
          />
        </div>
        <div>
          <label for="phone"> เบอร์โทรศัพท์ </label>
          <input
            type="text"
            id="phone"
            v-model="registers.phone"
            class="inputbox inputboxform"
            required
            placeholder="กรุณาใส่เบอร์โทรศัพท์"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="text-base mt-6">
        <label for="email"> อีเมล </label>
        <input
          type="email"
          id="email"
          v-model="registers.email"
          class="inputbox inputboxform"
          required
          placeholder="กรุณาใส่อีเมล"
        />
      </div>

      <!-- Password & Confirm Password -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-base mt-6">
        <div class="relative">
          <label for="password"> รหัสผ่าน </label>
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            v-model="registers.password"
            class="inputbox inputboxform"
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
        </div>
        <div>
          <label for="confirmPassword"> ยืนยันรหัสผ่าน </label>
          <input
            v-model="registers.confirmPassword"
            type="password"
            id="confirmPassword"
            class="inputbox inputboxform"
            required
            placeholder="กรุณายืนยันรหัสผ่าน"
          />
          <p v-if="passwordMismatch" class="text-[#FD8C35] text-sm mt-2">
            รหัสผ่านไม่ตรงกัน
          </p>
        </div>
      </div>

      <!-- Register Button -->
      <div class="mt-14 flex justify-center">
        <button
          type="button"
          class="w-full max-w-[300px] h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 rounded-xl text-white text-lg"
        @click="register"
          >
          ลงทะเบียน
        </button>
      </div>

      <!-- Divider -->
      <hr class="border-black/50 mt-6" />

      <!-- Log in Link -->
      <div class="flex justify-center mt-6 text-base">
        <p>มีบัญชีผู้ใช้แล้ว ?</p>
        <NuxtLink
          to="/login"
          class="hover:text-[#FD8C35] ml-2 font-normal hover:underline"
        >
          เข้าสู่ระบบ
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Register } from "~/models/page.model";
import service from "~/service";

definePageMeta({
  layout: "auth",
});

const router = useRouter();
const registers = ref<Register>({
  firstname: "",
  lastname: "",
  username: "",
  phone: 0,
  email: "",
  password: "",
  confirmPassword: "",
});

const register = async () => {
  console.log(registers.value)
  await service.auth.register(registers.value)
  .then((resp: any) => {
    console.log(resp)

  if (resp.status == 200) {
    alert("Registration successful!");
    router.push("/login");
  }


  })
  .catch((error: any) => {
    console.error(error);
    alert("Registration failed. Please try again later.");
    return;
  })
  .finally(() => {})
}


const passwordVisible = ref(false);
const passwordError = ref(false);
const passwordMismatch = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// const handleRegister = () => {
//   if (!register.value.firstname || !register.value.lastname) {
//     alert("Please fill in all fields");
//     return;
//   }
//   if (register.value.password !== register.value.confirmPassword) {
//     passwordMismatch.value = true;
//     alert("Passwords do not match.");
//     return;
//   }
//   passwordMismatch.value = false;

//   console.log("Registration successful", register.value);
//   alert("Registration successful!");
// };
</script>

<style scoped>
</style>
