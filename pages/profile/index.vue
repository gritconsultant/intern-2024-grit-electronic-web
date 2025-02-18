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
          <div>
            <div class="grid grid-cols-2">
              <div class="mt-10 ml-10">
                <div>
                  <p> ชื่อ - นามสกุล </p>
                  <h1 class="font-bold text-lg">{{ getinfo.FirstName }} <span> {{ getinfo.LastName }}</span></h1>
                </div>

                <!-- change password -->
                <div>
                  <div class="mt-5 relative">
                    <p> เปลี่ยนรหัสผ่าน </p>
                    <div class="relative">
                      <input
                        :type="
                          passwordVisible.changePassword ? 'text' : 'password'
                        "
                        v-model="changePassword.password"
                        class="w-full max-w-[400px] h-[45px] mt-2 inputbox pr-10"
                        :class="{ 'border-red-500': passwordError }"
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
                  </div>

                  <div  class="mt-5 relative">
                    <p> ยืนยันรหัสผ่านใหม่ </p>
                    <div class="relative">
                      <input
                        :type="
                          passwordVisible.confirmPassword? 'text' : 'password'
                        "
                        v-model="confirmPassword.password"
                        class="w-[400px] h-[45px] mt-2 inputbox"
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

                    <!-- <p
                      v-if="passwordMismatch"
                      class="text-red-500 text-xs mt-1"
                    >
                      Passwords do not match.
                    </p> -->
                  </div>

                  <!-- Login Button -->
                  <div class="mt-10">
                    <button
                      type="submit"
                      class="text-white w-full max-w-[300px] h-[45px] bg-[#EE973C] hover:bg-[#FD8C35]/70 hover:text:black rounded-xl"
                      @click="updatePassword"
                    >
                      ยืนยันการเปลี่ยนรหัสผ่าน
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div class="mt-10">
                  <p> Email </p>
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
    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import type { PasswordRes, PasswordUpdate, UserInfo } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

definePageMeta({
  layout: "user",
});

const route = useRoute();
const store = useIndexStore();
const loading = ref(false); 

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
  // username: "",
    password:  "",
    // email:  "",
    // phone: 0,
    // firstname:  "",
    // lastname:  "",

})

const confirmPassword = ref<PasswordRes>({
  // username: "",
    password:  "",
    // email:  "",
    // phone: 0,
    // firstname:  "",
    // lastname:  "",
})

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
  loading.value = true;
  await service.product.updatePassword(store.$state.userId, changePassword.value)
   .then((resp: any) => {
      console.log(resp);
      const data = resp.data;
      const changePassword : PasswordRes = {
        // username: data.username,
        password: data.password,
        // email: data.email,
        // phone: data.phone,
        // firstname: data.firstname,
        // lastname: data.lastname,
      };
      confirmPassword.value = changePassword;

      if (resp.status == 200) {
    alert("เปลี่ยนรหัสผ่านสำเร็จ!");
  }
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
}


// สถานะสำหรับแสดงซ่อนรหัส
const passwordVisible = ref({
  changePassword: false,
  confirmPassword: false,
});
const passwordError = ref(false); // แสดงข้อผิดพลาดของรหัสผ่าน

const togglePasswordVisibility = (
  field: keyof typeof passwordVisible.value
) => {
  passwordVisible.value[field] = !passwordVisible.value[field];
};


onMounted(() => {
  getuserinfo();
});
</script>

<style scoped></style>
