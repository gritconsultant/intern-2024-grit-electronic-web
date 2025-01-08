<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="w-full boxprofile m-9 -ml-2 ">
      <div class="flex justify-between items-center border-b pb-4 m-4">
        <h1 class="font-medium text-lg">ข้อมูลบัญชีผู้ใช้</h1>
      </div>

      <div>
        <div>
          <div class="grid grid-cols-2">
            <div class="mt-2 ml-10">
              <div>
                <label for="username"> ชื่อ - นามสกุล </label> <br />
                <h1 class="font-bold text-lg">Komkem kku</h1>
              </div>

              <!-- change password -->
              <div>
                <div class="mt-5">
                  <label for="changepassword"> เปลี่ยนรหัสผ่าน </label> <br />
                  <input
                    :type="passwordVisible ? 'text' : 'password'"
                    id="changepassword"
                    class="w-[400px] h-[45px] mt-2 inputbox"
                    :class="{ 'border-red-500': passwordError }"
                  />
                  <p v-if="passwordError" class="text-red-500 text-xs mt-1">
                    Password must be at least 8 characters, include an uppercase
                    letter, a lowercase letter, and a number.
                  </p>
                </div>

                <div class="mt-5">
                  <label for="conpassword"> ยืนยันรหัสผ่านใหม่ </label> <br />
                  <input
                    type="text"
                    id="conpassword"
                    class="w-[400px] h-[45px] mt-2 inputbox"
                  />
                  <p v-if="passwordMismatch" class="text-red-500 text-xs mt-1">
            Passwords do not match.
          </p>
                </div>
              </div>
            </div>

            <div>
              <div class="mt-3">
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
</template>

<script setup lang="ts">
import type { Register } from '~/models/page.model';


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
