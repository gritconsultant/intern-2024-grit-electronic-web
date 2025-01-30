<template>
  <div class="p-4">
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main Content -->
      <div class="w-full lg:w-3/4 p-6 h-[100%]">
        <div class="border-b">
          <h1 class="text-xl font-bold mb-6">ข้อมูลบัญชีผู้ใช้</h1>
        </div>

        <div>
          <div class="grid grid-cols-2">
            <div class="mt-10 ml-10">
              <div>
                <p> ชื่อ - นามสกุล </p>
                <h1 class="font-bold text-lg">
                  {{ getinfo.FirstName }} <span> {{ getinfo.LastName }}</span>
                </h1>
              </div>

              <!-- เปลี่ยนรหัสผ่าน -->
              <div class="mt-5 relative">
                <p>รหัสผ่านใหม่</p>
                <input
                  :type="passwordVisible.newPassword ? 'text' : 'password'"
                  v-model="password.newPassword"
                  class="w-full max-w-[400px] h-[45px] mt-2 inputbox pr-10"
                  required
                  @input="checkPasswords"
                />
                <span class="-m-8 cursor-pointer text-black" @click="togglePasswordVisibility('newPassword')">
                  <i :class="passwordVisible.newPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </span>
              </div>

              <div v-if="password.newPassword" class="mt-5 relative">
                <p>ยืนยันรหัสผ่านใหม่</p>
                <input
                  :type="passwordVisible.confirmPassword ? 'text' : 'password'"
                  v-model="password.confirmPassword"
                  class="w-[400px] h-[45px] mt-2 inputbox"
                  required
                  @input="checkPasswords"
                />
                <span class="-m-8 cursor-pointer text-black" @click="togglePasswordVisibility('confirmPassword')">
                  <i :class="passwordVisible.confirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </span>
                <p v-if="passwordMismatch" class="text-red-500 text-xs mt-1">
                  รหัสผ่านไม่ตรงกัน
                </p>
              </div>

              <div class="mt-10">
                <button
                  type="submit"
                  class="text-white w-full max-w-[300px] h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 rounded-xl"
                  @click="updatePassword"
                  :disabled="passwordMismatch || !password.newPassword || !password.confirmPassword"
                >
                  ยืนยันการเปลี่ยนรหัสผ่าน
                </button>
              </div>
            </div>

            <div>
              <div class="mt-10">
                <p>Email</p>
                <h1 class="font-bold text-lg"> {{ getinfo.Email }}</h1>
              </div>
              <div class="mt-5">
                <p>เบอร์โทรศัพท์</p>
                <h1 class="font-bold text-lg">{{ getinfo.Phone }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { PasswordUpdate, UserInfo } from "~/models/product.model";
import service from "~/service";

definePageMeta({ layout: "user" });

const getinfo = ref<UserInfo>({
  ID: 0,
  FirstName: "",
  LastName: "",
  Username: "",
  Email: "",
  Phone: 0,
  created_at: 0,
  updated_at: 0,
});

const password = ref<PasswordUpdate>({
  newPassword: "",
  confirmPassword: "",
});

const passwordMismatch = computed(() => password.value.newPassword !== password.value.confirmPassword);

const passwordVisible = ref({
  newPassword: false,
  confirmPassword: false,
});

// ดึงข้อมูลผู้ใช้
const getuserinfo = async () => {
  try {
    const resp = await service.product.getUserInfo();
    getinfo.value = resp.data.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error);
  }
};

// อัปเดตรหัสผ่าน
const updatePassword = async () => {
  if (passwordMismatch.value) {
    Swal.fire("รหัสผ่านไม่ตรงกัน", "กรุณากรอกให้ถูกต้อง", "error");
    return;
  }

  try {
    if (!getinfo.value.ID) throw new Error("ไม่พบข้อมูลผู้ใช้");

    const payload = {
      newPassword: password.value.newPassword,
    };

    const response = await service.product.updatePassword(getinfo.value.ID, payload);
    if (response.status === 200) {
      Swal.fire("สำเร็จ", "รหัสผ่านถูกเปลี่ยนเรียบร้อย", "success");
      password.value = { newPassword: "", confirmPassword: "" };
    } else {
      throw new Error("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด", error);
    Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถเปลี่ยนรหัสผ่านได้", "error");
  }
};

const checkPasswords = () => {
  passwordMismatch.value = password.value.newPassword !== password.value.confirmPassword;
};

const togglePasswordVisibility = (field: keyof typeof passwordVisible.value) => {
  passwordVisible.value[field] = !passwordVisible.value[field];
};

onMounted(() => {
  getuserinfo();
});
</script>

<style scoped></style>
