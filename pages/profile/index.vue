<template>
  <div class="bg-pink-500 h-full p-2">
    <div class="flex h-full bg-green-600   ">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main Content -->
      <div class="w-full lg:w-3/4 p-6 h-[100%]">
        <div class="border-b">
          <h1 class="text-xl font-bold mb-6">ข้อมูลบัญชีผู้ใช้</h1>
        </div>

        <div>
          <div>
            <div class="grid grid-cols-2">
              <div class="mt-10 ml-10">
                <div>
                  <label for="username"> ชื่อ - นามสกุล </label> <br />
                  <h1 class="font-bold text-lg">Komkem kku</h1>
                </div>

                <!-- change password -->
                <div>
                  <div class="mt-5 relative">
                    <label for="changepassword"> เปลี่ยนรหัสผ่าน </label> <br />
                    <div class="relative">
                      <input
                        :type="
                          passwordVisible.changePassword ? 'text' : 'password'
                        "
                        id="changepassword"
                        class="w-full max-w-[400px] h-[45px] mt-2 inputbox pr-10"
                        :class="{ 'border-red-500': passwordError }"
                        @input="validatePassword"
                      />
                      <span
                        class="-m-8 cursor-pointer text-black"
                        @click="togglePasswordVisibility('changePassword')"
                      >
                        <i
                          :class="
                            passwordVisible.changePassword
                              ? 'fas fa-eye-slash'
                              : 'fas fa-eye'
                          "
                        ></i>
                      </span>
                    </div>

                    <p v-if="passwordError" class="text-red-500 text-xs mt-1">
                      Password must be at least 8 characters, include an
                      uppercase letter, a lowercase letter, and a number.
                    </p>
                  </div>

                  <div class="mt-5 relative">
                    <label for="conpassword"> ยืนยันรหัสผ่านใหม่ </label> <br />
                    <div class="relative">
                      <input
                        :type="
                          passwordVisible.confirmPassword ? 'text' : 'password'
                        "
                        id="conpassword"
                        class="w-[400px] h-[45px] mt-2 inputbox"
                        @input="validatePasswordMatch"
                      />
                      <span
                        class="-m-8 cursor-pointer text-black"
                        @click="togglePasswordVisibility('confirmPassword')"
                      >
                        <i
                          :class="
                            passwordVisible.confirmPassword
                              ? 'fas fa-eye-slash'
                              : 'fas fa-eye'
                          "
                        ></i>
                      </span>
                    </div>

                    <p
                      v-if="passwordMismatch"
                      class="text-red-500 text-xs mt-1"
                    >
                      Passwords do not match.
                    </p>
                  </div>

                  <!-- Login Button -->
                  <div class="mt-10">
                    <button
                      type="submit"
                      class="text-white w-full max-w-[300px] h-[45px] bg-[#FCCA81] hover:bg-[#EE973C] hover:text:black rounded-xl"
                      @click="confirmChange"
                    >
                      ยืนยันการเปลี่ยนรหัสผ่าน
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div class="mt-10">
                  <label for="email"> Email </label>
                  <br />
                  <h1 class="font-bold text-lg">Komkem.k@kkumail.com</h1>
                </div>

                <div class="mt-5">
                  <label for="phone">เบอร์โทรศัพท์</label> <br />
                  <h1 class="font-bold text-lg">0847765928</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Register } from "~/models/page.model";

const register = ref<Register>({
  firstname: "",
  lastname: "",
  username: "",
  phone: 0,
  email: "",
  password: "",
  confirmPassword: "",
});

const passwordVisible = ref({
  changePassword: false,
  confirmPassword: false,
}); // สถานะสำหรับแสดง/ซ่อนรหัสผ่าน
const passwordError = ref(false); // แสดงข้อผิดพลาดของรหัสผ่าน
const passwordMismatch = ref(false);

const validatePassword = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  passwordError.value = !passwordPattern.test(register.value.password);
};

const validatePasswordMatch = () => {
  passwordMismatch.value =
    register.value.password !== register.value.confirmPassword;
};

const togglePasswordVisibility = (
  field: keyof typeof passwordVisible.value
) => {
  passwordVisible.value[field] = !passwordVisible.value[field];
};

const confirmChange = () => {
  alert("เปลี่ยนรหัสผ่านแล้ว");
};
</script>

<style scoped>
@media (max-width: 768px) {
  .boxprofile {
    margin: 0;
  }
  .inputbox {
    width: 100%;
  }
}
</style>
