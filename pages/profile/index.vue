<template>
  <div class="pt-[90px]">
    <div class="p-4">
      <div class="flex">
        <!-- Sidebar -->
        <div class="w-1/6 max-lg:w-1/4 border-r ml-8">
          <Sidebar />
        </div>
        <!-- Main Content -->
        <div class="w-full max-lg:w-3/4 p-6 h-[100%]">
          <div>
            <h1 class="text-xl font-bold mb-6">ข้อมูลบัญชีผู้ใช้</h1>
            <hr />
          </div>

          <div>
            <div>
              <div class="grid grid-cols-2 h-[600px] max-lg:h-[500px]"
              >
                <div class="mt-10 ml-10">
                  <div>
                    <p>ชื่อ - นามสกุล</p>
                    <h1 class="font-bold text-lg">
                      {{ getinfo.FirstName }}
                      <span> {{ getinfo.LastName }}</span>
                    </h1>
                  </div>

                  <!-- change password -->
                  <div>
                    <div class="mt-5 relative">
                      <p>เปลี่ยนรหัสผ่าน</p>
                      <div class="relative">
                        <input
                          :type="
                            passwordVisible.changePassword ? 'text' : 'password'
                          "
                          v-model="changePassword.password"
                          class="w-full max-w-[400px] h-[45px] mt-2 inputbox pr-10"
                          :class="{ 'border-red-500': passwordError }"
                          @input="validatePassword"
                          @keyup.enter="updatePassword"
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
                        <p
                          v-if="passwordError"
                          class="text-red-500 text-sm mt-2"
                        >
                          รหัสผ่านต้องมี 8 ตัวขึ้นไป และต้องมีตัวพิมพ์ใหญ่,
                          ตัวเล็ก, และตัวเลข ห้ามมีอักขระพิเศษ
                        </p>
                      </div>
                    </div>

                    <div class="mt-5 relative">
                      <p>ยืนยันรหัสผ่านใหม่</p>
                      <div class="relative">
                        <input
                          :type="
                            passwordVisible.confirmPassword
                              ? 'text'
                              : 'password'
                          "
                          v-model="confirmPassword.password"
                          class="w-full max-w-[400px] h-[45px] mt-2 inputbox"
                          @input="validateConfirmPassword"
                          @keyup.enter="updatePassword"
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
                        <p
                          v-if="passwordMismatch"
                          class="text-[#FD8C35] text-sm mt-2"
                        >
                          รหัสผ่านไม่ตรงกัน
                        </p>
                      </div>
                    </div>

                    <!-- Login Button -->
                    <div class="mt-10">
                      <button
                        type="submit"
                        class="text-white w-full max-w-[300px] h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 hover:text:black rounded-xl"
                      >
                        ยืนยันการเปลี่ยนรหัสผ่าน
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="mt-10 ml-5">
                    <p>Email</p>
                    <h1 class="font-bold text-lg">{{ getinfo.Email }}</h1>
                  </div>

                  <div class="mt-5 ml-5">
                    <p>เบอร์โทรศัพท์</p>
                    <h1 class="font-bold text-lg">{{ getinfo.Phone }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loading :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type {
  PasswordRes,
  PasswordUpdate,
  UserInfo,
} from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

definePageMeta({
  layout: "user",
  middleware: "auth",
});

const router = useRouter();
const store = useIndexStore();
const loading = ref(false);
const passwordError = ref(false);
const passwordMismatch = ref(false);
// สถานะสำหรับแสดงซ่อนรหัส
const passwordVisible = ref({
  changePassword: false,
  confirmPassword: false,
});

const validatePassword = () => {
  passwordError.value = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    changePassword.value.password
  );
};

const validateConfirmPassword = () => {
  passwordMismatch.value =
    changePassword.value.password !== confirmPassword.value.password;
};

const togglePasswordVisibility = (
  field: keyof typeof passwordVisible.value
) => {
  passwordVisible.value[field] = !passwordVisible.value[field];
};

const getinfo = ref<UserInfo>({
  ID: 0,
  FirstName: "",
  LastName: "",
  Username: "",
  Password: "",
  Email: "",
  Phone: 0,
  Shipment: "",
  created_at: 0,
  updated_at: 0,
});

const changePassword = ref<PasswordUpdate>({
  password: "",
});

const confirmPassword = ref<PasswordRes>({
  password: "",
});

const getuserinfo = async () => {
  loading.value = true;
  await service.product
    .getUserInfo()
    .then((resp: any) => {
      console.log(resp);
      const data = resp.data.data;
      const user: UserInfo = {
        ID: data.id,
        FirstName: data.firstname,
        LastName: data.lastname,
        Username: data.username,
        Password: data.password,
        Email: data.email,
        Phone: data.phone,
        Shipment: data.shipment,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      getinfo.value = user;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const updatePassword = async () => {
  if (!changePassword.value.password || !confirmPassword.value.password) {
    Swal.fire({
      title: "กรุณากรอกรหัสผ่าน",
      text: "คุณต้องกรอกรหัสผ่านให้ครบ",
      icon: "warning",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  validatePassword(); // ตรวจสอบรหัสผ่าน
  validateConfirmPassword(); // ตรวจสอบรหัสผ่านตรงกัน

  if (passwordError.value) {
    Swal.fire({
      title: "รหัสผ่านไม่ถูกต้อง",
      text: "รหัสผ่านต้องมีอักษรพิมพ์ใหญ่ 1 ตัว พิมพ์เล็ก 1 ตัว และตัวเลข 1 ตัว (ไม่น้อยกว่า 8 ตัว)",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  if (passwordMismatch.value) {
    Swal.fire({
      title: "รหัสผ่านไม่ตรงกัน",
      text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }
  loading.value = true;
  await service.product
    .updatePassword(store.$state.userId, changePassword.value)
    .then((resp: any) => {
      console.log(resp);
      const data = resp.data;
      const changePassword: PasswordRes = {
        password: data.password,
      };
      confirmPassword.value = changePassword;
      if (resp.status === 200) {
        Swal.fire({
          title: "เปลี่ยนรหัสผ่านสำเร็จ!",
          text: "ได้เปลี่ยนรหัสผ่านแล้ว!",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          router.push("/profile/").then(() => window.location.reload());
        });
      }
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  getuserinfo();
});
</script>

<style scoped></style>
