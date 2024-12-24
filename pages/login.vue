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


        <div class="text-sm text-white mt-10">
          <div class="w-full px-6">
            <label for="username"> Username </label> <br />
            <input
              type="text"
              id="username"
              v-model="login.username"
              class="w-full h-[40px] mt-2 inputbox text-black"
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
              v-model="login.password"
              class="w-full h-[40px] mt-2 inputbox text-black"
              required
              placeholder="Enter Your Password"
            />
            <span
              class="absolute -translate-x-7 translate-y-[18px] cursor-pointer text-black"
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
          >Forget Password?</NuxtLink>
      </div>

        <div class="px-6 mt-12 flex justify-center">
          <button
            type="submit"
            class="w-[300px] h-[40px] rounded-xl text-white bg-violet-400 hover:bg-[#765798]"
          >
          <NuxtLink to="/">Log in</NuxtLink>
          </button>
        </div>

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
import { Login } from "~/models/page.model";
import service from "~/service";
// import { useIndexStore } from "~/store/main";


// const store = useIndexStore();

definePageMeta({
  layout: "auth",
});

const router = useRouter(); // ใช้ router สำหรับเปลี่ยนหน้า

const login = ref<Login>({
  username: "",
  password: "",
});

const passwordVisible = ref(false); // สถานะสำหรับแสดง/ซ่อนรหัสผ่าน

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// const addLogin = async () => {
//   await service.login
//     .addLogin(login.value)
//     .then((resp: any) => {

      
//       const refToken = useStatefulCookie("token");
//       refToken.value = resp.data.token;
//       console.log(resp.data);
//       store.$state.token = resp.data.token;


//       if (store.$state.token != null) {
//         router.push("/");
//       }
//     })
//     .catch((error: any) => {
//       console.log(error.data);
//     })
//     .finally(() => {});
// };
</script>

<style scoped>
</style>
